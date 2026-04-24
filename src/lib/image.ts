import sharp from "sharp";

const MAX_WIDTH = 1440;
const QUALITY = 72;
const THUMB_W = 400;
const THUMB_Q = 70;

export async function compressImage(
  buffer: Buffer,
  mimeType: string,
): Promise<{ buffer: Buffer; mimeType: "image/webp" | string; size: number }> {
  if (mimeType === "image/gif" || mimeType === "image/svg+xml") {
    return { buffer, mimeType, size: buffer.length };
  }

  const image = sharp(buffer).rotate();

  const meta = await image.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    image.resize(MAX_WIDTH, undefined, { withoutEnlargement: true });
  }

  const compressed = await image.webp({ quality: QUALITY }).toBuffer();
  return {
    buffer: compressed,
    mimeType: "image/webp",
    size: compressed.length,
  };
}

export async function generateThumbnail(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .rotate()
    .resize(THUMB_W, undefined, { withoutEnlargement: true })
    .webp({ quality: THUMB_Q })
    .toBuffer();
}

export function isImage(mimeType: string): boolean {
  return [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/heic",
    "image/heif",
    "image/tiff",
    "image/avif",
    "image/svg+xml",
  ].includes(mimeType);
}
