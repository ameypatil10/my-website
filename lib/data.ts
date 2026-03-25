import type {
  NavLink,
  StatCard,
  ExperienceGroup,
  Skill,
  Publication,
  Award,
  Education,
  GitHubRepo,
} from './types'

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Awards', href: '#awards' },
  { label: 'Open Source', href: '#github' },
]

export const stats: StatCard[] = [
  { numericEnd: 5, suffix: '+', label: 'Years in AI/ML' },
  { numericEnd: 65, suffix: '', label: 'JEE Adv. AIR' },
  { numericEnd: 4, suffix: '', label: 'Top-Tier Publications' },
  { numericEnd: 3, suffix: 'x', label: 'LLM Cost Savings' },
]

export const experience: ExperienceGroup[] = [
  {
    company: 'WizzMe',
    duration: 'Dec 2025 — Present',
    dotColor: 'cyan',
    roles: [
      {
        title: 'Co-Founder & CTO',
        period: 'Dec 2025 — Present · Bangalore',
        description: '',
        projects: [
          { name: 'Core Platform Architecture', detail: '', color: 'cyan' },
          { name: 'Thought Partner AI', detail: '', color: 'indigo' },
        ],
        tags: [
          { label: 'Social Graph', color: 'cyan' },
          { label: 'AI Synthesis' },
          { label: 'Voice-First' },
          { label: 'Personalization', color: 'cyan' },
        ],
      },
    ],
  },
  {
    company: 'Flipkart',
    duration: 'Aug 2020 — Jan 2026 · 5 yrs 6 mos',
    dotColor: 'accent',
    roles: [
      {
        title: 'Senior Data Scientist',
        period: 'Feb 2025 — Jan 2026',
        description: '',
        projects: [
          { name: 'Conversational Search Agent Search-2.0', detail: '', color: 'cyan' },
          { name: 'Search Retrieval Evaluation', detail: '', color: 'indigo' },
        ],
        tags: [
          { label: 'Agentic Search', color: 'cyan' },
          { label: 'GRPO' },
          { label: 'SFT' },
          { label: 'NDCG' },
        ],
      },
      {
        title: 'Data Scientist — III',
        period: 'Oct 2023 — Feb 2025 · 1 yr 5 mos',
        description: '',
        projects: [
          { name: 'FK-GPT Foundational LLM', detail: '8B outperformed GPT-4o-mini; 70B achieved GPT-4o parity on e-commerce. 3x cost savings vs commercial LLMs.', color: 'cyan' },
          { name: 'GenAI Chatbot Flippi', detail: '', color: 'indigo' },
        ],
        tags: [
          { label: 'FK-GPT', color: 'cyan' },
          { label: 'RLHF' },
          { label: 'Ranked DPO' },
          { label: 'Flippi' },
        ],
      },
      {
        title: 'Data Scientist — II',
        period: 'Mar 2022 — Oct 2023 · 1 yr 8 mos',
        description: '',
        projects: [
          { name: 'Domain-Specific BERT Models', detail: '', color: 'cyan' },
          { name: 'NLP Platform', detail: '', color: 'indigo' },
        ],
        tags: [
          { label: 'BERT' },
          { label: 'Multilingual XLM', color: 'cyan' },
          { label: 'NER' },
          { label: 'Voice' },
        ],
      },
      {
        title: 'Data Scientist — I',
        period: 'Aug 2020 — Mar 2022 · 1 yr 8 mos',
        description: '',
        projects: [
          { name: 'Machine Translation Platform', detail: '', color: 'cyan' },
        ],
        tags: [
          { label: 'Translation', color: 'cyan' },
          { label: 'Active Learning' },
          { label: 'Synthetic Data' },
          { label: 'EMNLP' },
        ],
      },
    ],
  },
  {
    company: 'Samsung R&D',
    duration: 'May — Jul 2019',
    dotColor: 'accent',
    roles: [
      {
        title: 'Research Intern',
        period: 'May — Jul 2019 · Bangalore',
        description:
          'Neural Speech-to-Speech Translation. Implemented LSTM encoder + attention-based decoder combining speech recognition, translation, and synthesis.',
        projects: [],
        tags: [
          { label: 'Speech' },
          { label: 'NMT', color: 'cyan' },
          { label: 'LSTM' },
        ],
      },
    ],
  },
  {
    company: 'LTTS — IIT Bombay',
    duration: 'Jul 2019 — Jul 2020',
    dotColor: 'accent',
    roles: [
      {
        title: 'Research Collaborator',
        period: 'Jul 2019 — Jul 2020 · Mumbai',
        description:
          "Chest X-Ray diagnosis using deep learning. Hierarchical multi-label classification with CNNs. Top 30 placement in Stanford's CheXpert Competition.",
        projects: [],
        tags: [
          { label: 'Medical AI', color: 'cyan' },
          { label: 'CNN' },
          { label: 'CheXpert' },
        ],
      },
    ],
  },
]

