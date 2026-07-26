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
 *  6.  Project Rendering
 *  7.  Project Filter
 *  8.  Project Search
 *  9.  Project Modal
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

/**
 * Applies a theme by setting the data-theme attribute on <html>
 * and updating the toggle icon. Persists choice to localStorage.
 * @param {'dark'|'light'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);

  const icon = document.getElementById('themeIcon');
  if (!icon) return;

  if (theme === 'dark') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

/** Toggle between dark and light themes. */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/** Load saved theme from localStorage (defaults to dark). */
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
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
}

/* ============================================================
   3. NAVBAR — Scroll behaviour & active link tracking
   ============================================================ */
function initNavbar() {
  const navbar  = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  /* Add/remove .scrolled class for glassmorphism effect */
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  };

  /** Highlight nav link whose section is currently in viewport */
  function updateActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* Close mobile menu when a nav link is clicked */
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

  let roleIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typingTimer = null;

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
      // Finished typing — pause then start deleting
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    typingTimer = setTimeout(type, delay);
  }

  type();
}

/* ============================================================
   5. SKILL BAR ANIMATIONS
   ============================================================ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill  = entry.target;
          const width = fill.getAttribute('data-width') || '0';
          // Small delay so AOS card animation fires first
          setTimeout(() => {
            fill.style.width = `${width}%`;
          }, 200);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach(fill => observer.observe(fill));
}

/* ============================================================
   6. PROJECT RENDERING
   ============================================================ */

/** Current active filter category */
let activeFilter = 'all';

/** Current search query */
let searchQuery  = '';

/**
 * Builds the HTML string for a single project card.
 * @param {Object} project  - Project object from projects.js
 * @param {number} index    - Index in the projects array (used for modal lookup)
 * @returns {string} HTML string
 */
function buildProjectCard(project, index) {
  // Technology badges
  const techBadges = project.technologies
    .map(tech => `<span class="tech-badge">${escapeHTML(tech)}</span>`)
    .join('');

  // Image — show placeholder SVG if image path is empty or not provided
  const imageHTML = project.image
    ? `<img
         src="${escapeHTML(project.image)}"
         alt="${escapeHTML(project.title)} screenshot"
         loading="lazy"
         onerror="this.parentElement.innerHTML = getPlaceholderHTML()"
       />`
    : getPlaceholderHTML();

  // Disable Live Demo button if liveLink is "#"
  const liveDisabled = (!project.liveLink || project.liveLink === '#') ? 'style="opacity:0.5;pointer-events:none;"' : '';

  return `
    <div class="col-sm-6 col-xl-4 project-card-wrapper">
      <article
        class="project-card"
        role="button"
        tabindex="0"
        aria-label="View details for ${escapeHTML(project.title)}"
        data-index="${index}"
      >
        <!-- Image -->
        <div class="project-img-wrapper">
          ${imageHTML}
          <div class="project-img-overlay" aria-hidden="true">
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

        <!-- Body -->
        <div class="project-card-body">
          <div class="project-category"># ${escapeHTML(project.category || 'Project')}</div>
          <h3 class="project-title">${escapeHTML(project.title)}</h3>
          <p class="project-description">${escapeHTML(project.description)}</p>
          <div class="project-tech-list" aria-label="Technologies used">${techBadges}</div>
        </div>

        <!-- Footer buttons -->
        <div class="project-card-footer">
          <a href="${escapeHTML(project.liveLink || '#')}"
             target="_blank" rel="noopener noreferrer"
             class="project-btn project-btn-live"
             onclick="event.stopPropagation()"
             aria-label="Live demo of ${escapeHTML(project.title)}"
             ${liveDisabled}>
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>
          <a href="${escapeHTML(project.githubLink || '#')}"
             target="_blank" rel="noopener noreferrer"
             class="project-btn project-btn-github"
             onclick="event.stopPropagation()"
             aria-label="GitHub source code for ${escapeHTML(project.title)}">
            <i class="fab fa-github"></i> Code
          </a>
        </div>
      </article>
    </div>
  `;
}

/** Returns HTML string for a placeholder when image is missing */
function getPlaceholderHTML() {
  return `
    <div class="project-img-placeholder">
      <i class="fas fa-image" aria-hidden="true"></i>
      <span>Screenshot coming soon</span>
    </div>
  `;
}

