import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Calendar, 
  Truck, 
  Users, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  Plus,
  MoreVertical,
  Check,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  ArrowLeft,
  QrCode,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { OnboardingTutorial } from "@/components/demo/OnboardingTutorial";
import { DeliveryContent } from "@/components/demo/DeliveryContent";
import { AnalyticsContent } from "@/components/demo/AnalyticsContent";
import { SettingsContent } from "@/components/demo/SettingsContent";
import { CustomersContent } from "@/components/demo/CustomersContent";

// Sidebar navigation items
const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: UtensilsCrossed, label: "Menu", id: "menu" },
  { icon: ShoppingBag, label: "Ordini", id: "orders" },
  { icon: Calendar, label: "Prenotazioni", id: "reservations" },
  { icon: Truck, label: "Delivery", id: "delivery" },
  { icon: Users, label: "Clienti", id: "customers" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Impostazioni", id: "settings" },
];

// Mock data for orders
const mockOrders = [
  { id: "#1247", customer: "Marco R.", items: 3, total: "€32.50", status: "new", time: "2 min fa", type: "delivery" },
  { id: "#1246", customer: "Giulia B.", items: 2, total: "€18.00", status: "preparing", time: "12 min fa", type: "takeaway" },
  { id: "#1245", customer: "Alessandro C.", items: 5, total: "€67.00", status: "ready", time: "25 min fa", type: "delivery" },
  { id: "#1244", customer: "Francesca M.", items: 1, total: "€12.00", status: "delivered", time: "45 min fa", type: "takeaway" },
];

// Mock data for menu items
const mockMenuItems = [
  { id: 1, name: "Margherita", category: "Pizze", price: "€8.00", status: "active", orders: 127 },
  { id: 2, name: "Carbonara", category: "Primi", price: "€12.00", status: "active", orders: 89 },
  { id: 3, name: "Tiramisù", category: "Dolci", price: "€6.00", status: "active", orders: 56 },
  { id: 4, name: "Bruschetta", category: "Antipasti", price: "€5.00", status: "paused", orders: 34 },
  { id: 5, name: "Diavola", category: "Pizze", price: "€10.00", status: "active", orders: 98 },
];

// Mock data for reservations
const mockReservations = [
  { id: 1, name: "Famiglia Rossi", guests: 4, date: "Oggi", time: "20:00", table: "T5", status: "confirmed" },
  { id: 2, name: "Marco Bianchi", guests: 2, date: "Oggi", time: "20:30", table: "T2", status: "pending" },
  { id: 3, name: "Evento Aziendale", guests: 12, date: "Domani", time: "13:00", table: "Sala privata", status: "confirmed" },
  { id: 4, name: "Anna Verdi", guests: 3, date: "Domani", time: "21:00", table: "T8", status: "confirmed" },
];

// Mock stats
const stats = [
  { label: "Ordini oggi", value: "47", change: "+12%", icon: ShoppingBag, color: "from-violet-500 to-purple-600" },
  { label: "Fatturato", value: "€1,234", change: "+8%", icon: TrendingUp, color: "from-emerald-500 to-teal-600" },
  { label: "Prenotazioni", value: "18", change: "+5%", icon: Calendar, color: "from-blue-500 to-cyan-500" },
  { label: "Clienti attivi", value: "234", change: "+15%", icon: Users, color: "from-orange-500 to-red-500" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "new": return "bg-success text-success-foreground";
    case "preparing": return "bg-warning text-warning-foreground";
    case "ready": return "bg-primary text-primary-foreground";
    case "delivered": return "bg-muted text-muted-foreground";
    case "confirmed": return "bg-success/20 text-success";
    case "pending": return "bg-warning/20 text-warning";
    case "active": return "bg-success/20 text-success";
    case "paused": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "new": return "Nuovo";
    case "preparing": return "In preparazione";
    case "ready": return "Pronto";
    case "delivered": return "Consegnato";
    case "confirmed": return "Confermato";
    case "pending": return "In attesa";
    case "active": return "Attivo";
    case "paused": return "In pausa";
    default: return status;
  }
};

