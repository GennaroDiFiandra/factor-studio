export function initCursor(): void {
  const cursor = document.querySelector('.cursor') as HTMLElement;

  if (!cursor) return;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
  });
}
