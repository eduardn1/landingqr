/**
 * Custom hook for optimized scroll-based animations using Intersection Observer
 * Reduces CPU usage compared to scroll event listeners
 */

import { useEffect, useRef, useState, useCallback } from "react";

interface UseAnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useAnimateOnScroll = <T extends HTMLElement = HTMLDivElement>(
  options: UseAnimateOnScrollOptions = {}
) => {
  const { threshold = 0.1, rootMargin = "-50px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already animated and triggerOnce is true
    if (triggerOnce && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return { ref, isVisible };
};

// Hook for staggered animations in lists
export const useStaggeredAnimation = (
  itemCount: number,
  options: UseAnimateOnScrollOptions = {}
) => {
  const { threshold = 0.1, rootMargin = "-50px" } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the visibility of items
          const delays = new Array(itemCount).fill(false);
          delays.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 100); // 100ms stagger
          });
          observer.unobserve(container);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [itemCount, threshold, rootMargin]);

  return { containerRef, visibleItems };
};

export default useAnimateOnScroll;
