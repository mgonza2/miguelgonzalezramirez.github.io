(function () {
  'use strict';

  const config = window.PORTFOLIO_CONFIG || {};
  const root = document.body.dataset.root || '.';

  function resolveInternal(path) {
    if (!path) return '';
    if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
    const cleanRoot = root.endsWith('/') ? root.slice(0, -1) : root;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${cleanRoot}/${cleanPath}`.replace(/\/\.\//g, '/');
  }

  document.querySelectorAll('[data-config-link]').forEach((link) => {
    const type = link.dataset.configLink;
    let value = '';

    if (type === 'email' && config.email) value = `mailto:${config.email}`;
    if (type === 'linkedin') value = config.linkedinUrl || '';
    if (type === 'github') value = config.githubUrl || '';
    if (type === 'resume') value = resolveInternal(config.resumePath || '');

    if (value) {
      link.href = value;
      link.removeAttribute('aria-disabled');
      link.classList.remove('is-disabled');
      if (/^https?:/i.test(value)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    } else if (type === 'resume') {
      link.href = `${root}/#resume-required`.replace(/\/\.\//g, '/');
      link.setAttribute('aria-disabled', 'true');
      link.classList.add('is-disabled');
      link.title = 'Add the current resume PDF in assets/js/config.js before launch.';
    } else {
      const container = link.closest('[data-optional-link]');
      if (container) container.hidden = true;
      else link.hidden = true;
    }
  });


  const contactReady = Boolean(config.email && config.linkedinUrl && config.resumePath);
  document.querySelectorAll('[data-config-note="contact"]').forEach((note) => {
    note.hidden = contactReady;
  });

  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (nav) {
    const updateNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navMenu.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('has-motion');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((node) => node.classList.add('is-visible'));
  }
})();
