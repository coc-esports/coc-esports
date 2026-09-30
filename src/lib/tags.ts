// Player/clan tags use a fixed alphabet. Accepts "#2pp", "2PP", " #2PP " and returns "2PP" (no #), or null.
// Players often type the letter O for the digit 0; tags never contain O, so fix it.
export function normalizeTag(raw: string): string | null {
  let text = raw;
  try {
    text = decodeURIComponent(raw);
  } catch {
    return null;
  }
  const tag = text.trim().toUpperCase().replace(/^#/, "").replace(/O/g, "0");
  return /^[0289PYLQGRJCUV]{3,12}$/.test(tag) ? tag : null;
}
