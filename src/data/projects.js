import { screenshot, natural } from './images.js'

// Edema imagery all derives from one CC0 radiograph (credited in site.js):
// the X-ray itself, the app's own Grad-CAM overlay from each model for it
// (pixel-aligned with the X-ray), and two app screenshots with that same
// X-ray loaded. Probabilities are the app's sidebar values for this one
// image, not accuracy figures.
const EDEMA_RATIO = 626 / 697
const edemaXray = natural('edema-xray', EDEMA_RATIO)
const edemaCams = [
  { id: 'ensemble', label: 'Ensemble', probability: '95.99%', agreement: 'high' },
  { id: 'densenet121', label: 'DenseNet121', probability: '94.7%' },
  { id: 'efficientnet-b0', label: 'EfficientNet-B0', probability: '99.8%' },
  { id: 'resnet50', label: 'ResNet50', probability: '100.0%' },
  { id: 'convnext-tiny', label: 'ConvNeXt-Tiny', probability: '89.5%' },
].map((m) => ({ ...m, image: natural(`edema-cam-${m.id}`, EDEMA_RATIO) }))
const edemaReport = screenshot('pulmonary-edema', 1, 882 / 1589) // sidebar trimmed by the pipeline
const edemaVotes = screenshot('pulmonary-edema', 2, 883 / 1897)
const edemaVotesFrame = {
  kind: 'image',
  image: edemaVotes,
  alt: 'The app’s per-model votes for the example X-ray: EfficientNet-B0 99.8%, ResNet50 100.0% and ConvNeXt-Tiny 89.5% edema probability, above its research-only disclaimer',
  fill: '#0e1117',
}

const telcoOverview = {
  kind: 'image',
  image: screenshot('telco-churn', 1, 708 / 1270),
  alt: 'Power BI overview page: 26.5% churn rate, 1,869 customers lost, $139K monthly revenue lost',
  fill: '#f2f2f0',
}
const telcoDrivers = {
  kind: 'image',
  image: screenshot('telco-churn', 2, 712 / 1275),
  alt: 'Power BI page “What drives churn”: churn rate by contract and internet service, by payment method and contract, by number of services, and with and without tech support',
  fill: '#f2f2f0',
}
const telcoActions = {
  kind: 'image',
  image: screenshot('telco-churn', 5, 711 / 1262),
  fill: '#f2f2f0',
  alt: 'Power BI page “Where to act first”: lost value by contract and internet service, churners by churn-score band, 88.9% of lost value marked as actionable, lost value by payment method, and the three actions in priority order',
}

const fatenDashboard = {
  kind: 'image',
  image: screenshot('faten', 2, 605 / 1280),
  alt: 'Faten dashboard in Arabic with GPA cards, a GPA trend chart and the university calendar',
  fill: '#ffffff',
}
// The Faten chat and indoor map: badge-free copies of the old site's
// faten-3 and faten-4 screenshots.
const fatenChat = {
  kind: 'image',
  image: screenshot('faten', 3, 646 / 1280),
  alt: 'Faten’s chat in Arabic: the agent answers a question about a course with its grading breakdown and final exam dates',
  fill: '#ffffff',
}
const fatenMap = {
  kind: 'image',
  image: screenshot('faten', 4, 609 / 1280),
  alt: 'Faten’s indoor navigation: a route drawn on the ground-floor map of the faculty building, with the distance and walking time beside it',
  fill: '#e4e6e7',
}

// The three stages every project is shown through. Sections read this list,
// so the "Hand me a problem" chain, the case blocks and the skill map all stay
// in step with it.
export const STAGES = [
  { id: 'data', label: 'Data' },
  { id: 'model', label: 'Model' },
  { id: 'product', label: 'Product' },
]

