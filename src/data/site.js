import { natural } from './images.js'

export const profile = {
  name: 'Hisham Almalki',
  first: 'Hisham',
  last: 'Almalki',
  intro:
    'I’m a Computer Science graduate of Umm Al-Qura University. I take a problem from raw data to a model to a product people use, and I’m looking for a role in tech where I can work across all three.',
  fact: 'Based in Makkah. BSc Computer Science, Umm Al-Qura University, 2026.',
  email: 'hasalmalki@outlook.com',
  linkedin: 'https://www.linkedin.com/in/hisham-a-almalki',
  github: 'https://github.com/hisham-cs',
  cv: 'assets/cv/hisham-almalki-cv.pdf', // resolved against the site's base path
}

// Skills, grouped as the CV groups them. Each points at the exact stages that
// show it, as `{projectId}-{stage}` or an id from `otherEvidence`.
// Anything without evidence goes in `untraced`, so it is listed but never
// lights an empty result.
export const skillGroups = [
  {
    name: 'Data and BI',
    skills: [
      ['Excel', ['telco-data']],
      ['Power Query', ['telco-data']],
      ['Power BI', ['telco-product', 'coop']],
      ['pandas', ['telco-model']],
      ['NumPy', ['telco-model', 'edema-data']],
      ['Matplotlib', ['telco-model']],
      ['Data cleaning', ['telco-data', 'edema-data']],
      ['Data visualization', ['telco-product', 'telco-model', 'edema-product']],
    ],
  },
  {
    name: 'Machine learning and AI',
    skills: [
      ['Python', ['telco-model', 'edema-data', 'edema-model', 'edema-product', 'faten-model']],
      ['scikit-learn', ['telco-model']],
      ['PyTorch', ['edema-model']],
      ['CNNs', ['edema-model']],
      ['Computer vision', ['edema-data', 'edema-model', 'edema-product']],
      ['Grad-CAM', ['edema-model', 'edema-product']],
      ['LLM APIs', ['faten-model', 'edema-data']],
    ],
  },
  {
    name: 'Tools and engineering',
    skills: [
      ['Firebase', ['faten-data', 'coop']],
      ['Git and GitHub', ['*']], // every project is versioned on GitHub
      ['Jupyter', ['telco-model']],
    ],
  },
]

export const untraced = {
  label: 'Also',
  text: 'SQL. Leadership, problem solving, adaptability, technical presentations and team collaboration.',
}

export const about = {
  facts: [
    ['Based in', 'Makkah, Saudi Arabia'],
    ['Languages', 'Arabic, English'],
    ['Graduated', 'June 2026'],
  ],
  paragraphs: [
    'I studied Computer Science at Umm Al-Qura University, and the work I enjoy is the whole of a problem: getting messy data into shape, choosing and testing a model, and building the thing people actually use. So far that has meant customer records, chest X-rays, and the regulations and records behind a university’s students.',
    'I’m looking for a role in tech where I can work across data, models and the products built on them.',
  ],
  experience: {
    title: 'Cooperative training, Deanship of Information Technology, Umm Al-Qura University',
    when: 'March 2025 to August 2025, Makkah',
    points: [
      'Led a four-member trainee team prototyping a mobile app to replace Google Forms for lab device inspections, addressing duplicate records and limited progress tracking.',
      'Built the Firebase database components and connected them to the app: device records, lab progress and assigned tasks.',
      'Co-authored the software requirements specification and presented the prototype to Deanship leadership.',
      'Built a Power BI report on student withdrawals, identifying the colleges and nationalities with the most withdrawals.',
      'Inventoried more than 200 computers across university labs during a rotation with the Labs Department.',
    ],
  },
  education: {
    title: 'BSc Computer Science, College of Computers, Umm Al-Qura University',
    when: 'August 2022 to June 2026, Makkah',
    points: ['GPA 3.48 / 4.00, Second Class Honours.', 'Graduation project: Faten, above.'],
  },
}

// The certification leads; courses follow. `verifyUrl` is the one field to
// fill when a verification link exists. A course image shows only when
// `image` is set AND `publish` is true; set `publish` after checking the scan
// for personal data (see README "Certificates").
export const certification = {
  title: 'Generative AI LLMs',
  credential: 'NVIDIA-Certified Associate (NCA-GENL)',
  issuer: 'NVIDIA',
  date: 'October 2026',
  validThrough: 'October 2028',
  verifyUrl: '',
  image: natural('nvidia-genl', 989 / 1280),
  alt: 'NVIDIA-Certified Associate: Generative AI LLMs certificate issued to Hisham Almalki, October 13, 2026',
}

// `ratio` is height / width of the scan; `verifyUrl` comes from the
// certificate itself (printed link or its QR code).
export const courses = [
  {
    title: 'Artificial Intelligence Program', issuer: 'KAUST Academy',
    imageName: 'kaust-ai-program', ratio: 1364 / 1930, publish: true, verifyUrl: '',
  },
  {
    title: 'Data Science and Machine Learning with Python', issuer: 'Tuwaiq Academy',
    imageName: 'tuwaiq-ds-ml', ratio: 746 / 1057, publish: true, verifyUrl: '',
  },
  {
    title: 'Data Analytics Bootcamp', issuer: 'ATHAR Academy',
    imageName: 'athar-data-analytics', ratio: 906 / 1280, publish: true,
    verifyUrl: 'https://learn.atharhubs.com/certificates/ATHAR-DA-ACH-2026-000027',
  },
  {
    title: 'Fundamentals of Artificial Intelligence', issuer: 'SDAIA',
    imageName: 'sdaia-ai-fundamentals', ratio: 905 / 1280, publish: true,
    verifyUrl: 'https://learn.samai.futurex.sa/mod/customcert/verify_certificate.php?code=pi1Qthhj67&qrcode=1',
  },
]

export const credits = [
  {
    what: 'Chest radiograph of a lung with Kerley B lines',
    who: 'Mikael Häggström',
    licence: 'CC0',
    href: 'https://commons.wikimedia.org/wiki/File:Chest_radiograph_of_a_lung_with_Kerley_B_lines.jpg',
  },
]
