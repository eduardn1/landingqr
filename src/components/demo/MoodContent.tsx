/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Mood Selector Demo
 * Sistema di selezione mood per menu personalizzato
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  Sparkles,
  Leaf,
  Beef,
  Cookie,
  Flame,
  Clock,
  Heart,
  ChefHat,
  ArrowRight,
  RotateCcw,
  Check,
  ThumbsUp,
  ThumbsDown,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mood options
const moods = [
  { id: "light", name: "Leggero", icon: Leaf, description: "Piatti freschi e salutari", color: "from-green-400 to-emerald-500", emoji: "🥗" },
  { id: "vegetarian", name: "Vegetariano", icon: Leaf, description: "Solo verdure, senza carne", color: "from-lime-400 to-green-500", emoji: "🥬" },
  { id: "meat", name: "Carnivoro", icon: Beef, description: "Carne in tutte le sue forme", color: "from-red-400 to-rose-500", emoji: "🥩" },
  { id: "sweet", name: "Dolce", icon: Cookie, description: "Dessert e dolci", color: "from-pink-400 to-rose-400", emoji: "🍰" },
  { id: "spicy", name: "Piccante", icon: Flame, description: "Per chi ama il fuoco", color: "from-orange-500 to-red-500", emoji: "🌶️" },
  { id: "traditional", name: "Tradizionale", icon: Clock, description: "Ricette della nonna", color: "from-amber-500 to-orange-500", emoji: "🍝" },
  { id: "innovative", name: "Innovativo", icon: Sparkles, description: "Creazioni dello chef", color: "from-emerald-500/70 to-teal-600/70", emoji: "✨" },
  { id: "romantic", name: "Romantico", icon: Heart, description: "Per una serata speciale", color: "from-rose-400 to-pink-500", emoji: "💕" },
];

// Mock dishes by mood
const dishesByMood: Record<string, Array<{ name: string; price: string; desc: string }>> = {
  light: [
    { name: "Insalata Quinoa", price: "€11.00", desc: "Quinoa, avocado, pomodorini" },
    { name: "Poke Bowl", price: "€14.00", desc: "Salmone, riso, edamame" },
    { name: "Carpaccio Veggie", price: "€10.00", desc: "Zucchine, noci, parmigiano" },
  ],
  vegetarian: [
    { name: "Risotto ai Funghi", price: "€13.00", desc: "Porcini e tartufo nero" },
    { name: "Lasagna Verdure", price: "€12.00", desc: "7 verdure di stagione" },
    { name: "Burger Veggie", price: "€11.00", desc: "Ceci, barbabietola, salsa tahina" },
  ],
  meat: [
    { name: "Tagliata di Manzo", price: "€22.00", desc: "Black Angus con rucola" },
    { name: "Costolette d'Agnello", price: "€24.00", desc: "Con riduzione balsamica" },
    { name: "Burger Gourmet", price: "€16.00", desc: "200g di scottona, bacon, cheddar" },
  ],
  sweet: [
    { name: "Tiramisù", price: "€7.00", desc: "Ricetta tradizionale" },
    { name: "Cheesecake", price: "€6.00", desc: "Frutti di bosco" },
    { name: "Lava Cake", price: "€8.00", desc: "Cuore fondente al cioccolato" },
  ],
  spicy: [
    { name: "Arrabbiata", price: "€10.00", desc: "Extra peperoncino calabrese" },
    { name: "Pollo Thai", price: "€15.00", desc: "Curry rosso, latte di cocco" },
    { name: "Diavola", price: "€11.00", desc: "Salame piccante, peperoncini" },
  ],
  traditional: [
    { name: "Carbonara", price: "€12.00", desc: "Guanciale, pecorino, uovo" },
    { name: "Ossobuco", price: "€19.00", desc: "Con risotto allo zafferano" },
    { name: "Lasagna Bolognese", price: "€13.00", desc: "Ragù 12 ore, besciamella" },
  ],
  innovative: [
    { name: "Ravioli Nero", price: "€16.00", desc: "Seppia, burrata, tartufo" },
    { name: "Polpo Destrutturato", price: "€18.00", desc: "Crema patate viola, polvere olive" },
    { name: "Risotto Affumicato", price: "€15.00", desc: "Provola, pancetta croccante" },
  ],
  romantic: [
    { name: "Plateau Formaggi", price: "€16.00", desc: "Selezione 5 formaggi, miele" },
    { name: "Aragosta Thermidor", price: "€38.00", desc: "Con salsa cremosa" },
    { name: "Fonduta per Due", price: "€22.00", desc: "3 formaggi, verdure, pane" },
  ],
};