/**
 * Filters the projects array based on active category and search query.
 * @returns {Array<{project, originalIndex}>}
 */
function getFilteredProjects() {
  return projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => {
      // Category filter
      const categoryMatch =
        activeFilter === 'all' ||
        project.category.toLowerCase() === activeFilter.toLowerCase();

      // Search filter (name, technologies, category)
      const q = searchQuery.toLowerCase().trim();
      const searchMatch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.technologies.some(t => t.toLowerCase().includes(q));

      return categoryMatch && searchMatch;
    });
}

/**
 * Renders project cards into #projectsGrid.
 * Shows/hides the "no results" message as needed.
 */
function renderProjects() {
  const grid      = document.getElementById('projectsGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  const filtered = getFilteredProjects();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }

  if (noResults) noResults.style.display = 'none';

  // Stagger animation delays
  grid.innerHTML = filtered
    .map(({ project, index }, i) => {
      const card = buildProjectCard(project, index);
      // Inject inline animation delay for stagger effect
      return card.replace(
        'class="project-card-wrapper"',
        `class="project-card-wrapper" style="animation-delay:${i * 80}ms"`
      );
    })
    .join('');

  // Attach click + keyboard listeners for modal
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', onProjectCardClick);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onProjectCardClick.call(card, e);
      }
    });
  });
}

/**
 * Updates the count badges on each filter button.
 */
function updateFilterCounts() {
  const filterIds = ['all', 'Frontend', 'Backend', 'Full Stack', 'React', 'MERN'];

  filterIds.forEach(filter => {
    const el = document.getElementById(`count-${filter}`);
    if (!el) return;

    const count = filter === 'all'
      ? projects.length
      : projects.filter(p => p.category === filter).length;

    el.textContent = count;
  });
}

/* ============================================================
   7. PROJECT FILTER
   ============================================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter  = btn.getAttribute('data-filter') || 'all';
      searchQuery   = ''; // Reset search when filter changes

      // Clear search input visually
      const searchInput = document.getElementById('projectSearch');
      if (searchInput) searchInput.value = '';
      updateSearchClearBtn();

      renderProjects();
    });
  });

  // "Clear Filters" button inside no-results panel
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', resetFilters);
  }
}

/** Reset filter and search to defaults. */
function resetFilters() {
  activeFilter = 'all';
  searchQuery  = '';

  const filterBtns  = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => b.classList.remove('active'));
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add('active');

  const searchInput = document.getElementById('projectSearch');
  if (searchInput) searchInput.value = '';
  updateSearchClearBtn();

  renderProjects();
}

/* ============================================================
   8. PROJECT SEARCH
   ============================================================ */
function initProjectSearch() {
  const searchInput = document.getElementById('projectSearch');
  if (!searchInput) return;

  // Debounce for performance
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = searchInput.value.trim();
      updateSearchClearBtn();
      renderProjects();
    }, 250);
  });

  // Clear button
  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      updateSearchClearBtn();
      renderProjects();
      searchInput.focus();
    });
  }
}

/** Show/hide the × clear button based on whether there is input. */
function updateSearchClearBtn() {
  const clearBtn    = document.getElementById('searchClear');
  const searchInput = document.getElementById('projectSearch');
  if (!clearBtn || !searchInput) return;
  clearBtn.style.display = searchInput.value ? 'block' : 'none';
}

/* ============================================================
   9. PROJECT MODAL
   ============================================================ */

/** Called when a project card is clicked/activated. */
function onProjectCardClick(e) {
  // Don't trigger modal if user clicked a button/link inside the card
  if (e.target.closest('a, button')) return;

  const card  = e.currentTarget || this;
  const index = parseInt(card.getAttribute('data-index'), 10);

  if (isNaN(index) || !projects[index]) return;
  openProjectModal(projects[index]);
}

/**
 * Populates and opens the Bootstrap project details modal.
 * @param {Object} project
 */
