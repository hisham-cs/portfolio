// Converts raw source images (PNG/JPG) in raw-images/ into the exact WebP
// variants and filenames the app's asset-discovery glob expects (see the
// comments above getProjectImages / getCredentialImage in src/data.js).
// Re-run any time; it's a pure function of raw-images/ -> generated WebP,
// safe to overwrite outputs.
//
// Usage: npm run images   (or: node scripts/prepare-images.mjs)

import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
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
const RAW_CREDENTIALS_DIR = join(ROOT, 'raw-images', 'credentials')
const OUT_PROJECTS_DIR = join(ROOT, 'src', 'assets', 'projects')
const OUT_CREDENTIALS_DIR = join(ROOT, 'src', 'assets', 'credentials')

const IMAGE_EXT_RE = /\.(png|jpe?g)$/i
const PROJECT_WIDTHS = [480, 960, 1280]
const MOSAIC_HEIGHT_RATIO = 9 / 16 // 16:9 mosaic tiles, matches ASPECT_RATIO in data.js
const THUMB_SHORT_EDGE = 352
const FULL_LONG_EDGE = 1600
const QUALITY = 85

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
  if (!existsSync(OUT_PROJECTS_DIR)) mkdirSync(OUT_PROJECTS_DIR, { recursive: true })

  for (const [slug, orders] of Object.entries(bySlugOrder)) {
    for (const [order, srcPath] of Object.entries(orders)) {
      for (const width of PROJECT_WIDTHS) {
        const height = Math.round(width * MOSAIC_HEIGHT_RATIO)
        const outName = `${slug}-${order}-${width}w.webp`
        const outPath = join(OUT_PROJECTS_DIR, outName)
        const buffer = await sharp(srcPath)
          .rotate() // auto-orient per EXIF, then strip the tag
          .resize(width, height, { fit: 'cover', position: 'attention' })
          .webp({ quality: QUALITY })
          .toBuffer()
        writeFileSync(outPath, buffer)
        results.push({ src: basename(srcPath), out: outName, dims: `${width}x${height}`, size: kb(buffer.length) })
      }
    }
  }
}

async function processCredentials() {
  const files = listRaw(RAW_CREDENTIALS_DIR)
  if (files.length === 0) return

  if (!existsSync(OUT_CREDENTIALS_DIR)) mkdirSync(OUT_CREDENTIALS_DIR, { recursive: true })

  for (const file of files) {
    const match = file.match(/^(cert|letter)-([a-z0-9]+(?:-[a-z0-9]+)*)(?:-.+)?\.(png|jpe?g)$/i)
    if (!match) {
      warnings.push(`raw-images/credentials/${file} -- doesn't match {cert|letter}-{slug}.{ext}, skipped`)
      continue
    }
    const [, , slug] = match
    const srcPath = join(RAW_CREDENTIALS_DIR, file)
    const meta = await sharp(srcPath).rotate().metadata()
    const landscape = meta.width >= meta.height

    // Only one axis is ever specified -- sharp scales the other to preserve
    // the source aspect exactly (no crop), and the real output dimensions
    // (read back below) are what go in the filename, so the <img
    // width/height> the app renders can never drift from the actual file.
    const thumbBuffer = await sharp(srcPath)
      .rotate()
      .resize(landscape ? { height: THUMB_SHORT_EDGE } : { width: THUMB_SHORT_EDGE })
      .webp({ quality: QUALITY })
      .toBuffer()
    const thumbDims = await sharp(thumbBuffer).metadata()
    const thumbName = `${slug}-thumb-${thumbDims.width}x${thumbDims.height}.webp`
    writeFileSync(join(OUT_CREDENTIALS_DIR, thumbName), thumbBuffer)
    results.push({
      src: file,
      out: thumbName,
      dims: `${thumbDims.width}x${thumbDims.height}`,
      size: kb(thumbBuffer.length),
    })

    const fullBuffer = await sharp(srcPath)
      .rotate()
      .resize(landscape ? { width: FULL_LONG_EDGE } : { height: FULL_LONG_EDGE })
      .webp({ quality: QUALITY })
      .toBuffer()
    const fullDims = await sharp(fullBuffer).metadata()
    const fullName = `${slug}-full-${fullDims.width}x${fullDims.height}.webp`
    writeFileSync(join(OUT_CREDENTIALS_DIR, fullName), fullBuffer)
    results.push({
      src: file,
      out: fullName,
      dims: `${fullDims.width}x${fullDims.height}`,
      size: kb(fullBuffer.length),
    })
  }
}

await processProjectMosaics()
await processCredentials()

if (warnings.length > 0) {
  console.log('Warnings:')
  for (const w of warnings) console.log(`  ! ${w}`)
  console.log('')
}

if (results.length === 0) {
  console.log(
    'No raw images found. Drop files into raw-images/projects/ and/or\n' +
      'raw-images/credentials/ (see raw-images/README.md for naming) and re-run.',
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
