'use client';

{/* ***************************************************************
   LUXE BUTTON COMPONENT
   Simple, elegant button with subtle shimmer effect
   Uses Tailwind for styling with minimal custom CSS for animation
****************************************************************/}

import Link from 'next/link';

interface LuxeButtonProps {
    title: string;
    href?: string;
    className?: string;
    ariaLabel?: string;
    onClick?: () => void;
    showArrow?: boolean;
}

export default function LuxeButton({
    title,
    href,
    className = '',
    ariaLabel,
    onClick,
    showArrow = false
}: LuxeButtonProps) {
    return (
        <>
            <style jsx global>{`
                .shimmer {
                    position: relative;
                }
                
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        to right,
                        transparent 0%,
                        rgba(0, 0, 0, 0.5) 50%,
                        transparent 100%
                    );
                    transform: translateX(-100%);
                    opacity: 0;
                    transition: opacity 0.1s;
                }
                
                .shimmer:hover::after {
                    opacity: 1;
                    animation: quickShimmer 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                @keyframes quickShimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>

            {href ? (
                <Link
                    href={href}
                    className={`
                        shimmer
                        group
                        relative 
                        inline-flex 
                        items-center 
                        justify-center 
                        px-8 
                        py-3 
                        bg-white 
                        text-black 
                        text-sm 
                        font-medium
                        overflow-hidden
                        transition-all
                        duration-200
                        ease-out
                        shadow-[0_4px_0_0_rgba(0,0,0,0.1)]
                        hover:shadow-[0_6px_0_0_rgba(0,0,0,0.1)]
                        transform
                        hover:-translate-y-0.5
                        active:translate-y-1
                        active:shadow-[0_0px_0_0_rgba(0,0,0,0.1)]
                        ${className}
                    `}
                    aria-label={ariaLabel || title}
                    role="button"
                    tabIndex={0}
                    onClick={onClick}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {title}
                        {showArrow && (
                            <span className="inline-flex items-center transition-all duration-200 group-hover:translate-x-1">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-all duration-200 group-hover:w-5"
                                >
                                    <path
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        )}
                    </span>
                    <span className="sr-only">{ariaLabel || title}</span>
                </Link>
            ) : (
                <button
                    className={`
                        shimmer
                        group
                        relative 
                        inline-flex 
                        items-center 
                        justify-center 
                        px-8 
                        py-3 
                        bg-white 
                        text-black 
                        text-sm 
                        font-medium
                        overflow-hidden
                        transition-all
                        duration-200
                        ease-out
                        shadow-[0_4px_0_0_rgba(0,0,0,0.1)]
                        hover:shadow-[0_6px_0_0_rgba(0,0,0,0.1)]
                        transform
                        hover:-translate-y-0.5
                        active:translate-y-1
                        active:shadow-[0_0px_0_0_rgba(0,0,0,0.1)]
                        ${className}
                    `}
                    onClick={onClick}
                    aria-label={ariaLabel || title}
                    type="button"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {title}
                        {showArrow && (
                            <span className="inline-flex items-center transition-all duration-200 group-hover:translate-x-1">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-all duration-200 group-hover:w-5"
                                >
                                    <path
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        )}
                    </span>
                    <span className="sr-only">{ariaLabel || title}</span>
                </button>
            )}
        </>
    );
}