// ============================================================
// INTERAÇÕES — FORMULÁRIO, VALIDAÇÃO, FEEDBACK
// "Morte na Barbearia"
// ============================================================

export function init() {
  const form = document.getElementById('form-main');
  if (!form) return;

  // Elemento do toast
  const toast = document.getElementById('toast');
  const closeBtn = toast?.querySelector('.toast-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

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

    // Dados a serem enviados (sem redirectTo)
    const data = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim() || '',
      apiKey: 'sf_b28b453bf885be88f89f8e34' // Substitua pela sua chave, se necessário
    };

    // Botão de loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';

    try {
      const response = await fetch('https://api.staticforms.dev/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Importante: pede JSON em vez de redirecionamento
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          // Sucesso: exibe toast
          showToast();

          // Limpa o formulário
          form.reset();

          // Após 5 segundos, redireciona para a página inicial
          setTimeout(() => {
            window.location.href = '/';
          }, 5000);
        } else {
          alert('Erro no envio: ' + (result.message || 'Tente novamente.'));
        }
      } else {
        // Se o servidor retornar erro HTTP
        const errorText = await response.text();
        console.error('Erro HTTP:', response.status, errorText);
        alert('Erro no servidor. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
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
      setTimeout(() => {
        toast.classList.remove('show');
      }, 6000);
    }
  }

  // Funções de validação
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
