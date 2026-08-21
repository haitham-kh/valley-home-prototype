const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileDock = document.querySelector('.mobile-dock');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let returnFocus = null;

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  main.inert = open;
  footer.inert = open;
  if (open) {
    main.setAttribute('inert', '');
    footer.setAttribute('inert', '');
  } else {
    main.removeAttribute('inert');
    footer.removeAttribute('inert');
  }

  if (open) {
    returnFocus = menuButton;
    menuButton.focus();
  } else if (returnFocus) {
    returnFocus.focus();
    returnFocus = null;
  }
}

menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    return;
  }

  if (event.key !== 'Tab' || menuButton.getAttribute('aria-expanded') !== 'true') return;
  const focusable = [...mobileMenu.querySelectorAll(focusableSelector), menuButton].filter((element) => !element.hidden);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function updateChrome() {
  const scrolled = window.scrollY > 30;
  const suppressDock = ['.stays', '.arrival', '.practical', '.final-cta', '.footer'].some((selector) => {
    const rect = document.querySelector(selector).getBoundingClientRect();
    return rect.top < window.innerHeight * .78 && rect.bottom > window.innerHeight * .22;
  });
  header.classList.toggle('is-scrolled', scrolled);
  mobileDock.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.72);
  mobileDock.classList.toggle('is-context-hidden', suppressDock);
}

window.addEventListener('scroll', updateChrome, { passive: true });
updateChrome();

const stays = [
  {
    image: 'assets/domes.jpg',
    alt: 'Martian Domes at Valley Resort in warm evening light',
    kicker: 'Perspective 01 · Dome geometry',
    name: 'Martian Domes',
    description: 'Geometric domes frame the desert by day and the Wadi Rum sky after dark.',
    href: 'https://valley-resort.com/martain-rooms-double',
  },
  {
    image: 'assets/terrace.jpg',
    alt: 'Private terrace outside a Dune Room at Valley Resort',
    kicker: 'Perspective 02 · Grounded privacy',
    name: 'Dune Rooms',
    description: 'Grounded, generous rooms that open directly onto a private sandstone patio.',
    href: 'https://valley-resort.com/dune-rooms-double',
  },
  {
    image: 'assets/resort-path.jpg',
    alt: 'Valley Resort suites and pathways among palms and sandstone',
    kicker: 'Perspective 03 · Room to share',
    name: 'Valley Suites',
    description: 'A spacious two-bedroom retreat with a private terrace for a longer stay.',
    href: 'https://valley-resort.com/valley-two-bedroom-suits',
  },
];

stays.forEach(({ image }) => {
  const preload = new Image();
  preload.src = image;
});

const stayImage = document.querySelector('#stay-image');
const stayKicker = document.querySelector('#stay-kicker');
const stayName = document.querySelector('#stay-name');
const stayDescription = document.querySelector('#stay-description');
const stayLink = document.querySelector('#stay-link');
const stayCurrent = document.querySelector('#stay-current');
const stayMode = document.querySelector('#stay-mode');
const stayPanel = document.querySelector('#stay-panel');
const stayStudio = document.querySelector('.stay-studio');
const stayTabs = [...document.querySelectorAll('[role="tab"][data-stay]')];
let activeStay = 0;
let stayRotationTimer = null;
let stayRotationLocked = false;
let staysAreVisible = !('IntersectionObserver' in window);

function showStay(index, moveFocus = false) {
  const stay = stays[index];
  if (!stay) return;
  activeStay = index;

  stayImage.classList.add('is-changing');
  window.setTimeout(() => {
    stayImage.src = stay.image;
    stayImage.alt = stay.alt;
    stayKicker.textContent = stay.kicker;
    stayName.textContent = stay.name;
    stayDescription.textContent = stay.description;
    stayLink.href = stay.href;
    stayCurrent.textContent = String(index + 1).padStart(2, '0');
    stayImage.classList.remove('is-changing');
  }, 150);

  stayTabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  stayPanel.setAttribute('aria-labelledby', stayTabs[index].id);
  if (moveFocus) stayTabs[index].focus();
}

function stopStayRotation() {
  window.clearTimeout(stayRotationTimer);
  stayRotationTimer = null;
  stayStudio.classList.remove('is-auto');
}

function scheduleStayRotation() {
  stopStayRotation();
  if (prefersReducedMotion || stayRotationLocked || !staysAreVisible || document.hidden) return;
  void stayStudio.offsetWidth;
  stayStudio.classList.add('is-auto');
  stayRotationTimer = window.setTimeout(() => {
    showStay((activeStay + 1) % stays.length);
    scheduleStayRotation();
  }, 4800);
}

function lockStay(index, moveFocus = false) {
  stayRotationLocked = true;
  stopStayRotation();
  stayStudio.classList.add('is-locked');
  stayMode.textContent = 'Selected';
  showStay(index, moveFocus);
}

stayTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => lockStay(index));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % stayTabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + stayTabs.length) % stayTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = stayTabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    lockStay(nextIndex, true);
  });
});

if (prefersReducedMotion) stayMode.textContent = 'Manual';

if ('IntersectionObserver' in window) {
  const stayObserver = new IntersectionObserver(([entry]) => {
    staysAreVisible = entry.isIntersecting;
    if (staysAreVisible) scheduleStayRotation();
    else stopStayRotation();
  }, { threshold: .25 });
  stayObserver.observe(stayStudio);
} else {
  scheduleStayRotation();
}

stayStudio.addEventListener('focusin', stopStayRotation);
stayStudio.addEventListener('focusout', () => {
  window.setTimeout(() => {
    if (!stayStudio.contains(document.activeElement)) scheduleStayRotation();
  });
});
document.addEventListener('visibilitychange', scheduleStayRotation);

const infoGroups = [...document.querySelectorAll('.info-group')];
infoGroups.forEach((group) => {
  const button = group.querySelector('button');
  const panel = group.querySelector('.info-panel');

  button.addEventListener('click', () => {
    const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
    infoGroups.forEach((otherGroup) => {
      const otherButton = otherGroup.querySelector('button');
      const otherPanel = otherGroup.querySelector('.info-panel');
      otherGroup.classList.remove('is-open');
      otherButton.setAttribute('aria-expanded', 'false');
      otherPanel.hidden = true;
    });

    if (shouldOpen) {
      group.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    }
  });
});

const navLinks = [...document.querySelectorAll('[data-nav]')];
const observedSections = [...document.querySelectorAll('[data-section]')].filter((section) => section.id !== 'home');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const current = link.dataset.nav === visible.target.id;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, .1, .3] });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

const reveals = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  reveals.forEach((element) => revealObserver.observe(element));
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 760 && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false);
});
