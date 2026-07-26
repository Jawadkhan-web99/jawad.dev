/**
 * ============================================================
 * PROJECTS DATA — projects.js
 * ============================================================
 *
 * HOW TO ADD A NEW PROJECT:
 * -------------------------
 * Simply add a new object to the `projects` array below.
 * The website will automatically generate a project card for it.
 *
 * REQUIRED FIELDS:
 *   title       — Project name (string)
 *   image       — Path to screenshot, e.g. "images/my-project.png"
 *                 Leave as "" to show a default placeholder.
 *   description — Short description shown on the card (1–2 sentences)
 *   technologies — Array of tech names, e.g. ["React", "Node.js"]
 *   category    — One of: "Frontend" | "Backend" | "Full Stack" | "React" | "MERN"
 *   liveLink    — Full URL to the live demo (use "#" if not deployed yet)
 *   githubLink  — Full URL to the GitHub repository
 *
 * EXAMPLE:
 *   {
 *     title: "My New App",
 *     image: "images/my-new-app.png",
 *     description: "A short description of what the app does.",
 *     technologies: ["React", "Node.js", "MongoDB"],
 *     category: "MERN",
 *     liveLink: "https://my-new-app.vercel.app",
 *     githubLink: "https://github.com/jawadkhan/my-new-app"
 *   },
 *
 * ============================================================
 */

const projects = [

  // ── Project 1 ─────────────────────────────────────────────
  {
    title: "TravelX Travel Agency",
    image: "images/travelx.png",
    description:
      "A modern, fully responsive travel agency website featuring destination galleries, tour packages, booking UI, and animated hero sections. Designed to impress travellers and boost conversions.",
    technologies: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    category: "Frontend",
    liveLink: "https://travelx.vercel.app",
    githubLink: "https://github.com/jawadkh92552417/travelx"
  },

  // ── Project 2 ─────────────────────────────────────────────
  {
    title: "Hospital Management Website",
    image: "images/hospital.png",
    description:
      "A professional hospital management website with doctor profiles, department listings, appointment booking form, and a clean, trustworthy design suitable for medical institutions.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    liveLink: "https://hospital-website.vercel.app",
    githubLink: "https://github.com/jawadkh92552417/hospital-website"
  },

  // ── Project 3 ─────────────────────────────────────────────
  {
    title: "React E-Commerce Store",
    image: "images/ecommerce.png",
    description:
      "A feature-rich e-commerce store built with React. Includes product listing, cart management, category filtering, local-storage persistence, and a responsive checkout UI.",
    technologies: ["React", "CSS3", "Context API", "React Router"],
    category: "React",
    liveLink: "https://react-store-jk.vercel.app",
    githubLink: "https://github.com/jawadkh92552417/react-ecommerce"
  },

  // ── Project 4 ─────────────────────────────────────────────
  {
    title: "MERN Blog Platform",
    image: "images/blog.png",
    description:
      "A full-stack blog platform with user authentication (JWT), rich-text post creation, comments, likes, and an admin dashboard. Built on the complete MERN stack.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    category: "MERN",
    liveLink: "https://mern-blog-jk.vercel.app",
    githubLink: "https://github.com/jawadkh92552417/mern-blog"
  },

  // ── Project 5 ─────────────────────────────────────────────
  {
    title: "REST API — Task Manager",
    image: "images/taskapi.png",
    description:
      "A secure REST API for task management with full CRUD, user authentication via JWT, role-based access control, and MongoDB data persistence. Documented with Postman.",
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    category: "Backend",
    liveLink: "#",
    githubLink: "https://github.com/jawadkh92552417/task-manager-api"
  },

  // ── Project 6 ─────────────────────────────────────────────
  {
    title: "Full Stack Job Board",
    image: "images/jobboard.png",
    description:
      "A full-stack job board application where companies can post jobs and candidates can apply. Features include search, filters, user roles, and a clean dashboard for both sides.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Bootstrap 5"],
    category: "Full Stack",
    liveLink: "https://jobboard-jk.vercel.app",
    githubLink: "https://github.com/jawadkh92552417/job-board"
  }

  /*
   * ── ADD YOUR NEXT PROJECT HERE ────────────────────────────
   * Copy the block below, fill in your details, and save.
   * The new card will appear on the website automatically.
   *
   * {
   *   title: "Project Name",
   *   image: "images/project-screenshot.png",
   *   description: "What does this project do? Keep it to 1-2 sentences.",
   *   technologies: ["HTML", "CSS", "JavaScript"],
   *   category: "Frontend",
   *   liveLink: "https://your-project.vercel.app",
   *   githubLink: "https://github.com/jawadkhan/your-project"
   * },
   *
   * ─────────────────────────────────────────────────────────
   */
];
