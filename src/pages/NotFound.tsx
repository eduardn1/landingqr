/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - 404 Not Found Page
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const NotFound = memo(() => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <SEO 
        title="Pagina non trovata - 404"
        description="La pagina che stai cercando non esiste o è stata spostata."
        noindex={true}
      />
      {/* Background */}
      <div className="absolute inset-0 radial-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Static Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4">
        {/* 404 Number */}
        <div className="text-[10rem] md:text-[14rem] font-extrabold leading-none gradient-text opacity-20 select-none">
          404
        </div>
        
        {/* Content */}
        <div className="-mt-16 md:-mt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pagina non trovata
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button className="gradient-button group">
                <Home className="w-4 h-4 mr-2" />
                Torna alla home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-border hover:border-primary/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna indietro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
