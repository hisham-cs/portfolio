export const profile = {
  name: 'Hisham Al-Malki',
  title: 'Data Analyst | AI Engineer',
  intro: 'A portfolio of my work, skills, and journey in technology.',
  github: 'https://github.com/hisham-cs',
  linkedin: 'https://www.linkedin.com/in/hisham-a-almalki',
  email: 'hasalmalki@outlook.com',
  // Right-pole meta line in the Hero status band.
  location: 'Makkah, SA',
  // Resolves to /assets/cv/hisham-almalki-cv.pdf under the site's base path.
  // Add the real file at public/assets/cv/hisham-almalki-cv.pdf (see the
  // PLACEHOLDER.txt note in that folder); set showCv to false to hide the
  // Download CV buttons again in the meantime.
  showCv: true,
  cv: 'assets/cv/hisham-almalki-cv.pdf',
  // Set to a real headshot path (e.g. 'headshot.jpg' in /public) to replace
  // the initials placeholder in the hero card.
  photo: '',
}

export const stats = [
  { value: '3', label: 'Projects' },
  { value: '2026', label: 'Graduate' },
  { value: 'Tech', label: 'Focus' },
]

// Structured data for the hero profile card.
export const heroCard = {
  seeking: ['AI/Data Roles', 'Internships', 'Collaborations'],
  bestWork: ['Faten Academic Assistant', 'Pulmonary Edema Detection', 'Smart Complaint System'],
}

// Focus band rendered below the About narrative — a compact 3-up, one
// line of description each, not a ledger. Titles echo the Skills category
// names where they overlap ("AI & Computer Vision" is a direct match) so
// scrolling from About into Skills reads as the same vocabulary, not a
// second taxonomy.
export const aboutHighlights = [
  {
    title: 'Data Analytics',
    text: 'Dashboards, insights, and clear decisions from raw data.',
  },
  {
    title: 'AI & Computer Vision',
    text: 'Image classification, medical imaging, and model evaluation.',
  },
  {
    title: 'Software & AI Systems',
    text: 'Practical tools: academic assistants, chatbots, and automation.',
  },
]

// One tightened paragraph — identity and approach, not a project recap
// (Projects now owns that in full detail two sections later).
export const about = `I'm Hisham Al-Malki, a Computer Science graduate from Umm Al-Qura University. I build AI and data systems the same way every time: understand the problem first, build the simplest solution that works, then test and refine it until it holds up.`

// Editorial pull-quote for the About section — a distinct statement of
// working values, not a repeat of the surrounding paragraph.
export const aboutQuote = `Turning data into decisions and ideas into software.`

// One-line status beat closing the About bio, under the pull-quote —
// intentionally plain sentence case (not the uppercase-tracked micro-label
// style used for "Focus"/"Available For": that treatment is for category
// headers, not full sentences, and per taste-editorial tracking belongs on
// headlines/captions only, never body text).
export const aboutCurrently = `Currently: going deeper into machine learning & data analysis`

export const education = {
  university: 'Umm Al-Qura University',
  degree: 'Bachelor of Computer Science',
  college: 'College of Computers',
  graduation: 'Graduated: 2026',
  gpa: '3.48 / 4.0',
  honours: 'Second Class Honours',
}

// Work/co-op history — an array from day one so a second entry appends
// cleanly with zero component changes. Each entry renders as a card that
// echoes Education's degree-card treatment (one/few rich entries earning
// real visual weight), not the dense numbered-row grammar used for
// certificates: `achievements` are sub-points within one entry, not
// sibling entities being enumerated, so they render as a dash-marker list
// (the same language as Hero's "Available For" rail) rather than numbered.
export const experience = [
  {
    organization: 'Deanship of Information Technology — Umm Al-Qura University',
    role: 'Cooperative Training',
    period: 'Mar 2025 – Aug 2025',
    location: 'Makkah',
    achievements: [
      'Led a team building a Device Management App',
      'Built a Power BI dashboard that turns data into decisions',
      'Authored the SRS defining the app\'s requirements and workflow',
      'Documented 200+ computer devices across university labs and colleges',
      'Presented project outcomes to Deanship leadership',
    ],
  },
]

