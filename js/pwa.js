// ============================================================
// PWA — REGISTRO DO SERVICE WORKER
// "Morte na Barbearia"
// ============================================================
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Caminho relativo ao diretório raiz do site (ex: /ebook-morte-na-barbearia/service-worker.js)
      const swPath = '/ebook-morte-na-barbearia/service-worker.js';
      navigator.serviceWorker.register(swPath)
        .then(reg => {
          console.log('Service Worker registrado:', reg);
        })
        .catch(err => {
          console.warn('Falha no Service Worker:', err);
        });
    });
  }
}
