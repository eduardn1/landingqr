/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Section Skeleton - Loading placeholder for lazy loaded sections
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from 'react';

interface SectionSkeletonProps {
  height?: string;
}

const SectionSkeleton = memo(({ height = "h-96" }: SectionSkeletonProps) => {
  return (
    <div className={`${height} bg-muted/30 animate-pulse flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <p className="text-muted-foreground text-sm">Caricamento...</p>
      </div>
    </div>
  );
});

SectionSkeleton.displayName = 'SectionSkeleton';

export default SectionSkeleton;
