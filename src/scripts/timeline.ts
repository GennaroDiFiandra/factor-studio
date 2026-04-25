class Timeline {
  private bar: HTMLElement;
  private items: NodeListOf<HTMLElement>;

  constructor(bar: HTMLElement, items: NodeListOf<HTMLElement>) {
    this.bar = bar;
    this.items = items;
  }

  private update(): void {
    const barRect = this.bar.getBoundingClientRect();
    const barTop = barRect.top;
    const barHeight = barRect.height;
    const viewportMiddle = window.innerHeight / 2;

    const progress = Math.max(
      0,
      Math.min(1, (viewportMiddle - barTop) / barHeight),
    );

    this.bar.style.background = `linear-gradient(
      to bottom,
      var(--color-secondary) ${progress * 100}%,
      var(--color-secondary-white) ${progress * 100}%
    )`;
    this.bar.style.opacity = '1';

    this.items.forEach((item) => {
      const icon = item.querySelector<HTMLElement>(
        '.who-content__timeline__points__item__title__icon',
      );
      if (!icon) return;

      const iconRect = icon.getBoundingClientRect();
      const iconMiddle = iconRect.top + iconRect.height / 2;
      const isActive = iconMiddle < viewportMiddle;

      icon.style.backgroundColor = isActive
        ? 'var(--color-secondary)'
        : 'var(--color-white)';
    });
  }

  public init(): void {
    window.addEventListener('scroll', () => this.update(), { passive: true });
    this.update();
  }
}

export function initTimeline(): void {
  const bar = document.querySelector<HTMLElement>(
    '.who-content__timeline__bar',
  );
  const items = document.querySelectorAll<HTMLElement>(
    '.who-content__timeline__points__item',
  );

  if (!bar || !items.length) return;

  new Timeline(bar, items).init();
}
