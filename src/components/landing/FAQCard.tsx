/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - FAQ Card CTA (Landing Page)
 * Card compatta che linka alla pagina FAQ dedicata
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQCard = memo(() => {
  return (
    <section id="faq" className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="container relative z-10 max-w-4xl">
        <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">
                  Hai domande?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Consulta le nostre FAQ o contattaci direttamente su WhatsApp
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link to="/faq">
                <Button variant="outline" className="gap-2 rounded-xl w-full sm:w-auto">
                  Vedi FAQ
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://wa.me/393533811359"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gradient-button gap-2 rounded-xl w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FAQCard.displayName = 'FAQCard';

export default FAQCard;