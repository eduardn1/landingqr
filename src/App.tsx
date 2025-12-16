/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - App Root Component
 * Piattaforma completa per la digitalizzazione del ristorante
 * 
 * Features:
 * - Menu Digitale QR (30+ funzionalità)
 * - Multi-Lingua (5 lingue)
 * - 8 Template Homepage
 * - Asporto & Delivery (zero commissioni)
 * - Prenotazioni Smart
 * - Loyalty & Gamification
 * - WhatsApp Automation
 * - Analytics Dashboard
 * - E molto altro...
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

// Lazy load pages to prevent recharts bundle from loading on landing page
const Demo = lazy(() => import("./pages/Demo"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Guides = lazy(() => import("./pages/Guides"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Partner = lazy(() => import("./pages/Partner"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/demo" element={<Suspense fallback={<PageLoader />}><Demo /></Suspense>} />
              <Route path="/faq" element={<Suspense fallback={<PageLoader />}><FAQ /></Suspense>} />
              <Route path="/guide" element={<Suspense fallback={<PageLoader />}><Guides /></Suspense>} />
              <Route path="/contatti" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
              <Route path="/chi-siamo" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
              <Route path="/diventa-rivenditore" element={<Suspense fallback={<PageLoader />}><Partner /></Suspense>} />
              <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><Privacy /></Suspense>} />
              <Route path="/cookie-policy" element={<Suspense fallback={<PageLoader />}><CookiePolicy /></Suspense>} />
              <Route path="/termini-servizio" element={<Suspense fallback={<PageLoader />}><Terms /></Suspense>} />
              <Route path="/admin" element={<Suspense fallback={<PageLoader />}><Admin /></Suspense>} />
              <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminAuth /></Suspense>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
            <BackToTop />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
