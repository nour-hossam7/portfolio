// Scroll reveal effect for sections
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const revealSection = (section) => {
    section.classList.add('reveal');
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealSection(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(section => {
    observer.observe(section);
  });
});
/**
 * Nour Hossam — Portfolio
 * Navigation, theme toggle, scroll animations, skill bars
 */

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const contactForm = document.getElementById('contactForm');
  const skillFills = document.querySelectorAll('.skill-fill');

  // ——— Theme (dark/light) ———
  const STORAGE_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function initTheme() {
    const theme = getPreferredTheme();
    setTheme(theme);
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    setTheme(isLight ? 'dark' : 'light');
  });

  initTheme();

  // ——— Mobile nav ———
  function openMenu() {
    navLinks.classList.add('active');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) closeMenu();
    else openMenu();
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ——— Nav background on scroll ———
  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ——— Smooth scroll for anchor links ———
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

  // ——— Section reveal + skill bars ———
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

  // ——— Contact form ———
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Placeholder: in production you would send to an API or mailto
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

  // ——— Footer year ———
  const footerYear = document.querySelector('.footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
})();