export const skills: Skill[] = [
  {
    iconName: 'Layers',
    name: 'Large Language Models',
    level: 95,
    levelLabel: 'Expert',
    items: ['RLHF', 'DPO', 'GRPO', 'SFT', 'Synthetic Data', 'Evaluation'],
    highlight: 'FK-GPT',
    highlightAccent: '8B outperformed GPT-4o-mini · 70B on parity with GPT-4o',
  },
  {
    iconName: 'Globe',
    name: 'Natural Language Processing',
    level: 92,
    levelLabel: 'Expert',
    items: ['Machine Translation', 'Semantic Search', 'Classification', 'Summarization'],
    highlight: 'Google & Azure',
    highlightAccent: 'Outperformed on translation',
  },
  {
    iconName: 'MessageSquare',
    name: 'Conversational AI & Search',
    level: 90,
    levelLabel: 'Expert',
    items: ['Search Agents', 'Dialogue', 'Intent Detection', 'Voice'],
    highlight: '+4% NDCG',
    highlightAccent: 'lift · 70% perfect slate results',
  },
  {
    iconName: 'Image',
    name: 'Deep Learning & Vision',
    level: 82,
    levelLabel: 'Advanced',
    items: ['CNNs', 'GANs', 'Object Detection', 'Segmentation'],
    highlight: 'Top 30',
    highlightAccent: 'in CheXpert Competition (Stanford)',
  },
  {
    iconName: 'BarChart3',
    name: 'ML Infrastructure',
    level: 78,
    levelLabel: 'Advanced',
    items: ['Evaluation', 'Active Learning', 'Reward Models', 'Data Gen'],
    highlight: '8M → 400M',
    highlightAccent: 'Scaled data parallel sentences',
  },
  {
    iconName: 'Rocket',
    name: 'Product & Entrepreneurship',
    level: 85,
    levelLabel: 'Expert',
    items: ['AI Products', 'Social Graph', 'Personalization', 'Privacy'],
    highlight: 'WizzMe',
    highlightAccent: 'Architected platform end-to-end',
  },
]

export const publications: Publication[] = [
  {
    venue: 'ACL 2024',
    venueType: 'main',
    year: 2024,
    title: 'One Prompt To Rule Them All: LLMs for Opinion Summary Evaluation',
    authors: 'Amey Patil, Tejpalsingh Siledar, Sudhanshu S. Singh, Muthusamy Chelliah, Nikesh Garera',
    authorHighlight: 'Amey Patil',
    abstract: '',
    link: 'https://aclanthology.org/2024.acl-long.655.pdf',
  },
  {
    venue: 'EMNLP 2022',
    venueType: 'industry',
    year: 2022,
    title: 'Large-scale Machine Translation for Indian Languages in E-commerce under Low Resource Constraints',
    authors: 'Amey Patil, Nikesh Garera',
    authorHighlight: 'Amey Patil',
    abstract: '',
    link: 'https://aclanthology.org/2022.emnlp-industry.64/',
  },
  {
    venue: 'NAACL 2024',
    venueType: 'findings',
    year: 2024,
    title: 'Product Description and QA Assisted Self-Supervised Opinion Summarization',
    authors: 'Amey Patil, Tejpalsingh Siledar, Banerjee, Sudhanshu S. Singh, M. Chelliah, N. Garera, Bhattacharyya',
    authorHighlight: 'Amey Patil',
    abstract: '',
    link: 'https://aclanthology.org/2024.findings-naacl.150/',
  },
  {
    venue: 'EMNLP 2023',
    venueType: 'findings',
    year: 2023,
    title: 'Synthesize, if you do not have: Effective Synthetic Dataset Creation Strategies for Self-Supervised Opinion Summarization in E-commerce',
    authors: 'Tejpalsingh Siledar, Suman Banerjee, Amey Patil, Sudhanshu Singh, M. Chelliah, N. Garera, Bhattacharyya',
    authorHighlight: 'Amey Patil',
    abstract: '',
    link: 'https://aclanthology.org/2023.findings-emnlp.899/',
  },
]

