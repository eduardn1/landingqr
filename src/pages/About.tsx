/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - About Page (Chi Siamo)
 * Pagina moderna con bento grid e design premium
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Target, 
  Heart, 
  Zap, 
  Globe,
  Users,
  Rocket,
  Shield,
  Code,
  Palette,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  CheckCircle,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "500+", label: "Locali attivi", icon: Users },
  { value: "50k+", label: "Menu visualizzati", icon: TrendingUp },
  { value: "99.9%", label: "Uptime garantito", icon: Shield },
  { value: "4.9/5", label: "Valutazione clienti", icon: Star },
];

const values = [
  {
    icon: Target,
    title: "Missione",
    description: "Democratizzare la tecnologia per l'hospitality, rendendo accessibile a ogni locale strumenti digitali potenti e facili da usare.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Heart,
    title: "Passione",
    description: "Amiamo il nostro lavoro e lo facciamo con dedizione. Ogni feature nasce dall'ascolto delle esigenze reali dei nostri clienti.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Innovazione",
    description: "Siamo sempre al passo con le ultime tecnologie per offrire soluzioni all'avanguardia che fanno la differenza.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Globe,
    title: "Accessibilità",
    description: "Crediamo che ogni locale, grande o piccolo, meriti strumenti professionali senza costi proibitivi.",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const timeline = [
  {
    year: "2023",
    title: "L'idea prende forma",
    description: "Nasce l'idea di Flavour durante la pandemia, quando i ristoratori hanno più che mai bisogno di soluzioni digitali.",
  },
  {
    year: "2024",
    title: "Lancio ufficiale",
    description: "Dopo mesi di sviluppo e test con ristoratori locali, Flavour viene lanciato ufficialmente in Sardegna.",
  },
  {
    year: "2025",
    title: "Espansione nazionale",
    description: "Flavour si espande in tutta Italia, con oltre 500 locali attivi e nuove funzionalità rivoluzionarie.",
  },
];

const features = [
  { icon: Code, label: "Tecnologia proprietaria" },
  { icon: Palette, label: "Design italiano" },
  { icon: Shield, label: "GDPR compliant" },
  { icon: Rocket, label: "Performance ottimizzate" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowLeft className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">Torna alla home</span>
          </Link>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-lg text-foreground">Flavour</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Chi Siamo
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6">
                Dietro Flavour c'è una{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  passione italiana
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Siamo un team di sviluppatori e designer che credono nel potere della tecnologia 
                per trasformare l'esperienza della ristorazione italiana.
              </p>

              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Cagliari, Sardegna</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">Made in Italy 🇮🇹</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid - Values */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                I nostri valori
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Principi che guidano ogni decisione e ogni linea di codice che scriviamo.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                const isLarge = index === 0 || index === 3;
                
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all ${
                      isLarge ? 'lg:col-span-2' : ''
                    }`}
                  >
                    {/* Gradient Glow on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                    
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="font-bold text-lg text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story Section with Timeline */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left - Story */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">La nostra storia</span>
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Da un'idea a una piattaforma che{" "}
                  <span className="text-primary">trasforma l'hospitality</span>
                </h2>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Flavour nasce dalla volontà di creare qualcosa di diverso: una piattaforma che unisce 
                  tecnologia avanzata e semplicità d'uso, pensata per chi ogni giorno lavora con passione 
                  nel mondo della ristorazione.
                </p>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Il nostro obiettivo è semplice: permettere a ogni locale, dal piccolo bar di quartiere 
                  al ristorante stellato, di offrire un'esperienza digitale all'altezza delle aspettative 
                  dei clienti moderni.
                </p>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border"
                    >
                      <feature.icon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Timeline */}
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative flex gap-4"
                  >
                    {/* Timeline Line */}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[23px] top-12 w-0.5 h-full bg-border" />
                    )}
                    
                    {/* Year Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/25">
                        {item.year.slice(2)}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-primary">{item.year}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team/Founder Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-card border border-border rounded-3xl p-8 md:p-12 overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                
                <div className="relative grid md:grid-cols-3 gap-8 items-center">
                  {/* Avatar */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/25">
                        <span className="text-4xl md:text-5xl font-bold text-white">EC</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg bg-success flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="md:col-span-2 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                      <Award className="w-3 h-3" />
                      Fondatore & Lead Developer
                    </div>
                    
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Eduard Costin Udila
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Full-stack developer con oltre 5 anni di esperienza nello sviluppo di soluzioni 
                      digitali per il mondo business. Fondatore di StudioJEM, agenzia specializzata 
                      in web development e digital solutions.
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <a
                        href="https://studiojem.it"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors text-sm font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        studiojem.it
                      </a>
                      <Link to="/contatti">
                        <Button size="sm" className="gap-2">
                          Contattami
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pronto a trasformare il tuo locale?
              </h2>
              <p className="text-muted-foreground mb-8">
                Unisciti a centinaia di ristoratori che hanno già scelto Flavour 
                per digitalizzare la loro attività.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/demo">
                  <Button size="lg" className="gap-2">
                    Prova la demo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contatti">
                  <Button variant="outline" size="lg">
                    Contattaci
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
