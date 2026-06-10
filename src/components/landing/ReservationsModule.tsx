/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Reservations Module Section
 * Showcasing smart booking and reservation management features
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { 
  Calendar, 
  Bell, 
  CheckCircle, 
  Users,
  Clock,
  AlertCircle,
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const ReservationsModule = memo(() => {
  const { openLeadForm } = useLeadForm();

  const features = [
    {
      icon: Calendar,
      title: "Prenotazioni Online 24/7",
      description: "I clienti prenotano direttamente dal QR code, senza chiamare",
      highlight: "Sempre disponibile",
    },
    {
      icon: Bell,
      title: "Conferme Automatiche",
      description: "SMS e WhatsApp automatici per ridurre i no-show fino all'80%",
      highlight: "-80% no-show",
    },
    {
      icon: Users,
      title: "Gestione Tavoli",
      description: "Visualizza disponibilità in tempo reale, assegna tavoli intelligentemente",
      highlight: "Real-time sync",
    },
    {
      icon: Clock,
      title: "Promemoria Automatici",
      description: "Notifiche 24h prima della prenotazione per massimizzare le presenze",
      highlight: "Automazione totale",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
              <Calendar className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success">Prenotazioni Smart</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Riduci i no-show</span>
              <br />
              <span className="gradient-text">aumenta le presenze</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Le prenotazioni telefoniche sono caotiche e inefficienti. Con Nestify, i tuoi clienti prenotano online, ricevono conferme automatiche e promemoria intelligenti. Risultato: meno stress, più coperti.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => openLeadForm('reservations')}
              className="gradient-button gap-2 rounded-full px-6 h-11"
            >
              Prova le prenotazioni smart
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: Visual Mockup */}
          <div className="relative">
            {/* Card mockup */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-xl">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">Prenotazioni</h3>
                  <Calendar className="w-5 h-5 text-primary" />
                </div>

                {/* Booking item 1 */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">Marco Rossi</p>
                      <p className="text-xs text-muted-foreground">4 persone</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                      Confermata
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Oggi, 20:00 - Tavolo 5</span>
                  </div>
                </div>

                {/* Booking item 2 */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">Giulia Bianchi</p>
                      <p className="text-xs text-muted-foreground">2 persone</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-amber/20 text-amber text-xs font-semibold">
                      In attesa
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Domani, 19:30 - Tavolo 2</span>
                  </div>
                </div>

                {/* Booking item 3 */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">Alessandro Conti</p>
                      <p className="text-xs text-muted-foreground">6 persone</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                      Confermata
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Domani, 21:00 - Tavolo 8</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Questa settimana</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">92%</p>
                    <p className="text-xs text-muted-foreground">Confermate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">48</p>
                    <p className="text-xs text-muted-foreground">Coperti</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
});

ReservationsModule.displayName = 'ReservationsModule';

export default ReservationsModule;
