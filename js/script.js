/**
 * ============================================================
 * JAWAD KHAN — PORTFOLIO MAIN SCRIPT
 * script.js
 * ============================================================
 *
 * Sections:
 *  1.  Theme (Dark / Light Mode)
 *  2.  AOS Scroll Animations
 *  3.  Navbar — scroll behaviour & active link tracking
 *  4.  Typed Text — hero role animation
 *  5.  Skill Bar Animations
 *  6.  Panel Counts — update badge numbers
 *  7.  Showcase Overlay — open / close / render cards
 *  8.  Showcase Search
 *  9.  Project Detail Modal
 * 10.  Contact Form
 * 11.  Back-to-Top Button
 * 12.  Footer Year
 * 13.  Init
 * ============================================================
 */

'use strict';

/* ============================================================
   1. THEME — Dark / Light Mode
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function initTheme() {
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
}

/* ============================================================
   2. AOS — Scroll Reveal Animations
   ============================================================ */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 60 });
  }
}

/* ============================================================
   3. NAVBAR — Scroll behaviour & active link tracking
   ============================================================ */
function initNavbar() {
  const navbar   = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  };

  function updateActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navbarNav');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ============================================================
   4. TYPED TEXT — Hero role animation
   ============================================================ */
function initTypedText() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const roles = [
    'Web Developer',
    'Frontend Developer',
    'MERN Stack Developer',
    'React Developer',
    'UI/UX Enthusiast',
  ];

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ============================================================
   5. SKILL BAR ANIMATIONS
   ============================================================ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width') || '0';
        setTimeout(() => { fill.style.width = `${width}%`; }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

/* ============================================================
   6. PANEL COUNTS — update badge numbers on each panel
   ============================================================ */
function initPanelCounts() {
  if (typeof projects === 'undefined' || !Array.isArray(projects)) return;

  const countFE = projects.filter(p => p.category === 'Frontend').length;
  const countBE = projects.filter(p => p.category === 'Backend').length;
  const countFS = projects.filter(p => p.category === 'Full Stack').length;

  const feEl = document.getElementById('fe-count');
  const beEl = document.getElementById('be-count');
  const fsEl = document.getElementById('fs-count');

  if (feEl) feEl.textContent = `${countFE} Project${countFE !== 1 ? 's' : ''}`;
  if (beEl) beEl.textContent = `${countBE} Project${countBE !== 1 ? 's' : ''}`;
  if (fsEl) fsEl.textContent = `${countFS} Project${countFS !== 1 ? 's' : ''}`;
}

/* ============================================================
   7. SHOWCASE OVERLAY
   ============================================================ */

/** Currently open category */
let activeCategory = '';

/** Config per category */
const categoryConfig = {
  'Frontend': {
    iconClass: 'fe',
    icon: '<i class="fas fa-palette"></i>',
    meta: 'HTML · CSS · JavaScript · React · Bootstrap',
    gradient: 'linear-gradient(135deg, #6c63ff, #06b6d4)',
  },
  'Backend': {
    iconClass: 'be',
    icon: '<i class="fas fa-server"></i>',
    meta: 'Node.js · Express.js · MongoDB · REST APIs',
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
  },
  'Full Stack': {
    iconClass: 'fs',
    icon: '<i class="fas fa-layer-group"></i>',
    meta: 'MERN Stack · Complete Web Applications',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
};

/**
 * Open the showcase overlay for a given category.
 * @param {string} category  'Frontend' | 'Backend' | 'Full Stack'
 */
function openShowcase(category) {
  activeCategory = category;

  const overlay    = document.getElementById('showcaseOverlay');
  const titleEl    = document.getElementById('showcaseTitle');
  const metaEl     = document.getElementById('showcaseMeta');
  const iconEl     = document.getElementById('showcaseIcon');
  const searchEl   = document.getElementById('showcaseSearch');
  if (!overlay) return;

  const cfg = categoryConfig[category] || {};

  // Populate header
  if (titleEl) titleEl.textContent = `${category} Projects`;
  if (metaEl)  metaEl.textContent  = cfg.meta || '';
  if (iconEl) {
    iconEl.className = `showcase-icon ${cfg.iconClass || ''}`;
    iconEl.innerHTML = cfg.icon || '';
  }

  // Clear search
  if (searchEl) searchEl.value = '';

  // Render cards
  renderShowcaseCards('');

  // Show overlay
  overlay.removeAttribute('hidden');
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  // Lock body scroll
  document.body.style.overflow = 'hidden';

  // Focus the close button for accessibility
  const closeBtn = document.getElementById('showcaseClose');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 350);
}

/** Close the showcase overlay. */
function closeShowcase() {
  const overlay = document.getElementById('showcaseOverlay');
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = '';

  // Re-hide after transition
  setTimeout(() => {
    overlay.setAttribute('hidden', '');
    activeCategory = '';
  }, 360);
}

/**
 * Render project cards inside the showcase grid.
 * @param {string} query  Search string (may be empty)
 */
function renderShowcaseCards(query) {
  const grid    = document.getElementById('showcaseGrid');
  const noRes   = document.getElementById('showcaseNoResults');
  if (!grid) return;

  const q = (query || '').toLowerCase().trim();

  const filtered = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => {
      if (project.category !== activeCategory) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some(t => t.toLowerCase().includes(q))
      );
    });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noRes) noRes.style.display = 'block';
    return;
  }

  if (noRes) noRes.style.display = 'none';

  grid.innerHTML = filtered
    .map(({ project, index }, i) => buildShowcaseCard(project, index, i))
    .join('');

  // Attach click listeners
  grid.querySelectorAll('.sc-card').forEach(card => {
    card.addEventListener('click', onShowcaseCardClick);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onShowcaseCardClick.call(card, e);
      }
    });
  });
}

