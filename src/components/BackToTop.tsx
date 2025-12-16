import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Torna su"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-10 h-10 rounded-full",
        "bg-background/60 backdrop-blur-md",
        "border border-border/50",
        "text-muted-foreground hover:text-foreground",
        "hover:bg-background/80 hover:border-border",
        "active:scale-95",
        "transition-all duration-300 ease-out",
        "flex items-center justify-center",
        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ChevronUp className="w-5 h-5" strokeWidth={1.5} />
    </button>
  );
};

export default BackToTop;