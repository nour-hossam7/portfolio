(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const contactForm = document.getElementById('contactForm');
  const skillFills = document.querySelectorAll('.skill-fill');
  const projectFilterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  const STORAGE_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    if (themeIcon) {
      themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function initTheme() {
    const theme = getPreferredTheme();
    setTheme(theme);
  }

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  initTheme();

  function openMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.add('active');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) closeMenu();
      else openMenu();
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach((section) => {
    sectionObserver.observe(section);
  });

  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute('data-level') || '80';
        fill.style.width = level + '%';
        skillBarObserver.unobserve(fill);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.2 });

  skillFills.forEach((fill) => skillBarObserver.observe(fill));

  projectFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-filter');

      projectFilterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle('active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });

      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        card.hidden = selectedCategory !== 'all' && !categories.includes(selectedCategory);
      });
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Message sent!';
        btn.style.background = 'var(--accent-cyan)';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 2500);
      }, 800);
    });
  }

  const footerYear = document.querySelector('.footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
})();