/**
 * Build the HTML for one showcase card.
 * @param {Object} project
 * @param {number} originalIndex  Index in the global projects array
 * @param {number} renderIndex    Position in current render batch (for stagger)
 * @returns {string}
 */
function buildShowcaseCard(project, originalIndex, renderIndex) {
  const techBadges = project.technologies
    .map(t => `<span class="tech-badge">${escapeHTML(t)}</span>`)
    .join('');

  const imgHTML = project.image
    ? `<img
         src="${escapeHTML(project.image)}"
         alt="${escapeHTML(project.title)} screenshot"
         loading="lazy"
         onerror="this.parentElement.innerHTML='<div class=\\'sc-img-placeholder\\'><i class=\\'fas fa-image\\'></i><span>Screenshot coming soon</span></div>'"
       />`
    : `<div class="sc-img-placeholder">
         <i class="fas fa-image" aria-hidden="true"></i>
         <span>Screenshot coming soon</span>
       </div>`;

  const liveDisabled = (!project.liveLink || project.liveLink === '#')
    ? 'style="opacity:0.5;pointer-events:none;"'
    : '';

  return `
    <article
      class="sc-card"
      role="button"
      tabindex="0"
      aria-label="View details for ${escapeHTML(project.title)}"
      data-index="${originalIndex}"
      style="animation-delay:${renderIndex * 70}ms"
    >
      <div class="sc-img-wrap">
        ${imgHTML}
        <div class="sc-img-overlay" aria-hidden="true">
          <a href="${escapeHTML(project.liveLink || '#')}"
             target="_blank" rel="noopener noreferrer"
             class="overlay-btn"
             onclick="event.stopPropagation()"
             ${liveDisabled}>
            <i class="fas fa-external-link-alt"></i> Live
          </a>
          <a href="${escapeHTML(project.githubLink || '#')}"
             target="_blank" rel="noopener noreferrer"
             class="overlay-btn"
             onclick="event.stopPropagation()">
            <i class="fab fa-github"></i> Code
          </a>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-category"># ${escapeHTML(project.category)}</div>
        <h3 class="sc-title">${escapeHTML(project.title)}</h3>
        <p class="sc-desc">${escapeHTML(project.description)}</p>
        <div class="sc-tech-list">${techBadges}</div>
      </div>

      <div class="sc-footer">
        <a href="${escapeHTML(project.liveLink || '#')}"
           target="_blank" rel="noopener noreferrer"
           class="sc-btn sc-btn-live"
           onclick="event.stopPropagation()"
           ${liveDisabled}>
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
        <a href="${escapeHTML(project.githubLink || '#')}"
           target="_blank" rel="noopener noreferrer"
           class="sc-btn sc-btn-github"
           onclick="event.stopPropagation()">
          <i class="fab fa-github"></i> Code
        </a>
      </div>
    </article>
  `;
}

/** Click handler for showcase cards — opens project detail modal. */
function onShowcaseCardClick(e) {
  if (e.target.closest('a, button')) return;
  const card  = e.currentTarget || this;
  const index = parseInt(card.getAttribute('data-index'), 10);
  if (isNaN(index) || !projects[index]) return;
  openProjectModal(projects[index]);
}

/* ============================================================
   8. SHOWCASE SEARCH
   ============================================================ */
function initShowcaseSearch() {
  const searchEl = document.getElementById('showcaseSearch');
  if (!searchEl) return;

  let debounceTimer;
  searchEl.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderShowcaseCards(searchEl.value);
    }, 220);
  });
}

/* ============================================================
   9. PROJECT DETAIL MODAL
   ============================================================ */
