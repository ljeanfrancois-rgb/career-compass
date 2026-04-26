export type CareerFieldId = "engineering" | "technology" | "healthcare" | "design" | "business";

export type ScoreDimension = "logic" | "handsOn" | "impact";

export type CareerPath = {
  id: string;
  title: string;
  field: CareerFieldId;
  description: string;
  traits: string[];
  skills: string[];
  classes: string[];
  projects: string[];
  mission: string;
  roadmap: string[];
  actualWork: string[];
  beginnerProject: string;
  dimensionProfile: Record<ScoreDimension, number>;
  answerWeights: Record<string, number>;
};

export type QuestionOption = {
  value: string;
  label: string;
  description: string;
  dimensionWeights: Record<ScoreDimension, number>;
};

export type Question = {
  id: string;
  prompt: string;
  options: QuestionOption[];
};

export type CareerField = {
  id: CareerFieldId;
  name: string;
  description: string;
};

export const fields: CareerField[] = [
  {
    id: "engineering",
    name: "Engineering",
    description: "Build systems, structures, machines, and solutions for the real world."
  },
  {
    id: "technology",
    name: "Technology",
    description: "Create digital tools, software experiences, and data-driven products."
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Support people through science, care, research, and health systems."
  },
  {
    id: "design",
    name: "Design",
    description: "Shape products, visuals, and experiences that feel useful, clear, and human."
  },
  {
    id: "business",
    name: "Business",
    description: "Lead teams, build strategy, understand markets, and turn ideas into sustainable impact."
  }
];

