

export const profile = {
  name: "Subhi Stephan",
  short: "Subhi",
  mission: "Welcome! I'm an engineering student at Duke whose goal is to build technology in the service of humanity.",
  standfirst:
    "Right now I'm interested in entrepreneurship, robotics, physical AI, and medtech.",
  meta: [],
  photoCredit: "A photo I took at Haleakalā, Maui, redrawn as 53,410 dots.",
  email: "sks111@duke.edu",
  github: "https://github.com/avidnerd",
  linkedin: "https://www.linkedin.com/in/subhiksha-stephan",
  discord: "@avidnerd5258",
  resume: "/subhiksha-stephan-resume.pdf",
  portrait: "/img/portrait.jpg",
};

export const about = [
  "I am a Duke student in double-majoring in Electrical & Computer Engineering and Biomedical Engineering, with a certificate in Innovation & Entrepreneurship. I am interested in physical intelligence, health tech, robotics, and new AI innovation.",
];

export const work = [
  {
    id: "inoki",
    name: "Inoki Labs",
    role: "Co-founder & CTO",
    period: "May 2026 — present",
    blurb:
      "Built an LLM-guided adversarial search engine that discovers rare failure modes in learned robot locomotion policies and automatically retrains against them, outperforming open-source SOTA policies in reducing failure rates.",
    detail:
      "Scaled the pipeline across a 16-dimensional perturbation space and five robot platforms (Unitree Go1/G1, Boston Dynamics Spot, Google Barkour, Booster T1) in MuJoCo MJX, at roughly one day of unattended GPU time per robot. Selected for Antler's VC program, unlocking $2.1M in compute credits and partner benefits across 150+ companies.",
    badge: {
      src: "/img/antler.svg",
      alt: "Antler",
      text: "Selected for Antler's VC program",
    },
    stats: [

    ],
    note: {
      label: "paper",
      text: "Discrimination and Calibration Decouple in Runtime Failure Monitors Under Distribution Shift",
      after:
        "Vihan Aggarwal and Subhiksha Stephan. Accepted to IEEE MIT URTC 2026, pending publication in IEEE Xplore.",
      href: "/urtc-paper.pdf",
      hrefLabel: "read the paper",
    },
    tags: [],
    links: [],
    image: "/img/work/inoki.jpg",
    imageAlt:
      "Two MuJoCo simulations side by side under identical payload overload. The frozen policy has fallen; the retrained policy is still upright.",
    imageCaption:
      "An example of the original policy (collapsed at 2.04s), versus the same policy after retraining against the failure that our search found.",
  },
  {
    id: "aeroflux",
    name: "AeroFlux",
    role: "Independent",
    period: "2025",
    blurb:
      "Developed a smart inhaler spacer to predict the percentage of delivered inhaler dose and diagnose technique errors to improve quality of life for asthma patients. Won the IEEE Young Engineer Award.",
    stats: [],
    tags: [],
    links: [],
    image: "/img/work/aeroflux.jpg",
    imageAlt:
      "CAD assembly of the smart spacer joined to a simulated mouth, throat, airways and filter holder.",
    imageCaption:
      "CAD models of spacer and throat and lung setup for experimentation, produced on Autodesk Fusion.",
  },
  {
    id: "compass",
    name: "Compass",
    role: "Personal project",
    period: "2026",
    blurb:
      "A local-first study planner that closes a task only when it finds proof the work happened. Compass breaks a semester goal into subgoals and checks each one against the student's own Google Workspace, GitHub and Canvas accounts. A step closes when something actually turns up there: a document that changed, an email that went out, a commit, a calendar block that got used.",
    detail:
      "It all runs locally against a single SQLite file. There is no server to deploy, model calls are restricted to free endpoints, and every account is connected read-only. You can still tick a step off by hand, but that is the fallback.",
    stats: [
      ["Top 5", "Corgi Hackathon, YC Startup School"]
    ],
    tags: ["python", "fastapi", "react", "sqlite", "local-first"],
    links: [{ label: "source", href: "https://github.com/avidnerd/compass" }],
    image: "/img/work/compass.jpg",
    imageAlt:
      "Compass evidence card showing what it observed in Google Drive and Docs, what it could not observe, and the confidence score behind the verdict.",
    imageCaption:
      "An evidence card. Every screenshot in the repo is a real screen from a running instance.",
  },
  {
    id: "njsrs",
    name: "New Jersey Science Research Symposium",
    role: "Co-founder, Administrative Manager",
    period: "Nov 2025 — present",
    blurb:
      "Developed the public website and registration portal for judges, students, and advisors. Helped secure 81 participants and 21 schools, and organized fair rules and logistics.",
    detail:
      "In charge of managing fair day tech logistics and tech support throughout the registration process. Also assisted in social media marketing for fair promotion and judging outreach.",
    stats: [
      ["81", "participants"],
      ["21", "schools"],
    ],
    tags: ["next.js", "typescript", "tailwind css", "firebase", "sendgrid"],
    links: [{ label: "njsrs.org", href: "https://njsrs.org" }],
    image: "/img/work/njsrs.jpg",
    imageAlt: "The New Jersey Science Research Symposium homepage",
  },

  {
    id: "apidrift",
    name: "apidrift",
    role: "Ongoing personal project",
    period: "Fall 2026",
    blurb:
      "Most breaking API changes are easy to catch. Your client stops compiling, or something throws and lands in your error tracker. The ones that cause real damage are the ones where nothing fails at all. A field goes from always present to present 94% of the time, your code reads it, gets an empty string 6% of the time, and carries on, and nobody notices for weeks. That is what this targets.",
    detail:
      "A basic version of YC's Self-Maintaining APIs request for startups. The RFS is written provider-side, where the provider pushes fixes out to its customers. I built the consumer side, since the reason the problem exists is that providers mostly do not do this. Two detection surfaces: spec diffing against the copy cached on the previous run, which needs no infrastructure and runs as a scheduled GitHub Action, and a reverse proxy that groups raw paths into endpoints with a prefix trie and accumulates per-path statistics into hourly buckets.",
    stats: [
    ],
    note: {
      label: "what it does not yet show",
      text: "The traffic detector scores recall 1.000 and precision 1.000 on a synthetic benchmark of 11 planted changes, with 0 findings when the null is run through both windows.",
      after:
        "The benchmark is mine and the traffic is independent by construction, so this shows the machinery is calibrated. It says nothing about production.",
    },
    tags: ["go", "statistics", "openapi", "developer tools"],
    links: [{ label: "source", href: "https://github.com/avidnerd/apidrift" }],
  },
 
  {
    id: "ecophm",
    name: "ECOPHM Assistant",
    role: "Volunteer Software Lead, Essex County Office of Public Health",
    period: "Jun — Nov 2025",
    blurb:
      "Built a retrieval-augmented chatbot that answers resident questions about county healthcare services, using ChromaDB and Sentence Transformers over 500 pages of county program documentation with LangGraph orchestrating retrieval and response.",
    detail:
      "Led ~10 student volunteers through the build, splitting the work across ingestion, retrieval, and frontend, and reviewing contributions into a working system. Deployed to the county's WordPress site via a React widget on a Python/FastAPI backend.",
    stats: [
    ],
    tags: [],
    links: [
      { label: "source", href: "https://github.com/avidnerd/ECOPHMChatbot" },
    ],
    image: "/img/work/ecophm.jpg",
    imageAlt: "The Essex County public health assistant in use",
  },
];

