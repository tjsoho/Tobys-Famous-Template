"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AboutTabItem } from "./AboutTabs";

interface Props {
    items: AboutTabItem[];
}

export default function MobileAboutTabs({ items }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="flex flex-col px-4">
            {/* Vertical Carousel */}
            <div className="relative py-8">
                <div className="flex flex-col items-center -space-y-12">
                    {items.map((item, index) => {
                        const isActive = index === activeIndex;
                        const isPrev = index === activeIndex - 1;
                        const isNext = index === activeIndex + 1;

                        if (!isActive && !isPrev && !isNext) return null;

                        return (
                            <motion.button
                                key={item.key}
                                className={`flex items-center gap-4 w-full max-w-md border ${isActive
                                    ? "bg-black text-white border-white p-2"
                                    : "bg-black text-white/30 border-white/10 p-1"
                                    }`}
                                initial={{ opacity: 0, y: index > activeIndex ? 80 : -80 }}
                                animate={{
                                    opacity: isActive ? 1 : 0.5,
                                    y: isActive ? 0 : isPrev ? -60 : 60,
                                    scale: isActive ? 1 : 0.85,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="w-16 h-16 relative flex-shrink-0 bg-black/20 p-2">
                                    <Image
                                        src={item.imageSrc}
                                        alt={`${item.title} icon`}
                                        width={64}
                                        height={64}
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-lg font-semibold">{item.title}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center gap-1.5 mt-8 mb-12">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${index === activeIndex
                            ? "bg-white"
                            : "bg-white/20"
                            }`}
                    />
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="py-6 px-2 border-t border-white/10"
                >
                    <h2 className="text-xl font-bold mb-4 text-white">
                        {items[activeIndex]?.title}
                    </h2>
                    <p className="text-white/70 text-[16px] whitespace-pre-wrap mb-8">
                        {items[activeIndex]?.content}
                    </p>

                    {/* Next/Prev Navigation */}
                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                        <button
                            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                            className={`flex items-center gap-2 text-sm ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'text-white/70 hover:text-white'}`}
                            disabled={activeIndex === 0}
                        >
                            <span className="text-xs">←</span>
                            {items[activeIndex - 1]?.title || 'Previous'}
                        </button>
                        <button
                            onClick={() => setActiveIndex(Math.min(items.length - 1, activeIndex + 1))}
                            className={`flex items-center gap-2 text-sm ${activeIndex === items.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-white/70 hover:text-white'}`}
                            disabled={activeIndex === items.length - 1}
                        >
                            {items[activeIndex + 1]?.title || 'Next'}
                            <span className="text-xs">→</span>
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}