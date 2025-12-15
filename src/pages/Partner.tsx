/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Diventa Rivenditore / Partner Page
 * Stile Cadence: glass cards, bento grid, animazioni stagger
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
  Users,
  TrendingUp,
  Headphones,
  Palette,
  LayoutDashboard,
  Zap,
  Shield,
  Award,
  Rocket,
  Target,
  Handshake,
  Sparkles,
  Building,
  CheckCircle,
  Globe,
  Gift,
  Send,
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    }
  },
};

// Glass Card Component
const GlassCard = ({ 
  children, 
  className = "", 
  glowColor = "primary",
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "primary" | "accent" | "rose" | "emerald";
}) => {
  const glowClasses = {
    primary: "hover:border-primary/50 hover:shadow-primary/10",
    accent: "hover:border-accent/50 hover:shadow-accent/10",
    rose: "hover:border-rose-500/50 hover:shadow-rose-500/10",
    emerald: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      className={`
        relative rounded-2xl
        bg-card/60 backdrop-blur-xl
        border border-border/50
        shadow-xl shadow-black/5
        ${glowClasses[glowColor]}
        transition-colors duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

const benefits = [
  { icon: TrendingUp, text: "Amplia la tua offerta di servizi", color: "primary" },
  { icon: Users, text: "Rafforza il rapporto con i clienti", color: "accent" },
  { icon: Zap, text: "Soluzioni sempre all'avanguardia", color: "rose" },
  { icon: Award, text: "Condizioni economiche vantaggiose", color: "emerald" },
  { icon: Headphones, text: "Supporto tecnico dedicato", color: "primary" },
  { icon: Palette, text: "Possibilità di White Label", color: "accent" },
  { icon: LayoutDashboard, text: "Dashboard gestione centralizzata", color: "rose" },
];

const stats = [
  { value: "100+", label: "Partner attivi", icon: Users },
  { value: "500+", label: "Locali gestiti", icon: Building },
  { value: "98%", label: "Tasso di rinnovo", icon: TrendingUp },
  { value: "24h", label: "Tempo di risposta", icon: Headphones },
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
    <div className="min-h-screen bg-background overflow-hidden">
      <SharedNavbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[150px]" />
          </div>

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Handshake className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Programma Partner</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6">
                Diventa un Partner{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-rose-500 bg-clip-text text-transparent">
                  Flavour
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Unisciti ad oltre <strong className="text-foreground">100 rivenditori</strong> in Italia e offri ai tuoi clienti 
                le migliori soluzioni digitali per l'hospitality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="gap-2 rounded-full"
                  onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Send className="w-4 h-4" />
                  Invia richiesta
                </Button>
                <Button variant="outline" size="lg" className="gap-2 rounded-full" asChild>
                  <Link to="/demo">
                    <Sparkles className="w-4 h-4" />
                    Prova la demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-12 md:py-20">
          <div className="container">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
            >
              
              {/* Main Value Prop - Large Card */}
              <GlassCard className="lg:col-span-2 lg:row-span-2 p-8" glowColor="primary">
                <div className="h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5">
                    <Rocket className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Perché diventare Partner?</h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    La rivendita dei nostri servizi consente ai partner di ampliare la propria offerta verso i clienti 
                    e di rafforzare la relazione commerciale. Entrerai a far parte di un team in continua evoluzione, 
                    con strumenti all'avanguardia e condizioni economiche vantaggiose.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Nessun costo di attivazione</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
              </GlassCard>

              {/* Innovation Card */}
              <GlassCard className="p-6" glowColor="accent">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Innovazione</h3>
                <p className="text-sm text-muted-foreground">Soluzioni sempre aggiornate alle ultime tendenze del settore.</p>
              </GlassCard>

              {/* Support Card */}
              <GlassCard className="p-6" glowColor="rose">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-500/60 flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Supporto 24h</h3>
                <p className="text-sm text-muted-foreground">Assistenza tecnica dedicata per te e i tuoi clienti.</p>
              </GlassCard>

              {/* Benefits List Card */}
              <GlassCard className="lg:col-span-2 p-6" glowColor="emerald">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-500/60 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">I vantaggi</h3>
                    <p className="text-xs text-muted-foreground">Tutto incluso per il tuo successo</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {benefits.slice(0, 6).map((benefit) => (
                    <div key={benefit.text} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-muted-foreground">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* White Label Card */}
              <GlassCard className="p-6" glowColor="primary">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">White Label</h3>
                <p className="text-sm text-muted-foreground">Rivendi con il tuo brand, personalizza tutto.</p>
              </GlassCard>

              {/* Dashboard Card */}
              <GlassCard className="p-6" glowColor="accent">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Dashboard</h3>
                <p className="text-sm text-muted-foreground">Gestisci tutti i tuoi clienti da un unico accesso.</p>
              </GlassCard>

              {/* Stats Row */}
              <GlassCard className="lg:col-span-4 p-6" glowColor="primary">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>

            </motion.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-12 md:py-16 border-y border-border bg-muted/20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Come funziona
              </h2>
              <p className="text-muted-foreground">Tre semplici step per iniziare</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { step: "01", title: "Candidati", desc: "Compila il form e raccontaci della tua attività", icon: Send },
                { step: "02", title: "Onboarding", desc: "Ti formiamo sulla piattaforma e i servizi", icon: Target },
                { step: "03", title: "Inizia", desc: "Rivendi ai tuoi clienti e guadagna subito", icon: Rocket },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="text-center p-6 rounded-2xl bg-card/50 border border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-xs font-bold text-primary mb-2">{item.step}</div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="partner-form" className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left - Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Inizia ora
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Inizia la tua{" "}
                    <span className="text-primary">partnership</span>
                  </h2>

                  <p className="text-muted-foreground">
                    Compila il form e ti contatteremo entro 24 ore per discutere i dettagli della collaborazione.
                  </p>

                  <div className="space-y-4 pt-4">
                    {[
                      { icon: Shield, text: "Nessun costo di attivazione" },
                      { icon: Globe, text: "Supporto in italiano" },
                      { icon: Award, text: "Commissioni competitive" },
                      { icon: Users, text: "Onboarding personalizzato" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <GlassCard className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome e Cognome *</Label>
                          <Input
                            id="name"
                            placeholder="Mario Rossi"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-background/50"
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
                            className="bg-background/50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefono</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+39 333 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Azienda</Label>
                          <Input
                            id="company"
                            placeholder="Nome azienda"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="bg-background/50"
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
                          className="bg-background/50 resize-none"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                        {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Inviando questo form accetti la nostra{" "}
                        <Link to="#" className="underline hover:text-foreground">Privacy Policy</Link>
                      </p>
                    </form>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <GlassCard className="p-8 md:p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5">
                  <Handshake className="w-7 h-7 text-white" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Pronto a far crescere il tuo business?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Unisciti alla rete di partner Flavour e inizia a offrire soluzioni digitali ai tuoi clienti.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    size="lg" 
                    className="gap-2 rounded-full"
                    onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Rocket className="w-4 h-4" />
                    Diventa Partner
                  </Button>
                  <Link to="/contatti">
                    <Button variant="outline" size="lg" className="gap-2 rounded-full">
                      Contattaci
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
});

Partner.displayName = "Partner";

export default Partner;
