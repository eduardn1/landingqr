import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Sparkles, LayoutDashboard, UtensilsCrossed, ShoppingBag, Calendar, Users, Gift, MessageCircle, Palette, BarChart3, Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight: string;
  features?: string[];
}

const steps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Benvenuto in Nestify! 🎉",
    description: "Scopri come gestire il tuo locale in modo semplice e intuitivo. Ti guideremo attraverso le sezioni principali della piattaforma.",
    icon: Sparkles,
    highlight: "",
    features: ["Gestione completa del ristorante", "Interfaccia intuitiva", "Tutto in un'unica dashboard"],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "La tua panoramica in tempo reale. Monitora ordini, fatturato, prenotazioni e clienti attivi con statistiche aggiornate.",
    icon: LayoutDashboard,
    highlight: "dashboard",
    features: ["Statistiche in tempo reale", "Ordini e fatturato giornaliero", "Prenotazioni attive", "Trend di crescita"],
  },
  {
    id: "menu",
    title: "Menu & Allergeni",
    description: "Gestisci il tuo menu digitale completo. Aggiungi piatti, modifica prezzi, organizza categorie e gestisci gli allergeni.",
    icon: UtensilsCrossed,
    highlight: "menu",
    features: ["Gestione piatti e prezzi", "Categorie personalizzabili", "Informazioni allergeni", "Foto e descrizioni", "Attiva/disattiva piatti"],
  },
  {
    id: "orders",
    title: "Ordini & Delivery",
    description: "Monitora tutti gli ordini in arrivo. Gestisci delivery, takeaway e traccia i driver in tempo reale sulla mappa.",
    icon: ShoppingBag,
    highlight: "orders",
    features: ["Ordini in tempo reale", "Stato preparazione", "Tracking driver su mappa", "Gestione consegne", "Storico ordini"],
  },
  {
    id: "reservations",
    title: "Prenotazioni & Eventi",
    description: "Calendario integrato per gestire prenotazioni tavoli ed eventi speciali. Conferma automatica e promemoria.",
    icon: Calendar,
    highlight: "reservations",
    features: ["Calendario prenotazioni", "Gestione tavoli", "Eventi speciali", "Conferme automatiche", "Promemoria clienti"],
  },
  {
    id: "customers",
    title: "Clienti & Loyalty",
    description: "CRM completo per fidelizzare i clienti. Gestisci programmi punti, offerte personalizzate e storico ordini.",
    icon: Users,
    highlight: "customers",
    features: ["Database clienti", "Programma fedeltà", "Punti e premi", "Offerte personalizzate", "Storico acquisti"],
  },
  {
    id: "promo",
    title: "Promo & Stories",
    description: "Crea promozioni accattivanti e gestisci contenuti social. Pubblica stories e connetti Instagram.",
    icon: Gift,
    highlight: "promo",
    features: ["Promozioni e sconti", "Stories interattive", "Integrazione Instagram", "Codici sconto", "Campagne marketing"],
  },
  {
    id: "notifications",
    title: "Notifiche",
    description: "Comunica con i tuoi clienti. Invia notifiche push, messaggi WhatsApp e gestisci tutte le comunicazioni.",
    icon: MessageCircle,
    highlight: "notifications",
    features: ["Notifiche push", "Messaggi WhatsApp", "Email automatiche", "Comunicazioni in-app", "Storico messaggi"],
  },
  {
    id: "templates",
    title: "Temi & Personalizzazione",
    description: "Personalizza l'aspetto del tuo menu digitale. Scegli tra temi professionali e adatta i colori al tuo brand.",
    icon: Palette,
    highlight: "templates",
    features: ["Temi professionali", "Colori personalizzabili", "Logo e branding", "Anteprima live", "Mobile-first design"],
  },
  {
    id: "analytics",
    title: "Analytics & Report",
    description: "Analizza le performance del tuo ristorante. Grafici dettagliati, trend e insights per ottimizzare il business.",
    icon: BarChart3,
    highlight: "analytics",
    features: ["Grafici fatturato", "Trend vendite", "Piatti più venduti", "Analisi orari", "Report esportabili"],
  },
  {
    id: "settings",
    title: "Impostazioni",
    description: "Configura il tuo ristorante. Orari, metodi di pagamento, notifiche e tutte le preferenze del sistema.",
    icon: Settings,
    highlight: "settings",
    features: ["Dati ristorante", "Orari apertura", "Metodi pagamento", "Preferenze notifiche", "Gestione account"],
  },
];

const STORAGE_KEY = "demo-onboarding-step";

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export const OnboardingTutorial = ({ isOpen, onClose, onNavigate }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isResuming, setIsResuming] = useState(false);
  const hasInitialized = useRef(false);
  const onNavigateRef = useRef(onNavigate);
  
  // Keep ref updated
  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);
  
  // Load saved step on open - only once
  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      hasInitialized.current = true;
      const savedStep = localStorage.getItem(STORAGE_KEY);
      if (savedStep) {
        const stepIndex = parseInt(savedStep, 10);
        if (stepIndex > 0 && stepIndex < steps.length) {
          setCurrentStep(stepIndex);
          setIsResuming(true);
          // Navigate to the saved section
          if (steps[stepIndex].highlight) {
            onNavigateRef.current(steps[stepIndex].highlight);
          }
        } else {
          setCurrentStep(0);
          setIsResuming(false);
        }
      } else {
        setCurrentStep(0);
        setIsResuming(false);
      }
    }
    
    if (!isOpen) {
      hasInitialized.current = false;
    }
  }, [isOpen]);

  // Save step on change
  useEffect(() => {
    if (isOpen && currentStep > 0) {
      localStorage.setItem(STORAGE_KEY, currentStep.toString());
    }
  }, [currentStep, isOpen]);

  const handleNext = () => {
    setIsResuming(false);
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (steps[nextStep].highlight) {
        onNavigate(steps[nextStep].highlight);
      }
    } else {
      // Complete the tutorial
      localStorage.removeItem(STORAGE_KEY);
      onClose();
    }
  };

  const handlePrev = () => {
    setIsResuming(false);
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (steps[prevStep].highlight) {
        onNavigate(steps[prevStep].highlight);
      }
    }
  };

  const handleSkip = () => {
    // Keep progress saved when skipping
    onClose();
  };

  const handleRestart = () => {
    setIsResuming(false);
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Semi-transparent to show content behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            onClick={handleSkip}
          />

          {/* Modal - Centered in viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
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
              <div className="relative p-5 sm:p-8">
                {/* Resume Banner */}
                {isResuming && currentStep > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <RotateCcw className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Sei rimasto qui!</p>
                          <p className="text-xs text-muted-foreground">Continua da dove hai lasciato</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRestart}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Ricomincia
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Progress Bar */}
                <div className="mb-5">
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
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/25"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                {/* Text */}
                <motion.div
                  key={`text-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-5"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Features list */}
                  {step.features && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {step.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="gap-1 px-3"
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
                    className="gradient-button gap-1 px-4"
                    size="sm"
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
