/**
 * Landing Page Skeleton Loader
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LandingPageSkeleton = memo(() => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Navbar Skeleton */}
      <div className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-16 h-4" />
          <div className="hidden md:flex items-center gap-2">
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
          </div>
          <Skeleton className="w-24 h-8 rounded-full" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
        
        <div className="container relative z-10 py-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-6 flex justify-center">
              <Skeleton className="w-80 h-8 rounded-full" />
            </div>

            {/* Headline */}
            <div className="space-y-3 mb-6">
              <Skeleton className="w-3/4 h-12 md:h-16 mx-auto rounded-lg" />
              <Skeleton className="w-1/2 h-12 md:h-16 mx-auto rounded-lg" />
            </div>

            {/* Subheading */}
            <div className="space-y-2 mb-6 max-w-2xl mx-auto px-4">
              <Skeleton className="w-full h-5 rounded" />
              <Skeleton className="w-3/4 h-5 mx-auto rounded" />
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-6 px-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-28 h-10 rounded-full" />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-4">
              <Skeleton className="w-48 h-14 rounded-2xl" />
              <Skeleton className="w-40 h-14 rounded-2xl" />
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-4 justify-center">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-36 h-5 rounded" />
              ))}
            </div>
          </div>

          {/* Dashboard Preview Skeleton */}
          <div className="relative mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-border">
              <div className="bg-card p-4 md:p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div>
                      <Skeleton className="w-20 h-3 rounded mb-1" />
                      <Skeleton className="w-14 h-2 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-7 h-7 rounded-lg" />
                    <Skeleton className="w-7 h-7 rounded-lg" />
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-3 border border-border">
                      <Skeleton className="w-7 h-7 rounded-lg mb-2" />
                      <Skeleton className="w-12 h-3 rounded mb-1" />
                      <Skeleton className="w-16 h-5 rounded" />
                    </div>
                  ))}
                </div>

                {/* Grid Preview */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section Skeleton */}
      <section className="py-10 md:py-14">
        <div className="container">
          <Skeleton className="w-64 h-4 mx-auto mb-8 rounded" />
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/50 border border-border">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div>
                  <Skeleton className="w-12 h-5 rounded mb-1" />
                  <Skeleton className="w-10 h-3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

LandingPageSkeleton.displayName = 'LandingPageSkeleton';

export default LandingPageSkeleton;
