/* ============================================
   BAKED BY BEC — MAIN JAVASCRIPT
   ============================================ */

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// --- BURGER MENU ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
  const spans = burger.querySelectorAll('span');
  if (burger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
  });
});

// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll(
  '.offering__card, .step__card, .testimonial__card, .gallery__item, .section__header, .hero__trust-item, .order__detail-item, .contact-method__card, .gallery-full__item, .location__item'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// --- HERO ENTRANCE ---
window.addEventListener('load', () => {
  const items = [
    { el: document.querySelector('.hero__tag'), delay: 100 },
    { el: document.querySelector('.hero__heading'), delay: 250 },
    { el: document.querySelector('.hero__sub'), delay: 400 },
    { el: document.querySelector('.hero__actions'), delay: 550 },
    { el: document.querySelector('.hero__trust'), delay: 700 },
    { el: document.querySelector('.hero__visual'), delay: 300 },
    { el: document.querySelector('.page-hero__title'), delay: 200 },
    { el: document.querySelector('.page-hero__sub'), delay: 380 },
  ];

  items.forEach(({ el, delay }) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });
});

// --- MARQUEE PAUSE ---
const marqueeTrack = document.querySelector('.marquee__track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => marqueeTrack.style.animationPlayState = 'paused');
  marqueeTrack.addEventListener('mouseleave', () => marqueeTrack.style.animationPlayState = 'running');
}

// --- GALLERY FILTER ---
const filterBtns = document.querySelectorAll('.filter__btn');
const galleryItems = document.querySelectorAll('.gallery-full__item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// --- PAYMENT OPTIONS ---
const payCardOption = document.getElementById('payCardOption');
const payCollectionOption = document.getElementById('payCollectionOption');
const stripeBlock = document.getElementById('stripeBlock');
const collectionBlock = document.getElementById('collectionBlock');

if (payCardOption) {
  payCardOption.addEventListener('click', () => {
    stripeBlock.style.display = 'block';
    collectionBlock.style.display = 'none';
  });
}

if (payCollectionOption) {
  payCollectionOption.addEventListener('click', () => {
    collectionBlock.style.display = 'block';
    stripeBlock.style.display = 'none';
  });
}

// --- ORDER FORM SUBMIT ---
const orderForm = document.getElementById('orderForm');
const orderSuccess = document.getElementById('orderSuccess');

if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    orderForm.style.display = 'none';
    orderSuccess.classList.add('visible');
    window.scrollTo({ top: orderSuccess.offsetTop - 100, behavior: 'smooth' });
  });
}

// --- ENQUIRY FORM SUBMIT ---
const enquiryForm = document.getElementById('enquiryForm');
const enquirySuccess = document.getElementById('enquirySuccess');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    enquirySuccess.classList.add('visible');
    enquiryForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
  });
}

// --- CARD HOVER TILT ---
document.querySelectorAll('.offering__card, .testimonial__card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -5;
    const rotateY = ((x - rect.width / 2) / rect.width) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});