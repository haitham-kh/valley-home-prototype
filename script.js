const hero = document.querySelector('.hero');
const heroImages = ['assets/hero.jpg', 'assets/stay.jpg', 'assets/experience.jpg'];
let heroIndex = 0;

function changeHero(direction) {
  heroIndex = (heroIndex + direction + heroImages.length) % heroImages.length;
  hero.style.backgroundImage = `linear-gradient(90deg,rgba(9,9,7,.52),rgba(9,9,7,.08) 63%,rgba(9,9,7,.32)),url("${heroImages[heroIndex]}")`;
  document.querySelector('.hero-credit').textContent = `0${heroIndex + 1} — Valley Resort`;
}

document.querySelector('.hero-arrow.previous').addEventListener('click', () => changeHero(-1));
document.querySelector('.hero-arrow.next').addEventListener('click', () => changeHero(1));

const gallery = [
  { image: 'assets/experience.jpg', alt: 'Bedouin firepit at Valley Resort', caption: 'Firelight, stories, and the desert night.' },
  { image: 'assets/stay.jpg', alt: 'Valley Resort suite terrace', caption: 'Private terraces shaped around the view.' },
  { image: 'assets/hero.jpg', alt: 'Valley Resort in Wadi Rum', caption: 'A resort set between sandstone and open sky.' }
];
let galleryIndex = 0;

function changeGallery(nextIndex) {
  galleryIndex = (nextIndex + gallery.length) % gallery.length;
  const item = gallery[galleryIndex];
  const image = document.querySelector('#galleryImage');
  image.src = item.image;
  image.alt = item.alt;
  document.querySelector('#galleryCaption').textContent = item.caption;
  document.querySelectorAll('[data-gallery]').forEach((button, index) => button.classList.toggle('is-active', index === galleryIndex));
}

document.querySelector('.gallery-prev').addEventListener('click', () => changeGallery(galleryIndex - 1));
document.querySelector('.gallery-next').addEventListener('click', () => changeGallery(galleryIndex + 1));
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => changeGallery(Number(button.dataset.gallery))));

const navigation = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const rooms = [
  { image: 'assets/hero.jpg', number: '01 — Desert stay', name: 'Dune Room', meta: '40m² · King bed · Sandstone patio', alt: 'Dune Room at Valley Resort' },
  { image: 'assets/experience.jpg', number: '02 — Stargazing stay', name: 'Martian Dome', meta: '45m² · Stargazing roof · Panoramic AC', alt: 'Martian Dome at Valley Resort' },
  { image: 'assets/stay.jpg', number: '03 — Signature stay', name: 'Valley Two-bedroom Suite', meta: '104m² · Two bedrooms · Private terrace', alt: 'Valley Resort suite with Wadi Rum view' }
];
const roomImage = document.querySelector('#roomImage');
function showRoom(index) {
  const room = rooms[index];
  roomImage.classList.add('is-changing');
  window.setTimeout(() => {
    roomImage.src = room.image;
    roomImage.alt = room.alt;
    document.querySelector('#roomNumber').textContent = room.number;
    document.querySelector('#roomName').textContent = room.name;
    document.querySelector('#roomMeta').textContent = room.meta;
    roomImage.classList.remove('is-changing');
  }, 150);
  document.querySelectorAll('.room-option').forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === index));
}
document.querySelectorAll('.room-option').forEach(button => {
  const index = Number(button.dataset.room);
  button.addEventListener('mouseenter', () => showRoom(index));
  button.addEventListener('focus', () => showRoom(index));
  button.addEventListener('click', () => showRoom(index));
});

const bookingModal = document.querySelector('.booking-modal');
const closeBookingModal = () => { bookingModal.classList.remove('is-open'); bookingModal.setAttribute('aria-hidden', 'true'); };
document.querySelectorAll('[data-booking]').forEach(trigger => trigger.addEventListener('click', event => {
  event.preventDefault();
  bookingModal.classList.add('is-open');
  bookingModal.setAttribute('aria-hidden', 'false');
  bookingModal.querySelector('input').focus();
}));
document.querySelector('.modal-close').addEventListener('click', closeBookingModal);
bookingModal.addEventListener('click', event => { if (event.target === bookingModal) closeBookingModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeBookingModal(); });
document.querySelectorAll('[data-booking-form]').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  bookingModal.classList.add('is-open');
  bookingModal.setAttribute('aria-hidden', 'false');
  bookingModal.querySelector('.form-feedback').textContent = 'Availability will be confirmed by the Valley reservations team.';
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  let motionFrame;
  window.addEventListener('scroll', () => {
    if (motionFrame) return;
    motionFrame = window.requestAnimationFrame(() => {
      const heroOffset = Math.min(window.scrollY, window.innerHeight) / window.innerHeight;
      hero.style.backgroundPosition = `center calc(50% + ${heroOffset * 5}%)`;
      motionFrame = undefined;
    });
  }, { passive: true });
}
