/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Contact Page (Monochrome + Colored Accents)
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Instagram, Facebook, Linkedin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SharedNavbar from "@/components/shared/SharedNavbar";

const contactMethods = [
  { icon: Mail, label: "Email", value: "info@studiojem.it", href: "mailto:info@studiojem.it", description: "Rispondiamo entro 24 ore" },
  { icon: Phone, label: "Telefono", value: "+39 353 381 1359", href: "tel:+393533811359", description: "Lun-Ven, 9:00-18:00" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chatta con noi", href: "https://wa.me/393533811359", description: "Risposta immediata" },
  { icon: MapPin, label: "Sede", value: "Cagliari, Italia", href: null, description: "Sardegna" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", restaurant_name: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Il nome è obbligatorio";
    if (!formData.email.trim()) newErrors.email = "L'email è obbligatoria";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Inserisci un'email valida";
    if (!formData.message.trim()) newErrors.message = "Il messaggio è obbligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(), email: formData.email.trim(), phone: formData.phone.trim() || null,
        restaurant_name: formData.restaurant_name.trim() || null, message: formData.message.trim(), source: "contact_page",
      });
      if (error) throw error;
      setIsSubmitted(true);
      toast({ title: "Messaggio inviato! ✅", description: "Ti risponderemo il prima possibile." });
    } catch (error) {
      toast({ title: "Errore", description: "Si è verificato un errore. Riprova più tardi.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SharedNavbar />

      <main className="pt-20 pb-12 md:pt-24 md:pb-20">
        <div className="container">
          {/* Header - Monochrome text, colored badge */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Contattaci</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              Parliamo del tuo progetto
            </h1>
            <p className="text-lg text-foreground-50 max-w-2xl mx-auto">
              Hai domande su Flavour? Vuoi una demo personalizzata? Siamo qui per aiutarti.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Methods - Monochrome cards, colored icons */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const Wrapper = method.href ? 'a' : 'div';
                  const wrapperProps = method.href ? { href: method.href, target: method.href.startsWith('http') ? '_blank' : undefined, rel: method.href.startsWith('http') ? 'noopener noreferrer' : undefined } : {};
                  
                  return (
                    <Wrapper
                      key={method.label}
                      {...wrapperProps}
                      className={`flex items-start gap-4 p-4 rounded-xl bg-foreground-05 border border-foreground-10 ${method.href ? 'hover:border-foreground-20 transition-all cursor-pointer' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-foreground-50 mb-0.5">{method.label}</p>
                        <p className="font-semibold text-foreground">{method.value}</p>
                        <p className="text-xs text-foreground-50 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {method.description}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              {/* Social Links - Monochrome with colored hover */}
              <div className="pt-4">
                <p className="text-sm font-medium text-foreground mb-3">Seguici sui social</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-foreground-05 border border-foreground-10 flex items-center justify-center text-foreground-50 hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form - Monochrome card */}
            <div className="lg:col-span-3">
              <div className="bg-foreground-05 border border-foreground-10 rounded-2xl p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Messaggio inviato!</h3>
                    <p className="text-foreground-50 mb-6">Grazie per averci contattato. Ti risponderemo il prima possibile.</p>
                    <Button variant="outline" onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", phone: "", restaurant_name: "", message: "" }); }}>
                      Invia un altro messaggio
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Nome *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Il tuo nome" className={`bg-card border-foreground-10 ${errors.name ? "border-destructive" : ""}`} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="la-tua@email.it" className={`bg-card border-foreground-10 ${errors.email ? "border-destructive" : ""}`} />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">Telefono</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+39 333 123 4567" className="bg-card border-foreground-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant_name" className="text-foreground">Nome locale</Label>
                        <Input id="restaurant_name" name="restaurant_name" value={formData.restaurant_name} onChange={handleChange} placeholder="Es. Ristorante Da Mario" className="bg-card border-foreground-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Messaggio *</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Come possiamo aiutarti?" rows={5} className={`bg-card border-foreground-10 ${errors.message ? "border-destructive" : ""}`} />
                      {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                    </div>
                    <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Invio in corso...</> : <><Send className="w-4 h-4" />Invia messaggio</>}
                    </Button>
                    <p className="text-xs text-foreground-50 text-center">
                      Inviando questo modulo accetti la nostra <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;