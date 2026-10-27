# Hisham Almalki — Portfolio

Personal site of Hisham Almalki, Computer Science graduate of Umm Al-Qura University: three projects, each taken from raw data to a model to a working product.

**Live:** [hisham-cs.github.io/portfolio](https://hisham-cs.github.io/portfolio/)

## Projects shown

- **Telecom churn analysis** — Excel / Power Query cleaning, a three-page Power BI dashboard, and a logistic regression model (0.849 ROC-AUC) on IBM's public Telco sample dataset. [Repository](https://github.com/hisham-cs/telco-churn-analysis)
- **Pulmonary edema detector** — a four-CNN soft-voting ensemble with Grad-CAM, served as a Streamlit app; research and education only. [Repository](https://github.com/hisham-cs/AI-Pulmonary-Edema-Detector) · [Live app](https://ai-pulmonary-edema-detector-n2mdhebrvfowgvbobyfo4j.streamlit.app/)
- **Faten** — an Arabic-first AI academic assistant (graduation project) with an LLM agent, Next.js and FastAPI. [Repository](https://github.com/Saleh67676/Faten)

## Stack

React 19 and Vite 8, plain CSS with design tokens (`src/index.css`), no UI library. One self-hosted variable font (Bricolage Grotesque). See [DESIGN.md](DESIGN.md) for the design system.

## Editing content

All content lives in two files; no component needs to change for ordinary edits.

- `src/data/projects.js` — the projects. **To add a project, append one entry** with the same shape: its three stages (data, model, product), each with a frame (a screenshot, a table or a list), the case text, links, short labels for the skill map, and a `plate`: the case block's layout (`zigzag`, `panel` or `pair`, as approved in `design-exploration/round-4/case-layouts.html`), its pictures with captions (each opens full size), and how many detail rows go first. Every section (hero, "Hand me a problem", work index, case blocks, skill map) renders from this list.
- `src/data/site.js` — profile, skills (each pointing at the stages that prove it), about, experience, education, certification and courses, picture credits.

### Images

Drop source files into `raw-images/` and run `npm run images` (needs `npm install --no-save sharp` once; sharp is a local tool and never ships):

- `raw-images/projects/{slug}-{n}-{label}.png` → `src/assets/projects/{slug}/{n}-{480,800,1280}w.webp` (natural ratio, never cropped or enlarged: a narrower source stops at its own width, e.g. `6-448w.webp`; pass the ratio to `screenshot()`)
- `raw-images/credentials/{name}.png` → `src/assets/credentials/{name}-{480,1280}w.webp` (natural ratio)
- `raw-images/figures/{name}.jpg` → `src/assets/figures/{name}-{480,1280}w.webp` (natural ratio)

`raw-images/` and `incoming/` are gitignored.

### Certificates

The NVIDIA certificate is shown. Course certificates are listed as text until their scans are approved for publication (several carry QR codes or certificate IDs). To show one: put its scan in `raw-images/credentials/` under the `imageName` given in `src/data/site.js`, run `npm run images`, and set `publish: true` on that course. To link the NVIDIA verification page, fill `certification.verifyUrl`.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173/portfolio/
npm run build
npm run preview   # serves dist/ under /portfolio/, as GitHub Pages does
```

## Deployment

GitHub Pages deploys from the Actions workflow `.github/workflows/deploy.yml` on every push to `main` (the repository has no `gh-pages` branch). `vite.config.js` sets `base: '/portfolio/'`.

## Contact

[hasalmalki@outlook.com](mailto:hasalmalki@outlook.com) · [GitHub](https://github.com/hisham-cs) · [LinkedIn](https://www.linkedin.com/in/hisham-a-almalki)
