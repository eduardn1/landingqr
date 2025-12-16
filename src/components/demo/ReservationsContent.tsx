import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Plus, X, Check, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ReservationStatus = "pending" | "confirmed" | "cancelled";

type Reservation = {
  id: number;
  name: string;
  guests: number;
  date: string;
  time: string;
  table: string;
  status: ReservationStatus;
  phone?: string;
};

const initialReservations: Reservation[] = [
  { id: 1, name: "Famiglia Rossi", guests: 4, date: "Oggi", time: "20:00", table: "T5", status: "confirmed", phone: "+39 333 1234567" },
  { id: 2, name: "Marco Bianchi", guests: 2, date: "Oggi", time: "20:30", table: "T2", status: "pending", phone: "+39 338 9876543" },
  { id: 3, name: "Evento Aziendale", guests: 12, date: "Domani", time: "13:00", table: "Sala privata", status: "confirmed" },
  { id: 4, name: "Anna Verdi", guests: 3, date: "Domani", time: "21:00", table: "T8", status: "confirmed", phone: "+39 340 5551234" },
  { id: 5, name: "Luigi Neri", guests: 2, date: "Oggi", time: "19:30", table: "T3", status: "pending", phone: "+39 349 8887766" },
];

const tables = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "Sala privata"];
const timeSlots = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-success/20 text-success";
    case "pending": return "bg-warning/20 text-warning";
    case "cancelled": return "bg-destructive/20 text-destructive";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "confirmed": return "Confermato";
    case "pending": return "In attesa";
    case "cancelled": return "Cancellato";
    default: return status;
  }
};

export const ReservationsContent = () => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [activeTab, setActiveTab] = useState("Oggi");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newReservation, setNewReservation] = useState({
    name: "",
    guests: 2,
    date: "Oggi",
    time: "20:00",
    table: "T1",
    phone: "",
  });

  const tabs = ["Oggi", "Domani", "Questa settimana"];

  const handleAddReservation = () => {
    if (!newReservation.name) {
      toast.error("Inserisci il nome del cliente");
      return;
    }

    const reservation: Reservation = {
      id: Date.now(),
      name: newReservation.name,
      guests: newReservation.guests,
      date: newReservation.date,
      time: newReservation.time,
      table: newReservation.table,
      status: "pending",
      phone: newReservation.phone || undefined,
    };

    setReservations([reservation, ...reservations]);
    setNewReservation({ name: "", guests: 2, date: "Oggi", time: "20:00", table: "T1", phone: "" });
    setIsAddingNew(false);
    toast.success(`Prenotazione per "${reservation.name}" creata`);
  };

  const handleConfirm = (id: number) => {
    setReservations(reservations.map(res => {
      if (res.id === id) {
        toast.success(`Prenotazione di "${res.name}" confermata`);
        return { ...res, status: "confirmed" as ReservationStatus };
      }
      return res;
    }));
  };

  const handleCancel = (id: number) => {
    setReservations(reservations.map(res => {
      if (res.id === id) {
        toast.success(`Prenotazione di "${res.name}" cancellata`);
        return { ...res, status: "cancelled" as ReservationStatus };
      }
      return res;
    }));
  };

  const handleDelete = (id: number) => {
    const res = reservations.find(r => r.id === id);
    setReservations(reservations.filter(r => r.id !== id));
    toast.success(`Prenotazione di "${res?.name}" eliminata`);
  };

  const filteredReservations = reservations.filter(res => {
    if (activeTab === "Questa settimana") return true;
    return res.date === activeTab;
  }).filter(res => res.status !== "cancelled");

  const pendingCount = reservations.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {pendingCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-sm font-medium">
              {pendingCount} in attesa
            </span>
          )}
          <Button 
            className="gradient-button gap-2"
            onClick={() => setIsAddingNew(true)}
          >
            <Plus className="w-4 h-4" />
            Nuova prenotazione
          </Button>
        </div>
      </div>

      {/* Add New Form */}
      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-2xl bg-card border border-primary/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">Nuova prenotazione</h3>
                <button onClick={() => setIsAddingNew(false)} className="p-1 hover:bg-muted rounded-lg">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nome cliente"
                  value={newReservation.name}
                  onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })}
                  className="px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
                <input
                  type="tel"
                  placeholder="Telefono (opzionale)"
                  value={newReservation.phone}
                  onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                  className="px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground">Ospiti:</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={newReservation.guests}
                    onChange={(e) => setNewReservation({ ...newReservation, guests: parseInt(e.target.value) || 1 })}
                    className="w-20 px-3 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <select
                  value={newReservation.date}
                  onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                  className="px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Oggi">Oggi</option>
                  <option value="Domani">Domani</option>
                </select>
                <select
                  value={newReservation.time}
                  onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
                  className="px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <select
                  value={newReservation.table}
                  onChange={(e) => setNewReservation({ ...newReservation, table: e.target.value })}
                  className="px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  {tables.map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>Annulla</Button>
                <Button className="gradient-button" onClick={handleAddReservation}>Crea prenotazione</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservations List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredReservations.map((res) => (
            <motion.div
              key={res.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`p-5 rounded-2xl bg-card border transition-all ${
                res.status === "pending" 
                  ? "border-warning/50 shadow-lg shadow-warning/10" 
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{res.name}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {res.guests} ospiti
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {res.table}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {res.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{res.time}</p>
                    <p className="text-sm text-muted-foreground">{res.date}</p>
                  </div>
                  
                  <motion.span 
                    key={res.status}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`text-xs px-3 py-1.5 rounded-full ${getStatusColor(res.status)}`}
                  >
                    {getStatusLabel(res.status)}
                  </motion.span>
                  
                  <div className="flex gap-2">
                    {res.status === "pending" && (
                      <Button 
                        size="sm" 
                        className="gradient-button gap-1"
                        onClick={() => handleConfirm(res.id)}
                      >
                        <Check className="w-4 h-4" />
                        Conferma
                      </Button>
                    )}
                    {res.status !== "cancelled" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancel(res.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(res.id)}
                      className="hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nessuna prenotazione per {activeTab.toLowerCase()}</p>
        </div>
      )}
    </div>
  );
};
