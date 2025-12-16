/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - App Root Component
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

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import FAQ from "./pages/FAQ";
import Guides from "./pages/Guides";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partner from "./pages/Partner";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import CookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

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
              <Route path="/demo" element={<Demo />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/guide" element={<Guides />} />
              <Route path="/contatti" element={<Contact />} />
              <Route path="/chi-siamo" element={<About />} />
              <Route path="/diventa-rivenditore" element={<Partner />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/termini-servizio" element={<Terms />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminAuth />} />
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
