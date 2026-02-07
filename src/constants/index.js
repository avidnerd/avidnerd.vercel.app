import {
    mobile,
    backend,
    creator,
    web,
    typescript,
    html,
    reactjs,
    tailwind,
    nodejs,
    mongodb,
    figma,
    docker,
    usaco,
    kessler,
    mit,
    soc,
    driver,
    threejs,
    pd,
    mdscribe,
    explore_msh,
    essex_cty,
    csii,
    sinai,
    encode,
    teens,
    home_page,
    njsrs,
    tech_drive,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Experience",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "awards",
      title: "Awards",
    },
    {
      id: "hobbies",
      title: "Hobbies",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "AI Research",
      icon: web,
    },

    {
      title: "Computational Neuroscience",
      icon: mobile,
    },

    {
      title: "Tech for Good",
      icon: creator,
    },

    {
      title: "Entrepreneurship",
      icon: backend,
    },

  ];
  
  const technologies = [
    {
      name: "Python",
      icon: typescript,
    },

    {
      name: "Java",
      icon: figma,
    },

    {
      name: "C++",
      icon: docker,
    },

    {
      name: "HTML 5",
      icon: html,
    },

    {
      name: "React JS",
      icon: reactjs,
    },

    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Swift",
      icon: nodejs,
    },

    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "django",
      icon: mongodb,
    },

  ];
  
  const experiences = [
    {
      title: "Tech Committee Chair, Logistics Co-Chair",
      company_name: "New Jersey Science Research Symposium",
      icon: njsrs,
      iconBg: "#FFFFFF",
      date: "November 2025 - Present",
      points: [
        "The New Jersey Science Research Symposium (NJSRS) was created by myself and members of my science research class to fill a critical gap in science research opportunities for high school students in New Jersey.",
        "With the suspension of JSHS (Junior Science and Humanities Symposium) this year, we recognized the need for a platform where students could continue to showcase their experimental research, receive valuable feedback, and compete for recognition."
      ],
    },
    {
      title: "Scientific Researcher",
      company_name: "Mount Sinai Health System",
      icon: sinai,
      iconBg: "#FFFFFF",
      date: "Aug 2025 - Present",
      points: [
        "Working with a mentor on full research project to use artificial intelligence to design drugs protective against Alzheimer's Disease and age-related diseases.",
      ],
    },
    {
      title: "Officer to President",
      company_name: "Computer Science Integration Initiative (CSII)",
      icon: csii,
      iconBg: "#000000",
      date: "Aug 2024 - Present",
      points: [
        "National finalist for the American Computer Science League Competition.",
        "Lead editor and designer of inaugural edition of school CS magazine Catalyst, now chief editor.",
        "Taught AI/ML basics and AI ethics.",
        "Recruited 102 new members.",
        "Led members through Kaggle competitions.",
        "Leading competitive programming lessons and contests.",
        "Initiating tech drive to donate used computers and technology to families in need.",
      ],
    },
    {
      title: "Chapter Lead + Member of National Council \"AI Advisory Board\"",
      company_name: "Encode Justice",
      icon: encode,
      iconBg: "#1a2b57",
      date: "Jun 2024 - Present",
      points: [
        "Encode Justice is a coalition of youth activists and changemakers fighting to preserve human rights, accountability, and justice under AI, especially as algorithms are all too often deployed to erode civil liberties.",
        "Working on fighting for informed AI policy that addresses automated bias and discrimination through political advocacy, community organizing, and content creation.",
        "Helping research and draft original policy proposals regarding specific state issues for Encode Justice's internal, youth-led AI policy think tank.",
        "Lobbying for the Policy team's proposals by meeting with legislators statewide.",
        "Developing AI ethics curriculum for our workshops at hackathons, schools, and other forums in New Jersey.",
      ],
    },
    {
      title: "Machine Learning Researcher",
      company_name: "Massachusetts Institute of Technology",
      icon: mit,
      iconBg: "#E6DEDD",
      date: "April 2024 - Present",
      points: [
        "For my 2024-2025 research project, I am working with the Collins Lab at MIT to use a novel ensemble ML model to design de novo drug candidates effective against Methicillin Resistant Staphylococcus Aureus.",
        "My solution will incorporate explainability in order to understand the mechanisms of the produced drug candidates.",
        "I am also developing an in vivo efficacy predictor to reduce the drug development timeline."
      ],
    },
    {
      title: "Founder & President",
      company_name: "STEM Outreach Club",
      icon: soc,
      iconBg: "#9cedff",
      date: "Feb 2024 - Present",
      points: [
        "Coordinated biweekly coding lessons; initiated partnerships with 3 small businesses and directed development of websites for them.",
        "Spearheaded collaboration with county health office to build a healthcare chatbot, expanding access to health services; featured in local media, used by x residents.",
        "Organized fundraisers to support tech nonprofits.",
      ],
    },
    {
      title: "Educator",
      company_name: "Meaningful Teens",
      icon: teens,
      iconBg: "#FFFFFF",
      date: "Jan 2024 - Present",
      points: [
        "I am a volunteer at Project Udaan, whose mission is to offer free tutoring to underprivileged students in India to help them grow and develop their reading, mathematics, and communication skills.",
      ],
    },
    {
      title: "Machine Learning Research Intern",
      company_name: "Kessler Foundation",
      icon: kessler,
      iconBg: "#FFF",
      date: "October 2023 - March 2024",
      points: [
        "Main role in project involving use of deep learning techniques to detect drowsiness/fatigue in drivers.",
        "Main role in project involving the detection of cancer-related fatigue to improve rehabilitation therapy for cancer patients.",
        "Involves writing a paper and presenting to a conference.",
        "Demonstrates skill in Python data science modules as well as understanding of electroencephelography (EEG) signals.",
      ],
    },

  ];
  
  const testimonials = [
    {
      testimonial:
        "The More I Learn, The More I Realize How Much I Don't Know.",
      name: "Albert Einstein",
      designation: "One",
      company: "the Greatest Scientists of the 20th Century",
      image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQkJzGjwnMmbX6c3_xPYZv9g6MNRzUq6kJfuuCBldKsWjSQZ6pviVStsQtE8ybH8ZLzTzdRiorMrPVX0A4",
    },
    {
      testimonial:
        "I've never worked a day in my life. If you love what you do, it's not work.",
      name: "Marion Jones",
      designation: "World Champion",
      company: "Track-and-Field",
      image: "https://ca-times.brightspotcdn.com/dims4/default/6f1bb8d/2147483647/strip/true/crop/500x355+0+0/resize/1024x727!/format/webp/quality/75/?url=https%3A%2F%2Fwww.trbimg.com%2Fimg-52fcc7a8%2Fturbine%2Fsns-jones-marion-mug-jpg",
    },
    {
      testimonial:
        "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
      name: "Thomas Edison",
      designation: "Inventor",
      company: "Many Things",
      image: "https://images.inc.com/uploaded_files/image/1920x1080/getty_141551338_277941.jpg",
    },
  ];
  
  const awards = [
    {
      title: "National Merit Semifinalist",
      issuer: "College Board",
      date: "Sep 2025",
      description: "Received a perfect score on the PSAT, earning an opportunity to advance in the competition for a National Merit Scholarship",
    },
    {
      title: "International Psychology Olympiad Higher Distinction Award",
      issuer: "IPsyO",
      date: "Aug 2025",
      description: "Studied a full college-level psychology curriculum and scored top 5% to top 10% scored on comprehensive objective test",
    },
    {
      title: "AP Scholar with Distinction",
      issuer: "College Board",
      date: "Jul 2025",
      description: "For achieving an average score of at least 3.5 on all AP Exams taken, and scores of 3 or higher on five or more exams.",
    },
    {
      title: "University of Chicago Book Award",
      issuer: "The University of Chicago",
      date: "Jun 2025",
      description: "In recognition of outstanding academic achievement, community engagement, and an intellectual curiosity to draw connections across disciplines.",
    },
    {
      title: "Blue Ocean Entrepreneurship Competition Top 10",
      issuer: "Blue Ocean",
      date: "Apr 2025",
      description: "Pitch for biologic stabilization placed in top 10 pitches internationally (<0.001% of applicants)",
    },
    {
      title: "Toshiba Exploravision Honorable Mention 2025",
      issuer: "Toshiba",
      date: "Apr 2025",
      description: "For achieving the top 10% of all projects submitted (2000+ projects total).",
    },
    {
      title: "Blue Ocean Entrepreneurship Competition Top 100",
      issuer: "Blue Ocean",
      date: "Mar 2025",
      description: "Placed in top 100 twice in international entrepreneurship competition",
    },
    {
      title: "Terra North Jersey Science Fair 2025",
      issuer: "Terra",
      date: "Mar 2025",
      description: "Bioinformatics Category- 2nd Place Award ($75), Association for Computing and Machinery Award",
    },
    {
      title: "Penn EcoVenture Challenge 2024",
      issuer: "UPenn",
      date: "Jul 2024",
      description: "2nd place winner of a climate tech startup competition hosted by UPenn. Our project was a blockchain based green certification platform to detect greenwashing.",
    },
    {
      title: "Top 10% in New Jersey Biology II",
      issuer: "New Jersey Science League",
      date: "Jun 2024",
      description: "Our team received first in NJ and individually, I got top 10% in the state (out of 150+ students) in Advanced Biology. Selection criteria: Top 6 students in AP Biology.",
    },
    {
      title: "ACSL National Finals Qualifier",
      issuer: "American Computer Science League",
      date: "Jun 2023",
      description: "Qualified for national finals scoring 36/40 through all 4 competitions, and was the leading scorer of my team.",
    },
    {
      title: "hackMHS VIII Award",
      issuer: "Millburn High School",
      date: "May 2023",
      description: "We created a convolutional neural network for detecting and classifying crop disease, and won 2nd place in the Sustainability category.",
    },
    {
      title: "First Place in New Jersey Region Band (Oboe)",
      issuer: "North Jersey School Music Association",
      date: "Feb 2023",
      description: "Achieved first place in regional band competition for oboe performance",
    },
    {
      title: "Terra North Jersey Science Fair 2024",
      issuer: "Terra North Jersey Science Fair",
      date: "2024",
      description: "Yale Science and Engineering Award, Helmer Volunteer Award for True Potential (real world impact)",
    },
    {
      title: "Toshiba Exploravision Honorable Mention 2024",
      issuer: "Toshiba",
      date: "2024",
      description: "Top 10% of 2000+ projects. Proposal and design for biohybrid nanorobots to combat rheumatoid arthritis.",
    },
  ];

  const projects = [
    {
      name: "Plant Doctor",
      description:
        "A bunch of nerds and I coded a machine learning model to detect over 10 different types of crop disease. We used the pretrained model VGG16.",
      tags: [
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "html",
          color: "green-text-gradient",
        },
        {
          name: "sk-learn",
          color: "pink-text-gradient",
        },
      ],
      image: pd,
      source_code_link: "https://github.com/avidnerd/PlantDoctor",
    },
    {
      name: "Driver Fatigue Detector",
      description:
        "Machine learning model that detects fatigue in drivers based on EEG data.",
      tags: [
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "mne",
          color: "green-text-gradient",
        },
        {
          name: "sklearn",
          color: "pink-text-gradient",
        },
      ],
      image: driver,
      source_code_link: "https://github.com/",
    },
    {
      name: "Explore Millburn Website",
      description:
        "As part of the STEM Outreach Club, some club members and I helped improve the township's public art website by creating an interactive 'trail', in order to help promote Millburn's public art program!",
      tags: [
        {
          name: "wordpress",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "html",
          color: "pink-text-gradient",
        },
      ],
      image: explore_msh,
      source_code_link: "https://exploremillburnshorthills.org/public-art/public-art-trail/",
    },
    {
      name: "Antibiotic Drug Design Research @ MIT",
      description:
        "I worked with the Collins Lab at MIT to design a novel ensemble ML model to generate de novo drug candidates effective against Methicillin Resistant Staphylococcus Aureus.",
      tags: [
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "html",
          color: "green-text-gradient",
        },
        {
          name: "chemprop",
          color: "pink-text-gradient",
        },
      ],
      image: null,
      source_code_link: "https://github.com/",
    },
    {
      name: "MediScribe",
      description:
        "A bunch of nerds and I made a software platform to act as a scribe for doctor-patient appointments. It listens to the visit and generates a report of the discussion, including patient symptoms, doctor diagnosis, and action needed to be taken.",
      tags: [
        {
          name: "llama",
          color: "blue-text-gradient",
        },
        {
          name: "streamlit",
          color: "green-text-gradient",
        },
        {
          name: "openai",
          color: "pink-text-gradient",
        },
      ],
      image: mdscribe,
      source_code_link: "https://github.com/avidnerd/MediScribe",
    },
    {
      name: "ECOPHM Assistant",
      description:
        "Leading a team of ~10 student volunteers to develop an AI chatbot for the Essex County Office of Public Health that retrieves information about healthcare services for all Essex County residents.",
      tags: [
        {
          name: "ai",
          color: "blue-text-gradient",
        },
        {
          name: "chatbot",
          color: "green-text-gradient",
        },
        {
          name: "healthcare",
          color: "pink-text-gradient",
        },
      ],
      image: essex_cty,
      source_code_link: "https://github.com/avidnerd/ECOPHMChatbot",
    },
    {
      name: "Doctrino",
      description:
        "An on-device health agent that records medical visits, extracts structured summaries (diagnosis, advice, symptoms), and automatically creates calendar reminders for medications, labs, imaging, and follow-up tasks synced with Apple's calendar.",
      tags: [
        {
          name: "healthcare",
          color: "blue-text-gradient",
        },
        {
          name: "ai",
          color: "green-text-gradient",
        },
        {
          name: "ios",
          color: "pink-text-gradient",
        },
      ],
      image: null,
      source_code_link: "https://www.youtube.com/watch?v=PTtvaf1tOHU",
      youtube_link: "https://www.youtube.com/watch?v=PTtvaf1tOHU",
    },

    {
      name: "New Jersey Science Research Symposium Website",
      description:
        "I built, designed, and deployed the website and user portals for the New Jersey Science Research Symposium, a statewide science fair for high school students. ",
      tags: [
        {
          name: "research",
          color: "blue-text-gradient",
        },
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "science fair",
          color: "pink-text-gradient",
        },
      ],
      image: home_page,
      source_code_link: "https://github.com/avidnerd/njsrs-site",
    },

    {
      name: "Computer Science Club Tech Drive",
      description:
        "Organizer of my computer science club's inaugural Tech Drive. We held the drive on January 24th, 2026, and collected old technology from the community to distribute to families in need. I was in charge of advertising, collecting donations at the tech drive, taking inventory, and dropping off the donations to our nonprofit partner, Retechnology. We collected 41 computers and monitors, 6 printers, 20 phones and tablets, and various other items. Due to the high reception, my team and I are currently working on building a computer lab in Newark using the collected technology for residents to access.",
      tags: [
        {
          name: "tech drive",
          color: "blue-text-gradient",
        },
        {
          name: "community service",
          color: "green-text-gradient",
        },
        {
          name: "computer",
          color: "pink-text-gradient",
        },
      ],
      image: tech_drive,
    }

  ];
  
  export { services, technologies, experiences, testimonials, projects, awards };