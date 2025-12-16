/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Logo Loader - Animated loading spinner with Nestify logo
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from 'react';
import logoShort from '@/assets/logo-short.svg';

interface LogoLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const LogoLoader = memo(({ size = 'md', showText = false, className = '' }: LogoLoaderProps) => {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Glow effect behind logo */}
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} bg-primary/20 rounded-full blur-xl animate-pulse`} 
        />
        {/* Logo with animations */}
        <img
          src={logoShort}
          alt="Nestify"
          className={`${sizeClasses[size]} relative z-10 animate-logo-spin drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]`}
        />
      </div>
      {showText && (
        <p className="text-muted-foreground text-sm animate-pulse">Caricamento...</p>
      )}
    </div>
  );
});

LogoLoader.displayName = 'LogoLoader';

export default LogoLoader;
