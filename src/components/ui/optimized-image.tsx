/**
 * Optimized Image Component with Lazy Loading and Blur Placeholder
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useRef, useEffect, memo, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholderColor?: string;
  blur?: boolean;
}

const OptimizedImage = memo(({
  src,
  alt,
  className,
  containerClassName,
  placeholderColor = "bg-muted",
  blur = true,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Blur placeholder */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          placeholderColor,
          blur && "backdrop-blur-sm",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-all duration-500",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          blur && !isLoaded && "blur-sm",
          className
        )}
        {...props}
      />
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage };
