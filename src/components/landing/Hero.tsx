/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Hero Section (Minimal 2026 Design)
 * Inspired by Cadence, SocialLift, Courseline
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { ArrowRight, Check, Play } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TapButton from "@/components/ui/tap-button";

const Hero = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      
      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge - Minimal */}
          <ScrollReveal animation="fadeIn" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
              <span className="text-sm font-medium text-primary">Menu digitali per bar, ristoranti e pub</span>
            </div>
          </ScrollReveal>

          {/* Headline - Large, Clean Typography */}
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              <span className="text-foreground">La tua attività,</span>
              <br />
              <span className="text-gradient-primary">digitalizzata.</span>
            </h1>
          </ScrollReveal>

          {/* Subheading - Muted, Concise */}
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Menu QR, prenotazioni, delivery e takeaway. Una piattaforma. 
              Zero commissioni. Pronto in 10 minuti.
            </p>
          </ScrollReveal>

          {/* Single Primary CTA */}
          <ScrollReveal animation="fadeUp" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <TapButton
                variant="primary"
                size="lg"
                onClick={() => openLeadForm("hero-cta")}
                className="px-8 py-4 text-base font-semibold shadow-lg shadow-primary/25"
              >
                Inizia gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </TapButton>

              <TapButton
                variant="outline"
                size="lg"
                onClick={() => window.open("https://demo2.studiojem.it", "_blank")}
                className="px-8 py-4 text-base"
              >
                <Play className="w-4 h-4 mr-2" />
                Guarda demo
              </TapButton>
            </div>
          </ScrollReveal>

          {/* Trust Signals - Minimal */}
          <ScrollReveal animation="fadeIn" delay={0.4}>
            <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground">
              {["14 giorni gratis", "Nessuna carta richiesta", "Cancella quando vuoi"].map((text) => (
                <span key={text} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  {text}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Product Preview - Clean, Minimal */}
        <ScrollReveal animation="fadeUp" delay={0.5} className="mt-16 md:mt-24">
          <div className="relative max-w-5xl mx-auto">
            {/* Subtle glow behind */}
            <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl blur-2xl opacity-50" />
            
            {/* Dashboard Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground">
                    app.flavour.it/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content - Simplified */}
              <div className="p-6 md:p-8 bg-card">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Ordini oggi", value: "127", change: "+12%" },
                    { label: "Ricavi", value: "€2.4k", change: "+8%" },
                    { label: "Clienti", value: "89", change: "+15%" },
                    { label: "Prenotazioni", value: "24", change: "+5%" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <span className="text-xs text-primary font-medium">{stat.change}</span>
                    </div>
                  ))}
                </div>

                {/* Placeholder rows */}
                <div className="space-y-3">
                  <div className="h-12 rounded-lg bg-muted/30 animate-pulse" />
                  <div className="h-12 rounded-lg bg-muted/30 animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="h-12 rounded-lg bg-muted/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>

              {/* Fade overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            </div>

            {/* Floating Badge - Top Right */}
            <div className="absolute -top-3 -right-3 md:top-4 md:right-4 hidden sm:block">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border shadow-lg">
                <div className="flex -space-x-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium text-foreground">+500 locali</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