// `primary` are the signature skills for the category (shown with more
// visual weight); `secondary` are the remaining, supporting skills. Every
// skill from the old flat list is preserved across the two arrays. `proof`
// links the category to real evidence: a `slug` anchors straight to the
// matching project card in Projects; omit `slug` for a category with no
// single clean project match and it renders as plain supporting text
// instead of a fabricated link.
export const skills = [
  {
    category: 'AI & Computer Vision',
    primary: ['PyTorch', 'CNNs', 'Grad-CAM'],
    secondary: ['Scikit-learn', 'Transfer Learning', 'Image Classification'],
    proof: { label: 'Pulmonary Edema Detection', slug: 'pulmonary-edema' },
  },
  {
    category: 'Data & BI',
    primary: ['Pandas', 'Power BI', 'EDA'],
    secondary: ['NumPy', 'Excel', 'Data Cleaning', 'Matplotlib'],
    proof: { label: 'Telco Customer Churn Analysis', slug: 'telco-churn' },
  },
  {
    category: 'Tools & Platforms',
    primary: ['Streamlit', 'Firebase', 'Git'],
    secondary: ['GitHub', 'VS Code', 'Jupyter Notebook', 'Google Colab'],
    proof: { label: 'The workflow behind every project here' },
  },
  {
    category: 'Backend & APIs',
    primary: ['FastAPI', 'REST APIs'],
    secondary: [],
    proof: { label: 'Faten — UQU Academic Assistant', slug: 'faten' },
  },
]

// Project screenshots are zero-config: drop responsive WebP variants named
// `{n}-{width}w.webp` (e.g. `1-480w.webp`, `1-1280w.webp`) into a
// `src/assets/projects/{slug}/` subfolder and they show up automatically,
// in numeric order, for the project whose `slug` matches the folder name.
// One subfolder per project keeps the asset tree readable at a glance
// instead of one flat folder of `{slug}-{n}-{width}w` files. No path or
// extension ever needs to be written here. Vite globs the folder at build
// time, so files are hashed/optimized like any other imported asset. All
// screenshots are captured at 16:9 \u2014 height is derived from width
// rather than stored separately.
//
// Two width tiers, deliberately \u2014 480w for mobile, 1280w for
// everything else. A dropped middle 960w tier would have kept almost none
// of the srcset benefit (browsers already choose between the two
// remaining tiers correctly) for a third of the file count; a single
// tier would regress mobile Lighthouse by serving phones the same bytes
// as desktop. Confirmed via a Lighthouse mobile run after the tier
// change (see DESIGN.md) before this became the standing convention.
//
// WebP-only, deliberately: there's no browserslist/analytics data in this
// project indicating any target browser needs a legacy raster fallback, so
// don't reintroduce PNG/JPG originals without revisiting that (see
// DESIGN.md before adding a second format).
//
// `imageAlts` is an optional array of alt text matched by index to the
// discovered images (imageAlts[0] describes {slug}/1-*, etc.) \u2014
// filenames can't carry meaningful alt text, so this is the only place to
// add it. Without an entry, a given image falls back to
// "<project name> \u2014 screenshot <n>".
//
// `images` is a manual override: if a project defines it directly (as an
// array of { src, alt }), that array wins outright and slug-based discovery
// is skipped for that project. Leave both `images` and `slug` unset (or no
// matching files on disk) to show the terminal-style placeholder. One
// resolved image renders plainly; two or more auto-cycle on hover/focus
// (or via tap dots on touch) -- every project card uses this same media
// grammar now, there's no separate flagship treatment.
const ASPECT_RATIO = 9 / 16

const projectImageModules = import.meta.glob('./assets/projects/*/*.webp', {
  eager: true,
  import: 'default',
})

const projectImagesBySlug = {}
for (const [path, url] of Object.entries(projectImageModules)) {
  const parts = path.split('/')
  const filename = parts.pop()
  const slug = parts.pop()
  const match = filename.match(/^(\d+)-(\d+)w\.webp$/)
  if (!match) continue
  const [, order, width] = match
  const bucket = (projectImagesBySlug[slug] ??= [])
  const orderNum = Number(order)
  let entry = bucket.find((e) => e.order === orderNum)
  if (!entry) {
    entry = { order: orderNum, variants: [] }
    bucket.push(entry)
  }
  entry.variants.push({ width: Number(width), url })
}
for (const slug in projectImagesBySlug) {
  projectImagesBySlug[slug].sort((a, b) => a.order - b.order)
  for (const entry of projectImagesBySlug[slug]) {
    entry.variants.sort((a, b) => a.width - b.width)
  }
}

