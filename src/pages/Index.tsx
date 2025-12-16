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
import { useBrandSettings } from "@/hooks/useBrandSettings";
import LeadForm from "@/components/landing/LeadForm";
import Navbar from "@/components/landing/Navbar";
import DynamicSEO from "@/components/DynamicSEO";
import LandingPageSkeleton from "@/components/landing/LandingPageSkeleton";

import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";

// Lazy load below-the-fold components for better initial load performance
const ProblemSolution = lazy(() => import("@/components/landing/ProblemSolution"));
const Features = lazy(() => import("@/components/landing/Features"));
const ProductShowcase = lazy(() => import("@/components/landing/ProductShowcase"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const Testimonials = lazy(() => import("@/components/landing/Testimonials"));
const FAQCard = lazy(() => import("@/components/landing/FAQCard"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));

// Minimal loading fallback for lazy sections
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const { isLoading } = useBrandSettings();

  // Show skeleton while initial data is loading
  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <LeadFormProvider>
      <DynamicSEO />
      <div className="min-h-screen bg-background overflow-x-hidden animate-content-show">
        <Navbar />
        <Hero />
        <Logos />
        {/* Single Suspense boundary for all lazy-loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <ProductShowcase />
          <Pricing />
          <Testimonials />
          <FAQCard />
          <FinalCTA />
          <Footer />
        </Suspense>
        <LeadForm />
      </div>
    </LeadFormProvider>
  );
};

export default Index;
