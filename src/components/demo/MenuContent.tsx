import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Eye, Edit, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  status: "active" | "paused";
  orders: number;
};

const initialMenuItems: MenuItem[] = [
  { id: 1, name: "Margherita", category: "Pizze", price: "€8.00", status: "active", orders: 127 },
  { id: 2, name: "Carbonara", category: "Primi", price: "€12.00", status: "active", orders: 89 },
  { id: 3, name: "Tiramisù", category: "Dolci", price: "€6.00", status: "active", orders: 56 },
  { id: 4, name: "Bruschetta", category: "Antipasti", price: "€5.00", status: "paused", orders: 34 },
  { id: 5, name: "Diavola", category: "Pizze", price: "€10.00", status: "active", orders: 98 },
];

const categories = ["Pizze", "Primi", "Secondi", "Antipasti", "Dolci", "Bevande"];

const getStatusColor = (status: string) => {
  return status === "active" 
    ? "bg-success/20 text-success" 
    : "bg-muted text-muted-foreground";
};

const getStatusLabel = (status: string) => {
  return status === "active" ? "Attivo" : "In pausa";
};

export const MenuContent = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "Pizze", price: "" });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      toast.error("Compila tutti i campi");
      return;
    }
    
    const item: MenuItem = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      price: newItem.price.startsWith("€") ? newItem.price : `€${newItem.price}`,
      status: "active",
      orders: 0,
    };
    
    setMenuItems([item, ...menuItems]);
    setNewItem({ name: "", category: "Pizze", price: "" });
    setIsAddingNew(false);
    toast.success(`"${item.name}" aggiunto al menu`);
  };

  const handleDeleteItem = (id: number) => {
    const item = menuItems.find(i => i.id === id);
    setMenuItems(menuItems.filter(i => i.id !== id));
    toast.success(`"${item?.name}" rimosso dal menu`);
  };

  const handleToggleStatus = (id: number) => {
    setMenuItems(menuItems.map(item => {
      if (item.id === id) {
        const newStatus = item.status === "active" ? "paused" : "active";
        toast.success(`"${item.name}" ${newStatus === "active" ? "attivato" : "messo in pausa"}`);
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    toast.success(`"${editingItem.name}" aggiornato`);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg text-muted-foreground">Gestisci i tuoi piatti</h2>
        </div>
        <Button 
          className="gradient-button gap-2"
          onClick={() => setIsAddingNew(true)}
        >
          <Plus className="w-4 h-4" />
          Nuovo piatto
        </Button>
      </div>

      {/* Add New Item Form */}
      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-2xl bg-card border border-primary/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">Nuovo piatto</h3>
                <button onClick={() => setIsAddingNew(false)} className="p-1 hover:bg-muted rounded-lg">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nome piatto"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="px-4 py-2 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="px-4 py-2 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Prezzo (es. 8.00)"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="px-4 py-2 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>Annulla</Button>
                <Button className="gradient-button" onClick={handleAddItem}>Aggiungi</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Table - Desktop */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Piatto</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Categoria</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Prezzo</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ordini</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stato</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Azioni</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {menuItems.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  layout
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-2xl">
                        {item.category === "Pizze" ? "🍕" : item.category === "Dolci" ? "🍰" : item.category === "Primi" ? "🍝" : "🍽️"}
                      </div>
                      {editingItem?.id === item.id ? (
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="px-2 py-1 bg-muted border border-primary rounded-lg text-sm focus:outline-none"
                        />
                      ) : (
                        <span className="font-medium text-foreground">{item.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{item.category}</td>
                  <td className="p-4">
                    {editingItem?.id === item.id ? (
                      <input
                        type="text"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                        className="w-20 px-2 py-1 bg-muted border border-primary rounded-lg text-sm focus:outline-none"
                      />
                    ) : (
                      <span className="font-medium text-foreground">{item.price}</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">{item.orders}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`text-xs px-2.5 py-1 rounded-full transition-all hover:scale-105 ${getStatusColor(item.status)}`}
                    >
                      {getStatusLabel(item.status)}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {editingItem?.id === item.id ? (
                        <>
                          <button 
                            onClick={handleSaveEdit}
                            className="p-2 rounded-lg hover:bg-success/20 transition-colors"
                          >
                            <Check className="w-4 h-4 text-success" />
                          </button>
                          <button 
                            onClick={() => setEditingItem(null)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button 
                            onClick={() => setEditingItem(item)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Menu Cards - Mobile */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              layout
              className="p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.category === "Pizze" ? "🍕" : item.category === "Dolci" ? "🍰" : item.category === "Primi" ? "🍝" : "🍽️"}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleStatus(item.id)}
                  className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}
                >
                  {getStatusLabel(item.status)}
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-foreground">{item.price}</span>
                  <span className="text-sm text-muted-foreground">{item.orders} ordini</span>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setEditingItem(item)}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button 
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
