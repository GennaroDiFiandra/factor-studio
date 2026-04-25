class AnimatedBox {
  private boxes: NodeListOf<HTMLElement>;

  constructor(boxes: NodeListOf<HTMLElement>) {
    this.boxes = boxes;
  }

  private observe(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const siblings = [
          ...entry.target.parentElement!.querySelectorAll<HTMLElement>(
            '._animated-box',
          ),
        ];
        const index = siblings.indexOf(entry.target as HTMLElement);

        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 160);

        observer.unobserve(entry.target);
      });
    });

    this.boxes.forEach((box) => observer.observe(box));
  }

  public init(): void {
    this.observe();
  }
}

export function initAnimatedBox(): void {
  const boxes = document.querySelectorAll<HTMLElement>('._animated-box');

  if (!boxes.length) return;

  new AnimatedBox(boxes).init();
}
