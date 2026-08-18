# Raw source images

Drop PNG/JPG source files here, then run `npm run images` (or `node
scripts/prepare-images.mjs`). This folder itself is gitignored — only the
generated WebP files under `src/assets/projects/` get committed.

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
