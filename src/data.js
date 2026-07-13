export const profile = {
  name: 'Hisham Al-Malki',
  title: 'Data Analyst | AI Engineer',
  intro: 'A portfolio of my work, skills, and journey in technology.',
  github: 'https://github.com/hisham-cs',
  linkedin: 'https://www.linkedin.com/in/hisham-a-almalki',
  email: 'hasalmalki@outlook.com',
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

// Focus-area ledger rendered alongside the About bio.
export const aboutHighlights = [
  {
    title: 'Data Analytics',
    icon: 'data',
    text: 'Turning raw data into dashboards, insights, and clear decisions using Python, SQL, and BI tools.',
  },
  {
    title: 'Computer Vision',
    icon: 'vision',
    text: 'Working with image classification, medical imaging, segmentation, and model evaluation.',
  },
  {
    title: 'Software & AI Systems',
    icon: 'ai',
    text: 'Building practical tools such as academic assistants, support chatbots, prediction systems, and automation workflows.',
  },
]

export const about = [
  `I'm Hisham Al-Malki, a Computer Science graduate from Umm Al-Qura University. I enjoy building practical technology solutions that turn ideas into usable tools, especially in software, AI systems, and data analysis.`,
  `My work includes academic assistants, medical image classification, support chatbots, and analytics workflows. I focus on understanding the problem, building a clear solution, testing it, and improving it step by step.`,
]

// Editorial pull-quote for the About section — a distinct statement of
// working values, not a repeat of the surrounding paragraphs.
export const aboutQuote = `Turning data into decisions and ideas into software.`

export const education = {
  university: 'Umm Al-Qura University',
  degree: 'Bachelor of Computer Science',
  college: 'College of Computers',
  graduation: 'Graduated: 2026',
  gpa: '3.48 / 4.0',
  honours: 'Second Class Honours',
}

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
    icon: 'ai',
    primary: ['PyTorch', 'CNNs', 'Grad-CAM'],
    secondary: ['Scikit-learn', 'Transfer Learning', 'Image Classification'],
    proof: { label: 'Pulmonary Edema Detection', slug: 'pulmonary-edema' },
  },
  {
    category: 'Data & BI',
    icon: 'data',
    primary: ['Pandas', 'Power BI', 'EDA'],
    secondary: ['NumPy', 'Excel', 'Data Cleaning', 'Matplotlib'],
    proof: { label: 'Applied across every project’s data layer' },
  },
  {
    category: 'Tools & Platforms',
    icon: 'tools',
    primary: ['Streamlit', 'Firebase', 'Git'],
    secondary: ['GitHub', 'VS Code', 'Jupyter Notebook', 'Google Colab'],
    proof: { label: 'Pulmonary Edema Detection', slug: 'pulmonary-edema' },
  },
  {
    category: 'Backend & APIs',
    icon: 'backend',
    primary: ['FastAPI', 'REST APIs'],
    secondary: [],
    proof: { label: 'Faten — UQU Academic Assistant', slug: 'faten' },
  },
]

// Project screenshots are zero-config: drop files named `{slug}-1.jpg`,
// `{slug}-2.png` (any extension, mixed extensions are fine) into
// src/assets/projects/ and they show up automatically, in numeric order,
// for the project whose `slug` matches. No path or extension ever needs to
// be written here. Vite globs the folder at build time, so files are
// hashed/optimized like any other imported asset.
//
// `imageAlts` is an optional array of alt text matched by index to the
// discovered images (imageAlts[0] describes {slug}-1, etc.) \u2014 filenames
// can't carry meaningful alt text, so this is the only place to add it.
// Without an entry, a given image falls back to
// "<project name> \u2014 screenshot <n>".
//
// `images` is a manual override: if a project defines it directly (as an
// array of { src, alt }), that array wins outright and slug-based discovery
// is skipped for that project. Leave both `images` and `slug` unset (or no
// matching files on disk) to show the terminal-style placeholder. One
// resolved image renders plainly (no carousel chrome); two or more render
// as a carousel with arrows, a position counter, and swipe/keyboard nav.
const projectImageModules = import.meta.glob('./assets/projects/*.{png,jpg,jpeg,webp,gif,avif,svg}', {
  eager: true,
  import: 'default',
})

const projectImagesBySlug = {}
for (const [path, url] of Object.entries(projectImageModules)) {
  const filename = path.split('/').pop()
  const match = filename.match(/^(.+)-(\d+)\.[^.]+$/)
  if (!match) continue
  const [, slug, order] = match
  ;(projectImagesBySlug[slug] ??= []).push({ order: Number(order), url })
}
for (const slug in projectImagesBySlug) {
  projectImagesBySlug[slug].sort((a, b) => a.order - b.order)
}

export const projects = [
  {
    name: 'Faten \u2014 UQU Academic Assistant',
    subtitle: 'Graduation Project | Full-stack Academic Assistant',
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

// Resolves a project's media to an array of { src, alt }: an explicit
// `images` override wins if present, otherwise falls back to whatever was
// auto-discovered in src/assets/projects/ for `slug`, otherwise empty
// (placeholder).
export function getProjectImages(project) {
  if (project.images?.length) return project.images

  const discovered = project.slug ? projectImagesBySlug[project.slug] : undefined
  if (discovered?.length) {
    return discovered.map(({ url }, i) => ({
      src: url,
      alt: project.imageAlts?.[i] || `${project.name} \u2014 screenshot ${i + 1}`,
    }))
  }

  return []
}


// `link` is an optional credential/verification URL — when present,
// Education renders a "Verify →" link on that certificate's card.
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
    title: 'Data Analytics Bootcamp (Power BI & Excel)',
    issuer: 'Hash Plus',
    year: '2026',
    link: '',
  },
  {
    title: 'Mathematics for Machine Learning and Data Science',
    issuer: 'DeepLearning.AI',
    year: '2025',
    link: '',
  },
  {
    title: 'Python Data Fundamentals',
    issuer: 'DataCamp',
    year: '2025',
    link: '',
  },
  {
    title: 'Fundamentals of Artificial Intelligence',
    issuer: 'SDAIA',
    year: '2025',
    link: '',
  },
]
