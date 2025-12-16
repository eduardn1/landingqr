/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Hero Section
 * Digital tools for Hospitality
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo, useCallback } from "react";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Star,
  CalendarCheck,
  BarChart3,
  Users,
  Bell,
  Settings,
  QrCode,
  ShoppingBag,
  UtensilsCrossed,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import logoShort from "@/assets/logo-short.svg";

const featureBadges = [
  { icon: QrCode, text: "Menu QR", color: "from-emerald-500 to-teal-600" },
  { icon: CalendarCheck, text: "Prenotazioni", color: "from-blue-500 to-cyan-500" },
  { icon: ShoppingBag, text: "Asporto & Delivery", color: "from-orange-500 to-amber-500" },
  { icon: BarChart3, text: "Analytics", color: "from-violet-500 to-purple-600" },
] as const;

const Hero = memo(() => {
  const { openLeadForm } = useLeadForm();

  const scrollToPricing = useCallback(() => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
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
          <h1 className="text-display-md sm:text-display-lg md:text-display-xl lg:text-[5.2rem] font-extrabold mb-6 px-2 animate-fade-in">
            <span className="text-foreground">Menu QR, ordini e prenotazioni</span>
            <br />
            <span className="gradient-text">per il tuo locale</span>
          </h1>

          {/* Subheading */}
          <p className="text-body-md sm:text-body-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6 px-4 animate-fade-in">
            Menu QR, ordini, delivery, prenotazioni, loyalty, analytics. Una dashboard all-in-one per bar,
            ristoranti, pub e caffetterie. <span className="text-foreground font-semibold">Pronto in 10 minuti.</span>
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center mb-6 px-4 sm:px-0">
            {featureBadges.map((badge) => (
              <div key={badge.text} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}
                />
                <div className="relative flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}
                  >
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
              className="group text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-7 h-auto gradient-button rounded-xl sm:rounded-2xl w-full sm:w-auto"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Richiedi una demo
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={scrollToPricing}
              className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-7 h-auto w-full sm:w-auto rounded-xl sm:rounded-2xl border-border bg-card/50 hover:bg-card hover:border-primary/30 backdrop-blur-sm transition-all"
            >
              Vedi i prezzi
            </Button>
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
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl blur-xl opacity-40" />

            <div className="relative bg-card rounded-2xl overflow-hidden p-4 md:p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />

              <div className="relative z-0">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img src={logoShort} alt="Nestify" className="w-8 h-8" />
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
                    {
                      icon: UtensilsCrossed,
                      label: "Piatti",
                      value: "∞",
                      color: "from-violet-500 to-purple-600",
                      change: "+12",
                    },
                    {
                      icon: ShoppingBag,
                      label: "Ordini",
                      value: "148",
                      color: "from-orange-500 to-red-500",
                      change: "+18%",
                    },
                    {
                      icon: CalendarCheck,
                      label: "Prenotazioni",
                      value: "32",
                      color: "from-emerald-500 to-teal-600",
                      change: "-80% no-show",
                    },
                    {
                      icon: Trophy,
                      label: "Loyalty",
                      value: "+40%",
                      color: "from-pink-500 to-rose-500",
                      change: "retention",
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-muted/50 rounded-lg p-3 border border-border">
                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}
                      >
                        <stat.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Tiles */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg border border-border flex items-center justify-center"
                    >
                      <QrCode className="w-5 h-5 text-muted-foreground/40" />
                    </div>
                  ))}
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
              <span className="text-foreground font-medium text-sm">4.9 • 500+ locali</span>
            </div>
          </div>

          {/* Stacked Avatars - Social Proof - Static */}
          <div className="absolute right-2 md:right-8 top-6 hidden lg:block">
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-xl px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    "bg-gradient-to-br from-emerald-500 to-teal-500",
                    "bg-gradient-to-br from-blue-500 to-cyan-500",
                    "bg-gradient-to-br from-orange-500 to-amber-500",
                    "bg-gradient-to-br from-purple-500 to-violet-500",
                  ].map((gradient, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${gradient} border-2 border-card flex items-center justify-center text-white text-[10px] font-bold`}
                    >
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
    </header>
  );
});

Hero.displayName = "Hero";

export default Hero;
