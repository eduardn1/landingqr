/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Events & News Demo
 * Sistema eventi e novità del ristorante
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Music,
  Utensils,
  Wine,
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Star,
  Bell,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Event types
const eventTypes = [
  { id: "music", label: "Live Music", icon: Music, color: "from-sky-500/70 to-blue-600/70" },
  { id: "tasting", label: "Degustazione", icon: Wine, color: "from-amber-500/70 to-orange-600/70" },
  { id: "dinner", label: "Cena Tematica", icon: Utensils, color: "from-rose-500/70 to-pink-600/70" },
  { id: "course", label: "Corso Cucina", icon: GraduationCap, color: "from-emerald-500/70 to-teal-600/70" },
];

// Mock events
const mockEvents = [
  {
    id: 1,
    title: "Jazz Night",
    type: "music",
    description: "Serata di jazz dal vivo con il trio Lorenzo Ferretti. Atmosfera intima e cocktail speciali.",
    date: "2024-12-14",
    time: "21:00",
    duration: "3 ore",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    maxGuests: 50,
    registeredGuests: 38,
    price: "€15",
    includesFood: true,
    active: true,
    featured: true
  },
  {
    id: 2,
    title: "Degustazione Vini Toscani",
    type: "tasting",
    description: "Viaggio tra i migliori vini della Toscana. 6 etichette accompagnate da taglieri di salumi e formaggi.",
    date: "2024-12-18",
    time: "19:00",
    duration: "2.5 ore",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop",
    maxGuests: 20,
    registeredGuests: 15,
    price: "€45",
    includesFood: true,
    active: true,
    featured: false
  },
  {
    id: 3,
    title: "Cena di Natale",
    type: "dinner",
    description: "Menu speciale di 5 portate con i sapori della tradizione natalizia italiana.",
    date: "2024-12-24",
    time: "20:00",
    duration: "4 ore",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
    maxGuests: 80,
    registeredGuests: 72,
    price: "€75",
    includesFood: true,
    active: true,
    featured: true
  },
  {
    id: 4,
    title: "Corso: Pasta Fresca",
    type: "course",
    description: "Impara a fare la pasta fresca con lo Chef Marco. Tagliatelle, ravioli e molto altro.",
    date: "2024-12-20",
    time: "15:00",
    duration: "3 ore",
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600&h=400&fit=crop",
    maxGuests: 12,
    registeredGuests: 8,
    price: "€60",
    includesFood: true,
    active: true,
    featured: false
  },
  {
    id: 5,
    title: "Capodanno 2025",
    type: "dinner",
    description: "Gran Cenone di Capodanno con DJ set, cotillon e brindisi di mezzanotte inclusi.",
    date: "2024-12-31",
    time: "20:30",
    duration: "6 ore",
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&h=400&fit=crop",
    maxGuests: 100,
    registeredGuests: 89,
    price: "€120",
    includesFood: true,
    active: true,
    featured: true
  },
];

const stats = [
  { label: "Eventi Attivi", value: "5", icon: Calendar, color: "from-emerald-500/60 to-teal-600/60" },
  { label: "Prenotazioni", value: "222", icon: Users, color: "from-sky-500/60 to-blue-600/60" },
  { label: "Posti Rimanenti", value: "40", icon: Check, color: "from-cyan-500/60 to-teal-600/60" },
  { label: "Revenue Previsto", value: "€15.8K", icon: Star, color: "from-amber-500/60 to-orange-600/60" },
];

export const EventsContent = () => {
  const [events, setEvents] = useState(mockEvents);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  const filteredEvents = selectedType 
    ? events.filter(e => e.type === selectedType)
    : events;

  const getEventType = (typeId: string) => eventTypes.find(t => t.id === typeId);

  const handleToggleActive = (id: number) => {
    setEvents(prev => prev.map(e => 
      e.id === id ? { ...e, active: !e.active } : e
    ));
  };

  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-card border border-border"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Eventi & News</h2>
          <p className="text-muted-foreground">Gestisci eventi, serate speciali e promozioni</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nuovo Evento
        </Button>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedType(null)}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            selectedType === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Tutti
        </button>
        {eventTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedType === type.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Featured Events */}
      {!selectedType && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">In Evidenza</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.filter(e => e.featured).map((event) => {
              const eventType = getEventType(event.type);
              const Icon = eventType?.icon || Calendar;
              const spotsLeft = event.maxGuests - event.registeredGuests;
              
              return (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedEvent(event)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${eventType?.color} text-white text-xs font-medium flex items-center gap-1`}>
                    <Icon className="w-3 h-3" />
                    {eventType?.label}
                  </div>
                  
                  {/* Star */}
                  <div className="absolute top-3 right-3">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-lg font-bold text-white mb-1">{event.title}</h4>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-white">{event.price}</span>
                      <span className={`text-xs ${spotsLeft < 10 ? "text-red-400" : "text-green-400"}`}>
                        {spotsLeft} posti rimasti
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Events List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">
          {selectedType ? `Eventi: ${getEventType(selectedType)?.label}` : "Tutti gli Eventi"}
        </h3>
        <div className="space-y-3">
          {filteredEvents.map((event) => {
            const eventType = getEventType(event.type);
            const Icon = eventType?.icon || Calendar;
            const spotsLeft = event.maxGuests - event.registeredGuests;
            const occupancy = Math.round((event.registeredGuests / event.maxGuests) * 100);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-xl border transition-all ${
                  event.active ? "bg-card border-border" : "bg-muted/50 border-border opacity-60"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full md:w-32 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-foreground">{event.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${eventType?.color} text-white text-xs`}>
                            {eventType?.label}
                          </span>
                          {event.featured && (
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                      </div>
                      <span className="text-lg font-bold text-foreground">{event.price}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString("it-IT")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time} ({event.duration})
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.registeredGuests}/{event.maxGuests}
                      </span>
                    </div>

                    {/* Occupancy Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Occupazione</span>
                        <span className={occupancy > 90 ? "text-red-500" : "text-muted-foreground"}>
                          {occupancy}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            occupancy > 90 ? "bg-red-500" : occupancy > 70 ? "bg-amber-500" : "bg-green-500"
                          }`}
                          style={{ width: `${occupancy}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center gap-2">
                    <Switch
                      checked={event.active}
                      onCheckedChange={() => handleToggleActive(event.id)}
                    />
                    <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card border border-border rounded-2xl overflow-hidden"
            >
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedEvent.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedEvent.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">{selectedEvent.price}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString("it-IT")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{selectedEvent.registeredGuests}/{selectedEvent.maxGuests} prenotati</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Utensils className="w-4 h-4" />
                    <span>{selectedEvent.includesFood ? "Cena inclusa" : "Solo evento"}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Bell className="w-4 h-4 mr-2" />
                    Prenota Ora
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
