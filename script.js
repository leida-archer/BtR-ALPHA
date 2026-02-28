/* ========================================
   Beyond the Rhythm — Website Scripts
   ======================================== */

(function () {
  'use strict';

  // ---- NAV: Scroll background + active link ----
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id], header[id]');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('mobile-menu--open');
    hamburger.classList.toggle('nav__hamburger--open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('mobile-menu--open');
      hamburger.classList.remove('nav__hamburger--open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---- COUNTDOWN TIMER ----
  // Target: Aug 15, 2026 at 20:00 PT
  var eventDate = new Date('2026-05-01T20:00:00-07:00').getTime();

  function updateCountdown() {
    var now = Date.now();
    var diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById('countDays').textContent = '00';
      document.getElementById('countHours').textContent = '00';
      document.getElementById('countMins').textContent = '00';
      document.getElementById('countSecs').textContent = '00';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countDays').textContent = String(days).padStart(3, '0');
    document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countMins').textContent = String(mins).padStart(2, '0');
    document.getElementById('countSecs').textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- SCROLL REVEAL ----
  var revealElements = [];

  function initReveal() {
    // Add reveal class to sections and grids
    var targets = [
      '.countdown-section__inner',
      '.ticket-tiers',
      '.events__grid',
      '.lineup__grid',
      '.about__grid',
      '.gallery__grid',
      '.newsletter__inner',
      '.footer__top'
    ];

    targets.forEach(function (selector) {
      var el = document.querySelector(selector);
      if (el) {
        el.classList.add('reveal');

        // Add stagger to grids
        if (selector.includes('__grid') || selector === '.ticket-tiers') {
          el.classList.add('reveal--stagger');
        }
        revealElements.push(el);
      }
    });

    // Also reveal section labels + titles
    document.querySelectorAll('.section-label, .section-title, .countdown-section__title').forEach(function (el) {
      el.classList.add('reveal');
      revealElements.push(el);
    });
  }

  function checkReveal() {
    var triggerPoint = window.innerHeight * 0.88;
    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        el.classList.add('reveal--visible');
      }
    });
  }

  initReveal();
  window.addEventListener('scroll', checkReveal, { passive: true });
  // Initial check
  setTimeout(checkReveal, 100);

  // ---- HERO PARTICLES ----
  function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;

    var colors = ['#D6246E', '#E8652B', '#F2A922', '#8B5CF6'];
    var count = 30;

    for (var i = 0; i < count; i++) {
      var particle = document.createElement('div');
      var size = Math.random() * 3 + 1;
      var color = colors[Math.floor(Math.random() * colors.length)];
      var x = Math.random() * 100;
      var y = Math.random() * 100;
      var duration = Math.random() * 15 + 10;
      var delay = Math.random() * 10;

      particle.style.cssText =
        'position:absolute;' +
        'width:' + size + 'px;' +
        'height:' + size + 'px;' +
        'background:' + color + ';' +
        'border-radius:50%;' +
        'left:' + x + '%;' +
        'top:' + y + '%;' +
        'opacity:' + (Math.random() * 0.4 + 0.1) + ';' +
        'animation:particleFloat ' + duration + 's ' + delay + 's infinite ease-in-out;';

      container.appendChild(particle);
    }

    // Add particle animation keyframes
    var style = document.createElement('style');
    style.textContent =
      '@keyframes particleFloat {' +
      '  0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--o, 0.2); }' +
      '  25% { transform: translate(' + (Math.random() * 40 - 20) + 'px, ' + (Math.random() * -40) + 'px) scale(1.2); opacity: calc(var(--o, 0.2) * 1.5); }' +
      '  50% { transform: translate(' + (Math.random() * 60 - 30) + 'px, ' + (Math.random() * -20) + 'px) scale(0.8); opacity: var(--o, 0.2); }' +
      '  75% { transform: translate(' + (Math.random() * -40) + 'px, ' + (Math.random() * 30) + 'px) scale(1.1); opacity: calc(var(--o, 0.2) * 0.8); }' +
      '}';
    document.head.appendChild(style);
  }

  createParticles();

  // ---- SMOOTH SCROLL for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- NEWSLETTER FORM ----
  var form = document.getElementById('newsletterForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = form.querySelector('.newsletter__input');
    var btn = form.querySelector('.newsletter__btn');
    var originalText = btn.textContent;

    btn.textContent = 'Subscribed!';
    btn.style.pointerEvents = 'none';
    input.value = '';

    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.pointerEvents = '';
    }, 3000);
  });

  // ---- ABOUT RIPPLE ANIMATION (enhanced with scroll parallax) ----
  var ripple = document.querySelector('.about__ripple');
  if (ripple) {
    window.addEventListener('scroll', function () {
      var rect = ripple.getBoundingClientRect();
      var center = window.innerHeight / 2;
      var offset = (rect.top + rect.height / 2 - center) / window.innerHeight;
      ripple.style.transform = 'scale(' + (1 + offset * 0.1) + ') rotate(' + (offset * 15) + 'deg)';
    }, { passive: true });
  }

})();
