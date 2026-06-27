// ============================================================
// EFEITOS — RIPPLE, MAGNETIC, GLOW
// "Morte na Barbearia"
// ============================================================

export function init() {
  // ----- RIPPLE (botões) -----
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ----- MAGNETIC (botões) -----
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const max = 8;
      const moveX = (x / rect.width) * max;
      const moveY = (y / rect.height) * max;
      this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // ----- GLOW SUTIL EM CARDS (adiciona brilho ao hover) -----
  document.querySelectorAll('.card, .chapter-card, .testimonial-card').forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.boxShadow = 'var(--shadow-medium), 0 0 40px rgba(212,175,55,0.06)';
    });
    el.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
}