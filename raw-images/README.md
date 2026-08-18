# Raw source images

Drop PNG/JPG source files here, then run `npm run images` (or `node
scripts/prepare-images.mjs`). This folder itself is gitignored — only the
generated WebP files under `src/assets/projects/` and
`src/assets/credentials/` get committed.

## `projects/` — project card screenshots

Name each file `{project-slug}-{order}-{label}.{png,jpg,jpeg}`. Only the
`{slug}-{order}-` prefix is parsed; `{label}` is free text for your own
reference.

```
projects/telco-churn-1-overview.png
projects/telco-churn-2-drivers.png
projects/telco-churn-3-roc-curve.png
projects/telco-churn-4-coefficients.png
```

Produces `src/assets/projects/telco-churn/{order}-{480,1280}w.webp` — one
subfolder per project, two width tiers (480w mobile, 1280w everything
else — a middle 960w tier was dropped as low-value; see DESIGN.md), 16:9,
cropped to fit (saliency-aware) if the source isn't already 16:9.

## `credentials/` — certificate images and recommendation letters

Name each file `cert-{slug}-{label}.{ext}` for a certificate or
`letter-{slug}-{label}.{ext}` for a recommendation letter. `{slug}` must
match a `slug` in the `credentials` array in `src/data.js`.

```
credentials/cert-kaust-advanced-ai.png
credentials/cert-kaust-intro-ai.png
credentials/cert-sdaia-fundamentals-ai.png
credentials/cert-deeplearning-ai-math-ml.png
```

Produces `src/assets/credentials/{slug}/thumb-{w}x{h}.webp` (352px on the
short edge) and `src/assets/credentials/{slug}/full-{w}x{h}.webp` (1600px
on the long edge) — one subfolder per credential, orientation detected
automatically, so landscape certificates and portrait letters both work,
full aspect ratio preserved, no cropping.
