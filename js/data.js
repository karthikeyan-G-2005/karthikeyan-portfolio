/* ============================================================
   PROJECT DATA – edit freely.
   Only verified facts are filled in. Empty github = "Coming soon".
   cat values: ai | web | app | mgmt | internship
   Replace "thumb" with your real screenshot path when you have one,
   and set illustrative:false to remove the "Illustrative" badge.
   ============================================================ */
window.PROJECTS = [
  {
    id: "wellness-ai", title: "Wellness AI", cats: ["ai", "app"], catLabel: "AI & Machine Learning",
    short: "An AI-powered wellness application that tracks and improves users' physical and mental well-being through intelligent insights and recommendations.",
    thumb: "assets/projects/wellness-ai.svg", illustrative: true,
    tech: ["Python", "Machine Learning", "AI"], features: ["AI-driven wellness insights and recommendations", "Physical and mental health tracking"],
    github: ""
  },
  {
    id: "emotion-detection", title: "Real-Time Facial Emotion Detection Using CNN and OpenCV", cats: ["ai"], catLabel: "AI & Machine Learning",
    short: "A computer vision application focused on real-time facial emotion detection using Convolutional Neural Networks and OpenCV.",
    thumb: "assets/projects/emotion-detection.svg", illustrative: true,
    tech: ["CNN", "OpenCV", "Python", "Deep Learning"], features: ["Real-time facial emotion detection via webcam", "Classifies emotions using a trained CNN model"],
    github: ""
  },
  {
    id: "text-to-voice", title: "Text-to-Voice", cats: ["app"], catLabel: "Applications & Web",
    short: "A Python application that converts written text into natural-sounding speech using text-to-speech synthesis.",
    thumb: "assets/projects/text-to-voice.svg", illustrative: true,
    tech: ["Python", "pyttsx3", "gTTS"], features: ["Converts written text into speech", "Supports multiple voices and languages"],
    github: ""
  },
  {
    id: "pdf-word-compare", title: "PDF and Word Comparison Web App", cats: ["web", "app"], catLabel: "Applications & Web",
    short: "Web application for comparing PDF and Word documents and highlighting differences between them.",
    thumb: "assets/projects/pdf-word-compare.svg", illustrative: true,
    tech: ["Python", "Flask", "HTML", "CSS", "JavaScript"], features: ["Compares PDF and Word documents side-by-side", "Highlights differences between documents"],
    github: ""
  },
  {
    id: "online-auction", title: "Online Auction System", cats: ["web"], catLabel: "Applications & Web",
    short: "A web-based platform for managing online auctions and bidding, allowing users to list items and place bids in real time.",
    thumb: "assets/projects/online-auction.svg", illustrative: true,
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], features: ["Item listing and real-time bidding system", "User registration, login, and auction management"],
    github: ""
  },
  {
    id: "attendance-system", title: "Real-Time Attendance System", cats: ["mgmt"], catLabel: "Management Systems",
    short: "An application for managing and tracking student or employee attendance in real time with reporting features.",
    thumb: "assets/projects/attendance-system.svg", illustrative: true,
    tech: ["Python", "MySQL", "Tkinter"], features: ["Real-time attendance tracking and management", "Automated attendance reports and analytics"],
    github: ""
  },
  {
    id: "hospital-management", title: "Hospital Management System", cats: ["mgmt", "web"], catLabel: "Management Systems",
    short: "A full-stack web application for managing hospital operations including patient records, appointments, and staff management.",
    thumb: "assets/projects/hospital-management.svg", illustrative: true,
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], features: ["Patient record and appointment management", "Staff and department management; built at CodeBind Technologies (May–Jun 2025)"],
    github: "", cert: "codebind-hospital-project"
  },
  {
    id: "shop-billing", title: "Shop Billing System", cats: ["mgmt", "app"], catLabel: "Management Systems",
    short: "A desktop billing and sales management application for retail shops with invoice generation and inventory tracking.",
    thumb: "assets/projects/shop-billing.svg", illustrative: true,
    tech: ["Python", "Tkinter", "MySQL"], features: ["Invoice and bill generation for retail shops", "Sales records and inventory management"],
    github: ""
  },
  {
    id: "internship-projects", title: "Internship Projects", cats: ["internship"], catLabel: "Internship Projects",
    short: "Data Science projects completed during internships at Internship Studio (iStudio) and DecodeLabs, covering data analysis, machine learning, and practical applications.",
    thumb: "assets/projects/internship-projects.svg", illustrative: true,
    tech: ["Python", "Pandas", "NumPy", "Machine Learning", "Data Science"], features: ["Data analysis and machine learning projects", "Practical Data Science work at iStudio & DecodeLabs"],
    github: ""
  }
];

/* ============================================================
   CERTIFICATES – image files are in assets/certs
   ============================================================ */
window.CERTS = [
  { title: "Data Science Internship", org: "Internship Studio", date: "24 Oct 2026", id: "ISDSCI3564446", img: "istudio-internship" },
  { title: "Data Science Training", org: "Internship Studio", date: "24 Oct 2026", id: "ISDSCT3564446", img: "istudio-training" },
  { title: "Letter of Recommendation", org: "DecodeLabs", date: "15 Sep 2026", id: "", img: "decodelabs-lor" },
  { title: "Data Science Virtual Internship", org: "DecodeLabs", date: "11 Sep 2026", id: "DS087569 (Student ID)", img: "decodelabs-internship" },
  { title: "Corporate Training Test – Placement Aptitude", org: "CodeBind Technologies", date: "19 Jun 2025", id: "CBTAC192005250518", img: "codebind-placement-test" },
  { title: "Workshop on Artificial Intelligence", org: "CodeBind Technologies", date: "19 Jun 2025", id: "CBTWC192005250518", img: "codebind-ai-workshop" },
  { title: "Inplant Training – Web Development", org: "CodeBind Technologies", date: "19 Jun 2025", id: "CBTIPC192005250518", img: "codebind-inplant-training" },
  { title: "Hospital Management System – Project Completion", org: "CodeBind Technologies", date: "19 Jun 2025", id: "CBTINC192005250518", img: "codebind-hospital-project" },
  { title: "Web Development Internship", org: "CodeBind Technologies", date: "19 Jun 2025", id: "CBTINC192005250518", img: "codebind-web-internship" },
  { title: "Hackathon – Socket & Packet Mastery", org: "Vellore Institute of Technology", date: "9–10 Nov 2024", id: "", img: "vit-hackathon" },
  { title: "AI Knowledge Challenge 2026 – Top 20", org: "Gamnexis × Unstop", date: "2026", id: "", img: "unstop-ai-challenge" }
];
