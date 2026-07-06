/* =============================================
   GUREZMA STUDIO — MAIN JAVASCRIPT
   ============================================= */

'use strict';

/* =============================================
   1. CUSTOM CURSOR
   ============================================= */
(function initCursor() {
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  if (!cursor || !cursorTrail) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover state
  const hoverEls = document.querySelectorAll(
    'a, button, .filter-btn, .project-card, .service-card, .tool-badge, .social-btn, .testimonial-card'
  );
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* =============================================
   2. SCROLL PROGRESS BAR
   ============================================= */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct + '%';
  }, { passive: true });
})();

/* =============================================
   3. NAVBAR SCROLL BEHAVIOUR
   ============================================= */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* =============================================
   4. MOBILE MENU
   ============================================= */
(function initMobileMenu() {
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* =============================================
   5. HERO CANVAS — PARTICLE / STREAK ANIMATION
   ============================================= */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx    = canvas.getContext('2d');
  const W      = () => canvas.width  = window.innerWidth;
  const H      = () => canvas.height = window.innerHeight;
  W(); H();
  window.addEventListener('resize', () => { W(); H(); }, { passive: true });

  // --- Particles ---
  const PARTICLE_COUNT = 90;
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * canvas.width;
      this.y  = init ? Math.random() * canvas.height : canvas.height + 10;
      this.vx = (Math.random() - .5) * .4;
      this.vy = -(Math.random() * .6 + .2);
      this.size = Math.random() * 1.5 + .3;
      this.life = 0;
      this.maxLife = 200 + Math.random() * 300;
      // 70% blue, 30% orange
      this.color = Math.random() > .3 ? '14,84,255' : '255,122,42';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life >= this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * .6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  // --- Light Streaks ---
  const STREAK_COUNT = 6;
  const streaks = [];

  class Streak {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height * .5;
      this.len   = 80 + Math.random() * 200;
      this.angle = -Math.PI / 4 + (Math.random() - .5) * .5;
      this.speed = .5 + Math.random() * 1.5;
      this.alpha = 0;
      this.life  = 0;
      this.maxLife = 120 + Math.random() * 200;
      this.color = Math.random() > .4 ? '14,84,255' : '255,122,42';
      this.width = Math.random() * 1.5 + .5;
    }
    update() {
      this.x   += Math.cos(this.angle) * this.speed;
      this.y   += Math.sin(this.angle) * this.speed;
      this.life++;
      this.alpha = Math.sin((this.life / this.maxLife) * Math.PI) * .5;
      if (this.life >= this.maxLife) this.reset();
    }
    draw() {
      const ex = this.x - Math.cos(this.angle) * this.len;
      const ey = this.y - Math.sin(this.angle) * this.len;
      const grad = ctx.createLinearGradient(ex, ey, this.x, this.y);
      grad.addColorStop(0, `rgba(${this.color},0)`);
      grad.addColorStop(1, `rgba(${this.color},${this.alpha})`);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = this.width;
      ctx.stroke();
    }
  }

  for (let i = 0; i < STREAK_COUNT; i++) {
    const s = new Streak();
    s.life = Math.random() * s.maxLife; // stagger starts
    streaks.push(s);
  }

  // --- Render loop ---
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle vignette background
    const grad = ctx.createRadialGradient(
      canvas.width * .5, canvas.height * .4, 0,
      canvas.width * .5, canvas.height * .5, canvas.width * .7
    );
    grad.addColorStop(0, 'rgba(14,84,255,0.04)');
    grad.addColorStop(1, 'rgba(0,10,79,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    streaks.forEach(s  => { s.update(); s.draw(); });
    particles.forEach(p => { p.update(); p.draw(); });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* =============================================
   6. INTERSECTION OBSERVER — REVEAL ANIMATIONS
   ============================================= */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

/* =============================================
   7. COUNTER ANIMATION (HERO STATS)
   ============================================= */
(function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1800;
      const start  = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* =============================================
   8. SKILL BAR ANIMATION
   ============================================= */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill  = entry.target;
      const width = fill.dataset.width;
      fill.style.width = width + '%';
      observer.unobserve(fill);
    });
  }, { threshold: 0.5 });

  fills.forEach(f => observer.observe(f));
})();

/* =============================================
   9. PORTFOLIO FILTER
   ============================================= */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide cards
      cards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('project-card--hide');
          card.style.animation = 'fadeInCard .4s ease forwards';
        } else {
          card.classList.add('project-card--hide');
        }
      });
    });
  });

  // Inject fadeInCard keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeInCard { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`;
  document.head.appendChild(style);
})();

/* =============================================
   10. MAGNETIC BUTTON EFFECT
   ============================================= */
(function initMagneticButtons() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx = (e.clientX - centerX) * .3;
      const dy = (e.clientY - centerY) * .3;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* =============================================
   11. CONTACT FORM
   ============================================= */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const submit  = document.getElementById('form-submit');
  if (!form) return;

  function validateField(field) {
    const valid = field.value.trim() !== '' &&
      (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
    field.classList.toggle('invalid', !valid);
    return valid;
  }

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => field.classList.remove('invalid'));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields  = form.querySelectorAll('[required]');
    let allValid  = true;
    fields.forEach(f => { if (!validateField(f)) allValid = false; });
    if (!allValid) return;

    // Simulate submission
    submit.classList.add('loading');
    submit.disabled = true;

    setTimeout(() => {
      submit.classList.remove('loading');
      submit.disabled = false;
      form.reset();
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1600);
  });
})();

/* =============================================
   12. SMOOTH ACTIVE NAV LINK (SCROLLSPY)
   ============================================= */
(function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive ? 'var(--white)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* =============================================
   13. PARALLAX — HERO CONTENT SUBTLE SHIFT
   ============================================= */
(function initParallax() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity   = String(1 - scrollY / window.innerHeight * 1.4);
    }
  }, { passive: true });
})();

/* =============================================
   14. PAGE LOAD — FADE IN
   ============================================= */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .5s ease';

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
})();

/* =============================================
   15. HERO REVEAL ON LOAD
   ============================================= */
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('#hero .reveal-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), 200 + i * 120);
  });
});
