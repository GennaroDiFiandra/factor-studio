class Offcanvas {
  private section: HTMLElement;
  private triggers: NodeListOf<HTMLElement>;

  constructor(section: HTMLElement, triggers: NodeListOf<HTMLElement>) {
    this.section = section;
    this.triggers = triggers;
  }

  private open(): void {
    this.section.classList.add('offcanvas--open');
    this.section.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleEscape);
    this.section.querySelector<HTMLElement>('.offcanvas__close')?.focus();
  }

  private close(): void {
    this.section.classList.remove('offcanvas--open');
    this.section.setAttribute('inert', '');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleEscape);
  }

  private handleEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.close();
  };

  private createCloseButton(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'offcanvas__close';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Chiudi');
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="nonzero" fill="var(--color-vector, var(--color-white))" d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>`;
    return btn;
  }

  public init(): void {
    this.section.setAttribute('role', 'dialog');
    this.section.setAttribute('aria-modal', 'true');
    this.section.setAttribute('inert', '');

    const wrapper = this.section.firstElementChild
      ?.firstElementChild as HTMLElement | null;
    if (wrapper) {
      const closeBtn = this.createCloseButton();
      closeBtn.addEventListener('click', () => this.close());
      wrapper.insertBefore(closeBtn, wrapper.firstChild);
    }

    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    this.section.addEventListener('click', (e) => {
      if (e.target === this.section) this.close();
    });
  }
}

export function initOffcanvas(sectionId: string): void {
  const section = document.querySelector<HTMLElement>(`#${sectionId}`);
  const triggers = document.querySelectorAll<HTMLElement>(
    `[data-offcanvas="${sectionId}"]`,
  );

  if (!section || triggers.length === 0) return;

  new Offcanvas(section, triggers).init();
}
