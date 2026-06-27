// ============================================================
// NAVEGAÇÃO — HEADER STICKY, SCROLL PROGRESS, SMOOTH
// "Morte na Barbearia"
// ============================================================

export function init() {
  const header = document.querySelector('.header');
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.prepend(scrollProgress);

  let ticking = false;

  function updateScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Header
    if (currentScroll > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    // Barra de progresso
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Atualiza URL sem recarregar
        history.pushState(null, '', href);
      }
    });
  });

  // Atualiza no load
  updateScroll();
}