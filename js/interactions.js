// ============================================================
// INTERAÇÕES — FORMULÁRIO, VALIDAÇÃO, FEEDBACK
// "Morte na Barbearia"
// ============================================================

// js/interactions.js
export function init() {
  const form = document.getElementById('form-main');
  if (!form) return;

  // Elemento do toast
  const toast = document.getElementById('toast');
  const closeBtn = toast?.querySelector('.toast-close');

  // Fechar toast manualmente
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o redirecionamento padrão

    const name = document.getElementById('form-name');
    const email = document.getElementById('form-email');
    const message = document.getElementById('form-message');

    // Validação
    let isValid = true;
    if (!name.value.trim()) {
      setError(name, 'Nome é obrigatório');
      isValid = false;
    } else {
      clearError(name);
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      setError(email, 'E-mail inválido');
      isValid = false;
    } else {
      clearError(email);
    }

    if (!isValid) return;

    // Prepara os dados
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Botão de loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';

    try {
      const response = await fetch('https://api.staticforms.dev/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Sucesso: exibe toast
        showToast();

        // Limpa o formulário
        form.reset();

        // Após 5 segundos, redireciona para a página inicial
        setTimeout(() => {
          window.location.reload(); // ou window.location.hash = '#';
        }, 5000);

      } else {
        alert('Ocorreu um erro ao enviar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      alert('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  // Função para exibir o toast
  function showToast() {
    if (toast) {
      toast.classList.add('show');
      // Fecha automaticamente após 6 segundos (caso o usuário não feche)
      setTimeout(() => {
        toast.classList.remove('show');
      }, 6000);
    }
  }

  // Funções auxiliares (validação)
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

  // Limpa erros ao digitar
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', function () {
      clearError(this);
    });
  });
}
