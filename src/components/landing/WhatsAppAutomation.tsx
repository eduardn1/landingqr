/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - WhatsApp Automation Module
 * Automated customer communication via WhatsApp Business API
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle,
  Zap,
  Users,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const WhatsAppAutomation = memo(() => {
  const { openLeadForm } = useLeadForm();

  const automations = [
    {
      title: "Conferme Ordini",
      description: "Invia automaticamente la conferma dell'ordine via WhatsApp",
      icon: CheckCircle,
    },
    {
      title: "Promemoria Prenotazioni",
      description: "Notifiche 24h prima della prenotazione per ridurre no-show",
      icon: Clock,
    },
    {
      title: "Aggiornamenti Stato",
      description: "Comunica quando l'ordine è pronto per il ritiro",
      icon: Zap,
    },
    {
      title: "Messaggi Promozionali",
      description: "Promozioni e offerte speciali direttamente ai clienti",
      icon: Send,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-600">WhatsApp Business</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Comunica con i tuoi clienti</span>
              <br />
              <span className="gradient-text">dove loro sono già</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Integrazione nativa con WhatsApp Business. Invia conferme ordini, promemoria prenotazioni e aggiornamenti di stato automaticamente. I tuoi clienti ricevono tutto direttamente su WhatsApp, senza email o SMS.
            </p>

            {/* Automations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {automations.map((automation, idx) => {
                const Icon = automation.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-0.5">
                          {automation.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {automation.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => openLeadForm('whatsapp')}
                className="gradient-button gap-2 rounded-full px-6 h-11"
              >
                Attiva WhatsApp
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 h-11"
              >
                Vedi demo
              </Button>
            </div>
          </div>

          {/* Right: Visual Mockup */}
          <div className="relative">
            {/* WhatsApp chat mockup */}
            <div className="bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900 rounded-3xl p-4 border border-border shadow-2xl" style={{ aspectRatio: '9/16' }}>
              {/* Phone header */}
              <div className="bg-green-600 text-white rounded-t-2xl px-4 py-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">Nestify Restaurant</h3>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
                <p className="text-xs opacity-90">Online</p>
              </div>

              {/* Chat messages */}
              <div className="space-y-3 mb-4">
                {/* Message 1 - from customer */}
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 text-foreground rounded-2xl rounded-bl-none px-3 py-2 max-w-xs text-sm">
                    Ciao, vorrei ordinare 2 pizze margherita
                  </div>
                </div>

                {/* Message 2 - from business */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-2xl rounded-br-none px-3 py-2 max-w-xs text-sm">
                    ✓ Perfetto! Ho registrato il tuo ordine. Pronto tra 30 minuti
                  </div>
                </div>

                {/* Message 3 - from business */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-2xl rounded-br-none px-3 py-2 max-w-xs text-sm">
                    📍 Il tuo ordine è in preparazione. Seguirai gli aggiornamenti qui
                  </div>
                </div>

                {/* Message 4 - from business */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-2xl rounded-br-none px-3 py-2 max-w-xs text-sm">
                    ✅ Il tuo ordine è pronto! Vieni a ritirarlo
                  </div>
                </div>

                {/* Message 5 - from customer */}
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 text-foreground rounded-2xl rounded-bl-none px-3 py-2 max-w-xs text-sm">
                    Arrivo tra 5 minuti!
                  </div>
                </div>

                {/* Message 6 - from business */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-2xl rounded-br-none px-3 py-2 max-w-xs text-sm">
                    ✓ Perfetto! Ti aspettiamo
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm outline-none"
                  disabled
                />
                <button className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
});

WhatsAppAutomation.displayName = 'WhatsAppAutomation';

export default WhatsAppAutomation;
