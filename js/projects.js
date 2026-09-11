/**
 * ============================================================
 * PROJECTS DATA — projects.js
 * ============================================================
 *
 * HOW TO ADD A NEW PROJECT:
 * -------------------------
 * Simply add a new object to the `projects` array below.
 *
 * REQUIRED FIELDS:
 *   title        — Project name (string)
 *   image        — Path to screenshot, e.g. "images/my-project.png"
 *                  Leave as "" to show a default placeholder.
 *   description  — Short description shown on the card (1–2 sentences)
 *   technologies — Array of tech names, e.g. ["React", "Node.js"]
 *   category     — One of: "Frontend" | "Backend" | "Full Stack"
 *   liveLink     — Full URL to the live demo (use "#" if not deployed yet)
 *   githubLink   — Full URL to the GitHub repository
 *
 * ============================================================
 */

const projects = [

  /* ═══════════════════════════════════════
     FRONTEND PROJECTS
  ═══════════════════════════════════════ */

  {
    title: "DriveLux Motors — Luxury Car Showroom",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    description:
      "A luxury car showroom platform featuring brand-new and pre-owned vehicle collections, interactive test-drive booking, financing plans, and dark/light mode.",
    technologies: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    category: "Frontend",
    liveLink: "https://car-showroom-website-554s.vercel.app/",
    githubLink: "https://github.com/jawadkh92552417"
  },

  {
    title: "TravelX — Travel Agency Website",
    image: "images/travelx.png",
    description:
      "A fully responsive travel agency website with destination galleries, animated hero sections, tour packages UI, and smooth scroll interactions. Optimized for all screen sizes.",
    technologies: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    category: "Frontend",
    liveLink: "https://travel-website-project-smtj.vercel.app/",
    githubLink: "https://github.com/jawadkh92552417/travelx"
  },

  /* ═══════════════════════════════════════
     BACKEND PROJECTS
  ═══════════════════════════════════════ */

  {
    title: "TaskFlow — REST API",
    image: "images/taskapi.png",
    description:
      "A secure REST API for task management with full CRUD operations, JWT-based authentication, role-based access control, and MongoDB persistence. Fully documented via Postman.",
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    category: "Backend",
    liveLink: "#",
    githubLink: "https://github.com/jawadkh92552417/task-manager-api"
  },

  {
    title: "AuthGuard — User Auth API",
    image: "images/authapi.png",
    description:
      "A robust authentication API with register/login, JWT access + refresh tokens, bcrypt password hashing, and protected route middleware. Production-ready structure.",
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
    category: "Backend",
    liveLink: "#",
    githubLink: "https://github.com/jawadkh92552417"
  },

  /* ═══════════════════════════════════════
     FULL STACK PROJECTS
  ═══════════════════════════════════════ */

  {
    title: "Jawad's Dev Portfolio",
    image: "images/portfolio.png",
    description:
      "This portfolio website — built from scratch with vanilla HTML, CSS, and JavaScript. Features dark/light mode, animated UI, project showcase system, and a working contact form.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Web3Forms"],
    category: "Full Stack",
    liveLink: "#",
    githubLink: "https://github.com/jawadkh92552417"
  },

  {
    title: "MERN Blog Platform",
    image: "images/blog.png",
    description:
      "A full-stack blog platform with JWT authentication, rich-text post creation, comments, and an admin dashboard — built on the complete MERN stack.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    category: "Full Stack",
    liveLink: "https://mern-blog-jk.vercel.app",
    githubLink: "https://github.com/jawadkh92552417/mern-blog"
  },

];
