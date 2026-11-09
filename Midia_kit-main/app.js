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

const revealTargets = document.querySelectorAll('.section-heading, .intro-grid, .value-ribbon, .problem-copy, .solution-heading, .feature-card, .audience-card, .food-item, .entrepreneur-copy, .entrepreneur-visual, .brand-system > *, .brand-rules > div, .mascot-heading, .asset-card, .asset-download-row, .applications-grid figure, .partnership-copy, .mockup-heading, .mockup-card');
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
/* ==========================================
   OULLIN - CARROSSEL PROMOCIONAL
   Navegação por setas, pontos e arraste
========================================== */

(() => {

    const root = document.querySelector(".oullin-promo");

    if (!root) return;

    const track = root.querySelector("[data-promo-track]");

    const slides = Array.from(
        root.querySelectorAll(".oullin-promo-slide")
    );

    const prev = root.querySelector("[data-promo-prev]");
    const next = root.querySelector("[data-promo-next]");

    const dots = Array.from(
        root.querySelectorAll(".oullin-promo-dot")
    );

    const counter = root.querySelector("[data-promo-counter]");

    if (!track || slides.length === 0) return;

    let activeIndex = 0;

    let pointerStartX = 0;
    let startScrollLeft = 0;

    let dragging = false;
    let moved = false;

    // Impede que o índice ultrapasse os limites.
    const clamp = (value) => {
        return Math.max(0, Math.min(slides.length - 1, value));
    };

    // Vai até o banner selecionado.
    function goTo(index) {

        activeIndex = clamp(index);

        const slide = slides[activeIndex];

        track.scrollTo({
            left: slide.offsetLeft - track.offsetLeft,
            behavior: "smooth"
        });

        updateControls();
    }

    // Atualiza os indicadores e o contador.
    function updateControls() {

        dots.forEach((dot, index) => {

            const selected = index === activeIndex;

            dot.classList.toggle("is-active", selected);

            if (selected) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }

        });

        if (counter) {

            counter.innerHTML =
                `${String(activeIndex + 1).padStart(2, "0")}
                <i>/</i>
                ${String(slides.length).padStart(2, "0")}`;

        }

        if (prev) {
            prev.disabled = activeIndex === 0;
        }

        if (next) {
            next.disabled = activeIndex === slides.length - 1;
        }

    }

    // Descobre qual banner está mais próximo do centro.
    function nearestSlideIndex() {

        const trackCenter =
            track.scrollLeft + track.clientWidth / 2;

        let nearest = 0;

        let smallestDistance = Infinity;

        slides.forEach((slide, index) => {

            const slideCenter =
                slide.offsetLeft + slide.offsetWidth / 2;

            const distance =
                Math.abs(slideCenter - trackCenter);

            if (distance < smallestDistance) {

                smallestDistance = distance;

                nearest = index;

            }

        });

        return nearest;
    }

    // Botões de navegação.
    if (prev) {
        prev.addEventListener("click", () => {
            goTo(activeIndex - 1);
        });
    }

    if (next) {
        next.addEventListener("click", () => {
            goTo(activeIndex + 1);
        });
    }

    // Navegação pelos indicadores.
    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {
            goTo(index);
        });

    });

    // Atualiza os indicadores ao deslizar.
    let scrollTimer;

    track.addEventListener("scroll", () => {

        window.clearTimeout(scrollTimer);

        scrollTimer = window.setTimeout(() => {

            activeIndex = nearestSlideIndex();

            updateControls();

        }, 70);

    }, { passive: true });

    // Navegação pelo teclado.
    track.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            event.preventDefault();

            goTo(activeIndex + 1);

        } else if (event.key === "ArrowLeft") {

            event.preventDefault();

            goTo(activeIndex - 1);

        } else if (event.key === "Home") {

            event.preventDefault();

            goTo(0);

        } else if (event.key === "End") {

            event.preventDefault();

            goTo(slides.length - 1);

        }

    });

    // Arrastar com o mouse no computador.
    track.addEventListener("pointerdown", (event) => {

        if (event.pointerType !== "mouse" || event.button !== 0) {
            return;
        }

        dragging = true;

        moved = false;

        pointerStartX = event.clientX;

        startScrollLeft = track.scrollLeft;

        track.classList.add("is-dragging");

        track.setPointerCapture(event.pointerId);

    });

    track.addEventListener("pointermove", (event) => {

        if (!dragging) return;

        const delta = event.clientX - pointerStartX;

        if (Math.abs(delta) > 4) {
            moved = true;
        }

        if (moved) {

            track.scrollLeft = startScrollLeft - delta;

        }

    });

    // Finaliza o arraste.
    function stopDragging() {

        if (!dragging) return;

        dragging = false;

        track.classList.remove("is-dragging");

        activeIndex = nearestSlideIndex();

        goTo(activeIndex);

    }

    track.addEventListener("pointerup", stopDragging);

    track.addEventListener("pointercancel", stopDragging);

    track.addEventListener("lostpointercapture", stopDragging);

    // Evita clique acidental depois de arrastar.
    track.addEventListener("click", (event) => {

        if (moved) {

            event.preventDefault();

            event.stopPropagation();

            moved = false;

        }

    }, true);

    // Inicializa o carrossel.
    updateControls();

})();