// Swipe cards data for quiz
const quizCards = [
  { id: 1, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", question: "Ti piacciono le insalate fresche?", mood: "light" },
  { id: 2, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400", question: "Ami la pizza tradizionale?", mood: "traditional" },
  { id: 3, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", question: "Ti attira la carne grigliata?", mood: "meat" },
  { id: 4, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400", question: "Ti piace il piccante?", mood: "spicy" },
];

export const MoodContent = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<Record<string, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      const mood = quizCards[currentCardIndex].mood;
      setQuizResults(prev => ({ ...prev, [mood]: (prev[mood] || 0) + 1 }));
    }
    
    if (currentCardIndex < quizCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      // Find winning mood
      const winningMood = Object.entries(quizResults).reduce((a, b) => 
        (a[1] || 0) > (b[1] || 0) ? a : b
      , ["traditional", 0])[0];
      setSelectedMood(winningMood);
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentCardIndex(0);
    setQuizResults({});
    setQuizComplete(false);
    setShowQuiz(false);
    setSelectedMood(null);
  };

  const suggestedDishes = selectedMood ? dishesByMood[selectedMood] || [] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/70 to-teal-600/70 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Mood Selector</h2>
            <p className="text-muted-foreground">Il menu si adatta al tuo umore</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={showQuiz ? "default" : "outline"}
            onClick={() => setShowQuiz(!showQuiz)}
          >
            {showQuiz ? "Scegli Manualmente" : "Quiz Swipe 🔥"}
          </Button>
          {selectedMood && (
            <Button variant="outline" onClick={resetQuiz}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Swipe Quiz Mode */}
      <AnimatePresence mode="wait">
        {showQuiz && !quizComplete ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center py-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Swipe a destra se ti piace, sinistra se no
            </p>
            
            {/* Card Stack */}
            <div className="relative w-72 h-96">
              {quizCards.slice(currentCardIndex, currentCardIndex + 1).map((card) => (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info: PanInfo) => {
                    if (info.offset.x > 100) handleSwipe("right");
                    else if (info.offset.x < -100) handleSwipe("left");
                  }}
                  whileDrag={{ rotate: 5 }}
                >
                  <img 
                    src={card.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-xl font-bold text-center">{card.question}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Swipe Buttons */}
            <div className="flex gap-8 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe("left")}
                className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center"
              >
                <X className="w-8 h-8 text-red-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe("right")}
                className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-green-500" />
              </motion.button>
            </div>

            {/* Progress */}
            <div className="flex gap-2 mt-6">
              {quizCards.map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i <= currentCardIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="moods"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Mood Grid */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Come ti senti oggi?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.id;
                  
                  return (
                    <motion.button
                      key={mood.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`relative p-6 rounded-2xl border transition-all text-center ${
                        isSelected
                          ? "border-primary shadow-lg"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.color} ${
                        isSelected ? "opacity-10" : "opacity-0"
                      } transition-opacity`} />
                      
                      <div className="relative z-10">
                        <span className="text-4xl mb-3 block">{mood.emoji}</span>
                        <h4 className="font-bold text-foreground mb-1">{mood.name}</h4>
                        <p className="text-xs text-muted-foreground">{mood.description}</p>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested Dishes */}
      <AnimatePresence>
        {selectedMood && suggestedDishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${moods.find(m => m.id === selectedMood)?.color} flex items-center justify-center`}>
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Consigliati per te</h3>
                <p className="text-sm text-muted-foreground">
                  Basati sul tuo mood: {moods.find(m => m.id === selectedMood)?.name}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {suggestedDishes.map((dish, i) => (
                <motion.div
                  key={dish.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-foreground">{dish.name}</h4>
                    <span className="font-bold text-primary">{dish.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{dish.desc}</p>
                  <Button size="sm" className="w-full mt-3">
                    Aggiungi
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
