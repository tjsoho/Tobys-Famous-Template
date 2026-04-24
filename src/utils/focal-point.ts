export type FocalPoint = { x: number; y: number };

export const DEFAULT_FOCUS: FocalPoint = { x: 50, y: 50 };

/**
 * Focal points are encoded in the URL hash as `#fp=X,Y` (0-100 each).
 * Keeping the value on the URL means the same content field can carry
 * both the image reference and its focal point with no schema changes.
 */
export function parseImageUrl(
  url: string | undefined | null,
): { cleanUrl: string; focus: FocalPoint } {
  if (!url) return { cleanUrl: "", focus: DEFAULT_FOCUS };
  const hashIdx = url.indexOf("#fp=");
  if (hashIdx === -1) return { cleanUrl: url, focus: DEFAULT_FOCUS };

  const cleanUrl = url.slice(0, hashIdx);
  const raw = url.slice(hashIdx + 4);
  const [xStr, yStr] = raw.split(",");
  const x = Number(xStr);
  const y = Number(yStr);
  const focus: FocalPoint = {
    x: Number.isFinite(x) ? Math.max(0, Math.min(100, Math.round(x))) : 50,
    y: Number.isFinite(y) ? Math.max(0, Math.min(100, Math.round(y))) : 50,
  };
  return { cleanUrl, focus };
}

export function encodeImageUrl(cleanUrl: string, focus: FocalPoint): string {
  if (!cleanUrl) return cleanUrl;
  const x = Math.max(0, Math.min(100, Math.round(focus.x)));
  const y = Math.max(0, Math.min(100, Math.round(focus.y)));
  if (x === 50 && y === 50) return cleanUrl;
  return `${cleanUrl}#fp=${x},${y}`;
}

export function focusStyle(url: string | undefined | null): { objectPosition: string } {
  const { focus } = parseImageUrl(url);
  return { objectPosition: `${focus.x}% ${focus.y}%` };
}
