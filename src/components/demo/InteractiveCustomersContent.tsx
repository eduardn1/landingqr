import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Search, Mail, Phone, Calendar, ShoppingBag, Star, TrendingUp,
  Filter, Download, Plus, Heart, MessageSquare, Gift, X, Check, Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type LoyaltyTier = "Bronze" | "Silver" | "Gold" | "Platinum";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  loyalty: LoyaltyTier;
  rating: number;
  notes: string;
  points: number;
};

const initialCustomers: Customer[] = [
  { id: 1, name: "Marco Rossi", email: "marco.rossi@email.it", phone: "+39 333 1234567", orders: 47, totalSpent: "€892.50", lastOrder: "2 giorni fa", loyalty: "Gold", rating: 4.8, notes: "Preferisce pizza senza glutine", points: 450 },
  { id: 2, name: "Giulia Bianchi", email: "giulia.b@email.it", phone: "+39 338 9876543", orders: 23, totalSpent: "€456.00", lastOrder: "1 settimana fa", loyalty: "Silver", rating: 4.5, notes: "Allergica ai crostacei", points: 220 },
  { id: 3, name: "Alessandro Verdi", email: "a.verdi@email.it", phone: "+39 340 5551234", orders: 89, totalSpent: "€1,567.00", lastOrder: "Oggi", loyalty: "Platinum", rating: 5.0, notes: "Cliente VIP - Sempre tavolo 5", points: 890 },
  { id: 4, name: "Francesca Neri", email: "f.neri@gmail.com", phone: "+39 349 8887766", orders: 12, totalSpent: "€234.00", lastOrder: "3 settimane fa", loyalty: "Bronze", rating: 4.2, notes: "", points: 80 },
  { id: 5, name: "Roberto Costa", email: "roberto.costa@email.it", phone: "+39 366 1122334", orders: 56, totalSpent: "€945.50", lastOrder: "5 giorni fa", loyalty: "Gold", rating: 4.9, notes: "Ordina sempre il tiramisù extra", points: 520 },
];

