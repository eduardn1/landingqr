import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
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
        "fixed bottom-6 right-6 z-50 p-2.5 rounded-full",
        "bg-background/30 backdrop-blur-md",
        "border border-border/50 text-foreground/70",
        "hover:bg-background/50 hover:text-foreground hover:border-border",
        "hover:scale-105",
        "active:scale-95",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-1 focus:ring-border/50",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
