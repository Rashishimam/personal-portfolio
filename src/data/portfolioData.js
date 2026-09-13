/**
 * =========================================================================
 * PORTFOLIO DATA CONFIGURATION - RASHISH IMAM
 * =========================================================================
 * Populated strictly with Rashish Imam's confirmed skills and real details.
 */

export const portfolioData = {
  // -----------------------------------------------------------------------
  // 1. PERSONAL & HERO SECTION
  // -----------------------------------------------------------------------
  personal: {
    name: "Rashish Imam",
    role: "3rd Year Computer Science & Engineering Student",
    heroBadge: "Welcome to my digital space",
    mainHeading: "Building modern digital experiences & solving real-world problems.",
    heroDescription: "Hi, I'm Rashish Imam — a 3rd Year Computer Science & Engineering student passionate about technology, software development, and building creative digital solutions.",
    location: "India",
    availableForWork: true,
    statusText: "Available for internships & collaborations",
    resumeUrl: "#",
  },

  // -----------------------------------------------------------------------
  // 2. SOCIAL & CONTACT LINKS
  // -----------------------------------------------------------------------
  socialLinks: {
    github: "https://github.com/Rashishimam",
    linkedin: "https://linkedin.com/in/rashish-imam",
    email: "imamrasish786@gmail.com",
  },

  // -----------------------------------------------------------------------
  // 3. ABOUT ME SECTION
  // -----------------------------------------------------------------------
  about: {
    title: "About Me",
    subtitle: "3rd Year Computer Science & Engineering Undergraduate",
    paragraphs: [
      "Hi, I'm Rashish Imam — a 3rd Year Computer Science & Engineering student passionate about technology, software development, and building creative digital solutions.",
      "My academic and development journey is centered around strong computer science fundamentals, programming in C, C++, Java, and Python, web technologies, and database systems.",
      "From software projects and algorithm problem-solving to engineering solutions for the Smart India Hackathon (SIH), I am dedicated to learning through hands-on coding and continuous practice.",
    ],
    highlights: [
      { label: "ACADEMIC LEVEL", value: "3rd Year", helper: "B.Tech Computer Science" },
      { label: "CORE FOCUS", value: "Software & CS", helper: "Algorithms & Web" },
      { label: "PROJECTS", value: "06+", helper: "Built & Deployed" },
      { label: "OPPORTUNITIES", value: "Open", helper: "Internships & Collabs" },
    ],
    focusAreas: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Web Development (HTML/CSS/JS)",
      "Database Management (DBMS)",
      "Operating Systems & Networks",
      "Smart India Hackathon (SIH)",
    ],
  },

  // -----------------------------------------------------------------------
  // 4. SIMPLIFIED SKILLS SECTION (Only user-confirmed skills)
  // -----------------------------------------------------------------------
  skillCategories: [
    {
      category: "Programming",
      description: "Core languages for software development & problem solving",
      skills: [
        { name: "C", tag: null },
        { name: "C++", tag: null },
        { name: "Java", tag: null },
        { name: "Python", tag: null },
      ],
    },
    {
      category: "Web Development",
      description: "Frontend foundations for web interfaces",
      skills: [
        { name: "HTML", tag: null },
        { name: "CSS", tag: null },
        { name: "JavaScript", tag: null },
      ],
    },
    {
      category: "Tools",
      description: "Development environment & version control",
      skills: [
        { name: "Git & GitHub", tag: null },
        { name: "VS Code", tag: null },
      ],
    },
    {
      category: "Computer Science",
      description: "Core academic principles & engineering foundations",
      skills: [
        { name: "Data Structures & Algorithms", tag: "Core Subject" },
        { name: "Object-Oriented Programming", tag: "Core Subject" },
        { name: "DBMS", tag: "Core Subject" },
        { name: "Operating Systems", tag: "Core Subject" },
        { name: "Computer Networks", tag: "Core Subject" },
      ],
    },
  ],

  // -----------------------------------------------------------------------
  // 5. SELECTED PROJECTS SECTION (6 Real GitHub Repositories with Exact URLs)
  // -----------------------------------------------------------------------
  projects: [
    {
      num: "01",
      title: "Email Spam Detection",
      category: "Machine Learning / Python",
      tagline: "Intelligent email security classification system",
      description: "A machine learning-based email classification system designed to detect and filter spam emails from legitimate messages using Python and text classification algorithms.",
      technologies: ["Python", "Machine Learning", "NLP"],
      githubUrl: "https://github.com/Rashishimam/Email-Spam-Detection",
      liveUrl: null,
      highlights: [
        "Feature extraction and vectorization on email datasets",
        "Classification pipeline for spam prediction",
      ],
      codePreview: {
        file: "email_classifier.py",
        snippet: "model = MultinomialNB().fit(X_train, y_train)\nprediction = model.predict(email_vector)",
      },
    },
    {
      num: "02",
      title: "SIH Project",
      category: "Hackathon / Web",
      tagline: "Smart India Hackathon problem-solving platform",
      description: "A specialized project engineered for the Smart India Hackathon (SIH), addressing a nationwide problem statement with a structured digital workflow and database system.",
      technologies: ["JavaScript", "HTML", "CSS", "DBMS", "SIH"],
      githubUrl: "https://github.com/Something4all/SIH-Project",
      liveUrl: null,
      highlights: [
        "Engineered for Smart India Hackathon problem statement constraints",
        "Structured data workflows and database models",
      ],
      codePreview: {
        file: "sih_system.js",
        snippet: "function processSIHWorkflow(data) {\n  return executeWorkflowPipeline(data);\n}",
      },
    },
    {
      num: "03",
      title: "Online Food Ordering System",
      category: "Web Development",
      tagline: "Interactive food ordering & cart management",
      description: "A web application allowing users to browse restaurant menus, manage cart items, and execute orders through an intuitive and responsive interface.",
      technologies: ["JavaScript", "HTML", "CSS", "DBMS"],
      githubUrl: "https://github.com/Rashishimam/online-food-ordering-system",
      liveUrl: null,
      highlights: [
        "Dynamic cart calculation and menu item management",
        "Responsive web layouts using clean HTML, CSS, and JavaScript",
      ],
      codePreview: {
        file: "cart.js",
        snippet: "function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}",
      },
    },
    {
      num: "04",
      title: "AI-Powered Smart College Management System",
      category: "Software & Web",
      tagline: "Campus administration & student management portal",
      description: "A management portal designed for academic institutions to organize student records, course information, and administrative workflows with smart automation.",
      technologies: ["Python", "JavaScript", "HTML", "CSS", "DBMS"],
      githubUrl: "https://github.com/Rashishimam/AI-Powered-Smart-College-Management-System",
      liveUrl: null,
      highlights: [
        "Student record management and administrative features",
        "Structured database design and data organization",
      ],
      codePreview: {
        file: "college_system.py",
        snippet: "class CollegeManagement:\n    def get_student_record(self, student_id):\n        return self.db.query(student_id)",
      },
    },
    {
      num: "05",
      title: "Profile Technology Icons",
      category: "Developer Tools",
      tagline: "Curated vector tech badge collection for developer profiles",
      description: "A curated and organized repository of technology icons, badges, and vector assets crafted to elevate developer GitHub profiles and portfolios.",
      technologies: ["SVG", "Markdown", "Git", "GitHub"],
      githubUrl: "https://github.com/Rashishimam/profile-technology-icons",
      liveUrl: null,
      highlights: [
        "Curated icons and badge shields for developer profiles",
        "Organized documentation and open-source assets",
      ],
      codePreview: {
        file: "icons.md",
        snippet: '<img src="https://raw.githubusercontent.com/.../cplusplus.svg" alt="C++" width="40"/>',
      },
    },
    {
      num: "06",
      title: "SMS Spam Detection",
      category: "Machine Learning / Python",
      tagline: "Text messaging spam classifier & filtering pipeline",
      description: "A machine learning model trained to classify SMS text messages as Ham or Spam through text preprocessing and predictive algorithms.",
      technologies: ["Python", "Machine Learning", "NLP"],
      githubUrl: "https://github.com/Rashishimam/sms-spam-detection",
      liveUrl: null,
      highlights: [
        "Text preprocessing and normalization with Python",
        "Trained classification model for message filtering",
      ],
      codePreview: {
        file: "sms_filter.py",
        snippet: "def classify_sms(message):\n    return model.predict([preprocess(message)])[0]",
      },
    },
  ],

  // -----------------------------------------------------------------------
  // 6. EDUCATION SECTION
  // -----------------------------------------------------------------------
  education: [
    {
      id: 1,
      institution: "Bachelor of Technology (B.Tech)",
      degree: "Computer Science & Engineering",
      year: "3rd Year",
      period: "2024 – 2028",
      location: "India",
      description: "Currently pursuing 3rd Year undergraduate coursework in Computer Science and Engineering, covering core algorithms, system architecture, database management, and software engineering.",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (OOP)",
        "Database Management Systems (DBMS)",
        "Operating Systems",
        "Computer Networks",
      ],
    },
  ],

  // -----------------------------------------------------------------------
  // 7. ACHIEVEMENTS / EXPERIENCE SECTION
  // -----------------------------------------------------------------------
  achievements: [
    {
      id: 1,
      category: "Hackathons",
      title: "Smart India Hackathon (SIH) Project",
      issuer: "Smart India Hackathon",
      date: "Ongoing",
      badge: "National Hackathon",
      description: "Engineered a dedicated solution repository addressing national-level problem statements with structured web software and workflow automation.",
      link: "https://github.com/Something4all/SIH-Project",
    },
    {
      id: 2,
      category: "Projects",
      title: "Spam Detection Machine Learning Pipelines",
      issuer: "Applied ML Projects",
      date: "2024",
      badge: "ML Implementation",
      description: "Built text classification models in Python to identify spam messages in email and SMS datasets.",
      link: "https://github.com/Rashishimam/Email-Spam-Detection",
    },
    {
      id: 3,
      category: "Software Systems",
      title: "College & Food Ordering Systems",
      issuer: "Web Projects",
      date: "2024",
      badge: "Software Development",
      description: "Developed web applications utilizing HTML, CSS, JavaScript, and database management.",
      link: "https://github.com/Rashishimam/online-food-ordering-system",
    },
    {
      id: 4,
      category: "Open Source",
      title: "Profile Technology Icons Repository",
      issuer: "GitHub Open Source",
      date: "2024",
      badge: "Developer Assets",
      description: "Maintained an open-source collection of developer technology badges and SVG assets.",
      link: "https://github.com/Rashishimam/profile-technology-icons",
    },
  ],

  // -----------------------------------------------------------------------
  // 8. CONTACT SECTION
  // -----------------------------------------------------------------------
  contact: {
    cta: "Let's build something meaningful together.",
    subheading: "I'm always open to discussing new opportunities, internship roles, hackathons, or project collaborations.",
    email: "imamrasish786@gmail.com",
    status: "Open for 3rd Year Internships & Project Collaborations",
  },
};
