/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Testimonials Section (2026 Design)
 * Cards scorrevoli con avatar animati e rating stars
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote, MapPin, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Proprietario",
    business: "Pub The Oak",
    businessType: "Pub",
    location: "Milano",
    rating: 5,
    quote: "Da quando usiamo Flavour, gli ordini di birre artigianali e cocktail sono aumentati del 52%. I clienti adorano ordinare dal tavolo senza aspettare al bancone.",
    highlight: "+52% ordini",
    gradient: "from-violet-500 to-purple-600",
    avatar: "MR",
  },
  {
    name: "Giulia Bianchi",
    role: "Manager",
    business: "Pizzeria Bella Napoli",
    businessType: "Pizzeria",
    location: "Roma",
    rating: 5,
    quote: "Finalmente posso aggiornare i prezzi delle pizze in tempo reale! Prima ogni modifica costava €150 di ristampa. Ora è gratis e immediato.",
    highlight: "€150 risparmiati",
    gradient: "from-emerald-500 to-teal-600",
    avatar: "GB",
  },
  {
    name: "Alessandro Conti",
    role: "Chef & Owner",
    business: "Osteria del Borgo",
    businessType: "Ristorante",
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
    business: "Caffè Aroma",
    businessType: "Caffetteria",
    location: "Cagliari",
    rating: 5,
    quote: "Setup facilissimo per il nostro bar caffetteria, in 15 minuti eravamo online. I clienti ordinano cappuccini e cornetti direttamente dal telefono!",
    highlight: "15 min setup",
    gradient: "from-blue-500 to-cyan-500",
    avatar: "FM",
  },
  {
    name: "Roberto De Luca",
    role: "Direttore",
    business: "Cocktail Lab",
    businessType: "Cocktail Bar",
    location: "Amalfi",
    rating: 5,
    quote: "Gestiamo prenotazioni e ordini cocktail da un unico pannello. Il delivery dei nostri drink signature è decollato, meglio di qualsiasi aggregatore!",
    highlight: "3x delivery",
    gradient: "from-pink-500 to-rose-500",
    avatar: "RD",
  },
  {
    name: "Elena Ferrara",
    role: "Titolare",
    business: "Wine Bar Tuscany",
    businessType: "Enoteca",
    location: "Siena",
    rating: 5,
    quote: "Il menu digitale con descrizioni dei vini e abbinamenti ha trasformato la nostra enoteca. I clienti esplorano la carta vini e ordinano con un tap!",
    highlight: "+40% retention",
    gradient: "from-amber-500 to-orange-500",
    avatar: "EF",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />

      {/* Subtle glow (static, performant) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl opacity-40" />
      
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-warning/10 border border-warning/20 mb-6 md:mb-8"
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-warning fill-warning" />
            <span className="text-xs sm:text-sm font-semibold text-warning">500+ locali soddisfatti</span>
          </motion.div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-display-md font-bold leading-tight mb-3 sm:mb-4 md:mb-6 px-2">
            <span className="text-foreground">Cosa dicono i </span>
            <span className="gradient-text">nostri clienti</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
            Bar, ristoranti e pub italiani che hanno già trasformato il loro business con Flavour
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 sm:-left-2 md:-left-10 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 sm:-right-2 md:-right-10 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary/30 transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
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
                  className="w-full flex-shrink-0 px-6 sm:px-8 md:px-2"
                >
                  <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8">
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary/10" />
                    </div>

                    {/* Highlight Badge */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-5 md:mb-6 shadow-lg`}
                    >
                      {testimonial.highlight}
                    </motion.div>

                    {/* Stars */}
                    <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-5 md:mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-warning text-warning" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-foreground leading-relaxed mb-4 sm:mb-5 md:mb-6 pr-4 sm:pr-6">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      {/* Avatar */}
                      <div
                        className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg shadow-lg flex-shrink-0 transition-transform duration-300 hover:scale-105`}
                      >
                        {testimonial.avatar}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-foreground text-sm sm:text-base md:text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground text-xs sm:text-sm truncate">
                          {testimonial.role}, {testimonial.business}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-muted text-xs sm:text-sm text-muted-foreground w-fit">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-5 sm:w-8 bg-primary' 
                    : 'w-1.5 sm:w-2 bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-3 sm:mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors ${
                isAutoPlaying 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Play className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isAutoPlaying ? 'animate-pulse' : ''}`} />
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {/* Avatar Stack */}
          <div className="flex items-center">
            <div className="flex -space-x-2 sm:-space-x-3">
              {testimonials.slice(0, 5).map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-[10px] sm:text-xs font-bold border-2 border-background shadow-md`}
                  style={{ zIndex: 5 - i }}
                >
                  {t.avatar}
                </motion.div>
              ))}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] sm:text-xs font-bold text-muted-foreground shadow-md">
                +495
              </div>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl bg-card border border-border">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-warning fill-warning" />
              ))}
            </div>
            <div className="h-4 sm:h-5 md:h-6 w-px bg-border" />
            <div>
              <span className="font-bold text-foreground text-sm sm:text-base md:text-lg">4.9</span>
              <span className="text-muted-foreground text-xs sm:text-sm"> su 5</span>
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm hidden sm:block">
              (500+ recensioni)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
