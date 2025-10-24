'use client';

interface LuxeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
}

export default function LuxeButton({ children, isLoading, disabled, className = '', ...props }: LuxeButtonProps) {
    return (
        <button
            disabled={isLoading || disabled}
            className={`
                relative px-8 py-3 bg-black border border-white/20 text-white 
                transition-all duration-300 overflow-hidden group
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:border-white
                ${className}
            `}
            {...props}
        >
            <span className="relative z-10">{isLoading ? 'Loading...' : children}</span>
            <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                transition-transform duration-700 bg-gradient-to-r from-transparent 
                via-white/10 to-transparent"
            />
        </button>
    );
}
