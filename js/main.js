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