const Demo = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if first visit
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("demo-onboarding-seen");
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("demo-onboarding-seen", "true");
  };

  const handleNavigateFromOnboarding = (section: string) => {
    if (section) {
      setActiveSection(section);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "menu":
        return <MenuContent />;
      case "orders":
        return <OrdersContent />;
      case "reservations":
        return <ReservationsContent />;
      case "delivery":
        return <DeliveryContent />;
      case "customers":
        return <CustomersContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`hidden lg:flex fixed left-0 top-0 bottom-0 z-40 bg-card border-r border-border flex-col transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 flex-shrink-0">
            <span className="text-white font-bold">F</span>
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-lg text-foreground">Flavour</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Back to Landing */}
        <div className="p-4 border-t border-border">
          <Link to="/">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              {!sidebarCollapsed && "Torna al sito"}
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-card border-r border-border flex flex-col"
          >
            {/* Logo + Close */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="font-bold text-lg text-foreground">Flavour</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Back to Landing */}
            <div className="p-4 border-t border-border">
              <Link to="/">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Torna al sito
                </Button>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Onboarding Tutorial */}
      <OnboardingTutorial 
        isOpen={showOnboarding} 
        onClose={handleCloseOnboarding}
        onNavigate={handleNavigateFromOnboarding}
      />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
              
              <h1 className="text-lg lg:text-xl font-bold text-foreground capitalize">
                {sidebarItems.find(i => i.id === activeSection)?.label || "Dashboard"}
              </h1>
              <span className="hidden sm:inline-block px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                Demo Mode
              </span>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Help Button */}
              <button 
                onClick={() => setShowOnboarding(true)}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                title="Guida"
              >
                <HelpCircle className="w-5 h-5 text-foreground" />
              </button>

              {/* Search - Desktop only */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cerca..."
                  className="w-64 pl-10 pr-4 py-2 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* User Avatar */}
              <div className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-xl bg-muted">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                  MR
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground">Mario Rossi</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// Dashboard Content
const DashboardContent = () => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative p-6 rounded-2xl bg-card border border-border overflow-hidden group hover:border-primary/30 transition-colors"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-success font-medium">{stat.change}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Recent Orders & Reservations */}
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Recent Orders */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Ordini recenti</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            Vedi tutti <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {mockOrders.slice(0, 4).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${order.status === 'new' ? 'bg-success animate-pulse' : order.status === 'preparing' ? 'bg-warning' : 'bg-muted-foreground'}`} />
                <div>
                  <p className="font-medium text-foreground">{order.id} - {order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.items} piatti • {order.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{order.total}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Reservations */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Prenotazioni oggi</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            Vedi tutte <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {mockReservations.filter(r => r.date === "Oggi").map((res) => (
            <div key={res.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{res.name}</p>
                  <p className="text-xs text-muted-foreground">{res.guests} ospiti • {res.table}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{res.time}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(res.status)}`}>
                  {getStatusLabel(res.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Menu Content
const MenuContent = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg text-muted-foreground">Gestisci i tuoi piatti</h2>
      </div>
      <Button className="gradient-button gap-2">
        <Plus className="w-4 h-4" />
        Nuovo piatto
      </Button>
    </div>

    {/* Menu Table */}
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
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
          {mockMenuItems.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-2xl">
                    🍕
                  </div>
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
              </td>
              <td className="p-4 text-muted-foreground">{item.category}</td>
              <td className="p-4 font-medium text-foreground">{item.price}</td>
              <td className="p-4 text-muted-foreground">{item.orders}</td>
              <td className="p-4">
                <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Orders Content
const OrdersContent = () => (
  <div className="space-y-6">
    {/* Filters */}
    <div className="flex flex-wrap gap-3">
      {["Tutti", "Nuovi", "In preparazione", "Pronti", "Consegnati"].map((filter, i) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Orders Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockOrders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-lg font-bold text-foreground">{order.id}</p>
              <p className="text-sm text-muted-foreground">{order.customer}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
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
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xl font-bold text-foreground">{order.total}</span>
            <Button size="sm" className="gradient-button">
              Gestisci
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Reservations Content
const ReservationsContent = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        {["Oggi", "Domani", "Questa settimana"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <Button className="gradient-button gap-2">
        <Plus className="w-4 h-4" />
        Nuova prenotazione
      </Button>
    </div>

    {/* Reservations List */}
    <div className="space-y-4">
      {mockReservations.map((res) => (
        <motion.div
          key={res.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{res.name}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {res.guests} ospiti
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {res.table}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">{res.time}</p>
              <p className="text-sm text-muted-foreground">{res.date}</p>
            </div>
            <span className={`text-xs px-3 py-1.5 rounded-full ${getStatusColor(res.status)}`}>
              {getStatusLabel(res.status)}
            </span>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Demo;