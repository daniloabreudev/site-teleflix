const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const shelf = button.closest('.media-shelf');
    const rail = shelf?.querySelector('.movie-rail');
    const direction = button.dataset.scroll === 'right' ? 1 : -1;
    rail?.dispatchEvent(new Event('pause-autoscroll'));
    rail?.scrollBy({ left: direction * 440, behavior: 'smooth' });
    window.setTimeout(() => rail?.dispatchEvent(new Event('resume-autoscroll')), 3200);
  });
});

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();


const activityTrack = document.querySelector('#activity-track');
if (activityTrack) {
  const messages = Array.from(activityTrack.children).sort(() => Math.random() - 0.5);
  activityTrack.replaceChildren(...messages);
  const copy = activityTrack.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.removeAttribute('id');
  copy.classList.add('activity-track-copy');
  activityTrack.parentElement.append(copy);
}

const offerToggle = document.querySelector('#offer-toggle');
const offerMessage = document.querySelector('#offer-message');
const offerCenter = document.querySelector('.message-center');
const offerClose = document.querySelector('.offer-close');
let offerAlreadyShown = false;
let offerTimer = 0;

try {
  offerAlreadyShown = sessionStorage.getItem('teleflix-header-offer-shown') === 'yes';
} catch {
  // Show the notification once on this page view if storage is unavailable.
}

const showOffer = (unread = false) => {
  if (!offerMessage || !offerToggle) return;
  window.clearTimeout(offerTimer);
  offerMessage.hidden = false;
  offerToggle.setAttribute('aria-expanded', 'true');
  offerToggle.classList.toggle('has-new-offer', unread);
  offerAlreadyShown = true;
  try { sessionStorage.setItem('teleflix-header-offer-shown', 'yes'); } catch { /* no storage access */ }
};

const hideOffer = () => {
  if (!offerMessage || !offerToggle) return;
  offerMessage.hidden = true;
  offerToggle.setAttribute('aria-expanded', 'false');
  offerToggle.classList.remove('has-new-offer');
};

offerToggle?.addEventListener('click', () => {
  if (offerMessage?.hidden) showOffer();
  else hideOffer();
});
offerClose?.addEventListener('click', hideOffer);
document.addEventListener('click', (event) => {
  if (!offerCenter?.contains(event.target)) hideOffer();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideOffer();
});

if (offerMessage && !offerAlreadyShown) {
  offerTimer = window.setTimeout(() => showOffer(true), 10_000);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  document.querySelectorAll('.movie-rail[data-auto-scroll="true"]').forEach((rail) => {
    const originalCards = Array.from(rail.children);
    if (originalCards.length === 0) return;

    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      rail.append(clone);
    });
    const loopWidth = rail.children[originalCards.length].offsetLeft - originalCards[0].offsetLeft;

    const duration = Number(rail.dataset.scrollDuration) || 3000;
    let frameId = 0;
    let paused = true;
    let resumeTimer = 0;

    const pause = () => {
      paused = true;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const animateStep = () => {
      if (paused) return;
      const firstCard = rail.children[0];
      if (!firstCard) return;
      const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      const start = rail.scrollLeft;
      const end = Math.min(start + step, loopWidth);
      const startedAt = performance.now();

      const frame = (time) => {
        if (paused) return;
        const progress = Math.min((time - startedAt) / duration, 1);
        rail.scrollLeft = start + (end - start) * progress;
        if (progress < 1) {
          frameId = window.requestAnimationFrame(frame);
          return;
        }
        if (end >= loopWidth - 1) rail.scrollLeft = 0;
        frameId = window.requestAnimationFrame(animateStep);
      };

      frameId = window.requestAnimationFrame(frame);
    };

    const resume = () => {
      window.clearTimeout(resumeTimer);
      if (rail.contains(document.activeElement)) return;
      if (paused) {
        paused = false;
        frameId = window.requestAnimationFrame(animateStep);
      }
    };

    rail.addEventListener('pause-autoscroll', pause);
    rail.addEventListener('resume-autoscroll', resume);
    rail.addEventListener('focusin', pause);
    rail.addEventListener('focusout', (event) => {
      if (!rail.contains(event.relatedTarget)) resume();
    });
    rail.addEventListener('pointerdown', pause);
    rail.addEventListener('pointerup', () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(resume, 1800);
    });
    rail.addEventListener('wheel', () => {
      pause();
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(resume, 1800);
    }, { passive: true });
    resume();
  });
}