function openProjectModal(project) {
  const setEl = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setEl('modalTitle',       project.title);
  setEl('modalCategory',    `# ${project.category || 'Project'}`);
  setEl('modalDescription', project.description);

  // Image
  const modalImage = document.getElementById('modalImage');
  if (modalImage) {
    if (project.image) {
      modalImage.src = project.image;
      modalImage.alt = `${project.title} screenshot`;
      modalImage.style.display = 'block';
      modalImage.onerror = () => { modalImage.style.display = 'none'; };
    } else {
      modalImage.style.display = 'none';
    }
  }

  // Technologies
  const techContainer = document.getElementById('modalTechnologies');
  if (techContainer) {
    techContainer.innerHTML = project.technologies
      .map(t => `<span class="tech-badge">${escapeHTML(t)}</span>`)
      .join('');
  }

  // Action buttons
  const liveLink   = document.getElementById('modalLiveLink');
  const githubLink = document.getElementById('modalGithubLink');

  if (liveLink) {
    liveLink.href = project.liveLink || '#';
    const noLive = !project.liveLink || project.liveLink === '#';
    liveLink.style.opacity       = noLive ? '0.5' : '1';
    liveLink.style.pointerEvents = noLive ? 'none' : 'auto';
  }
  if (githubLink) githubLink.href = project.githubLink || '#';

  const modalLabel = document.getElementById('projectModalLabel');
  if (modalLabel) modalLabel.textContent = project.title;

  const modalEl = document.getElementById('projectModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

/* ============================================================
   10. CONTACT FORM — Web3Forms integration
   ============================================================ */
function initContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const sendBtn  = document.getElementById('sendBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    setFeedback('hidden');
    if (sendBtn) {
      sendBtn.disabled  = true;
      sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    }

    try {
      const formData = new FormData(form);
      const jsonBody = JSON.stringify(Object.fromEntries(formData));

      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    jsonBody,
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback('success');
        form.reset();
        form.classList.remove('was-validated');
        setTimeout(() => setFeedback('hidden'), 6000);
      } else {
        setFeedback('error', data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Network error:', err);
      setFeedback('error', 'Network error. Please check your connection and try again.');
    } finally {
      if (sendBtn) {
        sendBtn.disabled  = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
      }
    }
  });

  function setFeedback(state, customMsg) {
    if (!feedback) return;
    feedback.className     = 'form-feedback';
    feedback.style.display = '';
    switch (state) {
      case 'success':
        feedback.className += ' success';
        feedback.innerHTML  = '<i class="fas fa-check-circle me-2"></i>Message sent! I\'ll get back to you soon. ✅';
        break;
      case 'error':
        feedback.className += ' error';
        feedback.innerHTML  = `<i class="fas fa-exclamation-circle me-2"></i>${customMsg || 'Something went wrong. Please email me directly.'}`;
        break;
      default:
        feedback.style.display = 'none';
    }
  }
}

/* ============================================================
   11. BACK-TO-TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   12. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   UTILITY — HTML escaping
   ============================================================ */
function escapeHTML(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

/* ============================================================
   PAGE LOADER
   ============================================================ */
(function initLoader() {
  document.body.classList.add('loading');

  function hideLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    setTimeout(() => loader.remove(), 700);
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 3000);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 3000));
    setTimeout(hideLoader, 8000);
  }
})();

/* ============================================================
   13. INIT — Run on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  initTheme();
  initAOS();
  initNavbar();
  initTypedText();
  initSkillBars();

  // ── Panel system ──
  if (typeof projects !== 'undefined' && Array.isArray(projects)) {
    initPanelCounts();
  } else {
    console.warn('projects.js not loaded or projects array is missing.');
  }

  // ── Panel click → open showcase ──
  document.querySelectorAll('.panel-card').forEach(panel => {
    panel.addEventListener('click', () => {
      const category = panel.getAttribute('data-category');
      if (category) openShowcase(category);
    });
    panel.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const category = panel.getAttribute('data-category');
        if (category) openShowcase(category);
      }
    });
  });

  // ── Showcase close button ──
  const closeBtn = document.getElementById('showcaseClose');
  if (closeBtn) closeBtn.addEventListener('click', closeShowcase);

  // ── Close on backdrop click ──
  const overlay = document.getElementById('showcaseOverlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeShowcase();
    });
  }

  // ── Close on Escape key ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const ov = document.getElementById('showcaseOverlay');
      if (ov && ov.classList.contains('active')) closeShowcase();
    }
  });

  // ── Showcase search ──
  initShowcaseSearch();

  // ── Other sections ──
  initContactForm();
  initBackToTop();
  initFooterYear();

  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 300);
});
