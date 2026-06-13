// ─────────────────────────────────────────────────────────────
// Edit this file to personalize your portfolio.
// All sections read their content from here.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Hisham Al-Malki',
  title: 'Computer Science Student | AI/ML & Data Analysis',
  intro:
    'I build practical AI and data-driven systems, including medical imaging models, academic assistants, computer-vision pipelines, and analytics dashboards. My focus is solving real problems with machine learning, data analysis, and applied AI.',
  // TODO: replace with your real links and email.
  github: 'https://github.com/hisham-cs',
  linkedin: 'https://www.linkedin.com/in/hisham-almalki-5b618737a/',
  email: 'hasalmalki@outlook.com',
  // CV — set showCv to true and place your file at public/cv.pdf to re-enable the download button.
  showCv: false,
  cv: 'cv.pdf',
}

export const stats = [
  { value: '4+', label: 'Projects' },
  { value: '2026', label: 'Graduate' },
  { value: 'AI/ML', label: 'Focus' },
]

// Shown as chips on the hero profile card.
export const focusAreas = ['Computer Vision', 'Data Analysis', 'Applied AI']

// Structured data for the hero profile card.
export const heroCard = {
  seeking: ['AI/Data Internships', 'AI/Data Roles'],
  bestWork: ['Medical Imaging AI', 'Academic Assistant', 'Car Damage Assessment'],
}

// Small value cards rendered under the About paragraphs.
export const aboutHighlights = [
  {
    title: 'AI Systems',
    icon: 'ai',
    text: 'Building practical AI tools such as academic assistants, prediction systems, and automation workflows.',
  },
  {
    title: 'Computer Vision',
    icon: 'vision',
    text: 'Working with image classification, medical imaging, segmentation, and model evaluation.',
  },
  {
    title: 'Data Analytics',
    icon: 'data',
    text: 'Turning raw data into dashboards, insights, and measurable decisions using Python, SQL, and BI tools.',
  },
]

export const about = [
  `I'm Hisham, a Computer Science student at Umm Al-Qura University. I'm interested in building AI and data solutions that move beyond experiments and become tools people can actually use.`,
  `My approach is practical: start from a real problem, build a focused solution, evaluate it clearly, and improve it step by step. I'm working toward a career in AI and data, with a strong interest in computer vision, applied machine learning, and analytics.`,
]

export const education = {
  university: 'Umm Al-Qura University',
  degree: 'Bachelor of Computer Science',
  college: 'College of Computer and Information Systems',
  graduation: 'Expected Graduation: 2026',
}

export const skills = [
  {
    category: 'Core Skills',
    icon: 'core',
    items: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Data Analysis',
      'Model Evaluation',
    ],
  },
  {
    category: 'AI / ML',
    icon: 'ai',
    items: [
      'PyTorch',
      'Scikit-learn',
      'CNNs',
      'Transfer Learning',
      'Image Classification',
      'Grad-CAM',
      'LLMs',
      'OpenAI API',
    ],
  },
  {
    category: 'Data & BI',
    icon: 'data',
    items: ['Pandas', 'NumPy', 'SQL', 'Power BI', 'Excel', 'Matplotlib', 'EDA', 'Data Cleaning'],
  },
  {
    category: 'Tools & Platforms',
    icon: 'tools',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Jupyter Notebook',
      'Google Colab',
      'Hugging Face',
      'Streamlit',
      'Firebase',
    ],
  },
  {
    category: 'Backend / APIs',
    icon: 'backend',
    items: ['FastAPI', 'REST APIs', 'JSON', 'Basic OOP'],
  },
]

export const projects = [
  {
    name: 'Faten',
    subtitle: 'AI Academic Assistant for Umm Al-Qura University Students',
    icon: 'chat',
    description:
      'An AI-powered academic assistant that helps students access university services, ask academic questions, manage study plans, calculate GPA, and organize their academic workflow in one platform.',
    image: '', // optional: path to a screenshot in public/ (e.g. 'screenshots/faten.png')
    tags: ['OpenAI API', 'FastAPI', 'Firebase', 'Next.js', 'Academic Assistant'],
    github: 'https://github.com/your-username/faten',
    demo: '', // add a live URL to show a "Live Demo" button
    status: 'In Progress',
    featured: false,
  },
  {
    name: 'Pulmonary Edema Detection',
    subtitle: 'Deep Learning System for Chest X-ray Classification',
    icon: 'medical',
    description:
      'A medical imaging application that detects pulmonary edema from chest X-ray images using an ensemble of CNN models, with Grad-CAM heatmaps to explain model predictions.',
    image: '',
    tags: ['PyTorch', 'CNNs', 'Transfer Learning', 'Grad-CAM', 'Streamlit', 'Medical Imaging'],
    github: 'https://github.com/your-username/pulmonary-edema-detection',
    demo: 'https://ai-pulmonary-edema-detector-n2mdhebrvfowgvbobyfo4j.streamlit.app/',
    status: 'Completed',
    featured: true,
  },
  {
    name: 'Car Damage Assessment',
    subtitle: 'Computer Vision Pipeline for Vehicle Damage Analysis',
    icon: 'car',
    description:
      'A computer-vision project that detects vehicle damage and identifies affected car parts from images, aiming to support automated inspection and damage assessment workflows.',
    image: '',
    tags: ['YOLO', 'Computer Vision', 'Segmentation', 'Python', 'Damage Detection'],
    github: 'https://github.com/your-username/car-damage-assessment',
    demo: '',
    status: 'Prototype',
    featured: false,
  },
  {
    name: 'Data Analytics Dashboard',
    subtitle: 'Business Insights Dashboard using Python and Power BI',
    icon: 'dashboard',
    description:
      'An analytics workflow that transforms raw data into clear insights through data cleaning, EDA, SQL-style analysis, and interactive Power BI dashboards.',
    image: '',
    tags: ['Python', 'Pandas', 'SQL', 'Power BI', 'Excel', 'EDA'],
    github: 'https://github.com/your-username/data-analytics-dashboard',
    demo: '',
    status: 'Completed',
    featured: false,
  },
]

// Set status to 'In Progress' for any certificate you haven't finished yet —
// it will show an "In Progress" badge instead of the year.
export const certificates = [
  {
    name: 'KAUST Academy — Advanced AI Track',
    issuer: 'KAUST Academy · 2025',
    year: '2025',
    status: 'Completed',
    link: '', // optional — add a credential URL when available
  },
  {
    name: 'Data Analytics Bootcamp — Power BI & Excel',
    issuer: 'Data Analytics Bootcamp · 2025',
    year: '2025',
    status: 'Completed',
    link: '',
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'Coursera · DeepLearning.AI',
    year: '2024',
    status: 'In Progress',
    link: '',
  },
]
