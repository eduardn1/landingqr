/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - WhatsApp Automation Demo
 * Sistema di notifiche automatiche via WhatsApp
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
  MessageCircle,
  Send,
  Clock,
  Check,
  CheckCheck,
  Edit,
  Plus,
  Trash2,
  Bell,
  Package,
  Truck,
  Calendar,
  Star,
  Gift,
  Settings,
  Eye,
  Copy,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Template WhatsApp
const templates = [
  {
    id: 1,
    name: "Conferma Ordine",
    trigger: "order_confirmed",
    icon: Package,
    active: true,
    message: "Ciao {nome}! 🍕\n\nIl tuo ordine #{ordine} è stato confermato!\n\n📦 Totale: {totale}\n⏱️ Pronto in: {tempo} minuti\n\nGrazie per aver scelto {ristorante}!",
    variables: ["nome", "ordine", "totale", "tempo", "ristorante"],
    sentCount: 234
  },
  {
    id: 2,
    name: "Ordine in Preparazione",
    trigger: "order_preparing",
    icon: Clock,
    active: true,
    message: "👨‍🍳 Ciao {nome}!\n\nIl tuo ordine #{ordine} è in preparazione!\n\nI nostri chef stanno lavorando per te. Ti avviseremo quando sarà pronto!",
    variables: ["nome", "ordine"],
    sentCount: 189
  },
  {
    id: 3,
    name: "Ordine Pronto",
    trigger: "order_ready",
    icon: Check,
    active: true,
    message: "✅ {nome}, il tuo ordine è PRONTO!\n\n#{ordine}\n\n{tipo_ritiro}",
    variables: ["nome", "ordine", "tipo_ritiro"],
    sentCount: 178
  },
  {
    id: 4,
    name: "Driver Assegnato",
    trigger: "driver_assigned",
    icon: Truck,
    active: true,
    message: "🚗 Buone notizie {nome}!\n\n{driver} sta arrivando con il tuo ordine!\n\n📍 ETA: {eta} minuti\n📞 Contatto: {telefono}",
    variables: ["nome", "driver", "eta", "telefono"],
    sentCount: 145
  },
  {
    id: 5,
    name: "Consegna Completata",
    trigger: "order_delivered",
    icon: CheckCheck,
    active: true,
    message: "🎉 Ordine consegnato!\n\nGrazie {nome}!\n\nCome è andato il tuo ordine? Lasciaci una recensione:\n{link_recensione}\n\n⭐ Usa il codice GRAZIE10 per il 10% sul prossimo ordine!",
    variables: ["nome", "link_recensione"],
    sentCount: 167
  },
  {
    id: 6,
    name: "Prenotazione Confermata",
    trigger: "reservation_confirmed",
    icon: Calendar,
    active: true,
    message: "📅 Prenotazione Confermata!\n\nCiao {nome},\n\n✅ Data: {data}\n⏰ Ora: {ora}\n👥 Persone: {persone}\n🪑 Tavolo: {tavolo}\n\nTi aspettiamo!",
    variables: ["nome", "data", "ora", "persone", "tavolo"],
    sentCount: 89
  },
  {
    id: 7,
    name: "Reminder Prenotazione",
    trigger: "reservation_reminder",
    icon: Bell,
    active: true,
    message: "⏰ Promemoria!\n\nCiao {nome}, ti ricordiamo la tua prenotazione:\n\n📅 Oggi alle {ora}\n👥 {persone} persone\n\nA tra poco! 🍽️",
    variables: ["nome", "ora", "persone"],
    sentCount: 67
  },
  {
    id: 8,
    name: "Richiesta Feedback",
    trigger: "feedback_request",
    icon: Star,
    active: false,
    message: "Ciao {nome}! 👋\n\nCome è stata la tua esperienza?\n\n⭐⭐⭐⭐⭐\n\nLasciaci un feedback: {link_feedback}\n\nGrazie!",
    variables: ["nome", "link_feedback"],
    sentCount: 45
  },
];

// Log messaggi inviati
const messageLogs = [
  { id: 1, template: "Conferma Ordine", recipient: "+39 333 1234567", status: "delivered", time: "2 min fa", customer: "Marco R." },
  { id: 2, template: "Driver Assegnato", recipient: "+39 345 9876543", status: "delivered", time: "5 min fa", customer: "Giulia B." },
  { id: 3, template: "Ordine Pronto", recipient: "+39 389 5551234", status: "sent", time: "8 min fa", customer: "Alessandro C." },
  { id: 4, template: "Prenotazione Confermata", recipient: "+39 347 1112233", status: "delivered", time: "15 min fa", customer: "Francesca M." },
  { id: 5, template: "Consegna Completata", recipient: "+39 333 4445566", status: "delivered", time: "22 min fa", customer: "Paolo S." },
  { id: 6, template: "Reminder Prenotazione", recipient: "+39 366 7778899", status: "failed", time: "30 min fa", customer: "Anna V." },
];

