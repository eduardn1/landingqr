import { LeadFormProvider } from "@/hooks/useLeadForm";
import LeadForm from "@/components/landing/LeadForm";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Features from "@/components/landing/Features";
import VideoDemo from "@/components/landing/VideoDemo";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <LeadFormProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <Hero />
        <Logos />
        <ProblemSolution />
        <Features />
        <VideoDemo />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
        <LeadForm />
      </div>
    </LeadFormProvider>
  );
};

export default Index;
