/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Allergens Filter Demo
 * Gestione filtri allergeni per sicurezza alimentare
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
  Filter,
  Check,
  X,
  AlertTriangle,
  Shield,
  Leaf,
  Wheat,
  Milk,
  Egg,
  Fish,
  Shell,
  Nut,
  Eye,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// 14 allergeni ufficiali EU
const allergens = [
  { id: "gluten", name: "Glutine", icon: Wheat, description: "Cereali contenenti glutine", color: "from-amber-500 to-orange-500" },
  { id: "dairy", name: "Lattosio", icon: Milk, description: "Latte e derivati", color: "from-blue-400 to-cyan-500" },
  { id: "eggs", name: "Uova", icon: Egg, description: "Uova e derivati", color: "from-yellow-400 to-amber-500" },
  { id: "fish", name: "Pesce", icon: Fish, description: "Pesce e derivati", color: "from-blue-500 to-indigo-600" },
  { id: "shellfish", name: "Crostacei", icon: Shell, description: "Crostacei e derivati", color: "from-orange-500 to-red-500" },
  { id: "nuts", name: "Frutta secca", icon: Nut, description: "Arachidi, noci, mandorle", color: "from-amber-600 to-yellow-700" },
  { id: "soy", name: "Soia", icon: Leaf, description: "Soia e derivati", color: "from-green-500 to-emerald-600" },
  { id: "sesame", name: "Sesamo", icon: Leaf, description: "Semi di sesamo", color: "from-yellow-600 to-amber-600" },
  { id: "celery", name: "Sedano", icon: Leaf, description: "Sedano e derivati", color: "from-green-400 to-lime-500" },
  { id: "mustard", name: "Senape", icon: Leaf, description: "Senape e derivati", color: "from-yellow-500 to-orange-400" },
  { id: "lupins", name: "Lupini", icon: Leaf, description: "Lupini e derivati", color: "from-amber-400 to-orange-500" },
  { id: "molluscs", name: "Molluschi", icon: Shell, description: "Molluschi e derivati", color: "from-slate-400 to-zinc-500" },
  { id: "sulphites", name: "Solfiti", icon: AlertTriangle, description: "Anidride solforosa > 10mg/kg", color: "from-red-400 to-pink-500" },
  { id: "peanuts", name: "Arachidi", icon: Nut, description: "Arachidi e derivati", color: "from-orange-400 to-amber-500" },
];

// Mock menu items con allergeni
const menuItems = [
  { id: 1, name: "Margherita", category: "Pizze", allergens: ["gluten", "dairy"], price: "€8.00" },
  { id: 2, name: "Carbonara", category: "Primi", allergens: ["gluten", "eggs", "dairy"], price: "€12.00" },
  { id: 3, name: "Insalata Caesar", category: "Insalate", allergens: ["gluten", "eggs", "fish", "dairy"], price: "€10.00" },
  { id: 4, name: "Tiramisù", category: "Dolci", allergens: ["gluten", "eggs", "dairy"], price: "€6.00" },
  { id: 5, name: "Bruschetta", category: "Antipasti", allergens: ["gluten"], price: "€5.00" },
  { id: 6, name: "Risotto ai Funghi", category: "Primi", allergens: ["dairy"], price: "€14.00" },
  { id: 7, name: "Salmone Grigliato", category: "Secondi", allergens: ["fish"], price: "€18.00" },
  { id: 8, name: "Panna Cotta", category: "Dolci", allergens: ["dairy"], price: "€5.00" },
  { id: 9, name: "Pasta al Pesto", category: "Primi", allergens: ["gluten", "nuts", "dairy"], price: "€11.00" },
  { id: 10, name: "Sorbetto Limone", category: "Dolci", allergens: [], price: "€4.00" },
];

export const AllergensContent = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [showOnlyCompatible, setShowOnlyCompatible] = useState(true);

  const toggleAllergen = (id: string) => {
    setSelectedAllergens(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const filteredItems = showOnlyCompatible && selectedAllergens.length > 0
    ? menuItems.filter(item => !item.allergens.some(a => selectedAllergens.includes(a)))
    : menuItems;

  const getItemAllergenStatus = (item: typeof menuItems[0]) => {
    if (selectedAllergens.length === 0) return "neutral";
    const hasConflict = item.allergens.some(a => selectedAllergens.includes(a));
    return hasConflict ? "danger" : "safe";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Filtri Allergeni</h2>
            <p className="text-muted-foreground">Sicurezza alimentare e conformità legale</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Mostra solo compatibili</span>
          <Switch
            checked={showOnlyCompatible}
            onCheckedChange={setShowOnlyCompatible}
          />
        </div>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-foreground">14 Allergeni EU Supportati</p>
          <p className="text-sm text-muted-foreground">
            Sistema conforme al Regolamento UE 1169/2011. I clienti possono filtrare il menu 
            in base alle loro intolleranze alimentari.
          </p>
        </div>
      </motion.div>

      {/* Allergen Grid */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Seleziona Allergeni da Escludere</h3>
          {selectedAllergens.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedAllergens([])}
            >
              Rimuovi tutti
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {allergens.map((allergen) => {
            const Icon = allergen.icon;
            const isSelected = selectedAllergens.includes(allergen.id);
            
            return (
              <motion.button
                key={allergen.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleAllergen(allergen.id)}
                className={`relative p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-muted/50 border-border hover:border-primary/30"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                    isSelected 
                      ? "bg-red-500/20" 
                      : `bg-gradient-to-br ${allergen.color} opacity-20`
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-red-500" : "text-foreground"}`} />
                  </div>
                  <span className={`text-xs font-medium ${isSelected ? "text-red-500" : "text-foreground"}`}>
                    {allergen.name}
                  </span>
                </div>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Filtered Results */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">
            Menu Filtrato
            {selectedAllergens.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({filteredItems.length} di {menuItems.length} piatti)
              </span>
            )}
          </h3>
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const status = getItemAllergenStatus(item);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-4 rounded-xl border transition-all ${
                    status === "safe" ? "bg-green-500/5 border-green-500/20" :
                    status === "danger" ? "bg-red-500/5 border-red-500/20" :
                    "bg-card border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="font-bold text-foreground">{item.price}</span>
                  </div>
                  
                  {/* Allergen Badges */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.allergens.length === 0 ? (
                      <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Senza allergeni
                      </span>
                    ) : (
                      item.allergens.map(a => {
                        const allergenInfo = allergens.find(al => al.id === a);
                        const isConflict = selectedAllergens.includes(a);
                        return (
                          <span 
                            key={a}
                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                              isConflict 
                                ? "bg-red-500/20 text-red-500" 
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isConflict && <AlertTriangle className="w-3 h-3" />}
                            {allergenInfo?.name}
                          </span>
                        );
                      })
                    )}
                  </div>

                  {status === "safe" && selectedAllergens.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-green-500/20">
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Sicuro per te
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto text-amber-500 mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">Nessun piatto compatibile</p>
            <p className="text-sm text-muted-foreground">
              Prova a rimuovere alcuni filtri per vedere più opzioni
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
