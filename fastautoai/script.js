'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const backToTop = document.getElementById('back-to-top');
  const progress = document.getElementById('scroll-progress');
  const faqItems = document.querySelectorAll('.faq-item');
  const fadeEls = document.querySelectorAll('.fade-up');

  /* --- Mobile menu --- */
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-nav';
  mobileMenu.id = 'mobile-nav';
  mobileMenu.innerHTML = document.querySelector('.nav-links').innerHTML +
    '<a href="https://cal.com/muhammedsamal/15min" target="_blank" rel="noopener" class="btn btn-primary nav-cta" style="display:flex;">Save 20 Hours This Week →</a>';
  document.body.appendChild(mobileMenu);

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open);
  });

  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- Scroll --- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        progress.style.width = scrolled + '%';
        header.classList.toggle('scrolled', scrollY > 50);
        backToTop.classList.toggle('visible', scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --- FAQ --- */
  faqItems.forEach(item => {
    const summary = item.querySelector('.faq-question');
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.hasAttribute('open');
      faqItems.forEach(el => el.removeAttribute('open'));
      if (!isOpen) item.setAttribute('open', '');
    });
  });

  /* --- Intersection Observer --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* --- CTA buttons --- */
  document.querySelectorAll('.cta-btn, .hero-cta, .nav-cta, .pricing-btn, .demo-btn, .journey-cta a.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.closest('a[href^="https://cal.com"]')) return;
      if (!btn.closest('a')) e.preventDefault();
      if (btn.closest('a') && !btn.closest('a[href^="https://cal.com"]')) {
        e.preventDefault();
      }
    });
  });
});
