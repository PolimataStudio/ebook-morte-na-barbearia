// ============================================================
// PWA — REGISTRO DO SERVICE WORKER
// "Morte na Barbearia"
// ============================================================

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('Service Worker registrado:', reg);
        })
        .catch(err => {
          console.warn('Falha no Service Worker:', err);
        });
    });
  }
}