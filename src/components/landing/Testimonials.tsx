/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Testimonials Section (2026 Design)
 * Cards scorrevoli con avatar animati e rating stars
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, MapPin, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Proprietario",
    business: "Trattoria da Mario",
    location: "Milano",
    rating: 5,
    quote: "Da quando usiamo Flavour, gli ordini online sono aumentati del 52%. I clienti adorano poter ordinare dal tavolo senza aspettare il cameriere.",
    highlight: "+52% ordini",
    gradient: "from-violet-500 to-purple-600",
    avatar: "MR",
  },
  {
    name: "Giulia Bianchi",
    role: "Manager",
    business: "Pizzeria Napoli",
    location: "Roma",
    rating: 5,
    quote: "Finalmente posso aggiornare i prezzi in tempo reale! Prima ogni modifica costava €150 di ristampa. Ora è gratis e immediato.",
    highlight: "€150 risparmiati",
    gradient: "from-emerald-500 to-teal-600",
    avatar: "GB",
  },
  {
    name: "Alessandro Conti",
    role: "Chef & Owner",
    business: "Ristorante La Pergola",
    location: "Firenze",
    rating: 5,
    quote: "I turisti stranieri ora capiscono tutto grazie alle 5 lingue automatiche. Le vendite del pranzo sono aumentate del 35%!",
    highlight: "+35% vendite",
    gradient: "from-orange-500 to-red-500",
    avatar: "AC",
  },
  {
    name: "Francesca Marino",
    role: "Proprietaria",
    business: "Bar Centrale",
    location: "Cagliari",
    rating: 5,
    quote: "Setup facilissimo, in 15 minuti ero online. Il supporto è fantastico e risponde sempre in italiano.",
    highlight: "15 min setup",
    gradient: "from-blue-500 to-cyan-500",
    avatar: "FM",
  },
  {
    name: "Roberto De Luca",
    role: "Direttore",
    business: "Hotel Bellavista",
    location: "Amalfi",
    rating: 5,
    quote: "Gestiamo 3 ristoranti dell'hotel con un unico pannello. Il room service è diventato digitale e gli ospiti sono entusiasti.",
    highlight: "3 ristoranti",
    gradient: "from-pink-500 to-rose-500",
    avatar: "RD",
  },
  {
    name: "Elena Ferrara",
    role: "Co-founder",
    business: "Sushi Corner",
    location: "Torino",
    rating: 5,
    quote: "Il sistema di takeaway integrato ci ha permesso di triplicare gli ordini da asporto. Meglio di qualsiasi aggregatore!",
    highlight: "3x asporto",
    gradient: "from-amber-500 to-orange-500",
    avatar: "EF",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => scrollToIndex((activeIndex + 1) % testimonials.length);
  const prevSlide = () => scrollToIndex((activeIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={containerRef} id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      
      {/* Floating orb */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-[120px]"
      />
      
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warning/10 border border-warning/20 mb-8"
          >
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="text-sm font-semibold text-warning">500+ ristoratori soddisfatti</span>
          </motion.div>

          <h2 className="font-display text-display-sm md:text-display-md font-bold leading-tight mb-6">
            <span className="text-foreground">Cosa dicono i </span>
            <span className="gradient-text">nostri clienti</span>
          </h2>

          <p className="text-body-lg text-muted-foreground">
            Ristoratori italiani che hanno già trasformato il loro business con Flavour
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-5xl mx-auto mb-12">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.name}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="relative p-8 md:p-12 rounded-3xl bg-card border border-border">
                    {/* Quote Icon */}
                    <div className="absolute top-8 right-8 md:top-12 md:right-12">
                      <Quote className="w-12 h-12 text-primary/10" />
                    </div>

                    {/* Highlight Badge */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white text-sm font-semibold mb-6 shadow-lg`}
                    >
                      {testimonial.highlight}
                    </motion.div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          <Star className="w-6 h-6 fill-warning text-warning" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {/* Animated Avatar */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      >
                        {testimonial.avatar}
                        {/* Pulse ring */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient} animate-ping opacity-20`} />
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="font-bold text-foreground text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground">
                          {testimonial.role}, {testimonial.business}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                isAutoPlaying 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Play className={`w-3 h-3 ${isAutoPlaying ? 'animate-pulse' : ''}`} />
              {isAutoPlaying ? 'Autoplay attivo' : 'Autoplay disattivo'}
            </button>
          </div>
        </div>

        {/* Avatar Stack + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          {/* Avatar Stack */}
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 5).map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold border-2 border-background shadow-md`}
                  style={{ zIndex: 5 - i }}
                >
                  {t.avatar}
                </motion.div>
              ))}
              <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold text-muted-foreground shadow-md">
                +495
              </div>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-border">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-warning fill-warning" />
              ))}
            </div>
            <div className="h-6 w-px bg-border" />
            <div>
              <span className="font-bold text-foreground text-lg">4.9</span>
              <span className="text-muted-foreground text-sm"> su 5</span>
            </div>
            <div className="text-muted-foreground text-sm">
              (500+ recensioni)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