// ---------------------------------------------------------------------------
// Projects. To add one, append an entry with the same shape; no section needs
// to change. `proof` is the picture the hero shows for the project (else its
// product frame). Frames are one of three kinds:
//   { kind: 'image', image: screenshot(...) | natural(...), alt, fill }
// Images are always shown whole; `fill` is the colour of the image's own edge,
// used wherever a frame is wider or taller than the picture.
//   { kind: 'table', columns: [...], optional?, optionalNarrow?, optionalTiny?, rows: [[...], ...], foot }
//   { kind: 'list', title, items: [...], foot, code?, rtl? }
// `map` holds the short labels for the skill table; `plate` sets the case
// block: `layout` 'zigzag' (each figure beside part of the details),
// 'panel' (the `reveal` slider beside the details) or 'pair' (two figures
// side by side over the details); `split` is how many detail rows go first.
// Facts here are verified against the repositories or owner-stated from the CV.
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: 'telco',
    name: 'Telecom churn',
    kind: 'Analysis, machine learning and BI. Solo project.',
    input: 'A table of 7,043 customers',
    proof: telcoOverview,
    question:
      'Why did 1,869 of 7,043 customers leave a telecom provider, and where should retention start? A public IBM sample dataset, not a client engagement.',
    stages: {
      data: {
        verb: 'Cleaned',
        line: 'Merged and cleaned in Excel and Power Query; leakage columns removed.',
        detail:
          'Cleaned 7,043 customer records in Excel and Power Query. Three target-leakage columns (churn score, churn reason, churn label) were removed, and CLTV was tested in and out of the model and dropped.',
        frame: {
          kind: 'table',
          label: 'First rows of the customer table',
          columns: ['CustomerID', 'Tenure', 'Contract', 'Internet', 'Payment', 'Monthly', 'Churn'],
          optional: ['CustomerID', 'Payment'], // dropped when the frame is narrow, never cut
          optionalNarrow: ['Internet'], // dropped too on narrow frames
          optionalTiny: ['Tenure'], // and on the narrowest (large text on a small phone)
          rows: [
            ['3668-QPYBK', '2', 'Month-to-month', 'DSL', 'Mailed check', '53.85', 'Yes'],
            ['9237-HQITU', '2', 'Month-to-month', 'Fiber optic', 'Electronic check', '70.70', 'Yes'],
            ['9305-CDSKC', '8', 'Month-to-month', 'Fiber optic', 'Electronic check', '99.65', 'Yes'],
            ['7892-POOKP', '28', 'Month-to-month', 'Fiber optic', 'Electronic check', '104.80', 'Yes'],
            ['0280-XJGEX', '49', 'Month-to-month', 'Fiber optic', 'Bank transfer', '103.70', 'Yes'],
          ],
          foot: '7,043 rows · 31 columns · telco.csv',
        },
      },
      model: {
        verb: 'Modelled',
        line: 'Logistic regression: 0.849 ROC-AUC, 78% recall on churners.',
        detail:
          'Logistic regression with class weighting on a stratified 80/20 split: 0.849 ROC-AUC, 0.645 AUC-PR, 78% recall on churners (291 of 374) and 51% precision. Its coefficients confirmed the drivers found in the dashboard.',
        frame: {
          kind: 'image',
          image: screenshot('telco-churn', 4, 1080 / 1920),
          alt: 'Logistic regression coefficients ranked by their effect on churn',
          fill: '#ffffff',
        },
      },
      product: {
        verb: 'Shipped',
        line: 'A three-page Power BI dashboard with DAX.',
        detail:
          'A three-page Power BI dashboard with DAX measures, sizing churn losses at $139K in monthly revenue at a 26.5% churn rate.',
        frame: telcoDrivers, // page 2 here; page 1 leads the hero and the case
      },
    },
    extra: [
      [
        'Finding',
        'Month-to-month fiber-optic customers churn at 54.6% and carry about 60% of the lost lifetime value. Cross-segment analysis separated real drivers from confounded ones.',
      ],
      [
        'Actions',
        'Three, in priority order: move month-to-month fiber customers onto term contracts; bundle tech support into fiber plans (41.6% churn without support, 15.2% with); reach electronic-check payers first.',
      ],
    ],
    myPart: 'Everything; a solo project.',
    stack: 'Excel, Power Query, Power BI, DAX, Python, pandas, scikit-learn, Matplotlib, Jupyter',
    links: [
      { label: 'Repository', href: 'https://github.com/hisham-cs/telco-churn-analysis' },
      { label: 'The notebook', href: 'https://github.com/hisham-cs/telco-churn-analysis/blob/main/churn_model.ipynb' },
    ],
    map: { data: '7,043 customer rows', model: 'Logistic regression', product: 'Power BI dashboard' },
    plate: {
      // Each picture beside the text it supports: page 1 by Data, Model,
      // Product and Finding; page 3 by Actions to Stack. Page 2 and the ROC
      // curve stay out; their numbers are in the text.
      layout: 'zigzag',
      figures: [
        { frame: telcoOverview, caption: 'Dashboard page 1, “Customer churn overview”' },
        {
          frame: telcoActions,
          caption:
            'Dashboard page 3, “Where to act first”. Churn Score is IBM’s pre-computed score: the dashboard uses it to describe customers; the model excludes it as target leakage.',
        },
      ],
      split: 4, // detail rows beside the first picture
    },
  },
  {
    id: 'edema',
    name: 'Edema detector',
    kind: 'Deep learning and a Streamlit app. Team of three.',
    input: 'Chest X-rays',
    question:
      'Can a set of networks flag pulmonary edema on a chest X-ray, and show where they looked? Built for research and education, never for diagnosis.',
    stages: {
      data: {
        verb: 'Assembled',
        line: '10,803 chest X-rays from public sources, contrast-corrected with CLAHE.',
        detail:
          '10,803 chest X-rays assembled from public sources including Kaggle and Radiopaedia, contrast-corrected with CLAHE. An optional GPT-4o check turns away uploads that are not chest X-rays.',
        frame: {
          kind: 'image',
          image: edemaXray,
          alt: 'Chest radiograph with Kerley B lines, a sign of pulmonary edema',
          fill: '#b1b1b1',
        },
      },
      model: {
        verb: 'Modelled',
        line: 'Four CNNs in a soft-voting ensemble; Grad-CAM shows where each looked.',
        detail:
          'DenseNet121 (TorchXRayVision), ResNet50, EfficientNet-B0 and ConvNeXt-Tiny, each fine-tuned for normal versus edema, averaged in a soft-voting ensemble with an agreement indicator and Grad-CAM for every model.',
        frame: edemaVotesFrame,
      },
      product: {
        verb: 'Shipped',
        line: 'A Streamlit app with a heatmap for every prediction.',
        detail: 'A live Streamlit app that classifies an uploaded chest X-ray and explains each prediction with Grad-CAM.',
        frame: {
          kind: 'image',
          image: edemaReport,
          alt: 'The Streamlit app with the example chest X-ray loaded beside its Ensemble Grad-CAM heatmap',
          fill: '#0d1116',
        },
      },
    },
    extra: [
      [
        'Results',
        'The team’s four networks reached 0.974–0.979 ROC-AUC on a held-out test set. A research and education result, not a diagnostic one.',
      ],
    ],
    myPart:
      'Collected and assembled the 10,803 images; fine-tuned DenseNet121 and EfficientNet-B0 in PyTorch with data augmentation; built the soft-voting ensemble of all four models.',
    stack: 'Python, PyTorch, torchvision, TorchXRayVision, timm, OpenCV, NumPy, grad-cam, Streamlit',
    links: [
      { label: 'Repository', href: 'https://github.com/hisham-cs/AI-Pulmonary-Edema-Detector' },
      { label: 'Live app', href: 'https://ai-pulmonary-edema-detector-n2mdhebrvfowgvbobyfo4j.streamlit.app/' },
    ],
    map: { data: '10,803 chest X-rays', model: 'Four CNNs, Grad-CAM', product: 'Streamlit app' },
    plate: {
      layout: 'panel',
      reveal: { base: edemaXray, layers: edemaCams, label: 'Grad-CAM overlay', ratio: EDEMA_RATIO },
      caption:
        'Example input, not training data: “Chest radiograph of a lung with Kerley B lines” by Mikael Häggström, CC0, via Wikimedia Commons. Each heatmap is the app’s own Grad-CAM output for this image.',
    },
  },
  {
    id: 'faten',
    name: 'Faten',
    kind: 'LLM agent and full-stack product. Graduation project, team.',
    input: 'University rules and student records',
    proof: fatenDashboard,
    question:
      'One place for Umm Al-Qura students to ask about the rules, plan a semester and follow their GPA, in Arabic. Piloted at the university’s College of Computers.',
    stages: {
      data: {
        verb: 'Stored',
        line: 'Student records in Firebase, the university’s regulations and its Hijri calendar.',
        detail:
          'Student academic records stored in Firebase, the university’s regulations as searchable text, transcripts parsed from PDF, and the Hijri academic calendar.',
        frame: {
          kind: 'list',
          title: 'backend/knowledge/regulations',
          rtl: true,
          items: [
            ['لائحة الدراسات والاختبارات للمرحلة الجامعية (الجديدة).pdf'],
            ['قواعد حقوق الطلبة بجامعة أم القرى.txt'],
            ['دليل خصائص الخريجين.txt'],
          ],
          foot: 'plus each student’s record in Firebase and transcripts parsed from PDF',
        },
      },
      model: {
        verb: 'Modelled',
        line: 'An LLM agent with 24 function-calling tools over each student’s record.',
        detail:
          'An LLM chat agent with 24 function-calling tools that runs on the OpenAI API (Gemini is supported as an alternative provider).',
        frame: {
          kind: 'list',
          title: 'Agent tools · 24',
          code: true,
          items: [
            ['analyze_transcript'],
            ['get_course_info'],
            ['get_upcoming_exams'],
            ['get_student_data'],
            ['search_regulations'],
            ['predict_gpa_pathway'],
          ],
          foot: 'Function calling on the OpenAI API',
        },
      },
      product: {
        verb: 'Shipped',
        line: 'An Arabic-first Next.js app on a Python backend.',
        detail:
          'A Next.js app with chat, GPA analytics, AI study planning, a Pomodoro timer, transcript import and indoor navigation across 89+ rooms; Python backend with Firebase.',
        frame: fatenMap, // the dashboard leads the hero and the case
      },
    },
    extra: [],
    myPart:
      'Built function-calling tools for the chat agent, including academic performance analysis that finds a student’s strengths and weaknesses from their record, exam date lookup, and course information with grading breakdowns. Built the Firebase components that store and retrieve the student data the agent uses.',
    stack: 'Next.js, React, TypeScript, Python, Firebase, OpenAI API',
    links: [{ label: 'Repository', href: 'https://github.com/Saleh67676/Faten' }],
    map: { data: 'Records, regulations', model: 'LLM agent, 24 tools', product: 'Next.js' },
    plate: {
      // The dashboard and the chat side by side, the same height. Both are
      // landscape screens, so they split 6 : 6 to stay readable.
      layout: 'pair',
      figures: [
        { frame: fatenDashboard, caption: 'Faten dashboard: GPA, progress and the university calendar' },
        { frame: fatenChat, caption: 'The agent answering a course question' },
      ],
      split: 3,
    },
  },
]

// Evidence outside the three projects that a skill can point to.
export const otherEvidence = [
  { id: 'coop', name: 'Co-op training', label: 'Mobile app prototype, Firebase components, Power BI report' },
]
