import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Sparkles, LayoutDashboard, UtensilsCrossed, Truck, BarChart3, Settings } from "lucide-react";
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
    description: "Scopri come gestire il tuo ristorante in modo semplice e intuitivo. Ti guideremo attraverso le funzionalità principali.",
    icon: Sparkles,
    highlight: "",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Visualizza statistiche in tempo reale: ordini, fatturato, prenotazioni e clienti attivi. Tutto a colpo d'occhio.",
    icon: LayoutDashboard,
    highlight: "dashboard",
  },
  {
    id: "menu",
    title: "Gestione Menu",
    description: "Aggiungi, modifica e organizza i tuoi piatti. Gestisci prezzi, disponibilità e categorie con facilità.",
    icon: UtensilsCrossed,
    highlight: "menu",
  },
  {
    id: "delivery",
    title: "Driver Tracking",
    description: "Monitora le consegne in tempo reale su mappa. Assegna ordini ai driver e traccia i percorsi.",
    icon: Truck,
    highlight: "delivery",
  },
  {
    id: "analytics",
    title: "Analytics Avanzate",
    description: "Analizza trend, performance e comportamenti dei clienti con grafici dettagliati.",
    icon: BarChart3,
    highlight: "analytics",
  },
  {
    id: "settings",
    title: "Impostazioni",
    description: "Configura orari, metodi di pagamento, notifiche e personalizza la tua esperienza.",
    icon: Settings,
    highlight: "settings",
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
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
              <div className="relative p-8">
                {/* Progress Dots */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentStep(i);
                        if (steps[i].highlight) {
                          onNavigate(steps[i].highlight);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentStep 
                          ? "w-8 bg-primary" 
                          : i < currentStep 
                            ? "bg-primary/50" 
                            : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Icon */}
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/25"
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Text */}
                <motion.div
                  key={`text-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Indietro
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    {currentStep + 1} / {steps.length}
                  </span>

                  <Button
                    onClick={handleNext}
                    className="gradient-button gap-2"
                  >
                    {currentStep === steps.length - 1 ? "Inizia" : "Avanti"}
                    <ChevronRight className="w-4 h-4" />
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
