/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Landing Page (Performance Optimized)
 * Piattaforma completa per la digitalizzazione del ristorante
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { lazy, Suspense, memo } from "react";
import { LeadFormProvider } from "@/hooks/useLeadForm";
import SectionSkeleton from "@/components/ui/section-skeleton";

// Critical components - load immediately
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

// Lazy load all below-fold sections for better performance
const Logos = lazy(() => import("@/components/landing/Logos"));
const ProblemSolution = lazy(() => import("@/components/landing/ProblemSolution"));
const Features = lazy(() => import("@/components/landing/Features"));
const ProductShowcase = lazy(() => import("@/components/landing/ProductShowcase"));
const VideoDemo = lazy(() => import("@/components/landing/VideoDemo"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const Testimonials = lazy(() => import("@/components/landing/Testimonials"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const LeadForm = lazy(() => import("@/components/landing/LeadForm"));

const Index = memo(() => {
  return (
    <LeadFormProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Critical above-fold content */}
        <Navbar />
        <Hero />
        
        {/* Lazy loaded sections with suspense boundaries */}
        <Suspense fallback={<SectionSkeleton height="h-40" />}>
          <Logos />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-screen" />}>
          <ProblemSolution />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-screen" />}>
          <Features />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-screen" />}>
          <ProductShowcase />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <VideoDemo />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-screen" />}>
          <HowItWorks />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-screen" />}>
          <Pricing />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <FAQ />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <FinalCTA />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <Footer />
        </Suspense>
        
        <Suspense fallback={null}>
          <LeadForm />
        </Suspense>
      </div>
    </LeadFormProvider>
  );
});

Index.displayName = 'Index';

export default Index;
