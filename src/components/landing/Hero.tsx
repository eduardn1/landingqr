/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Hero Section (Static/Subtle Animations)
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { ArrowRight, Check, Sparkles, Zap, Star, QrCode, CalendarCheck, Truck, BarChart3, Menu, CreditCard, ShoppingBag, TrendingUp, Users, Calendar, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const featureBadges = [
  { icon: QrCode, text: "Menu QR", color: "from-emerald-500/80 to-teal-600/80" },
  { icon: CalendarCheck, text: "Prenotazioni", color: "from-sky-500/80 to-blue-600/80" },
  { icon: Truck, text: "Delivery", color: "from-amber-500/80 to-orange-600/80" },
  { icon: BarChart3, text: "Analytics", color: "from-cyan-500/80 to-teal-600/80" },
];

const Hero = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 radial-gradient" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Static Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container relative z-10 py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fade-in">
            <div className="badge-primary">
              <Sparkles className="w-4 h-4" />
              <span>Digital tools for Hospitality</span>
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-display-md sm:text-display-lg md:text-display-xl lg:text-[5.5rem] font-extrabold mb-6 px-2 animate-fade-in leading-[1.1]">
            <span className="text-foreground">Tutto il Tuo Locale in</span>
            <br />
            <span className="gradient-text">un'Unica App</span>
          </h1>

          {/* Subheading */}
          <p className="text-body-md sm:text-body-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8 px-4 animate-fade-in">
            Gestisci menu, prenotazioni, ordini e magazzino senza stress.{" "}
            Comunica con i tuoi clienti su WhatsApp in modo automatico e tieni tutto sotto controllo,{" "}
            <span className="text-foreground font-semibold">dal piccolo bar alla catena di ristoranti.</span>
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center mb-6 px-4 sm:px-0">
            {featureBadges.map((badge) => (
              <div key={badge.text} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className="relative flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                    <badge.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center mb-8 px-4 sm:px-0">
            <Button
              size="lg"
              onClick={() => openLeadForm("hero-cta")}
              className="group text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-7 h-auto gradient-button rounded-xl sm:rounded-2xl w-full sm:w-auto font-bold tracking-tight"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Inizia la prova gratuita
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <a
              href="https://demo2.studiojem.it"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-7 h-auto w-full rounded-xl sm:rounded-2xl border-border bg-card/50 hover:bg-card hover:border-primary/30 backdrop-blur-sm transition-all"
              >
                Guarda demo live
              </Button>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 items-center justify-center text-xs sm:text-sm text-muted-foreground px-4">
            {["Nessuna carta richiesta", "14 giorni gratis", "Cancella quando vuoi"].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success" />
                </div>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Product Preview - Static Dashboard */}
        <div className="relative mt-16 max-w-5xl mx-auto">
          {/* Main Dashboard Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl blur-xl opacity-40" />
            
            <div className="relative bg-card rounded-2xl overflow-hidden p-4 md:p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
              
              {/* Mock Dashboard UI */}
              <div className="relative z-0">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <QrCode className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="h-3 w-20 bg-foreground/80 rounded" />
                      <div className="h-2 w-14 bg-muted-foreground/40 rounded mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                      <Bell className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                      <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4">
                  {[
                    { icon: ShoppingBag, label: "Ordini", value: "127", color: "from-emerald-500/70 to-teal-600/70", change: "+12%" },
                    { icon: TrendingUp, label: "Ricavi", value: "€2.4k", color: "from-sky-500/70 to-blue-600/70", change: "+8%" },
                    { icon: Users, label: "Clienti", value: "89", color: "from-cyan-500/70 to-teal-600/70", change: "+15%" },
                    { icon: Calendar, label: "Prenotazioni", value: "24", color: "from-amber-500/70 to-orange-600/70", change: "+5%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-muted/50 rounded-lg p-3 border border-border">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                        <stat.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  ))}
                </div>

                {/* Menu Preview Grid */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg border border-border flex items-center justify-center">
                      <Menu className="w-5 h-5 text-muted-foreground/40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats Card - Static */}
          <div className="absolute -left-2 md:left-4 top-1/3 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-success/30 to-primary/20 rounded-xl blur-lg opacity-50" />
              <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ordini oggi</p>
                    <p className="text-xl font-bold text-foreground">+127</p>
                  </div>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-success to-primary rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Rating Badge - Static */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 hidden lg:block">
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-warning fill-warning" />
                ))}
              </div>
              <span className="text-foreground font-medium text-sm">4.9 su Trustpilot</span>
            </div>
          </div>

          {/* Stacked Avatars - Social Proof - Static */}
          <div className="absolute right-2 md:right-8 top-6 hidden lg:block">
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-xl px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['bg-gradient-to-br from-emerald-500/70 to-teal-600/70', 'bg-gradient-to-br from-sky-500/70 to-blue-600/70', 'bg-gradient-to-br from-amber-500/70 to-orange-600/70', 'bg-gradient-to-br from-cyan-500/70 to-teal-600/70'].map((gradient, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full ${gradient} border-2 border-card flex items-center justify-center text-white text-[10px] font-bold`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">+500</p>
                  <p className="text-muted-foreground">locali attivi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;