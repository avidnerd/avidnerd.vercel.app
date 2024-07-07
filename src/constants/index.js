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
    innoverge,
    mit,
    soc,
    driver,
    threejs,
    pd,
    mdscribe,
    explore_msh,
  } from "../assets";
  
  export const navLinks = [
    // {
    //   id: "about",
    //   title: "About",
    // },
    // {
    //   id: "projects",
    //   title: "Projects",
    // },
    // {
    //   id: "contact",
    //   title: "Contact",
    // },
  ];
  
  const services = [
    {
      title: "Machine Learning Researcher",
      icon: web,
    },

    {
      title: "Competitive Programmer",
      icon: mobile,
    },

    {
      title: "Python Programmer and Web Developer",
      icon: creator,
    },

    // {
    //   title: "Entrepreneur (coming soon)",
    //   icon: backend,
    // },

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
    {
      title: "Regional Director",
      company_name: "Innoverge",
      icon: innoverge,
      iconBg: "#c900a8",
      date: "Feb 2024 - Present",
      points: [
        "Organization of STEMx workshops around my community.",
        "Teacher and volunteer at these workshops",
        "Main mission is to promote STEM education and make a difference!",
      ],
    },
    {
      title: "President & Founder",
      company_name: "STEM Outreach Club",
      icon: soc,
      iconBg: "#9cedff",
      date: "Feb 2024 - Present",
      points: [
        "Developing web applications using React.js and other related technologies for small businesses around the community.",
        "Organizing various STEM workshops, district-wide events, and coding classes to children.",
        "Organizing donations and fundraisers such as laptop donations and raising money for STEM ed organizations",
      ],
    },
    {
      title: "Competitive Programmer",
      company_name: "USACO/Codeforces",
      icon: usaco,
      iconBg: "#E6DEDD",
      date: "December 2023 - Present",
      points: [
        "Currently learning algorithms and data structures such as DFS, BFS, DP, prefix sums, binary search, stacks, queues, linked lists, trees, heaps, etc.",
        "Gained experience solving technical problems and implementing algorithms under time pressure through competitions.",
        "Currently competing in the USACO Bronze division (max I have gotten is 730 on a contest but I'm still working on it lol)",
      ],
    },
    {
      title: "Machine Learning Researcher",
      company_name: "Massachusetts Institute of Technology",
      icon: mit,
      iconBg: "#E6DEDD",
      date: "April 2024 - Present",
      points: [
        "Coming Soon!",
      ],
    },
    // {
    //   title: "Founder and CEO",
    //   company_name: "xxx",
    //   icon: null,
    //   iconBg: "#E6DEDD",
    //   date: "April 2024 - Present",
    //   points: [
    //     "Coming Soon!",
    //   ],
    // },
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
  
  const blogs = [
    {
      name: "HackMHS IX",
      description:
        "I recently participated in our school hackathon with a bunch of my friends. It was quite the experience (we stayed up until 4 am because we had this really annoying bug. Our project was MediScribe, which is a way to streamline doctor-patient visits by having our product recod each visit and summarize the patient symptoms, doctor advice, and action that needed to be taken for both doctor and patient. We came across a lot of challenges (literally took 6 hours to come up with an idea), but overall I'm happy with our project (we ended up placing in the top three within our category), and it could definitely expand into a real product! I am so ready for our next hackathon (so hyped for PennApps!!)",
      image: pd,
      source_code_link: "https://github.com/",
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
      source_code_link: "https://github.com/",
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
      name: "AMR Research @ MIT",
      description:
        "Coming soon!",
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
      name: "Avantrino",
      description:
        "Coming soon!",
      tags: [
        {
          name: "open-ai",
          color: "blue-text-gradient",
        },
        {
          name: "python",
          color: "green-text-gradient",
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
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, blogs, projects };