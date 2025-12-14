/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Landing Page
 * Piattaforma completa per la digitalizzazione di bar, ristoranti, pub e caffè
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { lazy, Suspense } from "react";
import { LeadFormProvider } from "@/hooks/useLeadForm";
import LeadForm from "@/components/landing/LeadForm";
import Navbar from "@/components/landing/Navbar";
import MobileNav from "@/components/landing/MobileNav";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";

// Lazy load below-the-fold components for better initial load performance
const ProblemSolution = lazy(() => import("@/components/landing/ProblemSolution"));
const Features = lazy(() => import("@/components/landing/Features"));
const ProductShowcase = lazy(() => import("@/components/landing/ProductShowcase"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const Testimonials = lazy(() => import("@/components/landing/Testimonials"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));

// Minimal loading fallback
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <LeadFormProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <Hero />
        <Logos />
        <Suspense fallback={<SectionLoader />}>
          <ProblemSolution />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProductShowcase />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FinalCTA />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
        <LeadForm />
        <MobileNav />
      </div>
    </LeadFormProvider>
  );
};

export default Index;
