export function initEmailBuilder(): void {
  const user = 'gennarodifiandra';
  const domain = 'gmail.com';
  const email = `${user}@${domain}`;

  document.querySelectorAll<HTMLAnchorElement>('[data-email]').forEach((el) => {
    el.textContent = email;
    el.href = `mailto:${email}`;
  });
}
