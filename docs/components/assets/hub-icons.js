// Card icons for the Camunda Hub pages, drawn in the same grey as the PNG icons.
// Based on Lucide icons (https://lucide.dev).
const toDataUri = (shapes) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="none" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${shapes}</svg>`
  )}`;

export const ServerIcon = toDataUri(
  '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>'
);

export const KeyRoundIcon = toDataUri(
  '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="#999999"/>'
);
