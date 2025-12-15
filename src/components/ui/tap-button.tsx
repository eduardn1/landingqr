/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TapButton - Mobile-optimized button with tap feedback
 * GPU-friendly animations with haptic feedback support
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion, useHapticFeedback } from '@/hooks/useMicroInteractions';

interface TapButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  haptic?: boolean;
  className?: string;
}

const TapButton = forwardRef<HTMLButtonElement, TapButtonProps>(
  ({ children, variant = 'primary', size = 'md', haptic = true, className, onClick, ...props }, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const { trigger: triggerHaptic } = useHapticFeedback();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (haptic) {
        triggerHaptic('light');
      }
      onClick?.(e);
    };

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-muted text-foreground',
      outline: 'border border-border bg-transparent text-foreground hover:border-primary hover:text-primary',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:outline-none',
          // Ensure tap target is at least 44px for mobile
          'min-h-[44px] min-w-[44px]',
          variants[variant],
          sizes[size],
          className
        )}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

TapButton.displayName = 'TapButton';

export default TapButton;
