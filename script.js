const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const stickyCta = document.querySelector('.mobile-sticky-cta');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

function updateHeader() {
  const scrolled = window.scrollY > 35;
  header.classList.toggle('is-scrolled', scrolled);
  stickyCta.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.72);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const stays = [
  {
    image: 'assets/domes.jpg',
    alt: 'Martian Domes at Valley Resort in warm evening light',
    description: 'Geometric domes frame the desert by day and the Wadi Rum sky after dark.',
    href: 'https://valley-resort.com/martain-rooms-double',
    label: 'Explore Martian Domes',
  },
  {
    image: 'assets/terrace.jpg',
    alt: 'Private terrace outside a Dune Room at Valley Resort',
    description: 'Grounded, generous rooms that open directly onto a private sandstone patio.',
    href: 'https://valley-resort.com/dune-rooms-double',
    label: 'Explore Dune Rooms',
  },
  {
    image: 'assets/resort-path.jpg',
    alt: 'Valley Resort suites and pathways among palms and sandstone',
    description: 'A spacious two-bedroom retreat made for families, friends, and longer stays.',
    href: 'https://valley-resort.com/valley-two-bedroom-suits',
    label: 'Explore Valley Suites',
  },
];

const stayImage = document.querySelector('#stay-image');
const stayDescription = document.querySelector('#stay-description');
const stayLink = document.querySelector('#stay-link');
const stayCurrent = document.querySelector('#stay-current');
const stayButtons = [...document.querySelectorAll('[data-stay]')];

function showStay(index) {
  const stay = stays[index];
  if (!stay || stayButtons[index].classList.contains('is-active')) return;

  stayImage.classList.add('is-changing');
  window.setTimeout(() => {
    stayImage.src = stay.image;
    stayImage.alt = stay.alt;
    stayDescription.textContent = stay.description;
    stayLink.href = stay.href;
    stayLink.firstChild.textContent = `${stay.label} `;
    stayCurrent.textContent = String(index + 1).padStart(2, '0');
    stayImage.classList.remove('is-changing');
  }, 180);

  stayButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
}

stayButtons.forEach((button, index) => {
  button.addEventListener('click', () => showStay(index));
  button.addEventListener('mouseenter', () => showStay(index));
  button.addEventListener('focus', () => showStay(index));
});

document.querySelectorAll('.info-group button').forEach((button) => {
  button.addEventListener('click', () => {
    if (!window.matchMedia('(max-width: 720px)').matches) return;
    const group = button.closest('.info-group');
    const open = !group.classList.contains('is-open');

    document.querySelectorAll('.info-group').forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
    });

    if (open) {
      group.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  reveals.forEach((element) => observer.observe(element));
}
