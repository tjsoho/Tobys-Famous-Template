import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BWestSmallButtonProps {
    text?: string;
    className?: string;
    variant?: "default" | "inverted";
    onClick?: () => void;
}

export function BWestSmallButton({
    text = "Open an account",
    className = "",
    variant = "default",
    onClick
}: BWestSmallButtonProps) {
    const isInverted = variant === "inverted";

    return (
        <Button
            onClick={onClick}
            className={`group relative overflow-hidden ${isInverted
                ? "bg-brand-black hover:bg-brand-black/90 text-brand-yellow border-0"
                : "bg-brand-yellow hover:bg-brand-teal text-brand-black border-0"
                } rounded-full px-12 py-3 text-sm font-medium ${className}`}
            size="default"
        >
            {/* Text that stays visible */}
            <span className={`relative z-20 transition-colors duration-500 ${isInverted
                ? "group-hover:text-brand-black"
                : "group-hover:text-white"
                }`}>
                {text}
            </span>

            {/* Teal circle that slides across and grows */}
            <div className={`absolute left-1 top-1 bottom-1 w-8 h-8 rounded-full ${isInverted
                ? "bg-brand-yellow"
                : "bg-brand-teal"
                } transition-all duration-500 group-hover:right-1 group-hover:w-[calc(100%-0.5rem)] group-hover:h-[calc(100%-0.5rem)] group-hover:top-1 group-hover:bottom-1 z-10 flex items-center justify-end pr-3`}>
                <ArrowRight
                    size={28}
                    strokeWidth={2}
                    className={`${isInverted
                        ? "text-brand-black pl-2"
                        : "text-white pl-2"
                        }`}
                />
            </div>
        </Button>
    );
}