export const awards: Award[] = [
  { year: '2024', name: 'Flipkart Value Champion', description: 'Building FK-GPT with 3x cost savings vs commercial LLMs' },
  { year: '2023', name: 'Ace Alliance — Best DS Team', description: 'Exceptional contribution to Flippi chatbot and semantic search' },
  { year: '2022', name: 'Flipkart Innovation Award', description: 'Machine translation platform for 11 Indian languages' },
  { year: '2021', name: 'Flipkart Innovation Award', description: "Translation platform expanding reach to India's linguistic communities" },
  { year: '—', name: 'GitHub Arctic Code Vault', description: 'Code contributions archived for long-term preservation' },
  { year: '2016', name: 'JEE Advanced AIR 65', description: 'All India Rank 65 — IIT Bombay Computer Science' },
]

export const education: Education[] = [
  {
    degree: 'BTech Computer Science & Engineering',
    school: 'IIT Bombay',
    period: '2016-2020',
    highlights: [
      'JEE Advanced AIR 65 · JEE Mains AIR 130',
      'Research in AI for medical imaging',
      'Core CS + AI/ML specialization',
    ],
  },
  {
    degree: 'Intermediate / +2',
    school: 'Pace Jr. College Mumbai',
    period: '2014-2016',
    highlights: [
      'Outstanding JEE performance',
      'Foundation for IIT Bombay admission',
    ],
  },
]

export const githubRepos: GitHubRepo[] = [
  {
    name: 'Image Inpainting',
    description: "Criminisi's exemplar-based and diffusion-based image inpainting with algorithmic visualization",
    language: 'MATLAB',
    languageColor: '#e16737',
    url: 'https://github.com/ameypatil10',
  },
  {
    name: 'Conversational AI System',
    description: 'Replicates user conversational style using NLP and sequence modeling',
    language: 'Python',
    languageColor: '#3572A5',
    url: 'https://github.com/ameypatil10',
  },
  {
    name: 'RSA Cryptography',
    description: 'RSA algorithm implementation with big integer arithmetic and cryptographic primitives',
    language: 'C++',
    languageColor: '#f34b7d',
    url: 'https://github.com/ameypatil10',
  },
  {
    name: 'Academic Portal',
    description: 'Full-stack academic portal built during Software Systems Lab at IIT Bombay',
    language: 'HTML',
    languageColor: '#e34c26',
    url: 'https://github.com/ameypatil10',
  },
  {
    name: 'Functional Programming & Security',
    description: 'CS 154 course project exploring functional programming and security concepts',
    language: 'Racket',
    languageColor: '#3c5caa',
    url: 'https://github.com/ameypatil10',
  },
  {
    name: 'Embedded Systems',
    description: 'System design using hardware description languages with hardware integration',
    language: 'C/HDL',
    languageColor: '#555555',
    url: 'https://github.com/ameypatil10',
  },
]

export const socialLinks = {
  email: 'mailto:ameypatil.10699.ap@gmail.com',
  linkedin: 'https://linkedin.com/in/ameypatil10',
  github: 'https://github.com/ameypatil10',
}
