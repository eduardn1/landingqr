/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Testimonials Section (Minimal 2026 Design)
 * Clean carousel with subtle animations
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, memo } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Proprietario, Pub The Oak",
    location: "Milano",
    quote: "Da quando usiamo Flavour, gli ordini sono aumentati del 52%. I clienti adorano ordinare dal tavolo.",
    highlight: "+52% ordini",
    avatar: "MR",
  },
  {
    name: "Giulia Bianchi",
    role: "Manager, Pizzeria Bella Napoli",
    location: "Roma",
    quote: "Finalmente posso aggiornare i prezzi in tempo reale! Prima ogni modifica costava €150.",
    highlight: "€150 risparmiati",
    avatar: "GB",
  },
  {
    name: "Alessandro Conti",
    role: "Chef & Owner, Osteria del Borgo",
    location: "Firenze",
    quote: "I turisti stranieri ora capiscono tutto grazie alle 5 lingue. Le vendite sono aumentate del 35%!",
    highlight: "+35% vendite",
    avatar: "AC",
  },
  {
    name: "Francesca Marino",
    role: "Proprietaria, Caffè Aroma",
    location: "Cagliari",
    quote: "Setup facilissimo, in 15 minuti eravamo online. I clienti ordinano direttamente dal telefono!",
    highlight: "15 min setup",
    avatar: "FM",
  },
  {
    name: "Roberto De Luca",
    role: "Direttore, Cocktail Lab",
    location: "Amalfi",
    quote: "Il delivery dei nostri cocktail è decollato. Molto meglio di qualsiasi aggregatore!",
    highlight: "3x delivery",
    avatar: "RD",
  },
];

const Testimonials = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((activeIndex + 1) % testimonials.length);

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-glow" />
      
      <div className="container relative z-10">
        {/* Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-6">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="text-sm font-medium text-warning">500+ locali soddisfatti</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cosa dicono i nostri clienti
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Bar, ristoranti e pub italiani che hanno già scelto Flavour
          </p>
        </ScrollReveal>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            {/* Navigation */}
            <button 
              onClick={prev}
              className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={next}
              className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Card */}
            <div className="p-8 md:p-12 rounded-2xl bg-card border border-border text-center">
              <Quote className="w-10 h-10 text-primary/20 mx-auto mb-6" />
              
              {/* Highlight Badge */}
              <div className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                {current.highlight}
              </div>

              {/* Stars */}
              <div className="flex gap-1 justify-center mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
                "{current.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {current.avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">{current.name}</div>
                  <div className="text-sm text-muted-foreground">{current.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Rating Summary */}
        <ScrollReveal animation="fadeIn" className="flex justify-center">
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-card border border-border">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-warning fill-warning" />
              ))}
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="font-semibold text-foreground">4.9/5</span>
            <span className="text-sm text-muted-foreground">(500+ recensioni)</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;
