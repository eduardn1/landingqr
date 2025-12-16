import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Plus,
  Tag,
  Percent,
  Calendar,
  Users,
  Copy,
  Trash2,
  Edit,
  Check,
  Clock,
  TrendingUp,
  Zap,
  Crown,
  Heart,
  Star,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

// Mock promo codes
const initialPromoCodes = [
  {
    id: 1,
    code: "BENVENUTO20",
    type: "percentage",
    value: 20,
    description: "Sconto 20% primo ordine",
    minOrder: 25,
    maxUses: 100,
    usedCount: 47,
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    active: true,
    category: "first_order"
  },
  {
    id: 2,
    code: "ESTATE10",
    type: "percentage",
    value: 10,
    description: "Promozione estiva",
    minOrder: 0,
    maxUses: 500,
    usedCount: 234,
    validFrom: "2024-06-01",
    validTo: "2024-08-31",
    active: true,
    category: "seasonal"
  },
  {
    id: 3,
    code: "PIZZA5",
    type: "fixed",
    value: 5,
    description: "€5 su qualsiasi pizza",
    minOrder: 15,
    maxUses: null,
    usedCount: 89,
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    active: true,
    category: "product"
  },
  {
    id: 4,
    code: "AMICO15",
    type: "percentage",
    value: 15,
    description: "Porta un amico - 15% entrambi",
    minOrder: 30,
    maxUses: null,
    usedCount: 156,
    validFrom: "2024-01-01",
    validTo: null,
    active: true,
    category: "referral"
  },
  {
    id: 5,
    code: "VIP25",
    type: "percentage",
    value: 25,
    description: "Sconto VIP clienti fedeli",
    minOrder: 50,
    maxUses: 50,
    usedCount: 50,
    validFrom: "2024-01-01",
    validTo: "2024-03-31",
    active: false,
    category: "loyalty"
  },
];

const promoCategories = [
  { id: "all", label: "Tutti", icon: Tag },
  { id: "first_order", label: "Primo Ordine", icon: Star },
  { id: "seasonal", label: "Stagionali", icon: Calendar },
  { id: "referral", label: "Referral", icon: Users },
  { id: "loyalty", label: "Loyalty", icon: Crown },
];

const promoStats = [
  { label: "Codici Attivi", value: "4", icon: Tag, color: "from-emerald-500/60 to-teal-600/60" },
  { label: "Utilizzi Totali", value: "576", icon: TrendingUp, color: "from-sky-500/60 to-blue-600/60" },
  { label: "Risparmio Clienti", value: "€2,340", icon: Heart, color: "from-rose-500/60 to-pink-600/60" },
  { label: "Tasso Conversione", value: "23%", icon: Zap, color: "from-amber-500/60 to-orange-600/60" },
];

export const PromoContent = () => {
  const [promoCodes, setPromoCodes] = useState(initialPromoCodes);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newPromo, setNewPromo] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 10,
    description: "",
    minOrder: 0,
  });

  const filteredCodes = activeCategory === "all" 
    ? promoCodes 
    : promoCodes.filter(p => p.category === activeCategory);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleActive = (id: number) => {
    setPromoCodes(prev => prev.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const handleDeletePromo = (id: number) => {
    setPromoCodes(prev => prev.filter(p => p.id !== id));
  };

  const handleAddPromo = () => {
    if (!newPromo.code || !newPromo.description) return;
    
    const newId = Math.max(...promoCodes.map(p => p.id)) + 1;
    setPromoCodes(prev => [...prev, {
      ...newPromo,
      id: newId,
      maxUses: null,
      usedCount: 0,
      validFrom: new Date().toISOString().split('T')[0],
      validTo: null,
      active: true,
      category: "seasonal"
    }]);
    setNewPromo({ code: "", type: "percentage", value: 10, description: "", minOrder: 0 });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {promoStats.map((stat, i) => {
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
          <h2 className="text-2xl font-bold text-foreground">Codici Promo</h2>
          <p className="text-muted-foreground">Gestisci sconti e promozioni</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuovo Codice
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {promoCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Promo Codes List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredCodes.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              className={`p-5 rounded-2xl border transition-all ${
                promo.active 
                  ? "bg-card border-border hover:border-primary/30" 
                  : "bg-muted/50 border-border opacity-60"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Code & Type */}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    promo.type === "percentage" 
                      ? "bg-gradient-to-br from-emerald-500/60 to-teal-600/60" 
                      : "bg-gradient-to-br from-sky-500/60 to-blue-600/60"
                  }`}>
                    {promo.type === "percentage" ? (
                      <Percent className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold">€</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="px-3 py-1 rounded-lg bg-muted font-mono text-sm text-foreground">
                        {promo.code}
                      </code>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        {copiedCode === promo.code ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      {!promo.active && (
                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                          Disattivato
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{promo.description}</p>
                  </div>
                </div>

                {/* Value & Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {promo.type === "percentage" ? `${promo.value}%` : `€${promo.value}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Sconto</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{promo.usedCount}</p>
                    <p className="text-xs text-muted-foreground">
                      {promo.maxUses ? `/ ${promo.maxUses}` : "utilizzi"}
                    </p>
                  </div>

                  {promo.minOrder > 0 && (
                    <div className="text-center hidden sm:block">
                      <p className="text-sm font-medium text-foreground">€{promo.minOrder}+</p>
                      <p className="text-xs text-muted-foreground">min</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={promo.active}
                      onCheckedChange={() => handleToggleActive(promo.id)}
                    />
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button 
                      onClick={() => handleDeletePromo(promo.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress bar for limited codes */}
              {promo.maxUses && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Utilizzi</span>
                    <span>{Math.round((promo.usedCount / promo.maxUses) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        promo.usedCount >= promo.maxUses 
                          ? "bg-destructive" 
                          : "bg-gradient-to-r from-primary to-accent"
                      }`}
                      style={{ width: `${Math.min((promo.usedCount / promo.maxUses) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Promo Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-xl"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">Nuovo Codice Promo</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Codice</label>
                  <Input
                    value={newPromo.code}
                    onChange={(e) => setNewPromo(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    placeholder="ES. ESTATE20"
                    className="font-mono"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Descrizione</label>
                  <Input
                    value={newPromo.description}
                    onChange={(e) => setNewPromo(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrizione dello sconto"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Tipo</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setNewPromo(prev => ({ ...prev, type: "percentage" }))}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          newPromo.type === "percentage"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        %
                      </button>
                      <button
                        onClick={() => setNewPromo(prev => ({ ...prev, type: "fixed" }))}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          newPromo.type === "fixed"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        €
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Valore</label>
                    <Input
                      type="number"
                      value={newPromo.value}
                      onChange={(e) => setNewPromo(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Ordine minimo (€)</label>
                  <Input
                    type="number"
                    value={newPromo.minOrder}
                    onChange={(e) => setNewPromo(prev => ({ ...prev, minOrder: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Annulla
                </Button>
                <Button className="flex-1" onClick={handleAddPromo}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crea Codice
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
