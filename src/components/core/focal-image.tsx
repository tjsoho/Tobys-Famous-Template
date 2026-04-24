import Image, { ImageProps } from "next/image";
import { parseImageUrl } from "@/utils/focal-point";

type FocalImageProps = Omit<ImageProps, "src"> & {
    src: string | undefined | null;
};

/**
 * Drop-in wrapper around next/image that reads an optional `#fp=X,Y` focal
 * point from the URL and applies it as object-position. Pair with
 * object-cover on className (or a fill container) to actually see the crop.
 */
export default function FocalImage({ src, style, ...rest }: FocalImageProps) {
    const { cleanUrl, focus } = parseImageUrl(src || "");
    const finalSrc = cleanUrl || "/placeholder.jpg";
    return (
        <Image
            {...rest}
            src={finalSrc}
            style={{ objectPosition: `${focus.x}% ${focus.y}%`, ...style }}
        />
    );
}
