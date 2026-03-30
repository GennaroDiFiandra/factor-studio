class Navigation {
  private toggler: HTMLElement;
  private menu: HTMLElement;
  private isOpen: boolean = false;

  constructor(toggler: HTMLElement, menu: HTMLElement) {
    this.toggler = toggler;
    this.menu = menu;
  }

  private open(): void {
    this.isOpen = true;
    this.menu.classList.add('navigation__menu--open');
    this.toggler.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleEscape);
  }

  private close(): void {
    this.isOpen = false;
    this.menu.classList.remove('navigation__menu--open');
    this.toggler.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleEscape);
  }

  private handleEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.close();
  };

  public init(): void {
    this.toggler.setAttribute('aria-expanded', 'false');
    this.toggler.setAttribute('aria-controls', 'navigation-menu');
    this.menu.setAttribute('id', 'navigation-menu');

    this.toggler.addEventListener('click', () => {
      this.isOpen ? this.close() : this.open();
    });

    const closeBtn = this.menu.querySelector(
      '.navigation__menu__close__button',
    );
    closeBtn?.addEventListener('click', () => this.close());

    this.menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => this.close());
    });
  }
}

export function initNavigation(): void {
  const toggler = document.querySelector<HTMLElement>('.navigation__toggler');
  const menu = document.querySelector<HTMLElement>('.navigation__menu');

  if (!toggler || !menu) return;

  new Navigation(toggler, menu).init();
}
