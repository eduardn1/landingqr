import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Sparkles, LayoutDashboard, UtensilsCrossed, ShoppingBag, Calendar, Users, Gift, MessageCircle, Palette, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight: string;
}

const steps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Benvenuto in Flavour! 🎉",
    description: "Scopri come gestire il tuo ristorante in modo semplice e intuitivo. Ti guideremo attraverso le 10 sezioni principali.",
    icon: Sparkles,
    highlight: "",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Visualizza statistiche in tempo reale: ordini, fatturato, prenotazioni e clienti attivi.",
    icon: LayoutDashboard,
    highlight: "dashboard",
  },
  {
    id: "menu",
    title: "Menu & Allergeni",
    description: "Gestisci piatti, prezzi, categorie e informazioni sugli allergeni in un'unica sezione.",
    icon: UtensilsCrossed,
    highlight: "menu",
  },
  {
    id: "orders",
    title: "Ordini & Delivery",
    description: "Monitora ordini, traccia consegne in tempo reale e gestisci i driver su mappa interattiva.",
    icon: ShoppingBag,
    highlight: "orders",
  },
  {
    id: "reservations",
    title: "Prenotazioni & Eventi",
    description: "Gestisci prenotazioni tavoli ed eventi speciali con calendario integrato.",
    icon: Calendar,
    highlight: "reservations",
  },
  {
    id: "customers",
    title: "Clienti & Loyalty",
    description: "CRM completo con programmi fedeltà, punti e offerte personalizzate.",
    icon: Users,
    highlight: "customers",
  },
  {
    id: "promo",
    title: "Promo & Stories",
    description: "Crea promozioni, gestisci stories e contenuti Instagram per il tuo ristorante.",
    icon: Gift,
    highlight: "promo",
  },
  {
    id: "notifications",
    title: "Notifiche",
    description: "Invia notifiche push, WhatsApp e gestisci tutte le comunicazioni ai clienti.",
    icon: MessageCircle,
    highlight: "notifications",
  },
  {
    id: "templates",
    title: "Temi",
    description: "Personalizza l'aspetto del tuo menu digitale con temi professionali.",
    icon: Palette,
    highlight: "templates",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Analizza trend, performance e comportamenti dei clienti con grafici dettagliati.",
    icon: BarChart3,
    highlight: "analytics",
  },
];

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export const OnboardingTutorial = ({ isOpen, onClose, onNavigate }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (steps[nextStep].highlight) {
        onNavigate(steps[nextStep].highlight);
      }
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (steps[prevStep].highlight) {
        onNavigate(steps[prevStep].highlight);
      }
    }
  };

  const handleSkip = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={handleSkip}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg mx-4"
          >
            <div className="relative bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              
              {/* Close Button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {currentStep + 1} di {steps.length}
                  </p>
                </div>

                {/* Icon */}
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/25"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                {/* Text */}
                <motion.div
                  key={`text-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-6 sm:mb-8"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="gap-1 sm:gap-2 px-3 sm:px-4"
                    size="sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Indietro</span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    size="sm"
                    className="text-muted-foreground"
                  >
                    Salta
                  </Button>

                  <Button
                    onClick={handleNext}
                    className="gradient-button gap-1 sm:gap-2 px-3 sm:px-4"
                    size="sm"
                  >
                    {currentStep === steps.length - 1 ? "Inizia" : <span className="hidden sm:inline">Avanti</span>}
                    {currentStep === steps.length - 1 ? null : <span className="sm:hidden">→</span>}
                    <ChevronRight className="w-4 h-4 hidden sm:block" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
