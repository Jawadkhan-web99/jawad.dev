# Jawad Khan — Project Showcase Portfolio

A modern, fully responsive developer portfolio built with HTML5, CSS3, JavaScript, and Bootstrap 5.

---

## Live Features

- Dark / Light mode toggle (saved to localStorage)
- Animated hero with typed-text role rotation
- Scroll-reveal animations (AOS)
- Skills section with animated progress bars
- Dynamic project cards — generated entirely from a JavaScript array
- Category filter buttons (All / Frontend / Backend / Full Stack / React / MERN)
- Live project search (by name, technology, or category)
- Project details modal on card click
- Contact form with validation
- Sticky glassmorphism navbar with active-link tracking
- Fully responsive — mobile, tablet, laptop, desktop

---

## Folder Structure

```
project-portfolio/
│
├── index.html            ← Main HTML file
│
├── css/
│   └── style.css         ← All styles (dark/light themes, animations, layout)
│
├── js/
│   ├── projects.js       ← ⭐ YOUR PROJECT DATA (edit this to add projects)
│   └── script.js         ← All JS functionality (do not edit unless customising)
│
├── images/
│   ├── profile.png       ← Your profile photo (optional)
│   └── *.png             ← Project screenshots
│
└── README.md
```

---

## How to Add a New Project

Open `js/projects.js` and add a new object to the `projects` array.  
**That's it — the card appears automatically. No HTML editing required.**

### Step-by-step

1. Take a screenshot of your project (recommended size: 1280 × 720 px).
2. Save it in the `images/` folder, e.g. `images/my-new-project.png`.
3. Open `js/projects.js`.
4. Add the following block inside the `projects` array (before the closing `]`):

```js
{
  title: "My New Project",
  image: "images/my-new-project.png",
  description: "A short description of what the project does. Keep it to 1–2 sentences.",
  technologies: ["React", "Node.js", "MongoDB"],
  category: "MERN",
  liveLink: "https://my-new-project.vercel.app",
  githubLink: "https://github.com/jawadkhan/my-new-project"
},
```

5. Save the file and refresh the browser. Done.

---

## Project Object Fields

| Field          | Type       | Required | Description |
|----------------|------------|----------|-------------|
| `title`        | `string`   | Yes      | Project name shown on the card |
| `image`        | `string`   | No       | Path to screenshot, e.g. `"images/project.png"`. Leave `""` to show a placeholder. |
| `description`  | `string`   | Yes      | Short description (1–2 sentences) |
| `technologies` | `string[]` | Yes      | Array of tech names, e.g. `["React", "CSS3"]` |
| `category`     | `string`   | Yes      | Must be one of the values below |
| `liveLink`     | `string`   | Yes      | Full URL to live demo. Use `"#"` if not deployed yet. |
| `githubLink`   | `string`   | Yes      | Full URL to GitHub repository |

### Valid Category Values

| Value        | Filter button it appears under |
|--------------|-------------------------------|
| `Frontend`   | Frontend                      |
| `Backend`    | Backend                       |
| `Full Stack` | Full Stack                    |
| `React`      | React                         |
| `MERN`       | MERN                          |

> A project always appears under **All** regardless of category.

---

## Personalisation Checklist

Open `index.html` and update:

- [ ] Your **email address** (3 occurrences — hero socials, contact cards, footer)
- [ ] Your **GitHub URL** (hero socials, contact card, footer)
- [ ] Your **LinkedIn URL** (hero socials, contact card, footer)
- [ ] The **About section** stats (projects count, years coding, technologies)
- [ ] Replace `images/profile.png` with your actual profile photo

Open `js/projects.js` and:

- [ ] Replace the 6 example projects with your own real projects

---

## Connecting the Contact Form

The contact form currently **simulates** sending (logs to the console).  
To make it actually send emails, replace the `setTimeout` block in `js/script.js`  
(inside `initContactForm`) with a real service call.

### Option A — EmailJS (free, no backend needed)

```js
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  from_name:  name,
  from_email: email,
  message:    message,
}).then(() => {
  setFeedback('success');
}).catch(() => {
  setFeedback('error');
});
```

Add the EmailJS SDK before your scripts in `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>emailjs.init('YOUR_PUBLIC_KEY');</script>
```

### Option B — Formspree (free, form action URL)

Change the `<form>` tag in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
```

---

## Adding a Profile Photo

1. Place your photo at `images/profile.png` (square crop works best).
2. In `index.html`, find the `<div class="hero-avatar">` block and replace:

```html
<!-- Before -->
<div class="avatar-placeholder" aria-label="Developer illustration">
  <i class="fas fa-code"></i>
</div>

<!-- After -->
<img src="images/profile.png" alt="Jawad Khan profile photo" />
```

---

## Tech Stack

| Technology    | Version | Purpose |
|---------------|---------|---------|
| HTML5         | —       | Markup & semantics |
| CSS3          | —       | Styling, animations, CSS variables |
| JavaScript    | ES2020+ | All interactivity |
| Bootstrap     | 5.3.2   | Grid, modal, collapse |
| Font Awesome  | 6.5.0   | Icons |
| Google Fonts  | —       | Inter + Fira Code |
| AOS           | 2.3.4   | Scroll-reveal animations |

All libraries are loaded from CDN — no build step or npm required.

---

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## License

Free to use for your personal portfolio. No attribution required.
