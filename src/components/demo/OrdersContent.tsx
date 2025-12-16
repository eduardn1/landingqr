import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Truck, ShoppingBag, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type OrderStatus = "new" | "preparing" | "ready" | "delivered";

type Order = {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: OrderStatus;
  time: string;
  type: "delivery" | "takeaway";
};

const initialOrders: Order[] = [
  { id: "#1247", customer: "Marco R.", items: 3, total: "€32.50", status: "new", time: "2 min fa", type: "delivery" },
  { id: "#1246", customer: "Giulia B.", items: 2, total: "€18.00", status: "preparing", time: "12 min fa", type: "takeaway" },
  { id: "#1245", customer: "Alessandro C.", items: 5, total: "€67.00", status: "ready", time: "25 min fa", type: "delivery" },
  { id: "#1244", customer: "Francesca M.", items: 1, total: "€12.00", status: "delivered", time: "45 min fa", type: "takeaway" },
  { id: "#1243", customer: "Roberto V.", items: 4, total: "€45.00", status: "new", time: "5 min fa", type: "delivery" },
  { id: "#1242", customer: "Sara L.", items: 2, total: "€28.00", status: "preparing", time: "18 min fa", type: "takeaway" },
];

const statusFlow: OrderStatus[] = ["new", "preparing", "ready", "delivered"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "new": return "bg-success text-success-foreground";
    case "preparing": return "bg-warning text-warning-foreground";
    case "ready": return "bg-primary text-primary-foreground";
    case "delivered": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "new": return "Nuovo";
    case "preparing": return "In preparazione";
    case "ready": return "Pronto";
    case "delivered": return "Consegnato";
    default: return status;
  }
};

const getNextStatus = (status: OrderStatus): OrderStatus | null => {
  const currentIndex = statusFlow.indexOf(status);
  if (currentIndex < statusFlow.length - 1) {
    return statusFlow[currentIndex + 1];
  }
  return null;
};

const getNextStatusLabel = (status: OrderStatus): string => {
  const next = getNextStatus(status);
  if (!next) return "";
  switch (next) {
    case "preparing": return "Inizia preparazione";
    case "ready": return "Segna pronto";
    case "delivered": return "Consegnato";
    default: return "";
  }
};

export const OrdersContent = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeFilter, setActiveFilter] = useState<string>("Tutti");

  const filters = ["Tutti", "Nuovi", "In preparazione", "Pronti", "Consegnati"];

  const handleAdvanceStatus = (orderId: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const nextStatus = getNextStatus(order.status);
        if (nextStatus) {
          toast.success(`Ordine ${orderId} → ${getStatusLabel(nextStatus)}`);
          return { ...order, status: nextStatus };
        }
      }
      return order;
    }));
  };

  const filteredOrders = orders.filter(order => {
    switch (activeFilter) {
      case "Nuovi": return order.status === "new";
      case "In preparazione": return order.status === "preparing";
      case "Pronti": return order.status === "ready";
      case "Consegnati": return order.status === "delivered";
      default: return true;
    }
  });

  const orderCounts = {
    new: orders.filter(o => o.status === "new").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    ready: orders.filter(o => o.status === "ready").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const count = filter === "Nuovi" ? orderCounts.new 
            : filter === "In preparazione" ? orderCounts.preparing
            : filter === "Pronti" ? orderCounts.ready
            : filter === "Consegnati" ? orderCounts.delivered
            : orders.length;
          
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {filter}
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-background/20 text-xs">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-2xl bg-card border transition-all ${
                order.status === "new" 
                  ? "border-success/50 shadow-lg shadow-success/10" 
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-lg font-bold text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <motion.span 
                  key={order.status}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}
                >
                  {getStatusLabel(order.status)}
                </motion.span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {order.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {order.type === "delivery" ? <Truck className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {order.type === "delivery" ? "Delivery" : "Asporto"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {order.items} {order.items === 1 ? "piatto" : "piatti"}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xl font-bold text-foreground">{order.total}</span>
                {order.status !== "delivered" ? (
                  <Button 
                    size="sm" 
                    className="gradient-button gap-1"
                    onClick={() => handleAdvanceStatus(order.id)}
                  >
                    {getNextStatusLabel(order.status)}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Check className="w-4 h-4" />
                    Completato
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nessun ordine trovato</p>
        </div>
      )}
    </div>
  );
};
