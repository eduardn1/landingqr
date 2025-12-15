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

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import FAQ from "./pages/FAQ";
import Guides from "./pages/Guides";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partner from "./pages/Partner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/guide" element={<Guides />} />
            <Route path="/contatti" element={<Contact />} />
            <Route path="/chi-siamo" element={<About />} />
            <Route path="/diventa-rivenditore" element={<Partner />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
