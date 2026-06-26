// ─────────────────────────────────────────────────────────────
// Edit this file to personalize your portfolio.
// All sections read their content from here.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Hisham Al-Malki',
  title: 'Computer Science Graduate | AI & Data Analysis',
  intro:
    'I\u2019m a Computer Science graduate interested in building practical software, AI, and data-driven solutions. I enjoy turning ideas into usable products, from academic assistants and medical AI systems to support tools and automation workflows.',
  // TODO: replace with your real links and email.
  github: 'https://github.com/hisham-cs',
  linkedin: 'https://www.linkedin.com/in/hisham-a-almalki',
  email: 'hasalmalki@outlook.com',
  // CV — set showCv to true and place your file at public/cv.pdf to re-enable the download button.
  showCv: false,
  cv: 'cv.pdf',
}

export const stats = [
  { value: '3', label: 'Projects' },
  { value: '2026', label: 'Graduate' },
  { value: 'Tech', label: 'Focus' },
]

// Shown as chips on the hero profile card.
export const focusAreas = ['Software Development', 'AI Systems', 'Data Analytics']

// Structured data for the hero profile card.
export const heroCard = {
  seeking: ['AI/Data Roles', 'Internships', 'Collaborations'],
  bestWork: ['Faten Academic Assistant', 'Pulmonary Edema Detection', 'Smart Complaint System'],
}

// Small value cards rendered under the About paragraphs.
export const aboutHighlights = [
  {
    title: 'Software & AI Systems',
    icon: 'ai',
    text: 'Building practical tools such as academic assistants, support chatbots, prediction systems, and automation workflows.',
  },
  {
    title: 'Computer Vision',
    icon: 'vision',
    text: 'Working with image classification, medical imaging, segmentation, and model evaluation.',
  },
  {
    title: 'Data Analytics',
    icon: 'data',
    text: 'Turning raw data into dashboards, insights, and clear decisions using Python, SQL, and BI tools.',
  },
]

export const about = [
  `I'm Hisham Al-Malki, a Computer Science graduate from Umm Al-Qura University. I enjoy building practical technology solutions that turn ideas into usable tools, especially in software, AI systems, and data analysis.`,
  `My work includes academic assistants, medical image classification, support chatbots, and analytics workflows. I focus on understanding the problem, building a clear solution, testing it, and improving it step by step.`,
]

export const education = {
  university: 'Umm Al-Qura University',
  degree: 'Bachelor of Computer Science',
  college: 'College of Computers',
  graduation: 'Graduated: 2026',
}

export const skills = [
  {
    category: 'Core Skills',
    icon: 'core',
    items: [
      'Python',
      'SQL',
      'Data Analysis',
      'Machine Learning',
      'Problem Solving',
      'Model Evaluation',
    ],
  },
  {
    category: 'AI & Computer Vision',
    icon: 'ai',
    items: [
      'PyTorch',
      'Scikit-learn',
      'CNNs',
      'Transfer Learning',
      'Image Classification',
      'Grad-CAM',
    ],
  },
  {
    category: 'Data & BI',
    icon: 'data',
    items: ['Pandas', 'NumPy', 'Power BI', 'Excel', 'EDA', 'Data Cleaning', 'Matplotlib'],
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
      'Streamlit',
      'Firebase',
    ],
  },
  {
    category: 'Backend & APIs',
    icon: 'backend',
    items: ['FastAPI', 'REST APIs', 'JSON', 'OOP Fundamentals'],
  },
]

export const projects = [
  {
    name: 'Faten \u2014 UQU Academic Assistant',
    subtitle: 'Graduation Project | Full-stack Academic Assistant',
    icon: 'chat',
    description:
      'An AI-powered academic assistant that helps students access university services, ask academic questions, manage study plans, calculate GPA, and organize their academic workflow in one platform.',
    image: '', // optional: path to a screenshot in public/ (e.g. 'screenshots/faten.png')
    tags: ['OpenAI API', 'FastAPI', 'Firebase', 'Next.js', 'Academic Assistant'],
    github: 'https://github.com/your-username/faten',
    demo: '', // add a live URL to show a "Live Demo" button
    status: 'Completed',
  },
  {
    name: 'Pulmonary Edema Detection',
    subtitle: 'Medical AI System for Chest X-ray Classification',
    icon: 'medical',
    description:
      'A medical imaging AI system that classifies chest X-ray images and provides Grad-CAM visual explanations to support model interpretability.',
    image: '',
    tags: ['PyTorch', 'CNNs', 'Transfer Learning', 'Grad-CAM', 'Streamlit', 'Medical Imaging'],
    github: 'https://github.com/your-username/pulmonary-edema-detection',
    demo: 'https://ai-pulmonary-edema-detector-n2mdhebrvfowgvbobyfo4j.streamlit.app/',
    status: 'Completed',
  },
  {
    name: 'Smart Complaint System',
    subtitle: 'RAG-based IT Support Chatbot',
    icon: 'support',
    description:
      'A domain-specific chatbot for university IT support that understands user complaints, searches verified solutions using similarity search, and provides accurate responses or escalates unresolved cases for human review.',
    image: '',
    tags: ['Python', 'LLMs', 'RAG', 'OpenAI API', 'Similarity Search', 'Gradio'],
    github: 'https://github.com/Saleh67676/Smart-Complaint-System.git',
    demo: '',
    status: 'Completed',
  },
]

// Set status to 'In Progress' for any certificate you haven't finished yet —
// it will show an "In Progress" badge instead of the year.
export const certificates = [
  {
    name: 'KAUST Academy — Advanced Artificial Intelligence',
    issuer: 'KAUST Academy · 2026',
    year: '2026',
    status: 'Completed',
    link: '', // optional — add a credential URL when available
  },
  {
    name: 'KAUST Academy — Introduction to Artificial Intelligence',
    issuer: 'KAUST Academy · 2026',
    year: '2026',
    status: 'Completed',
    link: '',
  },
  {
    name: 'Hash Plus — Data Analytics Bootcamp',
    issuer: 'Power BI & Excel · 2026',
    year: '2026',
    status: 'Completed',
    link: '',
  },
  {
    name: 'DeepLearning.AI — Mathematics for ML and Data Science',
    issuer: 'DeepLearning.AI · 2025',
    year: '2025',
    status: 'Completed',
    link: '',
  },
  {
    name: 'DataCamp — Python Data Fundamentals',
    issuer: 'DataCamp · 2025',
    year: '2025',
    status: 'Completed',
    link: '',
  },
  {
    name: 'SDAIA — Fundamentals of Artificial Intelligence',
    issuer: 'SDAIA · 2025',
    year: '2025',
    status: 'Completed',
    link: '',
  },
]
