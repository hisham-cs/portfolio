// Converts raw source images (PNG/JPG) in raw-images/ into the exact WebP
// variants and filenames the app's asset-discovery glob expects (see
// src/data/images.js).
// Re-run any time; it's a pure function of raw-images/ -> generated WebP,
// safe to overwrite outputs.
//
// Usage: npm run images   (or: node scripts/prepare-images.mjs)

import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
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
// Then each edge loses its empty margin: whole rows or columns in which every
// pixel is the background (the most common border colour, within EMPTY_TOL per
// channel). Trimming stops at the first row or column holding anything else,
// so no content is ever cut; EDGE_KEEP pixels of each trimmed margin stay, so
// text never touches the frame.
const EMPTY_TOL = 10
const EDGE_KEEP = 6

// The box left once the empty margins are gone, inside `left` (TRIM_LEFT).
async function contentBox(srcPath, left) {
  const { data, info } = await sharp(srcPath).rotate().removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: C } = info
  const at = (x, y) => (y * W + x) * C
  const counts = new Map()
  const tally = (x, y) => { const i = at(x, y); const k = `${data[i]},${data[i + 1]},${data[i + 2]}`; counts.set(k, (counts.get(k) || 0) + 1) }
  for (let x = left; x < W; x++) { tally(x, 0); tally(x, H - 1) }
  for (let y = 0; y < H; y++) { tally(left, y); tally(W - 1, y) }
  const bg = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number)
  const empty = (x, y) => { const i = at(x, y); return Math.abs(data[i] - bg[0]) <= EMPTY_TOL && Math.abs(data[i + 1] - bg[1]) <= EMPTY_TOL && Math.abs(data[i + 2] - bg[2]) <= EMPTY_TOL }
  const rowEmpty = (y, l, r) => { for (let x = l; x < r; x++) if (!empty(x, y)) return false; return true }
  const colEmpty = (x, t, b) => { for (let y = t; y < b; y++) if (!empty(x, y)) return false; return true }
  let [l, t, r, b] = [left, 0, W, H]
  while (t < b - 1 && rowEmpty(t, l, r)) t++
  while (b > t + 1 && rowEmpty(b - 1, l, r)) b--
  while (l < r - 1 && colEmpty(l, t, b)) l++
  while (r > l + 1 && colEmpty(r - 1, t, b)) r--
  // give back up to EDGE_KEEP of each margin that was trimmed (never past TRIM_LEFT)
  ;[l, t, r, b] = [Math.max(left, l - EDGE_KEEP), Math.max(0, t - EDGE_KEEP), Math.min(W, r + EDGE_KEEP), Math.min(H, b + EDGE_KEEP)]
  return { left: l, top: t, width: r - l, height: b - t, full: { width: W, height: H }, bg }
}

const results = []
const warnings = []
const crops = []

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
      const box = await contentBox(srcPath, TRIM_LEFT[basename(srcPath)] ?? 0)
      const { full } = box
      crops.push(`${basename(srcPath).padEnd(32)} ${full.width}x${full.height} -> crop left ${box.left} top ${box.top}, ${box.width}x${box.height}` +
        ` (cut L${box.left} T${box.top} R${full.width - box.left - box.width} B${full.height - box.top - box.height}; ratio ${(full.width / full.height).toFixed(3)} -> ${(box.width / box.height).toFixed(3)}; height/width ${box.height} / ${box.width})`)
      // Old outputs go first: names carry the width, so a new crop would
      // otherwise leave stale files that the site's glob still picks up.
      for (const f of readdirSync(slugDir)) if (f.startsWith(`${order}-`) && f.endsWith('w.webp')) unlinkSync(join(slugDir, f))
      // Only the tiers the source can fill, plus one file at its own width
      // (capped at the top tier), so every name states the file's real width.
      const srcWidth = box.width
      const top = Math.min(srcWidth, SCREENSHOT_WIDTHS.at(-1))
      const widths = [...new Set([...SCREENSHOT_WIDTHS.filter((w) => w < top), top])]
      for (const width of widths) {
        const outName = `${order}-${width}w.webp`
        const outPath = join(slugDir, outName)
        const img = sharp(srcPath).rotate() // auto-orient per EXIF, then strip the tag
          .extract({ left: box.left, top: box.top, width: box.width, height: box.height })
        const { data: buffer, info } = await img
          .resize({ width })
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
if (crops.length) console.log(`\nScreenshot crops (empty margins only):\n${crops.join('\n')}`)