export const projects = [
  {
    name: 'Telco Customer Churn Analysis',
    subtitle: 'End-to-end Analysis \u00b7 Power BI Dashboard + ML Model',
    category: 'Data Analysis \u00b7 Machine Learning',
    description:
      'An end-to-end churn analysis on 7,043 telecom customers: data cleaned in Power Query, explored through a three-page Power BI dashboard, and modeled with logistic regression reaching 0.849 AUC and 78% recall on churners. The dashboard and the model independently traced the 26.5% churn rate to the same drivers \u2014 contract type, fiber internet, electronic check payment, and low tenure \u2014 and the model surfaced one the manual analysis missed.',
    slug: 'telco-churn',
    tags: ['Python', 'pandas', 'scikit-learn', 'Power BI', 'Power Query', 'Excel', 'Jupyter'],
    github: 'https://github.com/hisham-cs/telco-churn-analysis',
    demo: '',
    status: 'Completed',
    imageAlts: [
      'Power BI dashboard overview page \u2014 churn rate and customer segments',
      'Power BI dashboard drivers page \u2014 churn broken down by contract type, internet service, and payment method',
      'ROC curve for the logistic regression churn model, AUC 0.849',
      'Logistic regression coefficients ranked by impact on churn probability',
    ],
  },
  {
    name: 'Faten \u2014 UQU Academic Assistant',
    subtitle: 'Graduation Project | Full-stack Academic Assistant',
    category: 'AI Systems \u00b7 Full-Stack',
    icon: 'chat',
    description:
      'An AI-powered academic assistant that helps students access university services, ask academic questions, manage study plans, calculate GPA, and organize their academic workflow in one platform.',
    slug: 'faten',
    tags: ['OpenAI API', 'FastAPI', 'Firebase', 'Next.js', 'Academic Assistant'],
    github: 'https://github.com/Saleh67676/Faten.git',
    demo: '',
    status: 'Completed',
  },
  {
    name: 'Pulmonary Edema Detection',
    subtitle: 'Medical AI System for Chest X-ray Classification',
    category: 'Computer Vision · Medical AI',
    icon: 'medical',
    description:
      'A medical imaging AI system that classifies chest X-ray images and provides Grad-CAM visual explanations to support model interpretability.',
    slug: 'pulmonary-edema',
    tags: ['PyTorch', 'CNNs', 'Transfer Learning', 'Grad-CAM', 'Streamlit', 'Medical Imaging'],
    github: 'https://github.com/hisham-cs/AI-Pulmonary-Edema-Detector.git',
    demo: 'https://ai-pulmonary-edema-detector-n2mdhebrvfowgvbobyfo4j.streamlit.app/',
    status: 'Completed',
  },
  {
    name: 'Smart Complaint System',
    subtitle: 'RAG-based IT Support Chatbot',
    category: 'Machine Learning · RAG / LLM Systems',
    icon: 'support',
    description:
      'A domain-specific chatbot for university IT support that understands user complaints, searches verified solutions using similarity search, and provides accurate responses or escalates unresolved cases for human review.',
    slug: 'smart-complaint',
    tags: ['Python', 'LLMs', 'RAG', 'OpenAI API', 'Similarity Search', 'Gradio'],
    github: 'https://github.com/Saleh67676/Smart-Complaint-System.git',
    demo: '',
    status: 'Completed',
  },
]

// Resolves a project's media to an array of { src, srcSet, width, height,
// alt }: an explicit `images` override wins if present, otherwise falls
// back to whatever was auto-discovered in src/assets/projects/ for `slug`,
// otherwise empty (placeholder). `src`/`width`/`height` are the largest
// discovered variant (the fallback for browsers that ignore `srcSet`);
// `srcSet` lists every width so the browser can pick the smallest one that
// satisfies the `sizes` the caller renders it at.
export function getProjectImages(project) {
  if (project.images?.length) return project.images

  const discovered = project.slug ? projectImagesBySlug[project.slug] : undefined
  if (discovered?.length) {
    return discovered.map(({ variants }, i) => {
      const largest = variants[variants.length - 1]
      return {
        src: largest.url,
        srcSet: variants.map((v) => `${v.url} ${v.width}w`).join(', '),
        width: largest.width,
        height: Math.round(largest.width * ASPECT_RATIO),
        alt: project.imageAlts?.[i] || `${project.name} \u2014 screenshot ${i + 1}`,
      }
    })
  }

  return []
}


