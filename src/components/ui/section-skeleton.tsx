/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Section Skeleton - Loading placeholder for lazy loaded sections
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from 'react';
import LogoLoader from './logo-loader';

interface SectionSkeletonProps {
  height?: string;
}

const SectionSkeleton = memo(({ height = "h-96" }: SectionSkeletonProps) => {
  return (
    <div className={`${height} bg-muted/30 flex items-center justify-center`}>
      <LogoLoader size="lg" showText />
    </div>
  );
});

SectionSkeleton.displayName = 'SectionSkeleton';

export default SectionSkeleton;
