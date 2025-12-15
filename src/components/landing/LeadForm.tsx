/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Multi-Step Lead Form (2026 Design)
 * Form moderno a step con animazioni fluide
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, ArrowRight, ArrowLeft, User, Mail, Phone, Building2, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLeadForm } from "@/hooks/useLeadForm";

const steps = [
  { id: 1, title: "Chi sei", icon: User },
  { id: 2, title: "Contatti", icon: Mail },
  { id: 3, title: "Dettagli", icon: Building2 },
];

const LeadForm = () => {
  const { isOpen, closeLeadForm, source } = useLeadForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    restaurant_name: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLeadForm();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeLeadForm]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (formData.name.trim().length < 2) {
        newErrors.name = "Il nome deve avere almeno 2 caratteri";
      }
    }
    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Inserisci un'email valida";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before submit
    if (currentStep < 3) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        ...formData,
        source,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Richiesta inviata con successo!");
      
      setTimeout(() => {
        closeLeadForm();
        setIsSuccess(false);
        setCurrentStep(1);
        setErrors({});
        setFormData({
          name: "",
          email: "",
          phone: "",
          restaurant_name: "",
          message: "",
        });
      }, 2500);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Errore nell'invio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep < 3) {
      e.preventDefault();
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.name.trim().length >= 2;
    if (currentStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(formData.email);
    }
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLeadForm}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100]"
          />

          {/* Modal - wrapper for centering */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={closeLeadForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              
              {/* Close button */}
              <button
                type="button"
                onClick={closeLeadForm}
                className="absolute top-6 right-6 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-success" />
                  </motion.div>
                  <h4 className="font-display text-2xl font-bold text-foreground mb-2">
                    Perfetto!
                  </h4>
                  <p className="text-muted-foreground text-center">
                    Ti contatteremo entro 24 ore.
                  </p>
                </motion.div>
              ) : (
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-primary">14 giorni gratis</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                      Inizia la tua prova
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Compila il form e ti contatteremo entro 24h
                    </p>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex items-center gap-2 mb-8">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = currentStep === step.id;
                      const isCompleted = currentStep > step.id;
                      
                      return (
                        <div key={step.id} className="flex items-center gap-2 flex-1">
                          <motion.div
                            animate={{
                              scale: isActive ? 1.1 : 1,
                            }}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              isActive 
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                                : isCompleted 
                                  ? 'bg-success/20 text-success'
                                  : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </motion.div>
                          {index < steps.length - 1 && (
                            <div className={`h-px flex-1 ${
                              isCompleted ? 'bg-success' : 'bg-border'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Form Steps */}
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-foreground">
                              Come ti chiami? *
                            </Label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="name"
                                name="name"
                                placeholder="Mario Rossi"
                                value={formData.name}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                required
                                className={`pl-12 h-12 bg-muted/50 border-border focus:border-primary ${errors.name ? 'border-destructive' : ''}`}
                              />
                            </div>
                            {errors.name && (
                              <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">
                              Email *
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="mario@ristorante.it"
                                value={formData.email}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                required
                                className={`pl-12 h-12 bg-muted/50 border-border focus:border-primary ${errors.email ? 'border-destructive' : ''}`}
                              />
                            </div>
                            {errors.email && (
                              <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-foreground">
                              Telefono (opzionale)
                            </Label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+39 333 1234567"
                                value={formData.phone}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                className="pl-12 h-12 bg-muted/50 border-border focus:border-primary"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="restaurant_name" className="text-foreground">
                              Nome del ristorante
                            </Label>
                            <div className="relative">
                              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="restaurant_name"
                                name="restaurant_name"
                                placeholder="Trattoria Da Mario"
                                value={formData.restaurant_name}
                                onChange={handleChange}
                                className="pl-12 h-12 bg-muted/50 border-border focus:border-primary"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message" className="text-foreground">
                              Note o richieste
                            </Label>
                            <div className="relative">
                              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                              <Textarea
                                id="message"
                                name="message"
                                placeholder="Raccontaci le tue esigenze..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                className="pl-12 pt-3 bg-muted/50 border-border focus:border-primary resize-none"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8">
                      {currentStep > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={(e) => prevStep(e)}
                          className="gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Indietro
                        </Button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 3 ? (
                        <Button
                          type="button"
                          onClick={(e) => nextStep(e)}
                          disabled={!canProceed()}
                          className="gradient-button gap-2"
                        >
                          Continua
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="gradient-button gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Invio...
                            </>
                          ) : (
                            <>
                              Invia richiesta
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>

                  {/* Privacy */}
                  <p className="text-xs text-muted-foreground text-center mt-6">
                    Inviando accetti la nostra Privacy Policy
                  </p>
                </div>
              )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadForm;