export const sharedQuestions: Question[] = [
  {
    id: "work_style",
    prompt: "Would you rather design a system on paper or physically build and test it?",
    options: [
      {
        value: "build_physical",
        label: "Build and test it",
        description: "I want to touch it, test it, and improve it using real-world results.",
        dimensionWeights: { logic: 1, handsOn: 3, impact: 1 }
      },
      {
        value: "solve_digital",
        label: "Design the system first",
        description: "I like building the logic, structure, software, or process behind how things work.",
        dimensionWeights: { logic: 3, handsOn: 1, impact: 1 }
      },
      {
        value: "help_people",
        label: "Stay close to people",
        description: "I want my work to stay connected to people and change real experiences or outcomes.",
        dimensionWeights: { logic: 1, handsOn: 1, impact: 3 }
      }
    ]
  },
  {
    id: "strength",
    prompt: "Do you enjoy solving abstract problems step-by-step, even if it takes time?",
    options: [
      {
        value: "math_logic",
        label: "Yes, I like careful logic",
        description: "I enjoy structure, analysis, and solving hard problems piece by piece.",
        dimensionWeights: { logic: 3, handsOn: 0, impact: 0 }
      },
      {
        value: "creativity",
        label: "I like improving how things work",
        description: "I enjoy rethinking, refining, and making systems or products work better.",
        dimensionWeights: { logic: 1, handsOn: 2, impact: 1 }
      },
      {
        value: "empathy",
        label: "I focus on what people need",
        description: "I naturally think about human needs, communication, and support.",
        dimensionWeights: { logic: 0, handsOn: 0, impact: 3 }
      }
    ]
  },
  {
    id: "environment",
    prompt: "Where would you rather spend most of your time working?",
    options: [
      {
        value: "lab_site",
        label: "Lab, workshop, or site",
        description: "I like environments where ideas become real through testing, building, or physical systems.",
        dimensionWeights: { logic: 1, handsOn: 3, impact: 0 }
      },
      {
        value: "computer_team",
        label: "Computer-based systems work",
        description: "I enjoy working through software, planning, analysis, or digital systems.",
        dimensionWeights: { logic: 3, handsOn: 0, impact: 1 }
      },
      {
        value: "clinic_community",
        label: "People-centered settings",
        description: "I want my work to directly affect people’s daily lives in a visible way.",
        dimensionWeights: { logic: 0, handsOn: 1, impact: 3 }
      }
    ]
  },
  {
    id: "impact",
    prompt: "Do you want your work to directly affect people’s daily lives?",
    options: [
      {
        value: "wellbeing",
        label: "Yes, very directly",
        description: "I want the impact to feel human and visible, especially in health or support.",
        dimensionWeights: { logic: 1, handsOn: 0, impact: 3 }
      },
      {
        value: "infrastructure",
        label: "Yes, through systems people rely on",
        description: "I want to improve structures, devices, infrastructure, or systems people depend on.",
        dimensionWeights: { logic: 2, handsOn: 2, impact: 1 }
      },
      {
        value: "innovation",
        label: "Yes, through digital tools",
        description: "I want to solve problems by building software, data systems, or useful digital products.",
        dimensionWeights: { logic: 3, handsOn: 0, impact: 1 }
      }
    ]
  },
  {
    id: "pace",
    prompt: "What kind of challenge would keep you engaged the longest?",
    options: [
      {
        value: "precision",
        label: "Precise technical work",
        description: "I like accuracy, details, constraints, and solving things correctly.",
        dimensionWeights: { logic: 3, handsOn: 1, impact: 0 }
      },
      {
        value: "iteration",
        label: "Experimenting and improving",
        description: "I like trying ideas, learning from them, and making them better in practice.",
        dimensionWeights: { logic: 1, handsOn: 2, impact: 1 }
      },
      {
        value: "care_coordination",
        label: "Balancing people and complexity",
        description: "I like work that combines knowledge, communication, and real human needs.",
        dimensionWeights: { logic: 1, handsOn: 0, impact: 3 }
      }
    ]
  },
  {
    id: "motivation",
    prompt: "What keeps you going when something gets hard?",
    options: [
      {
        value: "mission_service",
        label: "Knowing it helps people",
        description: "I stay committed when I can see the human value of what I am doing.",
        dimensionWeights: { logic: 0, handsOn: 0, impact: 3 }
      },
      {
        value: "mastery_building",
        label: "Becoming great at building",
        description: "I keep going when I feel myself getting stronger at craft, tools, and execution.",
        dimensionWeights: { logic: 1, handsOn: 3, impact: 0 }
      },
      {
        value: "leadership_ownership",
        label: "Owning decisions",
        description: "I like taking responsibility and moving a plan or vision forward.",
        dimensionWeights: { logic: 1, handsOn: 0, impact: 2 }
      }
    ]
  },
  {
    id: "collaboration",
    prompt: "Which role do you naturally fall into on a team?",
    options: [
      {
        value: "specialist",
        label: "The specialist",
        description: "I like going deep and solving difficult technical or focused problems.",
        dimensionWeights: { logic: 2, handsOn: 1, impact: 0 }
      },
      {
        value: "translator",
        label: "The translator",
        description: "I connect technical ideas, creative ideas, and people-focused needs.",
        dimensionWeights: { logic: 1, handsOn: 1, impact: 2 }
      },
      {
        value: "organizer",
        label: "The organizer",
        description: "I align people, priorities, and progress so things keep moving.",
        dimensionWeights: { logic: 1, handsOn: 0, impact: 2 }
      }
    ]
  }
];

