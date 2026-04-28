import Image from "next/image";
import { parseImageUrl } from "@/utils/focal-point";

interface HoldPageProps {
  title: string;
  subtitle: string;
  imageUrl: string | null;
}

/**
 * Full-screen "coming soon" splash. `position: fixed; inset-0` plus
 * `body.overflow-hidden` (set by the root layout) means visitors can't
 * scroll past or interact with anything underneath.
 */
export default function HoldPage({ title, subtitle, imageUrl }: HoldPageProps) {
  const { cleanUrl } = parseImageUrl(imageUrl || "");
  const finalImage = cleanUrl || imageUrl;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 px-6 text-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)" }}
    >
      {finalImage && (
        <div className="relative z-10 w-full max-w-md aspect-[4/3]">
          <Image
            src={finalImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-contain"
            priority
          />
        </div>
      )}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-semibold leading-none mb-4">
          {title}
        </h1>
        <h3 className="text-white/70 text-lg sm:text-xl md:text-2xl font-light tracking-wide">
          {subtitle}
        </h3>
      </div>
    </div>
  );
}
