interface ApiResponse {
  success?: boolean;
  error?: string;
}

class ContactForm {
  private form: HTMLFormElement;
  private submitBtn: HTMLButtonElement;

  constructor(form: HTMLFormElement, submitBtn: HTMLButtonElement) {
    this.form = form;
    this.submitBtn = submitBtn;
  }

  private serialize(): Record<string, string | boolean> {
    const data = new FormData(this.form);
    return {
      name: data.get('name') as string,
      email: data.get('email') as string,
      occupation: data.get('occupation') as string,
      message: data.get('message') as string,
      privacy: data.get('privacy') === 'on',
    };
  }

  private setLoading(loading: boolean): void {
    this.submitBtn.disabled = loading;
    this.submitBtn.textContent = loading ? 'Invio in corso...' : 'Invia';
  }

  private clearMessages(): void {
    this.form
      .querySelectorAll(
        '.contact-form__feedback--success, .contact-form__feedback--error',
      )
      .forEach((el) => el.remove());
  }

  private showMessage(message: string, success: boolean): void {
    const el = document.createElement('p');
    el.textContent = message;
    el.className = success
      ? 'contact-form__feedback--success'
      : 'contact-form__feedback--error';
    this.form.appendChild(el);
  }

  public init(): void {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      this.clearMessages();
      this.setLoading(true);

      try {
        const response = await fetch('/api/mail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.serialize()),
        });

        const result = (await response.json()) as ApiResponse;

        if (response.ok && result.success) {
          this.form.reset();
          this.showMessage(
            'Ho ricevuto la tua richiesta. Ti ricontatto entro 24 ore.',
            true,
          );
        } else {
          this.showMessage(
            result.error ?? 'Si è verificato un errore. Riprova per favore.',
            false,
          );
        }
      } catch {
        this.showMessage(
          'Si è verificato un errore. Riprova per favore.',
          false,
        );
      } finally {
        this.setLoading(false);
      }
    });
  }
}

export function initForm(): void {
  const form = document.querySelector<HTMLFormElement>('.contact-form');
  const submitBtn = form?.querySelector<HTMLButtonElement>(
    '.contact-form__submit',
  );

  if (!form || !submitBtn) return;

  new ContactForm(form, submitBtn).init();
}
