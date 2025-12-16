import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingBag, Calendar, Clock, DollarSign, PieChart, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, LineChart, Line } from "recharts";

// Mock data for charts
const revenueData = [
  { name: "Lun", revenue: 1200, orders: 45 },
  { name: "Mar", revenue: 1400, orders: 52 },
  { name: "Mer", revenue: 1100, orders: 38 },
  { name: "Gio", revenue: 1800, orders: 67 },
  { name: "Ven", revenue: 2200, orders: 82 },
  { name: "Sab", revenue: 2800, orders: 95 },
  { name: "Dom", revenue: 2400, orders: 88 },
];

const categoryData = [
  { name: "Pizze", value: 45, color: "hsl(var(--primary))" },
  { name: "Primi", value: 25, color: "hsl(var(--accent))" },
  { name: "Secondi", value: 15, color: "hsl(var(--warning))" },
  { name: "Dolci", value: 10, color: "hsl(var(--success))" },
  { name: "Bevande", value: 5, color: "hsl(var(--muted-foreground))" },
];

const hourlyData = [
  { hour: "12:00", orders: 12 },
  { hour: "13:00", orders: 28 },
  { hour: "14:00", orders: 18 },
  { hour: "15:00", orders: 5 },
  { hour: "16:00", orders: 3 },
  { hour: "17:00", orders: 8 },
  { hour: "18:00", orders: 15 },
  { hour: "19:00", orders: 32 },
  { hour: "20:00", orders: 45 },
  { hour: "21:00", orders: 38 },
  { hour: "22:00", orders: 22 },
  { hour: "23:00", orders: 8 },
];

const topDishes = [
  { name: "Margherita", orders: 127, revenue: "€1,016", trend: "+12%" },
  { name: "Diavola", orders: 98, revenue: "€980", trend: "+8%" },
  { name: "Carbonara", orders: 89, revenue: "€1,068", trend: "+15%" },
  { name: "4 Formaggi", orders: 76, revenue: "€912", trend: "-3%" },
  { name: "Tiramisù", orders: 56, revenue: "€336", trend: "+22%" },
];

export const AnalyticsContent = () => (
  <div className="space-y-6">
    {/* Top Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Fatturato mensile", value: "€12,847", change: "+12.5%", up: true, icon: DollarSign, color: "from-emerald-500/60 to-teal-600/60" },
        { label: "Ordini totali", value: "487", change: "+8.2%", up: true, icon: ShoppingBag, color: "from-sky-500/60 to-blue-600/60" },
        { label: "Clienti nuovi", value: "64", change: "+23%", up: true, icon: Users, color: "from-cyan-500/60 to-teal-600/60" },
        { label: "Tempo medio ordine", value: "18 min", change: "-2 min", up: true, icon: Clock, color: "from-amber-500/60 to-orange-600/60" },
      ].map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground">Andamento Settimanale</h3>
            <p className="text-sm text-muted-foreground">Fatturato e ordini degli ultimi 7 giorni</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Fatturato</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Ordini</span>
            </div>
          </div>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-primary" />
          Categorie
        </h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPie>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))"
                }}
              />
            </RechartsPie>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {categoryData.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-muted-foreground">{cat.name}</span>
              </div>
              <span className="font-medium text-foreground">{cat.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Hourly Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Ordini per Ora
            </h3>
            <p className="text-sm text-muted-foreground">Distribuzione giornaliera</p>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Dishes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Piatti più venduti
        </h3>
        <div className="space-y-4">
          {topDishes.map((dish, i) => (
            <div key={dish.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{dish.name}</p>
                  <p className="text-xs text-muted-foreground">{dish.orders} ordini</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{dish.revenue}</p>
                <span className={`text-xs ${dish.trend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                  {dish.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);
