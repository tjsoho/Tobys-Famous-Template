import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface GetStartedButtonProps {
  text?: string;
  className?: string;
}

export function GetStartedButton({
  text = "Get Started",
  className = ""
}: GetStartedButtonProps) {
  return (
    <Button
      className={`group relative overflow-hidden bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black border-0 rounded-full px-8 py-8 text-lg font-medium ${className}`}
      size="lg"
    >
      <span className="mr-16 transition-opacity duration-500 group-hover:opacity-0">
        {text}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-1/5 place-items-center transition-all duration-500 bg-brand-teal group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}
