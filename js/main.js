// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

const closeMenu = () => navLinks?.classList.remove('open');
const openMenu  = () => navLinks?.classList.add('open');

navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navClose?.addEventListener('click', closeMenu);

// Fecha ao clicar em qualquer link
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

// Hero dots (simple carousel placeholder)
const dots = document.querySelectorAll('.hero-dots span');
let current = 0;
if (dots.length) {
  setInterval(() => {
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

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

['.section-title', '.section-subtitle', '.about-title'].forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});

document.querySelectorAll('.about-text > p').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

['.course-card', '.dif-card', '.testimonial-card', '.faq-item'].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.07}s`;
    revealObserver.observe(el);
  });
});
