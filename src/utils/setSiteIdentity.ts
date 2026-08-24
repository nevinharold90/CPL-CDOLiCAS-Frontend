// src/utils/setSiteIdentity.ts
export function setSiteIdentity(title: string, favicon: string) {
  document.title = title;

  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/png';
  link.href = favicon;
}