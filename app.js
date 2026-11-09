const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const progressBar = document.querySelector('#reading-progress-bar');
const toast = document.querySelector('#toast');
let toastTimer;

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar navegação' : 'Abrir navegação');
  });
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir navegação');
  }));
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.swatch').forEach((swatch) => {
  swatch.addEventListener('click', async () => {
    const color = swatch.dataset.color;
    try {
      await navigator.clipboard.writeText(color);
      showToast(`${color} copiado para a área de transferência.`);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = color;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
      showToast(`${color} copiado.`);
    }
  });
});

document.querySelector('#print-kit')?.addEventListener('click', () => window.print());
const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealTargets = document.querySelectorAll('.section-heading, .intro-grid, .value-ribbon, .problem-copy, .solution-heading, .feature-card, .audience-card, .food-item, .entrepreneur-copy, .entrepreneur-visual, .brand-system > *, .brand-rules > div, .mascot-heading, .asset-card, .asset-download-row, .applications-grid figure, .partnership-copy');
revealTargets.forEach((element) => element.classList.add('reveal'));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}