export const research = [
  {
    org: "Massachusetts Institute of Technology",
    lab: "Collins Lab, with Dr. Aarti Krishnan",
    text: "An LLM-guided methodology for designing de novo antibiotics.",
  },
  {
    org: "Mount Sinai Hospital",
    lab: "With Dr. Charles Mobbs",
    text: "Using AI to design drug candidates protective against Alzheimer's disease and age-related disease.",
  },
  {
    org: "Kessler Foundation",
    lab: "Under Dr. Selvan",
    text: "An AI tool that detects fatigue in cancer patients from EEG signals, now in active use evaluating whether rehabilitation therapy is working.",
  },
];

export const honors = [
  {
    title: "IEEE MIT URTC 2026",
    detail: "First-author paper accepted, pending publication in IEEE Xplore.",
  },
  {
    title: "Terra North Jersey Science Fair",
    detail:
      "Second place in Bioinformatics and Computational Biology, plus the Association for Computing Machinery Award and the IEEE Young Engineer Award.",
  },
  {
    title: "Blue Ocean Student Entrepreneurship Competition",
    detail: "Top 10 finalist out of roughly 13,000 entrants.",
  },
  {
    title: "Genes in Space",
    detail: "Semifinalist, top 37 teams out of roughly 1,000.",
  },
  {
    title: "Penn EcoVenture Challenge",
    detail:
      "Second place for a blockchain-based green certification platform with a consumer extension that detects greenwashing.",
  },
];

