/* ============================================================
   RHIO SUSHI & POKE — Interactions & Animations
   ============================================================ */

(function () {
  'use strict';

  // ── Mobile hamburger / menu ────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const navMenu    = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('active');
      navMenu.classList.add('open');
      navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ── Fade-up on scroll ─────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // stagger siblings inside same parent
        const siblings = Array.from(el.parentElement.querySelectorAll('.fade-up'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = `${idx * 0.1}s`;
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // ── Hero parallax (disabled — preserves image sharpness) ──

  // ── Trigger elements already visible on load ──────────────
  window.addEventListener('load', () => {
    fadeEls.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  });

})();
