// ============================================================
// SCRIPT PRINCIPAL — INICIALIZAÇÃO MODULAR
// "Morte na Barbearia"
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Carrega módulos dinamicamente
  import('./navigation.js').then(mod => mod.init());
  import('./animations.js').then(mod => mod.init());
  import('./effects.js').then(mod => mod.init());
  import('./interactions.js').then(mod => mod.init());
  import('./pwa.js').then(mod => mod.register());
});