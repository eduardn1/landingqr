/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Inventory/Warehouse Management Module
 * Real-time stock tracking and inventory management for restaurants
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  BarChart3,
  Zap,
  Eye,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const InventoryModule = memo(() => {
  const { openLeadForm } = useLeadForm();

  const features = [
    {
      icon: Eye,
      title: "Tracciamento Real-Time",
      description: "Visualizza stock di ogni ingrediente in tempo reale",
    },
    {
      icon: AlertTriangle,
      title: "Avvisi Automatici",
      description: "Notifiche quando le scorte raggiungono il minimo",
    },
    {
      icon: TrendingDown,
      title: "Analisi Consumi",
      description: "Scopri quali ingredienti consumi di più",
    },
    {
      icon: BarChart3,
      title: "Previsioni Intelligenti",
      description: "Suggerimenti su cosa ordinare in base ai dati storici",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Visual Mockup */}
          <div className="relative order-2 lg:order-1">
            {/* Inventory card mockup */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-xl">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">Magazzino</h3>
                  <Package className="w-5 h-5 text-primary" />
                </div>

                {/* Inventory items */}
                <div className="space-y-3">
                  {/* Item 1 - OK */}
                  <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">Mozzarella</p>
                      <span className="text-xs font-semibold text-success">OK</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">7.5 kg / 10 kg</p>
                  </div>

                  {/* Item 2 - Warning */}
                  <div className="p-3 rounded-xl bg-muted/50 border border-amber/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">Pomodori</p>
                      <span className="text-xs font-semibold text-amber">Basso</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-amber h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">2.5 kg / 10 kg</p>
                  </div>

                  {/* Item 3 - Critical */}
                  <div className="p-3 rounded-xl bg-muted/50 border border-red-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">Basilico</p>
                      <span className="text-xs font-semibold text-red-500">Critico</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">0.5 kg / 5 kg</p>
                  </div>

                  {/* Item 4 - OK */}
                  <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">Olio EVO</p>
                      <span className="text-xs font-semibold text-success">OK</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">6 L / 10 L</p>
                  </div>
                </div>

                {/* Action button */}
                <button className="w-full py-2 px-3 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/15 transition-colors">
                  Ordina Basilico
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <Package className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-semibold text-cyan-600">Gestione Magazzino</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Non restare mai a corto di</span>
              <br />
              <span className="gradient-text">ingredienti essenziali</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Gestisci il tuo magazzino direttamente da Nestify. Traccia gli ingredienti, ricevi avvisi quando le scorte sono basse e ottieni suggerimenti intelligenti su cosa ordinare.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-0.5">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => openLeadForm('inventory')}
              className="gradient-button gap-2 rounded-full px-6 h-11"
            >
              Scopri la gestione magazzino
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

InventoryModule.displayName = 'InventoryModule';

export default InventoryModule;
