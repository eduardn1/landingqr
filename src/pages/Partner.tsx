/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Diventa Rivenditore / Partner Page
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SharedNavbar from "@/components/shared/SharedNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight,
  Check,
  Users,
  TrendingUp,
  Headphones,
  Palette,
  LayoutDashboard,
  Zap,
  Shield,
  Award,
  Rocket,
  Clock,
  Target,
  Handshake,
} from "lucide-react";

const benefits = [
  { number: 1, text: "Amplia la tua offerta di servizi", icon: TrendingUp },
  { number: 2, text: "Rafforza il rapporto con i clienti", icon: Users },
  { number: 3, text: "Soluzioni sempre all'avanguardia", icon: Zap },
  { number: 4, text: "Condizioni economiche vantaggiose", icon: Award },
  { number: 5, text: "Supporto tecnico dedicato", icon: Headphones },
  { number: 6, text: "Possibilità di White Label", icon: Palette },
  { number: 7, text: "Dashboard gestione centralizzata", icon: LayoutDashboard },
];

const features = [
  {
    icon: Rocket,
    title: "Team in continua evoluzione",
    subtitle: "Innovazione costante",
    description: "Entrerai a far parte di un team di sviluppo in continua evoluzione, che ti fornirà gli strumenti necessari per rivendere soluzioni all'avanguardia e raggiungere risultati concreti.",
  },
  {
    icon: LayoutDashboard,
    title: "Gestione clienti semplificata",
    subtitle: "Piattaforma centralizzata",
    description: "Ogni tuo cliente che attiva le nostre soluzioni verrà a te assegnato e potrai gestirli tutti in modo rapido da un unico accesso, sempre e ovunque.",
  },
  {
    icon: Target,
    title: "Massima flessibilità",
    subtitle: "Adattabile alle tue esigenze",
    description: "Scegli tu come strutturare la tua offerta commerciale. Nessun vincolo di esclusiva, nessun minimo garantito. Cresci al tuo ritmo.",
  },
  {
    icon: Handshake,
    title: "Partnership duratura",
    subtitle: "Cresciamo insieme",
    description: "Non sei un semplice rivenditore, sei un partner. Condividiamo obiettivi, strategie e successi. Il tuo business è il nostro business.",
  },
];

const stats = [
  { value: "100+", label: "Partner attivi" },
  { value: "500+", label: "Locali gestiti" },
  { value: "98%", label: "Tasso di rinnovo" },
  { value: "24h", label: "Tempo di risposta" },
];

const Partner = memo(() => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Errore",
        description: "Nome e email sono obbligatori",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        restaurant_name: formData.company.trim() || null,
        message: formData.message.trim() || null,
        source: "partner-page",
      });

      if (error) throw error;

      toast({
        title: "Richiesta inviata!",
        description: "Ti contatteremo entro 24 ore.",
      });

      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
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

  return (
    <div className="min-h-screen bg-background">
      <SharedNavbar />

      {/* Hero Section - Split Layout */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Handshake className="w-4 h-4" />
                Programma Partner
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Diventa un Partner{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Flavour
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Unisciti ad oltre <strong className="text-foreground">100 rivenditori</strong> in Italia
              </p>

              <p className="text-muted-foreground leading-relaxed">
                La rivendita dei nostri servizi consente ai nostri partner di ampliare la propria offerta verso i clienti e di rafforzare la relazione commerciale, riducendo il rischio che il cliente si rivolga a un altro fornitore.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Entrerai a far parte di un team di sviluppo in continua evoluzione, che ti fornirà gli strumenti necessari per rivendere soluzioni all'avanguardia e raggiungere risultati concreti.
              </p>

              <Button 
                size="lg" 
                className="mt-4"
                onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Invia richiesta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Right - Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:pl-8"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                I vantaggi della partnership
              </h3>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit.number}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {benefit.number}
                    </span>
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {benefit.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perché scegliere di diventare Partner
            </h2>
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Vantaggi concreti per la tua crescita
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-primary mb-3">{feature.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="partner-form" className="py-16 md:py-24 bg-muted/30 border-t border-border">
        <div className="container px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Inizia la tua partnership
              </h2>
              <p className="text-muted-foreground">
                Compila il form e ti contatteremo entro 24 ore per discutere i dettagli della collaborazione.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6 bg-card p-8 rounded-2xl border border-border shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome e Cognome *</Label>
                  <Input
                    id="name"
                    placeholder="Mario Rossi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario@azienda.it"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+39 333 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Azienda</Label>
                  <Input
                    id="company"
                    placeholder="Nome azienda"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Messaggio (opzionale)</Label>
                <Textarea
                  id="message"
                  placeholder="Raccontaci di te e della tua attività..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Inviando questo form accetti la nostra{" "}
                <Link to="#" className="underline hover:text-foreground">Privacy Policy</Link>
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-success/10 text-success text-sm">
              <Shield className="w-4 h-4" />
              Nessun costo di attivazione
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto a far crescere il tuo business?
            </h2>
            <p className="text-muted-foreground mb-8">
              Unisciti alla rete di partner Flavour e inizia a offrire soluzioni digitali ai tuoi clienti del settore hospitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Diventa Partner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contatti">
                  Contattaci
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" className="flex items-center gap-2 text-foreground font-semibold">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              Flavour
            </Link>
            <span>© {new Date().getFullYear()} Flavour. Tutti i diritti riservati.</span>
            <Link to="/" className="hover:text-foreground transition-colors">
              Torna alla home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
});

Partner.displayName = "Partner";

export default Partner;