function openProjectModal(project) {
  // Populate fields
  const setEl = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setEl('modalTitle',    project.title);
  setEl('modalCategory', `# ${project.category || 'Project'}`);
  setEl('modalDescription', project.description);

  // Image
  const modalImage = document.getElementById('modalImage');
  if (modalImage) {
    if (project.image) {
      modalImage.src = project.image;
      modalImage.alt = `${project.title} screenshot`;
      modalImage.style.display = 'block';
      modalImage.onerror = () => {
        modalImage.style.display = 'none';
      };
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

  // Buttons
  const liveLink   = document.getElementById('modalLiveLink');
  const githubLink = document.getElementById('modalGithubLink');

  if (liveLink) {
    liveLink.href = project.liveLink || '#';
    if (!project.liveLink || project.liveLink === '#') {
      liveLink.style.opacity        = '0.5';
      liveLink.style.pointerEvents  = 'none';
    } else {
      liveLink.style.opacity        = '1';
      liveLink.style.pointerEvents  = 'auto';
    }
  }

  if (githubLink) {
    githubLink.href = project.githubLink || '#';
  }

  // Update modal title for accessibility
  const modalLabel = document.getElementById('projectModalLabel');
  if (modalLabel) modalLabel.textContent = project.title;

  // Show modal
  const modalEl = document.getElementById('projectModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

/* ============================================================
   10. CONTACT FORM — Web3Forms integration
   Docs: https://web3forms.com
   ============================================================ */
function initContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const sendBtn  = document.getElementById('sendBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Bootstrap client-side validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Button loading state
    setFeedback('hidden');
    if (sendBtn) {
      sendBtn.disabled  = true;
      sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    }

    try {
      // Build FormData from the form (picks up all name="" fields + hidden inputs)
      const formData  = new FormData(form);
      const object    = Object.fromEntries(formData);
      const jsonBody  = JSON.stringify(object);

      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json'
        },
        body: jsonBody
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback('success');
        form.reset();
        form.classList.remove('was-validated');
        // Auto-hide after 6s
        setTimeout(() => setFeedback('hidden'), 6000);
      } else {
        // Web3Forms returned an error (e.g. invalid access key)
        console.error('Web3Forms error:', data);
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

  /**
   * Show feedback message in the form.
   * @param {'success'|'error'|'hidden'} state
   * @param {string} [customMsg]
   */
  function setFeedback(state, customMsg) {
    if (!feedback) return;
    feedback.className   = 'form-feedback';
    feedback.style.display = '';

    switch (state) {
      case 'success':
        feedback.className  += ' success';
        feedback.innerHTML   = '<i class="fas fa-check-circle me-2"></i>Message sent! I\'ll get back to you soon. ✅';
        break;
      case 'error':
        feedback.className  += ' error';
        feedback.innerHTML   = `<i class="fas fa-exclamation-circle me-2"></i>${customMsg || 'Something went wrong. Please email me directly at jawadkhanahmad7@gmail.com'}`;
        break;
      case 'hidden':
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
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
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
   UTILITY — HTML escaping (prevents XSS from project data)
   ============================================================ */
/**
 * Escapes characters that have special meaning in HTML.
 * @param {string} str
 * @returns {string}
 */
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
   13. INIT — Run everything on DOMContentLoaded
   ============================================================ */

/* ── Loader: hide as soon as window fully loads ── */
(function initLoader() {
  // Add loading class immediately (blocks scroll during load)
  document.body.classList.add('loading');

  function hideLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    // Remove from DOM after fade-out transition (0.6s)
    setTimeout(() => loader.remove(), 700);
  }

  // Hide after window load (all images/fonts ready)
  if (document.readyState === 'complete') {
    // Already loaded (rare, but handle it)
    setTimeout(hideLoader, 3000);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 3000));
    // Safety fallback — never block user more than 8s
    setTimeout(hideLoader, 8000);
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // Theme must load first (avoids flash)
  initTheme();

  // AOS
  initAOS();

  // Navbar
  initNavbar();

  // Hero typed text
  initTypedText();

  // Skill bars
  initSkillBars();

  // Projects — render cards, filter counts, then attach interactions
  if (typeof projects !== 'undefined' && Array.isArray(projects)) {
    updateFilterCounts();
    renderProjects();
    initProjectFilter();
    initProjectSearch();
  } else {
    console.warn('projects.js not loaded or projects array is missing.');
  }

  // Contact form
  initContactForm();

  // Back to top
  initBackToTop();

  // Footer year
  initFooterYear();

  // Re-run AOS refresh after projects render
  // (dynamic cards are not in the original DOM)
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 300);
});
