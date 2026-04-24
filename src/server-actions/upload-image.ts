"use server";

import { createClient } from "@/utils/server";
import { compressImage, generateThumbnail, isImage } from "@/lib/image";

type UploadSuccess = {
  success: true;
  url: string;
  name: string;
  size: number;
};

type UploadFailure = {
  success: false;
  error: string;
};

export async function uploadImage(
  formData: FormData,
): Promise<UploadSuccess | UploadFailure> {
  try {
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return { success: false, error: "No file provided" };
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer());
    const shouldCompress = isImage(file.type);

    let finalBuffer: Buffer = originalBuffer;
    let finalMime = file.type || "application/octet-stream";
    let finalName = file.name;

    if (shouldCompress) {
      const result = await compressImage(originalBuffer, file.type);
      finalBuffer = result.buffer;
      finalMime = result.mimeType;
      if (result.mimeType === "image/webp") {
        finalName = file.name.replace(/\.[^.]+$/, "") + ".webp";
      }
    }

    const ext = finalName.split(".").pop() || "webp";
    const baseName = finalName
      .replace(/\.[^.]+$/, "")
      .replace(/[^\w-]+/g, "-");
    const storageName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${baseName}.${ext}`;

    const supabase = await createClient();

    const { error } = await supabase.storage
      .from("site-images")
      .upload(storageName, finalBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: finalMime,
      });
    if (error) throw error;

    if (shouldCompress && file.type !== "image/gif" && file.type !== "image/svg+xml") {
      try {
        const thumb = await generateThumbnail(originalBuffer);
        await supabase.storage
          .from("site-images")
          .upload(`thumbnails/${storageName}`, thumb, {
            cacheControl: "3600",
            upsert: true,
            contentType: "image/webp",
          });
      } catch (err) {
        console.warn("Thumbnail generation failed:", err);
      }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("site-images").getPublicUrl(storageName);

    return {
      success: true,
      url: publicUrl,
      name: storageName,
      size: finalBuffer.length,
    };
  } catch (error) {
    console.error("uploadImage error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
