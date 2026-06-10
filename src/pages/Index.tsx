/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Landing Page
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
import DynamicSEO from "@/components/DynamicSEO";
import LogoLoader from "@/components/ui/logo-loader";

import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";

// Lazy load below-the-fold components for better initial load performance
const ProblemSolution = lazy(() => import("@/components/landing/ProblemSolution"));
const Features = lazy(() => import("@/components/landing/Features"));
const ProductShowcase = lazy(() => import("@/components/landing/ProductShowcase"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const UseCases = lazy(() => import("@/components/landing/UseCases"));
const ReservationsModule = lazy(() => import("@/components/landing/ReservationsModule"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const Testimonials = lazy(() => import("@/components/landing/Testimonials"));
const FAQCard = lazy(() => import("@/components/landing/FAQCard"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));

// Minimal loading fallback with Nestify logo
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <LogoLoader size="md" />
  </div>
);

const Index = () => {
  return (
    <LeadFormProvider>
      <DynamicSEO />
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <Hero />
        <Logos />
        {/* Single Suspense boundary for all lazy-loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <UseCases />
          <ReservationsModule />
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