export const fieldQuestions: Record<CareerFieldId, Question[]> = {
  engineering: [
    {
      id: "engineering_focus",
      prompt: "Which engineering-style challenge sounds most interesting to you?",
      options: [
        {
          value: "eng_robotics",
          label: "Smart machines and robotics",
          description: "I want to combine mechanics, electronics, and control systems.",
          dimensionWeights: { logic: 2, handsOn: 3, impact: 1 }
        },
        {
          value: "eng_infrastructure",
          label: "Infrastructure and large systems",
          description: "I want to improve structures, transportation, or public systems.",
          dimensionWeights: { logic: 2, handsOn: 2, impact: 2 }
        },
        {
          value: "eng_healthtech",
          label: "Medical and human-centered technology",
          description: "I want engineering work that connects directly to health and people.",
          dimensionWeights: { logic: 2, handsOn: 1, impact: 3 }
        }
      ]
    },
    {
      id: "engineering_material",
      prompt: "What would feel more satisfying at the end of a project?",
      options: [
        {
          value: "eng_prototype",
          label: "A working prototype I can test",
          description: "I want to build something physical and see it perform.",
          dimensionWeights: { logic: 1, handsOn: 3, impact: 0 }
        },
        {
          value: "eng_model",
          label: "A system model that solves the problem well",
          description: "I enjoy technical design, calculations, and system thinking.",
          dimensionWeights: { logic: 3, handsOn: 1, impact: 0 }
        },
        {
          value: "eng_outcome",
          label: "A tool that clearly helps people",
          description: "I want the design to matter in a direct, human way.",
          dimensionWeights: { logic: 1, handsOn: 1, impact: 3 }
        }
      ]
    }
  ],
  technology: [
    {
      id: "technology_focus",
      prompt: "Which kind of tech work sounds most exciting?",
      options: [
        {
          value: "tech_apps",
          label: "Building apps and software systems",
          description: "I want to create products through code and system logic.",
          dimensionWeights: { logic: 3, handsOn: 1, impact: 1 }
        },
        {
          value: "tech_experience",
          label: "Designing better user experiences",
          description: "I want to make digital tools more intuitive and human-centered.",
          dimensionWeights: { logic: 1, handsOn: 1, impact: 3 }
        },
        {
          value: "tech_data",
          label: "Finding patterns in data",
          description: "I want to turn information into insights and decisions.",
          dimensionWeights: { logic: 3, handsOn: 0, impact: 2 }
        }
      ]
    },
    {
      id: "technology_output",
      prompt: "What kind of output feels most rewarding?",
      options: [
        {
          value: "tech_feature",
          label: "A feature that works smoothly",
          description: "I like building and debugging until something works reliably.",
          dimensionWeights: { logic: 3, handsOn: 2, impact: 0 }
        },
        {
          value: "tech_case",
          label: "A design that people understand immediately",
          description: "I care about clarity, usability, and making tools feel intuitive.",
          dimensionWeights: { logic: 1, handsOn: 1, impact: 3 }
        },
        {
          value: "tech_dashboard",
          label: "A chart or dashboard that reveals something important",
          description: "I like making patterns visible and useful.",
          dimensionWeights: { logic: 3, handsOn: 0, impact: 2 }
        }
      ]
    }
  ],
  healthcare: [
    {
      id: "healthcare_focus",
      prompt: "What kind of healthcare impact sounds most like you?",
      options: [
        {
          value: "health_direct",
          label: "Direct patient care",
          description: "I want to support people face to face during important moments.",
          dimensionWeights: { logic: 1, handsOn: 2, impact: 3 }
        },
        {
          value: "health_systems",
          label: "Improving healthcare systems",
          description: "I want to improve operations, quality, and access through better decisions.",
          dimensionWeights: { logic: 3, handsOn: 0, impact: 3 }
        },
        {
          value: "health_technology",
          label: "Creating healthcare technology",
          description: "I want to solve health problems through design, devices, or innovation.",
          dimensionWeights: { logic: 2, handsOn: 2, impact: 3 }
        }
      ]
    },
    {
      id: "healthcare_style",
      prompt: "Where do you think you would contribute best?",
      options: [
        {
          value: "health_fast",
          label: "Fast-paced care settings",
          description: "I can stay focused and helpful when the work is immediate and human.",
          dimensionWeights: { logic: 1, handsOn: 2, impact: 3 }
        },
        {
          value: "health_analysis",
          label: "Analysis and planning",
          description: "I like improving systems by studying data and decisions carefully.",
          dimensionWeights: { logic: 3, handsOn: 0, impact: 2 }
        },
        {
          value: "health_design",
          label: "Designing tools or experiences",
          description: "I want to make healthcare better through thoughtful solutions and technology.",
          dimensionWeights: { logic: 2, handsOn: 1, impact: 3 }
        }
      ]
    }
  ],
  design: [
    {
      id: "design_focus",
      prompt: "What kind of design work feels most exciting?",
      options: [
        {
          value: "design_product",
          label: "Physical product design",
          description: "I want to shape objects, tools, and how people use them.",
          dimensionWeights: { logic: 1, handsOn: 3, impact: 2 }
        },
        {
          value: "design_visual",
          label: "Visual communication",
          description: "I want to use graphics, layout, and identity to communicate clearly.",
          dimensionWeights: { logic: 1, handsOn: 1, impact: 3 }
        },
        {
          value: "design_experience",
          label: "Digital experience design",
          description: "I want to make products easier and better for users.",
          dimensionWeights: { logic: 2, handsOn: 1, impact: 3 }
        }
      ]
    },
    {
      id: "design_output",
      prompt: "What feels most satisfying to create?",
      options: [
        {
          value: "design_mockup",
          label: "A prototype people can try",
          description: "I like turning ideas into something people can interact with.",
          dimensionWeights: { logic: 1, handsOn: 2, impact: 2 }
        },
        {
          value: "design_system",
          label: "A visual system that feels intentional",
          description: "I care about consistency, hierarchy, and expression.",
          dimensionWeights: { logic: 1, handsOn: 1, impact: 2 }
        },
        {
          value: "design_research",
          label: "A better experience based on user insight",
          description: "I like solving design problems by understanding people first.",
          dimensionWeights: { logic: 2, handsOn: 0, impact: 3 }
        }
      ]
    }
  ],
  business: [
    {
      id: "business_focus",
      prompt: "Which kind of business challenge sounds most interesting?",
      options: [
        {
          value: "business_strategy",
          label: "Shaping product or business strategy",
          description: "I want to decide what should happen next and why.",
          dimensionWeights: { logic: 2, handsOn: 0, impact: 3 }
        },
        {
          value: "business_marketing",
          label: "Understanding audiences and messaging",
          description: "I want to help the right people connect with a good idea.",
          dimensionWeights: { logic: 1, handsOn: 0, impact: 3 }
        },
        {
          value: "business_analysis",
          label: "Using metrics to guide decisions",
          description: "I like turning patterns and numbers into action.",
          dimensionWeights: { logic: 3, handsOn: 0, impact: 2 }
        }
      ]
    },
    {
      id: "business_role",
      prompt: "What role feels most natural in a team?",
      options: [
        {
          value: "business_prioritize",
          label: "Prioritizing what matters most",
          description: "I like helping a team focus on the biggest goal.",
          dimensionWeights: { logic: 2, handsOn: 0, impact: 3 }
        },
        {
          value: "business_message",
          label: "Clarifying the message",
          description: "I like shaping how ideas are understood by other people.",
          dimensionWeights: { logic: 1, handsOn: 0, impact: 3 }
        },
        {
          value: "business_measure",
          label: "Measuring what is working",
          description: "I like using evidence to make better decisions.",
          dimensionWeights: { logic: 3, handsOn: 0, impact: 1 }
        }
      ]
    }
  ]
};