const getLoyaltyColor = (loyalty: string) => {
  switch (loyalty) {
    case "Platinum": return "bg-violet-500/20 text-violet-500 border-violet-500/30";
    case "Gold": return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
    case "Silver": return "bg-gray-400/20 text-gray-500 border-gray-400/30";
    case "Bronze": return "bg-orange-700/20 text-orange-700 border-orange-700/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const getNextTier = (points: number): { tier: LoyaltyTier; pointsNeeded: number } => {
  if (points >= 800) return { tier: "Platinum", pointsNeeded: 0 };
  if (points >= 400) return { tier: "Gold", pointsNeeded: 800 - points };
  if (points >= 200) return { tier: "Silver", pointsNeeded: 400 - points };
  return { tier: "Bronze", pointsNeeded: 200 - points };
};

const calculateTier = (points: number): LoyaltyTier => {
  if (points >= 800) return "Platinum";
  if (points >= 400) return "Gold";
  if (points >= 200) return "Silver";
  return "Bronze";
};

export const InteractiveCustomersContent = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingPoints, setIsAddingPoints] = useState(false);
  const [pointsToAdd, setPointsToAdd] = useState(10);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState("");

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPoints = () => {
    if (!selectedCustomer) return;
    
    const newPoints = selectedCustomer.points + pointsToAdd;
    const newTier = calculateTier(newPoints);
    const tierChanged = newTier !== selectedCustomer.loyalty;
    
    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return { ...c, points: newPoints, loyalty: newTier };
      }
      return c;
    }));
    
    setSelectedCustomer({ ...selectedCustomer, points: newPoints, loyalty: newTier });
    setIsAddingPoints(false);
    setPointsToAdd(10);
    
    if (tierChanged) {
      toast.success(`${selectedCustomer.name} è salito a ${newTier}! 🎉`);
    } else {
      toast.success(`+${pointsToAdd} punti aggiunti a ${selectedCustomer.name}`);
    }
  };

  const handleSaveNotes = () => {
    if (!selectedCustomer) return;
    
    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return { ...c, notes: editedNotes };
      }
      return c;
    }));
    
    setSelectedCustomer({ ...selectedCustomer, notes: editedNotes });
    setIsEditingNotes(false);
    toast.success("Note aggiornate");
  };

  const handleSendMessage = () => {
    if (!selectedCustomer) return;
    toast.success(`Messaggio inviato a ${selectedCustomer.name}`);
  };

  const handleSendOffer = () => {
    if (!selectedCustomer) return;
    toast.success(`Offerta speciale inviata a ${selectedCustomer.name} 🎁`);
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.lastOrder.includes("oggi") || c.lastOrder.includes("giorni")).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Clienti totali", value: totalCustomers.toString(), icon: Users, color: "from-blue-500 to-cyan-500", change: "+12%" },
          { label: "Clienti attivi", value: activeCustomers.toString(), icon: Heart, color: "from-pink-500 to-rose-500", change: "+8%" },
          { label: "Tasso fidelizzazione", value: "78%", icon: TrendingUp, color: "from-emerald-500 to-teal-600", change: "+5%" },
          { label: "Valore medio", value: "€42.50", icon: ShoppingBag, color: "from-violet-500 to-purple-600", change: "+15%" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold text-foreground truncate">{stat.value}</p>
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtra</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Esporta</span>
          </Button>
          <Button size="sm" className="gradient-button gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuovo</span>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customers List */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {filteredCustomers.map((customer) => (
              <motion.div
                key={customer.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => {
                  setSelectedCustomer(customer);
                  setEditedNotes(customer.notes);
                  setIsEditingNotes(false);
                  setIsAddingPoints(false);
                }}
                className={`p-4 rounded-xl bg-card border transition-all cursor-pointer ${
                  selectedCustomer?.id === customer.id 
                    ? "border-primary shadow-lg shadow-primary/10" 
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-foreground truncate">{customer.name}</p>
                        <motion.span 
                          key={customer.loyalty}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className={`text-xs px-2 py-0.5 rounded-full border ${getLoyaltyColor(customer.loyalty)}`}
                        >
                          {customer.loyalty}
                        </motion.span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 hidden sm:block">
                    <p className="font-bold text-foreground">{customer.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">{customer.orders} ordini</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border sm:hidden">
                  <span className="text-sm text-muted-foreground">{customer.orders} ordini</span>
                  <span className="font-bold text-foreground">{customer.totalSpent}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Customer Detail */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedCustomer ? (
              <motion.div
                key={selectedCustomer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{selectedCustomer.name}</h3>
                    <motion.span 
                      key={selectedCustomer.loyalty}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`inline-block text-xs px-3 py-1 rounded-full border mt-2 ${getLoyaltyColor(selectedCustomer.loyalty)}`}
                    >
                      {selectedCustomer.loyalty} Member
                    </motion.span>
                  </div>

                  {/* Points Section */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Punti fedeltà</span>
                      <motion.span 
                        key={selectedCustomer.points}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-primary"
                      >
                        {selectedCustomer.points}
                      </motion.span>
                    </div>
                    
                    {getNextTier(selectedCustomer.points).pointsNeeded > 0 && (
                      <p className="text-xs text-muted-foreground mb-3">
                        {getNextTier(selectedCustomer.points).pointsNeeded} punti per {getNextTier(selectedCustomer.points).tier}
                      </p>
                    )}
                    
                    <AnimatePresence>
                      {isAddingPoints ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="number"
                            min={1}
                            value={pointsToAdd}
                            onChange={(e) => setPointsToAdd(parseInt(e.target.value) || 1)}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                          />
                          <Button size="sm" onClick={handleAddPoints}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setIsAddingPoints(false)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setIsAddingPoints(true)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Aggiungi punti
                        </Button>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground truncate">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">Ultimo ordine: {selectedCustomer.lastOrder}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm text-foreground">Rating: {selectedCustomer.rating}/5</span>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mt-4 p-3 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-warning">Note</p>
                      <button 
                        onClick={() => {
                          setIsEditingNotes(!isEditingNotes);
                          setEditedNotes(selectedCustomer.notes);
                        }}
                        className="p-1 hover:bg-warning/20 rounded"
                      >
                        <Edit className="w-3 h-3 text-warning" />
                      </button>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {isEditingNotes ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <textarea
                            value={editedNotes}
                            onChange={(e) => setEditedNotes(e.target.value)}
                            className="w-full p-2 bg-background border border-border rounded-lg text-sm resize-none"
                            rows={2}
                            placeholder="Aggiungi note..."
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <Button size="sm" variant="ghost" onClick={() => setIsEditingNotes(false)}>
                              Annulla
                            </Button>
                            <Button size="sm" onClick={handleSaveNotes}>
                              Salva
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <p className="text-sm text-foreground">
                          {selectedCustomer.notes || "Nessuna nota"}
                        </p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <Button variant="outline" size="sm" className="gap-1" onClick={handleSendMessage}>
                      <MessageSquare className="w-4 h-4" />
                      Messaggio
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={handleSendOffer}>
                      <Gift className="w-4 h-4" />
                      Offerta
                    </Button>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h4 className="font-bold text-foreground mb-4">Statistiche</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Ordini totali</span>
                      <span className="font-bold text-foreground">{selectedCustomer.orders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Spesa totale</span>
                      <span className="font-bold text-foreground">{selectedCustomer.totalSpent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Media ordine</span>
                      <span className="font-bold text-foreground">
                        €{(parseFloat(selectedCustomer.totalSpent.replace('€', '').replace(',', '')) / selectedCustomer.orders).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-8 rounded-2xl bg-card border border-border text-center">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Seleziona un cliente per vedere i dettagli</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
