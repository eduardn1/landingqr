/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * useMicroInteractions - GPU-friendly micro-interaction hooks
 * Optimized for 60fps animations with reduced motion support
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useCallback, useEffect, useState } from 'react';

// Check for reduced motion preference
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

// Haptic feedback for mobile (if supported)
export const useHapticFeedback = () => {
  const trigger = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const duration = type === 'light' ? 10 : type === 'medium' ? 20 : 30;
      navigator.vibrate(duration);
    }
  }, []);

  return { trigger };
};

// Tap animation state
export const useTapAnimation = () => {
  const [isTapped, setIsTapped] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handlers = {
    onTouchStart: () => !prefersReducedMotion && setIsTapped(true),
    onTouchEnd: () => setIsTapped(false),
    onMouseDown: () => !prefersReducedMotion && setIsTapped(true),
    onMouseUp: () => setIsTapped(false),
    onMouseLeave: () => setIsTapped(false),
  };

  const tapStyle = isTapped
    ? { transform: 'scale(0.98)', transition: 'transform 0.1s ease-out' }
    : { transform: 'scale(1)', transition: 'transform 0.2s ease-out' };

  return { handlers, tapStyle, isTapped };
};

// Loading state with shimmer
export const useLoadingState = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return { isLoading, startLoading, stopLoading, setIsLoading };
};

// Scroll-driven opacity (lightweight)
export const useScrollOpacity = (threshold = 100) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const newOpacity = Math.max(0, 1 - scrollY / threshold);
          setOpacity(newOpacity);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return opacity;
};

// Intersection observer for lazy animations
export const useLazyAnimation = (options?: IntersectionObserverInit) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px', ...options }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options, prefersReducedMotion]);

  return { ref: setRef, isVisible };
};

// GPU-friendly animation variants for framer-motion
export const animationVariants = {
  // Fade in from bottom (subtle)
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  },
  
  // Fade in only
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  },
  
  // Scale in (for modals/popups)
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  },
  
  // Stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  
  // Stagger item
  staggerItem: {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  },
  
  // Hover scale (GPU-friendly)
  hoverScale: {
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  
  // Tap scale
  tapScale: {
    scale: 0.98,
    transition: { duration: 0.1, ease: 'easeOut' },
  },
};

export default {
  usePrefersReducedMotion,
  useHapticFeedback,
  useTapAnimation,
  useLoadingState,
  useScrollOpacity,
  useLazyAnimation,
  animationVariants,
};
