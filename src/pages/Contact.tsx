/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Contact Page
 * Pagina contatti con form e informazioni di contatto
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle,
  Clock,
  CheckCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SharedNavbar from "@/components/shared/SharedNavbar";
import Footer from "@/components/landing/Footer";
import DynamicSEO from "@/components/DynamicSEO";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "info@studiojem.it",
    href: "mailto:info@studiojem.it",
    description: "Rispondiamo entro 24 ore",
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 353 381 1359",
    href: "tel:+393533811359",
    description: "Lun-Ven, 9:00-18:00",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chatta con noi",
    href: "https://wa.me/393533811359",
    description: "Risposta immediata",
  },
  {
    icon: MapPin,
    label: "Sede",
    value: "Cagliari, Italia",
    href: null,
    description: "Sardegna",
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    restaurant_name: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Il nome è obbligatorio";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Il nome deve avere almeno 2 caratteri";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Il messaggio deve avere almeno 10 caratteri";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        restaurant_name: formData.restaurant_name.trim() || null,
        message: formData.message.trim(),
        source: "contact_page",
      });
      
      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "Messaggio inviato! ✅",
        description: "Ti risponderemo il prima possibile.",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DynamicSEO />
      {/* Dynamic Island Navigation */}
      <SharedNavbar />

      <main className="pt-20 pb-12 md:pt-24 md:pb-20">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Contattaci
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              Parliamo del tuo progetto
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hai domande su Flavour? Vuoi una demo personalizzata? 
              Siamo qui per aiutarti a digitalizzare il tuo locale.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Methods */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const Wrapper = method.href ? 'a' : 'div';
                  const wrapperProps = method.href ? {
                    href: method.href,
                    target: method.href.startsWith('http') ? '_blank' : undefined,
                    rel: method.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                  } : {};
                  
                  return (
                    <Wrapper
                      key={method.label}
                      {...wrapperProps}
                      className={`flex items-start gap-4 p-4 rounded-xl bg-card border border-border ${method.href ? 'hover:border-primary/30 hover:bg-card/80 transition-all cursor-pointer' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{method.label}</p>
                        <p className="font-semibold text-foreground">{method.value}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {method.description}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Messaggio inviato!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Grazie per averci contattato. Ti risponderemo il prima possibile.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          restaurant_name: "",
                          message: "",
                        });
                      }}
                    >
                      Invia un altro messaggio
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Il tuo nome"
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="la-tua@email.it"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+39 333 123 4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant_name">Nome locale</Label>
                        <Input
                          id="restaurant_name"
                          name="restaurant_name"
                          value={formData.restaurant_name}
                          onChange={handleChange}
                          placeholder="Es. Ristorante Da Mario"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Messaggio *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Come possiamo aiutarti?"
                        rows={5}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Invia messaggio
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Inviando questo modulo accetti la nostra{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
