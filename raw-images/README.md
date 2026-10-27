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

Produces `src/assets/projects/telco-churn/{order}-{480,800,1280}w.webp` — one
subfolder per project, three width tiers (480w, 800w for phones at 2x,
1280w everything else), at the
source's natural ratio. Nothing is cropped; the site shows every screenshot
whole. The one exception is TRIM_LEFT in the script, which cuts the app's
sidebar from the edema report screen on purpose.
