'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { useState, useEffect } from 'react';

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

type PaginatedSliderProps = {
    children: React.ReactNode[];
    interval?: number;
    className?: string;
};

export function PaginatedSlider({
    children,
    interval = 7000,
    className,
}: PaginatedSliderProps) {
    const [currentIndices, setCurrentIndices] = useState([0, 1, 2]);
    const [isPaused, setIsPaused] = useState(false);

    const totalItems = children.length;

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndices(prev => prev.map(index => wrap(0, totalItems, index + 1)));
        }, interval);

        return () => clearInterval(timer);
    }, [isPaused, interval, totalItems]);

    const variants = {
        initial: {
            x: 300,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.8, ease: easeInOut }
        },
        animate: (index: number) => ({
            x: 0,
            opacity: 1,
            scale: index === 1 ? 1 : 0.9,
            transition: { duration: 0.8, ease: easeInOut }
        }),
        exit: {
            x: -300,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.8, ease: easeInOut }
        }
    };

    if (!children.length) {
        return null;
    }

    const handleNext = () => {
        setCurrentIndices(prev => prev.map(index => wrap(0, totalItems, index + 1)));
    };

    const handlePrev = () => {
        setCurrentIndices(prev => prev.map(index => wrap(0, totalItems, index - 1)));
    };

    return (
        <div
            className={cn('relative overflow-hidden', className)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative min-h-[300px]">
                {/* Desktop View */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8 relative">
                    {[0, 1, 2].map((position, i) => (
                        <div key={position} className="relative h-full">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentIndices[i]}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={variants}
                                    custom={i}
                                    className="w-full h-full"
                                >
                                    {children[currentIndices[i]]}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Mobile View */}
                <div className="block lg:hidden relative h-full">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentIndices[0]}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={variants}
                            custom={1}
                            className="w-full h-full"
                        >
                            {children[currentIndices[0]]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation and Pagination Container */}
            <div className="flex items-center justify-center gap-4 mt-8">
                {/* Prev Button */}
                <button
                    onClick={handlePrev}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>

                {/* Pagination */}
                <div className="flex gap-2">
                    {Array.from({ length: totalItems }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndices([index, wrap(0, totalItems, index + 1), wrap(0, totalItems, index + 2)])}
                            className={`w-2 h-2 transition-all duration-500 ${index === currentIndices[0] ? 'bg-white' : 'bg-white/20'
                                }`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}