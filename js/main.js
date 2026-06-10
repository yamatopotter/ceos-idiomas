// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

const closeMenu = () => navLinks?.classList.remove('open');

navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navClose?.addEventListener('click', closeMenu);

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Hero dots — fade on slide change
const heroBg = document.querySelector('.hero-bg');
const dots = document.querySelectorAll('.hero-dots span');
let current = 0;
if (dots.length) {
  setInterval(() => {
    if (heroBg) {
      heroBg.style.opacity = '0';
      setTimeout(() => { heroBg.style.opacity = '1'; }, 350);
    }
    dots[current].classList.remove('active');
    current = (current + 1) % dots.length;
    dots[current].classList.add('active');
  }, 3000);
}

// Testimonials slider controls
const testimonialsTrack = document.querySelector('.testimonials-track');
const prevBtn = document.querySelector('.testimonials-prev');
const nextBtn = document.querySelector('.testimonials-next');
const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');
const totalSlides = testimonialDots.length;
let currentSlide = 0;

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
  if (testimonialsTrack) testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  testimonialDots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));
testimonialDots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

// ===== ANIMAÇÕES EM ORDEM DE EXIBIÇÃO =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function reveal(el, delay = 0) {
  if (!el) return;
  el.classList.add('reveal');
  if (delay > 0) el.style.transitionDelay = `${delay}s`;
  revealObserver.observe(el);
}

// About — título, parágrafos e imagem em ordem
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
  reveal(aboutSection.querySelector('.about-title'), 0);
  aboutSection.querySelectorAll('.about-text p').forEach((el, i) => reveal(el, 0.1 + i * 0.1));
  reveal(aboutSection.querySelector('.about-image'), 0.2);
}

// Nossos Cursos — título → subtítulo → cards → CTA
const coursesSection = document.querySelector('.courses-section');
if (coursesSection) {
  reveal(coursesSection.querySelector('.section-title'), 0);
  reveal(coursesSection.querySelector('.section-subtitle'), 0.1);
  coursesSection.querySelectorAll('.course-card').forEach((el, i) => reveal(el, 0.15 + i * 0.06));
  reveal(coursesSection.querySelector('.courses-cta'), 0.7);
}

// Nossos Diferenciais — título → subtítulo → cards
const difSection = document.querySelector('.diferenciais-section');
if (difSection) {
  reveal(difSection.querySelector('.section-title'), 0);
  reveal(difSection.querySelector('.section-subtitle'), 0.1);
  difSection.querySelectorAll('.dif-card').forEach((el, i) => reveal(el, 0.15 + i * 0.06));
}

// FAQ — desktop: coluna a coluna em pares de linha; mobile: DOM order
const faqSection = document.querySelector('.faq-section');
if (faqSection) {
  reveal(faqSection.querySelector('.faq-title'), 0);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const cols = [...faqSection.querySelectorAll('.faq-grid > div')];
  if (isMobile || cols.length < 2) {
    // Coluna única — anima em ordem sequencial do DOM
    let d = 0.1;
    cols.forEach(col => col.querySelectorAll('.faq-item').forEach(el => { reveal(el, d); d += 0.07; }));
  } else {
    // Duas colunas — anima linha a linha (col1[r] e col2[r] juntas)
    const col1 = [...cols[0].querySelectorAll('.faq-item')];
    const col2 = [...cols[1].querySelectorAll('.faq-item')];
    const rows = Math.max(col1.length, col2.length);
    for (let r = 0; r < rows; r++) {
      reveal(col1[r], 0.1 + r * 0.1);
      reveal(col2[r], 0.15 + r * 0.1);
    }
  }
}

// O que falam do CÉOS — desktop: cada card sobe em ordem; mobile: slider cuida
const testimonialsSection = document.querySelector('.testimonials-section');
if (testimonialsSection) {
  reveal(testimonialsSection.querySelector('.section-title'), 0);
  if (!window.matchMedia('(max-width: 768px)').matches) {
    testimonialsSection.querySelectorAll('.testimonial-card').forEach((el, i) => reveal(el, 0.1 + i * 0.12));
  }
}
