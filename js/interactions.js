// ============================================================
// INTERAÇÕES — FORMULÁRIO, VALIDAÇÃO, FEEDBACK
// "Morte na Barbearia"
// ============================================================

export function init() {
  const form = document.getElementById('form-main');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    const name = document.getElementById('form-name');
    const email = document.getElementById('form-email');
    let isValid = true;

    // Valida nome
    if (!name.value.trim()) {
      setError(name, 'Nome é obrigatório');
      isValid = false;
    } else {
      clearError(name);
    }

    // Valida e-mail
    if (!email.value.trim() || !isValidEmail(email.value)) {
      setError(email, 'E-mail inválido');
      isValid = false;
    } else {
      clearError(email);
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    // Feedback de loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';

    // Restaura após 5s (caso a página não recarregue)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 5000);
  });

  // Limpa erros ao digitar
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', function() {
      clearError(this);
    });
  });

  function setError(input, msg) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('is-error');
    let errorEl = group.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      group.appendChild(errorEl);
    }
    errorEl.textContent = msg;
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('is-error');
    const errorEl = group.querySelector('.error-message');
    if (errorEl) errorEl.remove();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}