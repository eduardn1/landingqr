/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Push Notifications Demo
 * Sistema notifiche push per engagement clienti
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
  Bell,
  Send,
  Users,
  Target,
  Clock,
  Calendar,
  Zap,
  Gift,
  ShoppingBag,
  Star,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Check,
  X,
  TrendingUp,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

// Mock campaigns
const mockCampaigns = [
  {
    id: 1,
    title: "Promo Weekend",
    message: "🍕 Questo weekend -20% su tutte le pizze! Usa il codice WEEKEND20",
    audience: "all",
    audienceCount: 1250,
    sentCount: 1180,
    openRate: 68,
    clickRate: 23,
    status: "completed",
    scheduledAt: null,
    sentAt: "2024-12-10T18:00:00",
    trigger: "manual"
  },
  {
    id: 2,
    title: "Nuovo Menu Invernale",
    message: "❄️ Scopri il nostro nuovo menu invernale! Zuppe, risotti e piatti caldi.",
    audience: "active",
    audienceCount: 890,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    status: "scheduled",
    scheduledAt: "2024-12-15T12:00:00",
    sentAt: null,
    trigger: "scheduled"
  },
  {
    id: 3,
    title: "Reminder Prenotazione",
    message: "⏰ Non dimenticare! La tua prenotazione è tra 2 ore. Ti aspettiamo!",
    audience: "segment",
    audienceCount: 0,
    sentCount: 234,
    openRate: 89,
    clickRate: 45,
    status: "active",
    scheduledAt: null,
    sentAt: null,
    trigger: "auto_reservation"
  },
  {
    id: 4,
    title: "Ordine Pronto",
    message: "✅ Il tuo ordine #{ordine} è pronto per il ritiro!",
    audience: "segment",
    audienceCount: 0,
    sentCount: 567,
    openRate: 95,
    clickRate: 78,
    status: "active",
    scheduledAt: null,
    sentAt: null,
    trigger: "auto_order"
  },
  {
    id: 5,
    title: "Carrello Abbandonato",
    message: "🛒 Hai dimenticato qualcosa! Completa il tuo ordine e ricevi la consegna gratis.",
    audience: "segment",
    audienceCount: 0,
    sentCount: 89,
    openRate: 42,
    clickRate: 18,
    status: "active",
    scheduledAt: null,
    sentAt: null,
    trigger: "auto_cart"
  },
];

const triggers = [
  { id: "manual", label: "Manuale", icon: Send, desc: "Invia subito" },
  { id: "scheduled", label: "Programmato", icon: Calendar, desc: "Scegli data/ora" },
  { id: "auto_order", label: "Ordine", icon: ShoppingBag, desc: "Nuovo ordine, pronto, consegnato" },
  { id: "auto_reservation", label: "Prenotazione", icon: Clock, desc: "Conferma, reminder" },
  { id: "auto_cart", label: "Carrello", icon: Gift, desc: "Carrello abbandonato" },
  { id: "auto_loyalty", label: "Loyalty", icon: Star, desc: "Punti, livelli, premi" },
];

const stats = [
  { label: "Iscritti Push", value: "2,340", icon: Users, color: "from-emerald-500/60 to-teal-600/60" },
  { label: "Inviate Oggi", value: "156", icon: Send, color: "from-sky-500/60 to-blue-600/60" },
  { label: "Tasso Apertura", value: "72%", icon: Eye, color: "from-cyan-500/60 to-teal-600/60" },
  { label: "Conversione", value: "18%", icon: TrendingUp, color: "from-amber-500/60 to-orange-600/60" },
];

