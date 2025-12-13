import { motion } from "framer-motion";
import { Truck, MapPin, Clock, Phone, User, Package, Navigation, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock driver data
const mockDrivers = [
  { 
    id: 1, 
    name: "Marco Verdi", 
    status: "delivering", 
    orders: 2, 
    currentOrder: "#1245",
    eta: "12 min",
    location: { lat: 41.9028, lng: 12.4964 },
    phone: "+39 333 1234567"
  },
  { 
    id: 2, 
    name: "Luca Rossi", 
    status: "available", 
    orders: 0, 
    currentOrder: null,
    eta: null,
    location: { lat: 41.9109, lng: 12.4818 },
    phone: "+39 333 7654321"
  },
  { 
    id: 3, 
    name: "Anna Bianchi", 
    status: "delivering", 
    orders: 1, 
    currentOrder: "#1247",
    eta: "5 min",
    location: { lat: 41.8986, lng: 12.5092 },
    phone: "+39 333 9876543"
  },
  { 
    id: 4, 
    name: "Giuseppe Neri", 
    status: "returning", 
    orders: 0, 
    currentOrder: null,
    eta: "8 min al rientro",
    location: { lat: 41.9150, lng: 12.4650 },
    phone: "+39 333 4567890"
  },
];

// Mock pending deliveries
const pendingDeliveries = [
  { id: "#1248", address: "Via Roma 45, Roma", customer: "Paolo M.", items: 3, total: "€42.00", time: "Ora" },
  { id: "#1249", address: "Via Veneto 12, Roma", customer: "Sara L.", items: 2, total: "€28.50", time: "5 min" },
];

const getDriverStatusColor = (status: string) => {
  switch (status) {
    case "available": return "bg-success text-success-foreground";
    case "delivering": return "bg-warning text-warning-foreground";
    case "returning": return "bg-primary/20 text-primary";
    default: return "bg-muted text-muted-foreground";
  }
};

const getDriverStatusLabel = (status: string) => {
  switch (status) {
    case "available": return "Disponibile";
    case "delivering": return "In consegna";
    case "returning": return "In rientro";
    default: return status;
  }
};

export const DeliveryContent = () => (
  <div className="space-y-6">
    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: "Driver attivi", value: "4", icon: User, color: "from-blue-500 to-cyan-500" },
        { label: "In consegna", value: "3", icon: Truck, color: "from-warning to-orange-500" },
        { label: "Consegne oggi", value: "47", icon: Package, color: "from-emerald-500 to-teal-600" },
        { label: "Tempo medio", value: "18 min", icon: Clock, color: "from-violet-500 to-purple-600" },
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
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map Placeholder */}
      <div className="lg:col-span-2 rounded-2xl bg-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Mappa in tempo reale
          </h3>
          <span className="text-xs text-muted-foreground">Aggiornato: ora</span>
        </div>
        <div className="relative h-[400px] bg-gradient-to-br from-muted/50 to-muted">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Restaurant Marker */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45" />
            </div>
          </motion.div>

          {/* Driver Markers */}
          {mockDrivers.map((driver, i) => {
            const positions = [
              { left: "30%", top: "35%" },
              { left: "65%", top: "25%" },
              { left: "55%", top: "65%" },
              { left: "25%", top: "70%" },
            ];
            const pos = positions[i];
            return (
              <motion.div
                key={driver.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ left: pos.left, top: pos.top }}
                className="absolute group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  driver.status === "available" ? "bg-success" : driver.status === "delivering" ? "bg-warning" : "bg-primary"
                }`}>
                  <Truck className="w-5 h-5 text-white" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-card border border-border rounded-lg shadow-xl p-3 whitespace-nowrap">
                    <p className="font-medium text-foreground text-sm">{driver.name}</p>
                    <p className="text-xs text-muted-foreground">{getDriverStatusLabel(driver.status)}</p>
                    {driver.eta && <p className="text-xs text-primary mt-1">ETA: {driver.eta}</p>}
                  </div>
                </div>
                {/* Pulse animation for delivering drivers */}
                {driver.status === "delivering" && (
                  <div className="absolute inset-0 rounded-full bg-warning animate-ping opacity-30" />
                )}
              </motion.div>
            );
          })}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-3">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Disponibile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">In consegna</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Ristorante</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Driver ({mockDrivers.length})
          </h3>
          <div className="space-y-3">
            {mockDrivers.map((driver) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-foreground text-sm">{driver.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDriverStatusColor(driver.status)}`}>
                    {getDriverStatusLabel(driver.status)}
                  </span>
                </div>
                {driver.currentOrder && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Ordine: {driver.currentOrder}</span>
                    <span className="text-primary font-medium">ETA: {driver.eta}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Chiama
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    Traccia
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pending Deliveries */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-warning" />
            Da assegnare ({pendingDeliveries.length})
          </h3>
          <div className="space-y-3">
            {pendingDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-3 rounded-xl bg-warning/10 border border-warning/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground">{delivery.id}</span>
                  <span className="text-warning text-xs font-medium">{delivery.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{delivery.address}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{delivery.customer} • {delivery.items} piatti</span>
                  <Button size="sm" className="h-7 text-xs gradient-button">
                    Assegna
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
