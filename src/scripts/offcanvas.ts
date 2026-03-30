const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

class Offcanvas {
  private offcanvas: HTMLElement;
  private overlay: HTMLElement;
  private closeBtn: Element;
  private titleEl: HTMLElement;
  private triggerElement: HTMLElement | null = null;

  constructor(
    offcanvas: HTMLElement,
    overlay: HTMLElement,
    closeBtn: Element,
    titleEl: HTMLElement,
  ) {
    this.offcanvas = offcanvas;
    this.overlay = overlay;
    this.closeBtn = closeBtn;
    this.titleEl = titleEl;
  }

  private trapFocus = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;

    const focusable = Array.from(
      this.offcanvas.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  private handleEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.close();
  };

  private showContent(id: string): void {
    this.offcanvas
      .querySelectorAll<HTMLElement>('.offcanvas__content')
      .forEach((el) => {
        el.hidden = el.dataset.offcanvasId !== id;
      });
  }

  public open(id: string, title: string): void {
    this.triggerElement = document.activeElement as HTMLElement;
    this.titleEl.textContent = title;
    this.showContent(id);
    this.offcanvas.setAttribute('aria-hidden', 'false');
    this.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.offcanvas.addEventListener('keydown', this.trapFocus);
    document.addEventListener('keydown', this.handleEscape);

    const firstFocusable =
      this.offcanvas.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
    firstFocusable?.focus();
  }

  public close(): void {
    this.offcanvas.setAttribute('aria-hidden', 'true');
    this.overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.offcanvas.removeEventListener('keydown', this.trapFocus);
    document.removeEventListener('keydown', this.handleEscape);
    this.triggerElement?.focus();
  }

  public init(): void {
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());

    document
      .querySelectorAll<HTMLElement>('[data-offcanvas]')
      .forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const id = trigger.dataset.offcanvas ?? '';
          const title = trigger.dataset.offcanvasTitle ?? '';
          this.open(id, title);
        });
      });
  }
}

export function initOffcanvas(): void {
  const offcanvas = document.getElementById('offcanvas');
  const overlay = document.getElementById('offcanvas-overlay');
  const closeBtn = offcanvas?.querySelector('.offcanvas__close');
  const titleEl = document.getElementById('offcanvas-title');

  if (!offcanvas || !overlay || !closeBtn || !titleEl) return;

  new Offcanvas(offcanvas, overlay, closeBtn, titleEl).init();
}
