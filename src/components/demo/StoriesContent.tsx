/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Stories Instagram-Style Demo
 * Sistema di stories per promozioni e novità
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Heart,
  Share2,
  Trash2,
  Edit,
  Image,
  Type,
  Link,
  Calendar,
  X,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock stories data
const mockStories = [
  {
    id: 1,
    title: "Pizza del Giorno",
    type: "promo",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=600&fit=crop",
    overlay: "🍕 MARGHERITA SPECIAL\n€6.99 invece di €8.99",
    views: 234,
    likes: 45,
    active: true,
    expiresAt: "2024-12-15",
    link: "/menu/pizza-margherita"
  },
  {
    id: 2,
    title: "Nuovo Piatto",
    type: "new",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop",
    overlay: "✨ NUOVO!\nInsalata Caesar Deluxe",
    views: 189,
    likes: 32,
    active: true,
    expiresAt: "2024-12-20",
    link: null
  },
  {
    id: 3,
    title: "Evento Live Music",
    type: "event",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    overlay: "🎵 SABATO SERA\nLive Jazz Night\nPrenota ora!",
    views: 312,
    likes: 78,
    active: true,
    expiresAt: "2024-12-14",
    link: "/reservations"
  },
  {
    id: 4,
    title: "Happy Hour",
    type: "promo",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=600&fit=crop",
    overlay: "🍹 HAPPY HOUR\n18:00 - 20:00\n2x1 Cocktails",
    views: 445,
    likes: 89,
    active: true,
    expiresAt: "2024-12-31",
    link: null
  },
  {
    id: 5,
    title: "Chef Special",
    type: "new",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=600&fit=crop",
    overlay: "👨‍🍳 CHEF'S CHOICE\nRisotto ai Funghi Porcini\nSolo questo weekend!",
    views: 178,
    likes: 41,
    active: false,
    expiresAt: "2024-12-10",
    link: null
  },
];

const storyTypes = [
  { id: "promo", label: "Promozione", color: "from-amber-500/70 to-orange-600/70" },
  { id: "new", label: "Novità", color: "from-emerald-500/70 to-teal-600/70" },
  { id: "event", label: "Evento", color: "from-sky-500/70 to-blue-600/70" },
];

export const StoriesContent = () => {
  const [stories, setStories] = useState(mockStories);
  const [viewingStory, setViewingStory] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const activeStories = stories.filter(s => s.active);
  const currentStory = viewingStory !== null ? stories.find(s => s.id === viewingStory) : null;

  // Auto-advance stories
  useEffect(() => {
    if (viewingStory === null || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next story
          const currentIdx = activeStories.findIndex(s => s.id === viewingStory);
          if (currentIdx < activeStories.length - 1) {
            setViewingStory(activeStories[currentIdx + 1].id);
            return 0;
          } else {
            setViewingStory(null);
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [viewingStory, isPaused, activeStories]);

  const handleNextStory = () => {
    const currentIdx = activeStories.findIndex(s => s.id === viewingStory);
    if (currentIdx < activeStories.length - 1) {
      setViewingStory(activeStories[currentIdx + 1].id);
      setProgress(0);
    }
  };

  const handlePrevStory = () => {
    const currentIdx = activeStories.findIndex(s => s.id === viewingStory);
    if (currentIdx > 0) {
      setViewingStory(activeStories[currentIdx - 1].id);
      setProgress(0);
    }
  };

  const handleDeleteStory = (id: number) => {
    setStories(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Stories</h2>
          <p className="text-muted-foreground">Promozioni e novità stile Instagram</p>
        </div>
        <Button onClick={() => setShowEditor(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuova Story
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">Visualizzazioni</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stories.reduce((acc, s) => acc + s.views, 0).toLocaleString()}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="text-sm text-muted-foreground">Like totali</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stories.reduce((acc, s) => acc + s.likes, 0)}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm text-muted-foreground">Stories Attive</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{activeStories.length}</p>
        </div>
      </div>

      {/* Stories Preview Row */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Anteprima Stories</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* Add Story Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowEditor(true)}
            className="flex-shrink-0 w-24 h-40 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Aggiungi</span>
          </motion.div>

          {/* Story Previews */}
          {stories.map((story) => {
            const typeInfo = storyTypes.find(t => t.id === story.type);
            return (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  if (story.active) {
                    setViewingStory(story.id);
                    setProgress(0);
                  }
                }}
                className={`relative flex-shrink-0 w-24 h-40 rounded-xl overflow-hidden cursor-pointer ${
                  !story.active && "opacity-50"
                }`}
              >
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Ring */}
                <div className={`absolute inset-0 rounded-xl ring-2 ${
                  story.active 
                    ? `ring-${typeInfo?.color.split("-")[1]}-500` 
                    : "ring-muted"
                } ring-offset-2 ring-offset-background`} />

                {/* Type Badge */}
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r ${typeInfo?.color} text-white text-[10px] font-medium`}>
                  {typeInfo?.label}
                </div>

                {/* Title */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">{story.title}</p>
                  <p className="text-white/60 text-[10px]">{story.views} views</p>
                </div>

                {!story.active && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs">Scaduta</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stories Management */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Gestione Stories</h3>
        <div className="space-y-3">
          {stories.map((story) => {
            const typeInfo = storyTypes.find(t => t.id === story.type);
            return (
              <div
                key={story.id}
                className={`p-4 rounded-xl border transition-all ${
                  story.active ? "bg-card border-border" : "bg-muted/50 border-border opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-16 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{story.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${typeInfo?.color} text-white text-xs`}>
                        {typeInfo?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {story.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {story.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {story.expiresAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteStory(story.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Story Viewer */}
      <AnimatePresence>
        {viewingStory !== null && currentStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setViewingStory(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => setViewingStory(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-16 flex gap-1 z-10">
              {activeStories.map((story, i) => {
                const storyIdx = activeStories.findIndex(s => s.id === viewingStory);
                return (
                  <div key={story.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100"
                      style={{ 
                        width: i < storyIdx ? "100%" : i === storyIdx ? `${progress}%` : "0%" 
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Story Content */}
            <div 
              className="relative w-full max-w-md aspect-[9/16] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={currentStory.image}
                alt={currentStory.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <p className="text-white text-2xl font-bold text-center whitespace-pre-line drop-shadow-lg">
                  {currentStory.overlay}
                </p>
              </div>

              {/* Navigation */}
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30"
                onClick={handlePrevStory}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30"
                onClick={handleNextStory}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Pause/Play */}
              <button 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play className="w-6 h-6 text-white" /> : <Pause className="w-6 h-6 text-white" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
