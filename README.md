# Jawad Khan — Project Showcase Portfolio

A modern, lightning-fast, fully responsive developer portfolio built with React 18, Vite, CSS3, and Bootstrap 5.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Live Features

- ⚡ **Ultra Fast React 18 + Vite** build system & instant HMR
- 🌓 Dark / Light mode toggle (saved to `localStorage`)
- ✍️ Animated hero with typewriter role rotation (`useTypedText` hook)
- 🎭 Scroll-reveal animations (AOS)
- 📊 Interactive skills section with animated progress bars
- 🗂️ 3-Panel Project Showcase system (Frontend, Backend, Full Stack with live counts)
- 🔍 Instant client-side search & category filtering
- 🖼️ Rich project details modal popup
- 📬 Contact form with Web3Forms integration & live validation
- 🔮 Interactive subtle neon cursor glow trail
- 📱 Fully responsive across all devices (Mobile, Tablet, Desktop)

---

## Folder Structure

```
project-portfolio/
├── index.html            ← Vite entry HTML
├── package.json          ← Scripts and dependencies
├── vite.config.js        ← Vite React configuration
├── public/               ← Static assets (images, profile photo)
│   ├── images/
│   │   └── profile.png
│   └── jwd.png
├── src/
│   ├── main.jsx          ← React DOM root entry
│   ├── App.jsx           ← Main application component
│   ├── style.css         ← Global styles & animations
│   ├── data/
│   │   └── projects.js   ← ⭐ YOUR PROJECT DATA (edit here to add projects)
│   ├── hooks/
│   │   ├── useTheme.js   ← Dark/Light mode hook
│   │   └── useTypedText.js ← Typewriter effect hook
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Skills.jsx
│       ├── ProjectsPanels.jsx
│       ├── ShowcaseOverlay.jsx
│       ├── ProjectModal.jsx
│       ├── Contact.jsx
│       ├── Footer.jsx
│       ├── WhatsAppFloat.jsx
│       ├── BackToTop.jsx
│       └── CursorTrail.jsx
```

---

## How to Add a New Project

Open `src/data/projects.js` and add a new object to the `projects` array:

```js
{
  title: "My New Project",
  image: "/images/my-new-project.png",
  description: "A short description of what the project does.",
  technologies: ["React", "Node.js", "MongoDB"],
  category: "Full Stack",
  liveLink: "https://my-new-project.vercel.app",
  githubLink: "https://github.com/jawadkh92552417/my-new-project"
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
