/* ═══════════════════════════════════════════════════════
   ENCÁRGALO — Landing Page JS
═══════════════════════════════════════════════════════ */

/* ─── NAV SCROLL STATE ───────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── REVEAL ON SCROLL ───────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── PHONE MOCKUP SUBTLE PARALLAX ──────────────────── */
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup && window.matchMedia('(min-width: 900px)').matches) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        phoneMockup.style.transform = `translateY(${scrollY * 0.04}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ─── STAT COUNTER ANIMATION ─────────────────────────── */
const statsSection = document.querySelector('.hero__stats');
if (statsSection) {
  let statsAnimated = false;
  const statsObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

/* ─── MARQUEE PAUSE ON HOVER ─────────────────────────── */
const marqueeEl = document.querySelector('.feature-strip__inner');
if (marqueeEl) {
  const strip = document.querySelector('.feature-strip');
  strip.addEventListener('mouseenter', () => {
    marqueeEl.style.animationPlayState = 'paused';
  });
  strip.addEventListener('mouseleave', () => {
    marqueeEl.style.animationPlayState = 'running';
  });
}