// `link` is an optional credential/verification URL — when present,
// Education renders a "Verify →" link on that certificate's card.
//
// Order is signal-based, not chronological: KAUST Academy and SDAIA carry
// the most recognition for Saudi AI recruiters, so they lead regardless of
// year. Each row still shows its own year so that ordering reads as
// intentional rather than an accident of data entry.
export const certificates = [
  {
    title: 'Advanced Artificial Intelligence',
    issuer: 'KAUST Academy',
    year: '2026',
    link: '',
  },
  {
    title: 'Introduction to Artificial Intelligence',
    issuer: 'KAUST Academy',
    year: '2026',
    link: '',
  },
  {
    title: 'Fundamentals of Artificial Intelligence',
    issuer: 'SDAIA',
    year: '2025',
    link: '',
  },
  {
    title: 'Mathematics for Machine Learning and Data Science',
    issuer: 'DeepLearning.AI',
    year: '2025',
    link: '',
  },
  {
    title: 'Data Analytics Bootcamp (Power BI & Excel)',
    issuer: 'Hash Plus',
    year: '2026',
    link: '',
  },
  {
    title: 'Python Data Fundamentals',
    issuer: 'DataCamp',
    year: '2025',
    link: '',
  },
]

// Credentials gallery — Education's third zone, a horizontally scrollable
// strip of scanned evidence (certificate images now, recommendation
// letters once professor permission is granted). `type` is the only field
// distinguishing the two ('certificate' | 'letter'); a letter appends as a
// plain new entry with zero schema or component changes.
//
// Deliberately a separate array from `certificates` above, not a shared
// one: `certificates` is the complete text ledger (all six, including the
// two with no scanned image yet); `credentials` is only the subset with
// real artwork to show, and a letter is not a certificate. `slug` drives
// image discovery via `getCredentialImage` below — an entry with no
// matching files simply doesn't render in the gallery, so adding metadata
// here ahead of the actual image files (as with the two certificates below
// still pending scans) is safe.
export const credentials = [
  {
    slug: 'kaust-advanced-ai',
    type: 'certificate',
    title: 'Advanced Artificial Intelligence',
    issuer: 'KAUST Academy',
    year: '2026',
  },
  {
    slug: 'kaust-intro-ai',
    type: 'certificate',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'KAUST Academy',
    year: '2026',
  },
  {
    slug: 'sdaia-fundamentals-ai',
    type: 'certificate',
    title: 'Fundamentals of Artificial Intelligence',
    issuer: 'SDAIA',
    year: '2025',
  },
  {
    slug: 'deeplearning-ai-math-ml',
    type: 'certificate',
    title: 'Mathematics for Machine Learning and Data Science',
    issuer: 'DeepLearning.AI',
    year: '2025',
  },
]

// Unlike project screenshots (fixed 16:9, so height is derivable from
// width alone), credentials mix landscape certificates and portrait
// letters — no single aspect ratio holds. Both dimensions are read
// straight from the filename instead: `thumb-{w}x{h}.webp` and
// `full-{w}x{h}.webp`, dropped into a `src/assets/credentials/{slug}/`
// subfolder — one subfolder per credential, same readability reasoning as
// the per-project subfolders above. An entry only appears in the gallery
// once both tiers exist for its slug.
const credentialImageModules = import.meta.glob('./assets/credentials/*/*.webp', {
  eager: true,
  import: 'default',
})

const credentialImagesBySlug = {}
for (const [path, url] of Object.entries(credentialImageModules)) {
  const parts = path.split('/')
  const filename = parts.pop()
  const slug = parts.pop()
  const match = filename.match(/^(thumb|full)-(\d+)x(\d+)\.webp$/)
  if (!match) continue
  const [, tier, width, height] = match
  const bucket = (credentialImagesBySlug[slug] ??= {})
  bucket[tier] = { url, width: Number(width), height: Number(height) }
}

// Returns { thumb: {url,width,height}, full: {url,width,height} } for a
// credential, or null if either tier hasn't been dropped into
// src/assets/credentials/ yet.
export function getCredentialImage(credential) {
  const found = credential.slug ? credentialImagesBySlug[credential.slug] : undefined
  if (!found?.thumb || !found?.full) return null
  return found
}
