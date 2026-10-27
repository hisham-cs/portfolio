// Converts raw source images (PNG/JPG) in raw-images/ into the exact WebP
// variants and filenames the app's asset-discovery glob expects (see the
// comments above getProjectImages in src/data.js).
// Re-run any time; it's a pure function of raw-images/ -> generated WebP,
// safe to overwrite outputs.
//
// Usage: npm run images   (or: node scripts/prepare-images.mjs)

import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

let sharp
try {
  ;({ default: sharp } = await import('sharp'))
} catch {
  console.error(
    '\nsharp is not installed. It is a local content-prep tool only -- it\n' +
      'never ships in the built site, so it is deliberately not added to\n' +
      'package.json. Run once:\n\n' +
      '  npm install --no-save sharp\n\n' +
      'then re-run this script.\n',
  )
  process.exit(1)
}

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RAW_PROJECTS_DIR = join(ROOT, 'raw-images', 'projects')
const OUT_PROJECTS_DIR = join(ROOT, 'src', 'assets', 'projects')

const IMAGE_EXT_RE = /\.(png|jpe?g)$/i
// 480w (mobile) + 1280w (everything else) -- a dropped middle 960w tier
// kept almost none of the srcset benefit for a third of the file count;
// confirmed via a post-change Lighthouse mobile run (see DESIGN.md).
const PROJECT_WIDTHS = [480, 1280]
// Screenshots add an 800w tier: a phone at 1.75-2x density needs 600-750px
// for a full-width frame, and jumping from 480w to 1280w cost Lighthouse
// mobile LCP once the case pictures grew (see the round-1 review run).
const SCREENSHOT_WIDTHS = [480, 800, 1280]
const QUALITY = 85
// Screenshots are never cropped: each keeps its natural ratio, and the site
// shows it whole (object-fit: contain) on a fill that matches its edge.
// Pixels cut from the left edge of a raw screenshot before resizing. The
// edema report screen loses the app's sidebar (0-293px), whose "Final
// diagnosis" label the site never shows; the X-ray starts at 373px.
const TRIM_LEFT = { 'pulmonary-edema-1-app.png': 300 }

const results = []
const warnings = []

function listRaw(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((f) => IMAGE_EXT_RE.test(f))
}

function kb(byteLength) {
  return `${(byteLength / 1024).toFixed(1)} KB`
}

async function processProjectMosaics() {
  const files = listRaw(RAW_PROJECTS_DIR)
  if (files.length === 0) return

  const bySlugOrder = {}
  for (const file of files) {
    const match = file.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)-(\d+)-.+\.(png|jpe?g)$/i)
    if (!match) {
      warnings.push(`raw-images/projects/${file} -- doesn't match {slug}-{n}-{label}.{ext}, skipped`)
      continue
    }
    const [, slug, orderStr] = match
    const order = Number(orderStr)
    const bucket = (bySlugOrder[slug] ??= {})
    if (bucket[order]) {
      warnings.push(
        `raw-images/projects/${file} -- duplicate order ${order} for "${slug}", overwrites ${basename(bucket[order])}`,
      )
    }
    bucket[order] = join(RAW_PROJECTS_DIR, file)
  }

  if (Object.keys(bySlugOrder).length === 0) return

  for (const [slug, orders] of Object.entries(bySlugOrder)) {
    const slugDir = join(OUT_PROJECTS_DIR, slug)
    if (!existsSync(slugDir)) mkdirSync(slugDir, { recursive: true })

    for (const [order, srcPath] of Object.entries(orders)) {
      const trim = TRIM_LEFT[basename(srcPath)] ?? 0
      const meta = trim ? await sharp(srcPath).metadata() : null
      for (const width of SCREENSHOT_WIDTHS) {
        const outName = `${order}-${width}w.webp`
        const outPath = join(slugDir, outName)
        let img = sharp(srcPath).rotate() // auto-orient per EXIF, then strip the tag
        if (trim) img = img.extract({ left: trim, top: 0, width: meta.width - trim, height: meta.height })
        const { data: buffer, info } = await img
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toBuffer({ resolveWithObject: true })
        writeFileSync(outPath, buffer)
        results.push({
          src: basename(srcPath),
          out: `${slug}/${outName}`,
          dims: `${info.width}x${info.height}`,
          size: kb(buffer.length),
        })
      }
    }
  }
}

// Credentials (certificate scans) and figures (single illustrative images)
// keep their natural aspect ratio -- cropping a certificate to 16:9 would cut
// text off it. Name each file `{slug}.{png,jpg}`; output is
// `src/assets/{credentials,figures}/{slug}-{480,1280}w.webp`.
async function processNatural(rawDir, outDir, label) {
  const files = listRaw(rawDir)
  if (files.length === 0) return
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  for (const file of files) {
    const slug = file.replace(IMAGE_EXT_RE, '')
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      warnings.push(`raw-images/${label}/${file} -- name must be {slug}.{png,jpg}, skipped`)
      continue
    }
    for (const width of PROJECT_WIDTHS) {
      const outName = `${slug}-${width}w.webp`
      const { data, info } = await sharp(join(rawDir, file))
        .rotate()
        .flatten({ background: '#ffffff' }) // certificates with alpha get a white page, not black
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer({ resolveWithObject: true })
      writeFileSync(join(outDir, outName), data)
      results.push({ src: file, out: `${label}/${outName}`, dims: `${info.width}x${info.height}`, size: kb(data.length) })
    }
  }
}

await processProjectMosaics()
await processNatural(join(ROOT, 'raw-images', 'credentials'), join(ROOT, 'src', 'assets', 'credentials'), 'credentials')
await processNatural(join(ROOT, 'raw-images', 'figures'), join(ROOT, 'src', 'assets', 'figures'), 'figures')

if (warnings.length > 0) {
  console.log('Warnings:')
  for (const w of warnings) console.log(`  ! ${w}`)
  console.log('')
}

if (results.length === 0) {
  console.log(
    'No raw images found. Drop files into raw-images/projects/ (see\n' +
      'raw-images/README.md for naming) and re-run.',
  )
  process.exit(0)
}

const srcW = Math.max(...results.map((r) => r.src.length), 'source'.length)
const outW = Math.max(...results.map((r) => r.out.length), 'output'.length)
console.log(`${'source'.padEnd(srcW)}  ->  ${'output'.padEnd(outW)}  dims        size`)
console.log('-'.repeat(srcW + outW + 30))
for (const r of results) {
  console.log(`${r.src.padEnd(srcW)}  ->  ${r.out.padEnd(outW)}  ${r.dims.padEnd(10)}  ${r.size}`)
}
console.log(`\n${results.length} file(s) written.`)