export const facets = [
  {
    id: "background",
    color: "#1e5f9e",
    icon: "GraduationCap",
    label: "background",
    title: "About Me",
    text: "I study Biomedical Engineering and Electrical & Computer Engineering at Duke, with a certificate in Innovation & Entrepreneurship. I am currently a freshman coming from Millburn High School (New Jersey). I started out doing machine learning research in high school, focusing on computational biology projects (see more on research below). However, towards the end of high school, I developed a keen interest for spatial intelligence, robotics, and hardware, after the advent of LeWorldModel and the new push for physical intelligence. Now, I am doing research/startups in that area and am excited to see what is to come in the tech world!",
  },

  {
    id: "entrepreneurship",
    color: "#c65a20",
    icon: "Rocket",
    label: "entrepreneurship",
    title: "Entrepreneurship",
    text: "I have always been fascinated by the thought of creating things. In high school, I participated in a lot of pitch competitions, achieving a top 10 finish at the world's largest student entrepreneurship pitch competition (Blue Ocean), and 2nd place at the UPenn EcoVentures Challenge. This past summer, I attended YC startup school and co-founded Inoki Labs (see more below) and I am its CTO. We were recently selected for Antler's founder program!",
  },
  {
    id: "tech-for-good",
    color: "#c2436b",
    icon: "HeartHandshake",
    label: "tech for good",
    title: "Tech For Good",
    text: "I care a lot about using tech for good and helping other people using tech. As a result, I have been extensively involved with community service through tech. I started the STEM Outreach Club, where we did various tech service projects. Some highlights include: hosting a tech drive that distributed 150+ laptops and tec",
    photos: [
      { src: "/img/hobbies/tech-drive.jpg", cap: "sorting donations from the tech drive" },
    ],
  },
  {
    id: "values",
    color: "#4f46b8",
    icon: "Scale",
    label: "values",
    title: "Choosing by expected impact",
    text: "Effective altruism changed how I choose what to work on. The interesting problem and the important problem are not always the same problem, and when they come apart I try to be honest with myself about which one I am actually chasing. It is most of the reason I would rather ship a county health chatbot than a cleverer demo nobody opens.",
  },
  {
    id: "research",
    color: "#0f7d6b",
    icon: "Microscope",
    label: "research & life sciences",
    title: "Research & The Life Sciences",
    text: "Ever since eighth grade, I have loved studying biology and neuroscience. This was the basis for almost all the research that I conducted in high school, along with other fun activities like New Jersey Science League and the International Psychology Olympiad (top 5% in both).",
  },
  {
    id: "photography",
    color: "#a8791b",
    icon: "Camera",
    label: "photography",
    title: "Up before the sky is",
    text: "I photograph the sky, mostly at hours when nobody else is awake for it. Both paintings on this page are my photographs, run through a stippling script I wrote. Sunrise over the cloud layer at Haleakalā at the top, and behind this section a magenta sunset over a field near home, with me sitting in it.",
    photos: [
      { src: "/img/hobbies/sunrise-train.jpg", cap: "the 6am train, pink the whole way" },
      { src: "/img/hobbies/rainbow.jpg", cap: "full arc, straight over the house" },
      { src: "/img/hobbies/lbi-dawn.jpg", cap: "long beach island, two birds" },
      { src: "/img/hobbies/dream-sunset.jpg", cap: "sunset over a shopping mall, 9.2/10" },
    ],
  },
  {
    id: "outdoors",
    color: "#2d7a45",
    icon: "Mountain",
    label: "nature",
    title: "Seven miles across a crater",
    text: "Kīlauea Iki is still the best one, a trail straight across the floor of a crater that was a lava lake within living memory. South Mountain is the one I actually walk.",
    photos: [
      { src: "/img/hobbies/kilauea.jpg", cap: "kīlauea iki crater floor" },
      { src: "/img/hobbies/ithaca.jpg", cap: "ithaca, worth the drive" },
      { src: "/img/hobbies/south-mountain.jpg", cap: "south mountain, the usual" },
    ],
  },
  {
    id: "oboe",
    color: "#8340ad",
    icon: "Music",
    label: "oboe",
    title: "The note everyone tunes to",
    text: "First place in New Jersey Region Band, and now the Duke University Wind Symphony. The oboe is the instrument the whole orchestra tunes to, which is a lot of pressure for a stick with two pieces of cane in it. I collect vintage recordings when I am not playing.",
    photos: [
      { src: "/img/hobbies/oboe.jpg", cap: "playing at a christmas service" },
      { src: "/img/hobbies/wind-symphony.jpg", cap: "my folder, duke wind symphony" },
    ],
  },
  {
    id: "building",
    color: "#b03a8f",
    icon: "PencilRuler",
    label: "building",
    title: "CAD, then a bench",
    text: "I like the part where a model stops being a model. Pivotl is a prototype smart athletic sole I built for EDGE, my entrepreneurship-themed orientation week, where my team placed first. The matcha lamp was just for me.",
    photos: [
      { src: "/img/hobbies/pivotl.jpg", cap: "the pivotl sole, and the edge team after placing first" },
      { src: "/img/hobbies/sole-render.jpg", cap: "the pivotl sole in cad" },
      { src: "/img/hobbies/matcha-lamp.jpg", cap: "matcha whisk lamp, printed and wired" },
    ],
  },
  {
    id: "food",
    color: "#b8443a",
    icon: "Utensils",
    label: "food",
    title: "The third course at Naro",
    text: "Naro was the best meal I have had, a Korean tasting menu where the third course was the one that undid me. Tatte in Boston is the reliable one.",
    photos: [
      { src: "/img/hobbies/naro.jpg", cap: "naro, third course" },
      { src: "/img/hobbies/tatte.jpg", cap: "tatte, boston" },
    ],
  },
];
