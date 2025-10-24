"use client";


import { useEffect, useState } from "react";


import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { RenderLineBreaks } from "@/utils/render-line-breaks";

interface GalleryItem {
  id: string;
  title: string;
  titleBold?: boolean;
  summary: string;
  summaryBold?: boolean;
  url: string;
  image: string;
  color?: string;
}

interface Gallery7Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
  onCarouselApiChange?: (api: CarouselApi | undefined) => void;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const Gallery7 = ({
  onCarouselApiChange,

  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
  ],
}: Gallery7Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (onCarouselApiChange) {
      onCarouselApiChange(carouselApi);
    }
  }, [carouselApi, onCarouselApiChange]);
  return (
    <section className="w-full overflow-hidden">
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative w-full flex justify-center md:justify-start"
        >
          <CarouselContent className="-ml-2 w-full">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 max-w-[300px] sm:max-w-sm mx-auto md:mx-0 w-full">
                <div className={`group flex flex-col justify-between h-80 rounded-2xl p-6 sm:p-8 w-full ${item.color || 'bg-brand-yellow text-brand-black'}`}>
                  <div className="flex-1">
                    <h5 className={`leading-relaxed text-left ${item.summaryBold ? 'font-bold-500' : ''}`}>
                      <RenderLineBreaks text={item.summary} />
                    </h5>
                  </div>
                  <div className="mt-auto">
                    <h5 className={`leading-relaxed text-left ${item.titleBold ? 'font-bold-500' : ''}`}>
                      <RenderLineBreaks text={item.title} />
                    </h5>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  );
};

export { Gallery7 };