const stats = [
  { label: "Messaggi Oggi", value: "47", icon: Send, color: "from-green-500/60 to-emerald-600/60" },
  { label: "Tasso Consegna", value: "98.5%", icon: CheckCheck, color: "from-sky-500/60 to-blue-600/60" },
  { label: "Template Attivi", value: "7", icon: MessageCircle, color: "from-emerald-500/60 to-teal-600/60" },
  { label: "Risparmiati", value: "€120", icon: Zap, color: "from-amber-500/60 to-orange-600/60" },
];

export const WhatsAppContent = () => {
  const [activeTab, setActiveTab] = useState<"templates" | "logs" | "settings">("templates");
  const [templateList, setTemplateList] = useState(templates);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

  const handleToggleTemplate = (id: number) => {
    setTemplateList(prev => prev.map(t => 
      t.id === id ? { ...t, active: !t.active } : t
    ));
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">WhatsApp Automation</h2>
            <p className="text-muted-foreground">Notifiche automatiche ai clienti</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {[
          { id: "templates", label: "Template", icon: MessageCircle },
          { id: "logs", label: "Log Messaggi", icon: Clock },
          { id: "settings", label: "Impostazioni", icon: Settings },
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
        {activeTab === "templates" && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Template List */}
            <div className="space-y-3">
              {templateList.map((template) => {
                const Icon = template.icon;
                return (
                  <motion.div
                    key={template.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? "bg-primary/5 border-primary/30"
                        : template.active
                          ? "bg-card border-border hover:border-primary/20"
                          : "bg-muted/50 border-border opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        template.active ? "bg-green-500/20" : "bg-muted"
                      }`}>
                        <Icon className={`w-5 h-5 ${template.active ? "text-green-500" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.sentCount} inviati</p>
                      </div>
                      <Switch
                        checked={template.active}
                        onCheckedChange={() => handleToggleTemplate(template.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Template Preview */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              {selectedTemplate ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{selectedTemplate.name}</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifica
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Duplica
                      </Button>
                    </div>
                  </div>

                  {/* WhatsApp Preview */}
                  <div className="bg-[#0b141a] rounded-xl p-4 mb-4">
                    <div className="bg-[#005c4b] rounded-lg p-3 max-w-[280px] ml-auto">
                      <p className="text-white text-sm whitespace-pre-line">
                        {selectedTemplate.message}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] text-white/60">14:32</span>
                        <CheckCheck className="w-3 h-3 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Variables */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Variabili disponibili:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables.map((v) => (
                        <code key={v} className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">
                          {`{${v}}`}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Seleziona un template per vedere anteprima</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "logs" && (
          <motion.div
            key="logs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            {messageLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-card border border-border flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  log.status === "delivered" ? "bg-green-500/20" :
                  log.status === "sent" ? "bg-blue-500/20" :
                  "bg-red-500/20"
                }`}>
                  {log.status === "delivered" ? <CheckCheck className="w-5 h-5 text-green-500" /> :
                   log.status === "sent" ? <Check className="w-5 h-5 text-blue-500" /> :
                   <Clock className="w-5 h-5 text-red-500" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{log.template}</p>
                  <p className="text-sm text-muted-foreground">{log.customer} • {log.recipient}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    log.status === "delivered" ? "bg-green-500/20 text-green-500" :
                    log.status === "sent" ? "bg-blue-500/20 text-blue-500" :
                    "bg-red-500/20 text-red-500"
                  }`}>
                    {log.status === "delivered" ? "Consegnato" : 
                     log.status === "sent" ? "Inviato" : "Fallito"}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Configurazione WhatsApp</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">Numero Business</p>
                  <p className="text-sm text-muted-foreground">+39 02 1234567</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-medium">
                  Connesso
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">Notifiche Ordini</p>
                  <p className="text-sm text-muted-foreground">Invia automaticamente a ogni ordine</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">Reminder Prenotazioni</p>
                  <p className="text-sm text-muted-foreground">2 ore prima della prenotazione</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">Richiesta Feedback</p>
                  <p className="text-sm text-muted-foreground">24 ore dopo la consegna</p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
