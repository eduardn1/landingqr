/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Features Section (Minimal 2026 Design)
 * Clean cards with single accent color
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, memo, useCallback } from "react";
import { 
  UtensilsCrossed,
  Calendar, 
  ShoppingBag, 
  BarChart3,
  Trophy,
  Gift,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ui/scroll-reveal";
import StaggerContainer, { StaggerItem } from "@/components/ui/stagger-container";
import TapButton from "@/components/ui/tap-button";
import type { LucideIcon } from "lucide-react";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  stat: string;
  statLabel: string;
}

const features: Feature[] = [
  {
    id: "menu",
    icon: UtensilsCrossed,
    title: "Menu & Allergeni",
    description: "Editor drag & drop per piatti. 14 filtri allergeni. Traduzioni AI in 5 lingue.",
    benefits: ["Piatti illimitati", "14 allergeni", "5 lingue"],
    stat: "∞",
    statLabel: "Piatti",
  },
  {
    id: "orders",
    icon: ShoppingBag,
    title: "Ordini & Delivery",
    description: "Asporto e delivery senza commissioni. Tracking GPS real-time per i driver.",
    benefits: ["0% commissioni", "Tracking GPS", "Notifiche auto"],
    stat: "0%",
    statLabel: "Commissioni",
  },
  {
    id: "reservations",
    icon: Calendar,
    title: "Prenotazioni",
    description: "Conferma automatica via WhatsApp. Gestione tavoli ed eventi speciali.",
    benefits: ["Conferma auto", "Anti no-show", "Eventi"],
    stat: "-80%",
    statLabel: "No-show",
  },
  {
    id: "loyalty",
    icon: Trophy,
    title: "Loyalty & CRM",
    description: "Sistema punti fedeltà con gamification. CRM completo con storico clienti.",
    benefits: ["Punti fedeltà", "Gamification", "CRM"],
    stat: "+40%",
    statLabel: "Retention",
  },
  {
    id: "promo",
    icon: Gift,
    title: "Promo & Stories",
    description: "Codici sconto, flash sales. Stories Instagram-style per novità ed eventi.",
    benefits: ["Codici sconto", "Flash sales", "Stories"],
    stat: "+25%",
    statLabel: "Engagement",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description: "Dashboard real-time con fatturato, ordini e piatti top. Export report.",
    benefits: ["Real-time", "Piatti top", "Export"],
    stat: "Live",
    statLabel: "Dati",
  },
];

const Features = memo(() => {
  const [activeFeature, setActiveFeature] = useState(0);

  const handleFeatureClick = useCallback((index: number) => {
    setActiveFeature(index);
  }, []);

  const activeData = features[activeFeature];
  const ActiveIcon = activeData.icon;

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-glow" />
      
      <div className="container relative z-10">
        {/* Header - Minimal */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <div className="badge-primary mb-6">
            <span>Piattaforma completa</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tutto in un'unica dashboard
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Menu, ordini, prenotazioni, loyalty e analytics. Una sola piattaforma.
          </p>
        </ScrollReveal>

        {/* Feature Grid - 2 columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Left: Feature List */}
          <StaggerContainer className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <StaggerItem key={feature.id}>
                  <button
                    onClick={() => handleFeatureClick(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? "bg-primary/10 border-2 border-primary/30" 
                        : "bg-card border border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{feature.description}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-xl font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                          {feature.stat}
                        </div>
                        <div className="text-xs text-muted-foreground">{feature.statLabel}</div>
                      </div>
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Right: Feature Detail */}
          <ScrollReveal animation="fadeIn" className="lg:sticky lg:top-24 h-fit">
            <div className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden">
              {/* Subtle gradient top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <ActiveIcon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {activeData.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {activeData.description}
                </p>
              </div>
              
              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {activeData.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* Stat highlight */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted">
                <div className="text-4xl font-bold text-primary">{activeData.stat}</div>
                <div className="text-muted-foreground">{activeData.statLabel}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal animation="fadeUp" className="text-center mt-16">
          <Link to="/demo">
            <TapButton variant="primary" size="lg">
              Prova la demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </TapButton>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;
