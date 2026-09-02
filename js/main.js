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

// Hero slider — desliza entre os slides com autoplay, setas, dots, progresso e animação
const heroTrack = document.getElementById('heroTrack');
const heroSlides = heroTrack ? heroTrack.querySelectorAll('.hero-slide') : [];
const heroDots = document.querySelectorAll('#heroDots span');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const heroProgress = document.querySelector('.hero-progress i');
let heroIndex = 0;
let heroTimer;

function heroRestartProgress() {
  if (!heroProgress) return;
  heroProgress.style.animation = 'none';
  void heroProgress.offsetWidth; // reflow para reiniciar a animação
  heroProgress.style.animation = '';
}

function heroGoTo(index) {
  if (!heroTrack || !heroSlides.length) return;
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
  heroDots.forEach((d, i) => d.classList.toggle('active', i === heroIndex));
  heroSlides.forEach((s, i) => s.classList.toggle('is-active', i === heroIndex));
  heroRestartProgress();
}

function heroAutoplay() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => heroGoTo(heroIndex + 1), 5000);
}

function heroStep(dir) {
  heroGoTo(heroIndex + dir);
  heroAutoplay();
}

if (heroSlides.length) {
  heroDots.forEach((dot, i) =>
    dot.addEventListener('click', () => { heroGoTo(i); heroAutoplay(); })
  );
  heroPrev?.addEventListener('click', () => heroStep(-1));
  heroNext?.addEventListener('click', () => heroStep(1));
  heroGoTo(0);
  heroAutoplay();
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

// Nossos Diferenciais — título → subtítulo → números → selos
const difSection = document.querySelector('.diferenciais-section');
if (difSection) {
  reveal(difSection.querySelector('.section-title'), 0);
  reveal(difSection.querySelector('.section-subtitle'), 0.1);
  difSection.querySelectorAll('.dif-stat').forEach((el, i) => reveal(el, 0.15 + i * 0.08));
  reveal(difSection.querySelector('.dif-and-also'), 0.4);
  difSection.querySelectorAll('.dif-badge').forEach((el, i) => reveal(el, 0.45 + i * 0.06));
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

// ===== MODAL DE CURSOS =====
const cursosData = {
  ingles: {
    titulo: 'Inglês',
    img: 'assets/img/idiomas/1.webp',
    desc: 'Seja no curso de Inglês Britânico e/ou Norte-Americano, estimulamos a conversação do aluno de forma natural, usando temas familiares e assimilando gramática e vocabulário do básico ao avançado. Contamos ainda com cursos especiais para Viagens, Entrevista de emprego, Business e a Floating Class.',
  },
  espanhol: {
    titulo: 'Espanhol',
    img: 'assets/img/idiomas/2.webp',
    desc: 'No curso de Espanhol você vai aprender um dos idiomas mais falados do mundo de maneira dinâmica, em um cronograma repleto de atividades práticas e conversação. A cada aula o aluno se familiariza ainda mais com a cultura hispânica, desenvolvendo gramática e vocabulário. ¡Estudia español con profesores nativos y vive el idioma desde la primera clase!',
  },
  frances: {
    titulo: 'Francês',
    img: 'assets/img/idiomas/3.webp',
    desc: 'Assim como o português, o francês tem origem no latim; usamos essas raízes e semelhanças para desenvolver o aprendizado, através da conversação e de atividades práticas que levam à familiarização com o novo idioma. Sem contar a metodologia única que só um professor nativo pode apresentar. C\'est parfait!',
  },
  alemao: {
    titulo: 'Alemão',
    img: 'assets/img/idiomas/4.webp',
    desc: 'No curso de Alemão os alunos são levados a uma viagem por outra cultura através do aprendizado do idioma. Durante as aulas você é encorajado(a) a incluir no seu dia a dia o novo vocabulário e as novas expressões alemãs, para que o aprendizado seja mais rápido e efetivo.',
  },
  italiano: {
    titulo: 'Italiano',
    img: 'assets/img/idiomas/5.webp',
    desc: 'Aprenda um novo idioma de maneira simples e objetiva com o nosso curso de Italiano. Sinta-se na Europa através de aulas dinâmicas, repletas de atividades e conversação, e torne-se fluente na fala, audição, leitura e escrita. Com nosso \'Professore\' nativo, que tem um real amor pela Itália, você ganhará fluência e muita cultura italiana. Molto piacere in conoscerlo!',
  },
  chines: {
    titulo: 'Chinês',
    img: 'assets/img/idiomas/6.webp',
    desc: 'No curso de Mandarim do Céos você se torna fluente de verdade, dominando a fala, a compreensão, a leitura e a escrita de um dos idiomas mais antigos e bonitos da humanidade. Com material dinâmico e moderno, você fará uma viagem ao oriente e, com a ajuda de um professor nativo, aprenderá o idioma da forma mais natural possível. 好!',
  },
  coreano: {
    titulo: 'Coreano',
    img: 'assets/img/idiomas/7.webp',
    desc: 'Em nosso curso de Coreano você aprenderá o idioma que vem se destacando cada dia mais pelo mundo. As aulas preparam você tanto para curtir seu K-pop quanto para entrevistas de emprego em cargos de empresas multinacionais, dominando o idioma.',
  },
  japones: {
    titulo: 'Japonês',
    img: 'assets/img/idiomas/8.webp',
    desc: 'No curso de Japonês do Céos você mergulha na fascinante cultura japonesa enquanto desenvolve habilidades reais de comunicação. Com aulas conduzidas por professores nativos, aprenderá a falar, ouvir, ler e escrever com naturalidade e confiança. Seja para assistir animes sem legenda, viajar ao Japão ou atuar no mercado global, nosso curso é o caminho certo. はじめまして！(Hajimemashite!) — Muito prazer!',
  },
  arabe: {
    titulo: 'Árabe',
    img: 'assets/img/idiomas/9.webp',
    desc: 'Aprender Árabe no Céos é uma experiência cultural e linguística transformadora. Com o acompanhamento de professores nativos, você dominará uma das línguas mais faladas do mundo, explorando desde o alfabeto até expressões do dia a dia com fluência e segurança. Nossas aulas combinam tradição e modernidade. Em pouco tempo você estará se comunicando com confiança e dizendo: السلام عليكم (As-salamu alaykum) — Que a paz esteja com você!',
  },
  libras: {
    titulo: 'Libras',
    img: 'assets/img/idiomas/10.webp',
    desc: 'Libras, a Língua Brasileira de Sinais, é uma língua de modalidade gestual-visual em que é possível se comunicar através de gestos e expressões faciais e corporais. Em nosso curso você se torna apto(a) a se comunicar com qualquer falante da língua, surdo ou não.',
  },
  business: {
    titulo: 'CÉOS Business',
    img: 'assets/img/diferenciais/5-business.webp',
    desc: 'Nosso curso de Business English vai além do inglês de negócios tradicional: oferece um aprendizado com foco total nas situações e no vocabulário específicos da sua área de atuação. Nosso diferencial é o vocabulário setorial profundo — seja ele portuário, logístico, médico ou qualquer outro segmento, você aprende as expressões e os termos técnicos que realmente usa no dia a dia. O conteúdo abrange vocabulário corporativo e etiqueta empresarial, comunicação escrita de alto impacto (e-mails, relatórios e propostas), técnicas de apresentação e negociação, diferenças culturais e éticas, além de liderança e gestão de equipes em contextos multilíngues. Ideal para profissionais que buscam aprimorar negociação, apresentação e liderança em ambientes corporativos e internacionais. Temos convênios com multinacionais — consulte parcerias empresariais.',
  },
  divein: {
    titulo: 'CÉOS Dive In',
    img: 'assets/img/diferenciais/7-dive-in.webp',
    desc: 'Viva o inglês. Respire o inglês. Pense em inglês. O CÉOS Dive In é a nossa experiência de imersão, criada para quem quer destravar a comunicação de verdade e acelerar o aprendizado de forma prática, intensa e memorável. Não é um curso comum: é um ambiente em que o inglês é a única língua utilizada e cada situação é pensada para estimular a comunicação real — como fazer um intercâmbio sem sair do Brasil. Você ganha confiança ao falar, perde o medo de errar, amplia o vocabulário prático e começa a pensar diretamente em inglês. Oferecemos três formatos: Dive In In Company (imersão dentro da própria empresa, intensiva e direcionada à realidade do negócio), Dive In Long Term (imersão de 15 dias em hotel, com rotina totalmente em inglês, ideal para uma virada de chave) e Dive In Short Term (imersão de um fim de semana em hotel, perfeita como porta de entrada para destravar a fala). Valores à consultar.',
  },
  floatingclass: {
    titulo: 'CÉOS Floating Class',
    img: 'assets/img/diferenciais/9-floating-class.webp',
    desc: 'Pensando nos profissionais que têm a agenda flexível e imprevisível demais, nas pessoas que trabalham em turno ou viajam constantemente a trabalho, criamos uma modalidade exclusiva no Céos Escola de Idiomas, o "Floating Class". É um modelo exclusivo onde o aluno pode assistir às aulas de acordo com a sua própria disponibilidade de horários, sem a necessidade de se comprometer com um dia e horário fixo por semana. O aluno tem acesso a uma grade de horários predefinida pela escola e pode "flutuar" entre esses horários conforme sua conveniência, encaixando a aula em sua rotina da semana. Benefícios da Floating Class: flexibilidade total de agenda; maior aproveitamento do curso, já que o aluno não precisa faltar se surgir um imprevisto; custo mais acessível comparado a aulas particulares; e interação com diferentes colegas, promovendo uma experiência mais dinâmica e social.',
  },
};

const courseModal = document.getElementById('courseModal');
const courseModalImg = document.getElementById('courseModalImg');
const courseModalTitle = document.getElementById('courseModalTitle');
const courseModalDesc = document.getElementById('courseModalDesc');
const courseModalCta = document.getElementById('courseModalCta');
const WHATSAPP_NUMBER = '5521965609709';

function openCourseModal(slug) {
  const data = cursosData[slug];
  if (!data || !courseModal) return;
  courseModalImg.src = data.img;
  courseModalImg.alt = data.titulo;
  courseModalTitle.textContent = data.titulo;
  courseModalDesc.textContent = data.desc;
  if (courseModalCta) {
    const msg = `Olá! Vim pelo site da CÉOS e tenho interesse em ${data.titulo}. Gostaria de mais informações!`;
    courseModalCta.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }
  courseModal.hidden = false;
  document.documentElement.classList.add('modal-open');
}

function closeCourseModal() {
  if (!courseModal) return;
  courseModal.hidden = true;
  document.documentElement.classList.remove('modal-open');
}

document.querySelectorAll('[data-curso]').forEach(btn => {
  btn.addEventListener('click', () => openCourseModal(btn.dataset.curso));
});

courseModal?.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeCourseModal);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && courseModal && !courseModal.hidden) closeCourseModal();
});