export const questions = sharedQuestions;

export const careerPaths: CareerPath[] = [
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    field: "engineering",
    description: "Designs machines, tools, and physical systems that need to work reliably in the real world.",
    traits: ["Hands-on", "Analytical", "System-focused"],
    skills: ["CAD", "Physics", "Materials", "Prototyping", "Problem solving"],
    classes: ["Calculus", "Physics", "Statics", "Dynamics", "Computer-Aided Design"],
    projects: [
      "Design a simple robotic arm or mechanical prototype",
      "Create a CAD model for a household product",
      "Build and test a small energy-efficiency device"
    ],
    mission: "Turn ideas into reliable machines, products, and physical systems.",
    roadmap: [
      "Strengthen math and physics foundations.",
      "Learn CAD and create simple 3D models.",
      "Build small prototypes and document what worked.",
      "Join projects that involve hardware, robotics, or product design."
    ],
    actualWork: [
      "Design mechanical systems and machine components",
      "Build and test prototypes to see what actually works",
      "Improve product performance, safety, and reliability"
    ],
    beginnerProject: "Model a simple mechanical device in CAD and build a low-cost prototype.",
    dimensionProfile: { logic: 4, handsOn: 5, impact: 2 },
    answerWeights: {
      build_physical: 3,
      math_logic: 2,
      lab_site: 3,
      infrastructure: 2,
      precision: 3,
      creativity: 1
    }
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    field: "engineering",
    description: "Plans and improves infrastructure like roads, bridges, water systems, and public spaces.",
    traits: ["Practical", "Community-minded", "Structured"],
    skills: ["Structural thinking", "Project planning", "Math", "Sustainability", "Technical drawing"],
    classes: ["Calculus", "Physics", "Structural Analysis", "Surveying", "Environmental Engineering"],
    projects: [
      "Model a sustainable neighborhood layout",
      "Analyze bridge or road designs in your area",
      "Create a stormwater or drainage improvement concept"
    ],
    mission: "Create safer communities through stronger and smarter infrastructure.",
    roadmap: [
      "Build confidence in math, physics, and structural basics.",
      "Study how local infrastructure is planned and maintained.",
      "Practice technical drawing and sustainable design ideas.",
      "Explore internships, civic projects, or public works case studies."
    ],
    actualWork: [
      "Plan structures, roads, drainage, or public systems",
      "Review site conditions, drawings, and safety constraints",
      "Coordinate infrastructure projects that affect communities"
    ],
    beginnerProject: "Redesign a local intersection, walkway, or drainage area with a simple safety improvement plan.",
    dimensionProfile: { logic: 4, handsOn: 3, impact: 4 },
    answerWeights: {
      build_physical: 2,
      math_logic: 2,
      lab_site: 2,
      infrastructure: 3,
      precision: 3,
      empathy: 1,
      mission_service: 1,
      specialist: 2
    }
  },
  {
    id: "mechatronics-engineer",
    title: "Mechatronics Engineer",
    field: "engineering",
    description: "Blends mechanics, electronics, and software to build smart machines, robotics, and automation systems.",
    traits: ["Inventive", "Technical", "Future-focused"],
    skills: ["Robotics", "Sensors", "Embedded systems", "Programming", "Control systems"],
    classes: ["Calculus", "Physics", "Electronics", "Programming", "Control Systems"],
    projects: [
      "Build a line-following robot or smart device prototype",
      "Create an automated system with sensors and actuators",
      "Design a concept for a medical or industrial robotic tool"
    ],
    mission: "Create intelligent machines that solve complex real-world problems.",
    roadmap: [
      "Build a base in mechanics, circuits, and coding.",
      "Experiment with sensors, microcontrollers, and simple robots.",
      "Study how hardware and software work together in automation.",
      "Develop a portfolio around robotics, smart devices, or assistive technology."
    ],
    actualWork: [
      "Design robotic systems that combine mechanics, electronics, and code",
      "Build sensors and control systems for smart machines",
      "Program automated devices to respond to real-world inputs"
    ],
    beginnerProject: "Build a simple line-following robot simulation or microcontroller prototype.",
    dimensionProfile: { logic: 5, handsOn: 5, impact: 2 },
    answerWeights: {
      build_physical: 3,
      solve_digital: 2,
      math_logic: 2,
      creativity: 2,
      lab_site: 2,
      computer_team: 1,
      innovation: 3,
      precision: 2,
      mastery_building: 3,
      translator: 2
    }
  },
  {
    id: "biomedical-engineer",
    title: "Biomedical Engineer",
    field: "engineering",
    description: "Designs technology, devices, and systems that support medicine, patient care, and human health.",
    traits: ["Mission-driven", "Analytical", "Interdisciplinary"],
    skills: ["Biology basics", "Device design", "Data interpretation", "Research", "Engineering principles"],
    classes: ["Biology", "Chemistry", "Physics", "Calculus", "Biomechanics"],
    projects: [
      "Design a concept for a more accessible medical device",
      "Prototype a wearable that tracks a health-related signal",
      "Analyze how a surgical tool could become safer or more efficient"
    ],
    mission: "Connect engineering and healthcare to improve how people are treated and supported.",
    roadmap: [
      "Build foundations in both science and engineering.",
      "Learn how medical devices are designed and evaluated.",
      "Study human systems, safety, and usability.",
      "Create projects that connect technology with patient needs."
    ],
    actualWork: [
      "Design sensors or tools for medical devices",
      "Prototype technology that supports diagnosis or care",
      "Improve how devices interact safely with patients and clinicians"
    ],
    beginnerProject: "Design a basic heart-rate sensor concept and map how it would help a patient or clinician.",
    dimensionProfile: { logic: 4, handsOn: 4, impact: 5 },
    answerWeights: {
      build_physical: 2,
      help_people: 2,
      math_logic: 2,
      empathy: 1,
      lab_site: 2,
      wellbeing: 3,
      precision: 2,
      mission_service: 3,
      translator: 3
    }
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    field: "technology",
    description: "Builds digital products, applications, and systems that solve user or business problems.",
    traits: ["Curious", "Logical", "Builder mindset"],
    skills: ["Programming", "Debugging", "System design", "Git", "API basics"],
    classes: ["Intro to Programming", "Data Structures", "Web Development", "Databases", "Algorithms"],
    projects: [
      "Build a to-do list or planner web app",
      "Create a simple API-backed dashboard",
      "Launch a portfolio site with a small interactive tool"
    ],
    mission: "Build digital tools that make work, learning, or daily life better.",
    roadmap: [
      "Learn one programming language well.",
      "Build small projects and practice debugging often.",
      "Understand how frontend, backend, and data fit together.",
      "Create a portfolio with apps that solve real problems."
    ],
    actualWork: [
      "Write and debug application code",
      "Build features, APIs, and system logic",
      "Improve reliability, speed, and user experience"
    ],
    beginnerProject: "Build a small web app that solves one real problem you personally care about.",
    dimensionProfile: { logic: 5, handsOn: 3, impact: 3 },
    answerWeights: {
      solve_digital: 3,
      math_logic: 2,
      computer_team: 3,
      innovation: 3,
      iteration: 3,
      creativity: 1,
      mastery_building: 3,
      specialist: 3
    }
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    field: "technology",
    description: "Shapes digital experiences by understanding users and designing clear, effective interfaces.",
    traits: ["Creative", "User-focused", "Observant"],
    skills: ["Wireframing", "Research", "Visual communication", "Prototyping", "Interaction design"],
    classes: ["Design Fundamentals", "Human-Computer Interaction", "Psychology", "Visual Design", "UX Research"],
    projects: [
      "Redesign the experience of a campus or local business website",
      "Interview users and build a clickable prototype",
      "Create a case study showing how you improved a mobile flow"
    ],
    mission: "Make digital tools more intuitive, useful, and human-centered.",
    roadmap: [
      "Study visual design, layout, and usability basics.",
      "Practice user interviews and problem framing.",
      "Create wireframes and prototypes for real workflows.",
      "Publish case studies that explain your design thinking."
    ],
    actualWork: [
      "Map user flows and identify where people get stuck",
      "Design wireframes and prototypes for better experiences",
      "Test designs with users and improve the interface"
    ],
    beginnerProject: "Redesign one frustrating mobile or website flow and turn it into a simple case study.",
    dimensionProfile: { logic: 3, handsOn: 2, impact: 5 },
    answerWeights: {
      solve_digital: 2,
      creativity: 3,
      computer_team: 2,
      innovation: 2,
      iteration: 3,
      empathy: 2,
      mission_service: 1,
      translator: 3
    }
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    field: "technology",
    description: "Finds patterns in information and turns data into decisions, insights, and smarter planning.",
    traits: ["Analytical", "Curious", "Evidence-driven"],
    skills: ["Spreadsheets", "SQL", "Data visualization", "Statistics", "Communication"],
    classes: ["Statistics", "Database Basics", "Business Analytics", "Excel or Spreadsheets", "Intro to Python"],
    projects: [
      "Build a dashboard from open education or health data",
      "Analyze trends from a public dataset and present recommendations",
      "Create a small reporting tool for student or campus needs"
    ],
    mission: "Help people and organizations make better decisions with evidence.",
    roadmap: [
      "Build comfort with spreadsheets, statistics, and charts.",
      "Learn SQL and basic scripting for analysis.",
      "Practice explaining insights clearly to non-technical people.",
      "Create dashboards and short case studies from public datasets."
    ],
    actualWork: [
      "Clean data and look for patterns in spreadsheets or dashboards",
      "Explain trends to teams in plain language",
      "Turn raw numbers into useful recommendations"
    ],
    beginnerProject: "Create a dashboard from a public dataset and explain three useful insights from it.",
    dimensionProfile: { logic: 5, handsOn: 1, impact: 3 },
    answerWeights: {
      solve_digital: 2,
      math_logic: 3,
      computer_team: 2,
      innovation: 1,
      precision: 2,
      mastery_building: 2,
      translator: 2,
      specialist: 2
    }
  },
  {
    id: "nurse",
    title: "Registered Nurse",
    field: "healthcare",
    description: "Provides direct patient care, coordinates treatment, and supports people through critical moments.",
    traits: ["Empathetic", "Resilient", "Organized"],
    skills: ["Patient care", "Communication", "Clinical knowledge", "Observation", "Teamwork"],
    classes: ["Biology", "Anatomy and Physiology", "Chemistry", "Nutrition", "Clinical Practice"],
    projects: [
      "Volunteer in a healthcare or community support setting",
      "Create a patient education resource on a health topic",
      "Shadow a healthcare professional and reflect on the workflow"
    ],
    mission: "Provide care, stability, and advocacy during the moments people need it most.",
    roadmap: [
      "Strengthen biology and human-body fundamentals.",
      "Build communication and observation skills in care settings.",
      "Gain early exposure through volunteering or shadowing.",
      "Prepare for licensure-focused coursework and clinical practice."
    ],
    actualWork: [
      "Monitor patients and respond to changes in their condition",
      "Educate patients and families about care and recovery",
      "Coordinate directly with doctors and healthcare teams"
    ],
    beginnerProject: "Create a beginner-friendly patient education guide about a common health topic.",
    dimensionProfile: { logic: 3, handsOn: 4, impact: 5 },
    answerWeights: {
      help_people: 3,
      empathy: 3,
      clinic_community: 3,
      wellbeing: 3,
      care_coordination: 3
    }
  },
  {
    id: "healthcare-analyst",
    title: "Healthcare Analyst",
    field: "healthcare",
    description: "Uses data and systems thinking to improve healthcare quality, efficiency, and decision-making.",
    traits: ["Analytical", "Purpose-driven", "Detail-oriented"],
    skills: ["Data analysis", "Spreadsheets or SQL", "Healthcare systems", "Communication", "Reporting"],
    classes: ["Statistics", "Health Informatics", "Biology", "Database Basics", "Public Health"],
    projects: [
      "Analyze a public health dataset and present key findings",
      "Build a dashboard on hospital quality or wellness trends",
      "Research how technology could improve patient scheduling"
    ],
    mission: "Improve care systems by turning healthcare data into smarter decisions.",
    roadmap: [
      "Build strong analysis and spreadsheet skills.",
      "Learn how healthcare operations and records systems work.",
      "Practice presenting insights in a clear, responsible way.",
      "Work on projects around public health, hospital flow, or patient access."
    ],
    actualWork: [
      "Analyze patient-flow or quality data",
      "Build reports that help hospitals make better decisions",
      "Find ways to improve efficiency and care outcomes"
    ],
    beginnerProject: "Analyze a public health dataset and present one system improvement idea.",
    dimensionProfile: { logic: 5, handsOn: 1, impact: 5 },
    answerWeights: {
      help_people: 1,
      solve_digital: 2,
      math_logic: 2,
      computer_team: 2,
      wellbeing: 3,
      care_coordination: 2,
      innovation: 1,
      mission_service: 3,
      translator: 2
    }
  },
  {
    id: "industrial-designer",
    title: "Industrial Designer",
    field: "design",
    description: "Designs physical products by balancing function, form, usability, and manufacturing reality.",
    traits: ["Creative", "Practical", "User-aware"],
    skills: ["Sketching", "3D modeling", "Product thinking", "Prototyping", "User research"],
    classes: ["Design Drawing", "3D Modeling", "Materials", "Human Factors", "Product Development"],
    projects: [
      "Redesign an everyday object to be more accessible",
      "Prototype a study or healthcare product for student use",
      "Create a mini portfolio around a product concept from sketch to model"
    ],
    mission: "Design objects and tools that people can use with ease and confidence.",
    roadmap: [
      "Practice sketching and communicating product ideas.",
      "Learn 3D modeling and physical prototyping.",
      "Study ergonomics and how people interact with products.",
      "Build a portfolio showing form, function, and process."
    ],
    actualWork: [
      "Sketch and prototype physical product ideas",
      "Test how people use objects in real situations",
      "Refine form, function, and manufacturability together"
    ],
    beginnerProject: "Redesign an everyday object so it is easier or safer for more people to use.",
    dimensionProfile: { logic: 3, handsOn: 4, impact: 4 },
    answerWeights: {
      build_physical: 2,
      creativity: 3,
      empathy: 2,
      lab_site: 1,
      innovation: 2,
      iteration: 2,
      mastery_building: 2,
      translator: 2
    }
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    field: "design",
    description: "Builds visual systems and communication pieces that help people understand, feel, and trust a message.",
    traits: ["Expressive", "Visual", "Intentional"],
    skills: ["Typography", "Layout", "Branding", "Visual storytelling", "Creative software"],
    classes: ["Design Principles", "Typography", "Color Theory", "Brand Design", "Digital Media"],
    projects: [
      "Create a visual identity for a student club or small business",
      "Design an awareness campaign around a cause you care about",
      "Build a small brand system with posters, icons, and digital assets"
    ],
    mission: "Use visuals to communicate clearly and make ideas more memorable.",
    roadmap: [
      "Learn the foundations of layout, hierarchy, and typography.",
      "Study strong branding and visual systems.",
      "Practice design with real posters, campaigns, or social content.",
      "Build a portfolio that shows range and intentional thinking."
    ],
    actualWork: [
      "Design brand visuals, layouts, and campaigns",
      "Turn ideas into posters, social graphics, or identity systems",
      "Help audiences understand and trust a message quickly"
    ],
    beginnerProject: "Create a mini brand kit for a local cause, student club, or small business.",
    dimensionProfile: { logic: 2, handsOn: 2, impact: 4 },
    answerWeights: {
      creativity: 3,
      empathy: 1,
      innovation: 1,
      iteration: 3,
      mastery_building: 2,
      specialist: 1,
      translator: 2
    }
  },
  {
    id: "product-manager",
    title: "Product Manager",
    field: "business",
    description: "Connects user needs, business goals, and team execution to shape what gets built and why.",
    traits: ["Strategic", "Collaborative", "Decisive"],
    skills: ["Communication", "Prioritization", "Roadmapping", "User thinking", "Cross-functional leadership"],
    classes: ["Marketing", "Business Strategy", "Project Management", "Psychology", "Intro to Analytics"],
    projects: [
      "Write a product brief for an app solving a student problem",
      "Run user interviews and plan feature priorities",
      "Create a roadmap for improving a campus service or digital tool"
    ],
    mission: "Turn good ideas into useful products by aligning people around a clear direction.",
    roadmap: [
      "Learn how products are planned, launched, and improved.",
      "Build communication and prioritization habits.",
      "Get comfortable with research, metrics, and problem framing.",
      "Lead small projects that require coordination across roles."
    ],
    actualWork: [
      "Decide which problems a product team should solve first",
      "Write clear feature goals and roadmaps",
      "Coordinate engineers, designers, and stakeholders around priorities"
    ],
    beginnerProject: "Write a product brief for a student-focused app and define the first three core features.",
    dimensionProfile: { logic: 4, handsOn: 1, impact: 5 },
    answerWeights: {
      solve_digital: 1,
      empathy: 2,
      computer_team: 2,
      innovation: 2,
      care_coordination: 1,
      leadership_ownership: 3,
      translator: 3,
      organizer: 3
    }
  },
  {
    id: "marketing-strategist",
    title: "Marketing Strategist",
    field: "business",
    description: "Uses messaging, audience insight, and campaign planning to help ideas and organizations grow.",
    traits: ["Insightful", "Creative", "Audience-aware"],
    skills: ["Messaging", "Content strategy", "Audience research", "Campaign planning", "Analytics"],
    classes: ["Marketing", "Consumer Behavior", "Communication", "Analytics", "Brand Strategy"],
    projects: [
      "Create a campaign for a student organization or local business",
      "Analyze the messaging of a brand and suggest improvements",
      "Build a portfolio with content plans, audience research, and campaign ideas"
    ],
    mission: "Help meaningful products, ideas, or services reach the right people clearly.",
    roadmap: [
      "Study audience behavior and strong messaging.",
      "Practice writing, campaign planning, and performance review.",
      "Use data to improve communication choices.",
      "Build sample campaigns and explain the strategy behind them."
    ],
    actualWork: [
      "Research audiences and shape campaign messaging",
      "Plan content and track what performs well",
      "Turn insights into stronger marketing strategy"
    ],
    beginnerProject: "Create a simple campaign plan for a club, event, or local business and explain why it would work.",
    dimensionProfile: { logic: 3, handsOn: 1, impact: 4 },
    answerWeights: {
      creativity: 2,
      empathy: 2,
      innovation: 1,
      iteration: 2,
      leadership_ownership: 2,
      translator: 2,
      organizer: 1
    }
  }
];
