'use client';

import Link from 'next/link';

interface ShiningButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const ShiningButton = ({ href, children, className = '', onClick }: ShiningButtonProps) => {
    return (
        <>
            <style jsx global>{`
        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>

            <Link
                href={href}
                className={`group relative inline-flex items-center justify-center rounded-none border border-white bg-black px-6 py-2.5 font-sans text-xs uppercase text-white transition-all duration-300 hover:border-gray-300 hover:text-gray-300 overflow-hidden ${className}`}
                onClick={onClick}
            >
                <div className="absolute inset-0 w-full h-full">
                    <div
                        className="absolute inset-0 -skew-x-[15deg] bg-gradient-to-r from-transparent from-30% via-white/30 via-50% to-transparent to-70%"
                        style={{
                            animation: 'shine 3.5s ease-in-out infinite 4s',
                            backgroundSize: '200% 100%'
                        }}
                    ></div>
                </div>
                <span className="relative z-10 font-medium">{children}</span>
            </Link>
        </>
    );
};

export default ShiningButton;