export const PushNotificationsContent = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [activeTab, setActiveTab] = useState<"campaigns" | "automation" | "settings">("campaigns");
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const activeCampaigns = campaigns.filter(c => c.status === "active");
  const scheduledCampaigns = campaigns.filter(c => c.status === "scheduled");
  const completedCampaigns = campaigns.filter(c => c.status === "completed");

  const handleToggleCampaign = (id: number) => {
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c
    ));
  };

  const handleDelete = (id: number) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
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
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Push Notifications</h2>
            <p className="text-muted-foreground">Campagne e automazioni</p>
          </div>
        </div>
        <Button onClick={() => setShowNewCampaign(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuova Campagna
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {[
          { id: "campaigns", label: "Campagne", icon: Send },
          { id: "automation", label: "Automazioni", icon: Zap },
          { id: "settings", label: "Impostazioni", icon: Target },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "campaigns" && (
          <motion.div
            key="campaigns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Scheduled */}
            {scheduledCampaigns.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Programmate</h3>
                <div className="space-y-3">
                  {scheduledCampaigns.map((campaign) => (
                    <CampaignCard 
                      key={campaign.id} 
                      campaign={campaign} 
                      onToggle={handleToggleCampaign}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {completedCampaigns.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Completate</h3>
                <div className="space-y-3">
                  {completedCampaigns.map((campaign) => (
                    <CampaignCard 
                      key={campaign.id} 
                      campaign={campaign} 
                      onToggle={handleToggleCampaign}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "automation" && (
          <motion.div
            key="automation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground">
              Notifiche automatiche attivate da eventi specifici.
            </p>
            
            {activeCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onToggle={handleToggleCampaign}
                onDelete={handleDelete}
              />
            ))}

            <div className="p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/30 transition-colors cursor-pointer text-center">
              <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="font-medium text-foreground">Aggiungi Automazione</p>
              <p className="text-sm text-muted-foreground">Crea un nuovo trigger automatico</p>
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Trigger Disponibili</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {triggers.map((trigger) => {
                  const Icon = trigger.icon;
                  return (
                    <div key={trigger.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{trigger.label}</p>
                          <p className="text-xs text-muted-foreground">{trigger.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Preferenze</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Quiet Hours</p>
                    <p className="text-sm text-muted-foreground">Non inviare notifiche 23:00 - 08:00</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Smart Delivery</p>
                    <p className="text-sm text-muted-foreground">Invia quando utente è più attivo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">A/B Testing</p>
                    <p className="text-sm text-muted-foreground">Testa varianti di messaggio</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Campaign Modal */}
      <AnimatePresence>
        {showNewCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewCampaign(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-xl"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">Nuova Campagna Push</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Titolo</label>
                  <Input placeholder="Es. Promo Weekend" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Messaggio</label>
                  <textarea 
                    className="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm resize-none"
                    rows={3}
                    placeholder="Scrivi il tuo messaggio..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Audience</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Tutti", "Attivi", "VIP"].map((aud) => (
                      <button key={aud} className="py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
                        {aud}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowNewCampaign(false)}>
                  Annulla
                </Button>
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Invia Ora
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Campaign Card Component
const CampaignCard = ({ 
  campaign, 
  onToggle, 
  onDelete 
}: { 
  campaign: typeof mockCampaigns[0];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const isAuto = campaign.trigger.startsWith("auto_");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border transition-all ${
        campaign.status === "active" || campaign.status === "scheduled"
          ? "bg-card border-border"
          : "bg-muted/50 border-border"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          campaign.status === "completed" ? "bg-green-500/20" :
          campaign.status === "scheduled" ? "bg-blue-500/20" :
          "bg-violet-500/20"
        }`}>
          {campaign.status === "completed" ? <Check className="w-5 h-5 text-green-500" /> :
           campaign.status === "scheduled" ? <Calendar className="w-5 h-5 text-blue-500" /> :
           <Zap className="w-5 h-5 text-violet-500" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-foreground">{campaign.title}</h4>
            {isAuto && (
              <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-500 text-xs">
                Auto
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{campaign.message}</p>
          
          {/* Stats */}
          {campaign.sentCount > 0 && (
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{campaign.sentCount.toLocaleString()} inviate</span>
              <span>{campaign.openRate}% aperture</span>
              <span>{campaign.clickRate}% click</span>
            </div>
          )}
          
          {campaign.scheduledAt && (
            <p className="text-xs text-blue-500 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Programmata: {new Date(campaign.scheduledAt).toLocaleString("it-IT")}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {campaign.status !== "completed" && (
            <Switch
              checked={campaign.status === "active"}
              onCheckedChange={() => onToggle(campaign.id)}
            />
          )}
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(campaign.id)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
