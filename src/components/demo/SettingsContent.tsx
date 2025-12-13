import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Store, 
  Clock, 
  CreditCard, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  Printer,
  QrCode,
  Users,
  Mail,
  Phone,
  MapPin,
  Save,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const settingsSections = [
  { id: "restaurant", label: "Ristorante", icon: Store },
  { id: "hours", label: "Orari", icon: Clock },
  { id: "payments", label: "Pagamenti", icon: CreditCard },
  { id: "notifications", label: "Notifiche", icon: Bell },
  { id: "appearance", label: "Aspetto", icon: Palette },
];

export const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState("restaurant");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-xl">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === section.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {activeTab === "restaurant" && <RestaurantSettings />}
        {activeTab === "hours" && <HoursSettings />}
        {activeTab === "payments" && <PaymentsSettings />}
        {activeTab === "notifications" && <NotificationsSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-border">
        <Button onClick={handleSave} className="gradient-button gap-2">
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Salvato!" : "Salva modifiche"}
        </Button>
      </div>
    </div>
  );
};

const RestaurantSettings = () => (
  <div className="grid lg:grid-cols-2 gap-6">
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Store className="w-5 h-5 text-primary" />
        Informazioni Ristorante
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nome ristorante</label>
          <input
            type="text"
            defaultValue="Pizzeria Da Mario"
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Descrizione</label>
          <textarea
            defaultValue="La migliore pizza di Roma dal 1985"
            rows={3}
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Indirizzo
          </label>
          <input
            type="text"
            defaultValue="Via Roma 123, 00100 Roma"
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
    </div>

    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Phone className="w-5 h-5 text-primary" />
        Contatti
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Telefono</label>
          <input
            type="tel"
            defaultValue="+39 06 1234567"
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            defaultValue="info@pizzeriadamario.it"
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Sito web</label>
          <input
            type="url"
            defaultValue="www.pizzeriadamario.it"
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
    </div>

    <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <QrCode className="w-5 h-5 text-primary" />
        QR Code Menu Digitale
      </h3>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 bg-white rounded-xl p-2">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <QrCode className="w-16 h-16 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground mb-4">
            Scarica il QR Code per stamparlo e posizionarlo sui tavoli del tuo ristorante.
          </p>
          <div className="flex gap-3">
            <Button variant="outline">Scarica PNG</Button>
            <Button variant="outline">Scarica PDF</Button>
            <Button variant="outline">Personalizza</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HoursSettings = () => {
  const days = [
    { day: "Lunedì", open: "12:00", close: "23:00", active: true },
    { day: "Martedì", open: "12:00", close: "23:00", active: true },
    { day: "Mercoledì", open: "12:00", close: "23:00", active: true },
    { day: "Giovedì", open: "12:00", close: "23:00", active: true },
    { day: "Venerdì", open: "12:00", close: "00:00", active: true },
    { day: "Sabato", open: "12:00", close: "00:00", active: true },
    { day: "Domenica", open: "12:00", close: "22:00", active: false },
  ];

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Orari di apertura
      </h3>
      <div className="space-y-4">
        {days.map((d) => (
          <div key={d.day} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
            <div className="w-24">
              <span className={`font-medium ${d.active ? "text-foreground" : "text-muted-foreground"}`}>
                {d.day}
              </span>
            </div>
            <Switch defaultChecked={d.active} />
            <div className="flex items-center gap-2 flex-1">
              <input
                type="time"
                defaultValue={d.open}
                disabled={!d.active}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="time"
                defaultValue={d.close}
                disabled={!d.active}
                className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentsSettings = () => {
  const methods = [
    { name: "Contanti", icon: "💵", enabled: true },
    { name: "Carta di credito", icon: "💳", enabled: true },
    { name: "Satispay", icon: "📱", enabled: true },
    { name: "PayPal", icon: "🅿️", enabled: false },
    { name: "Apple Pay", icon: "🍎", enabled: true },
    { name: "Google Pay", icon: "🔵", enabled: true },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Metodi di pagamento
        </h3>
        <div className="space-y-3">
          {methods.map((method) => (
            <div key={method.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium text-foreground">{method.name}</span>
              </div>
              <Switch defaultChecked={method.enabled} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Printer className="w-5 h-5 text-primary" />
          Stampanti e POS
        </h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Stampante Cucina</span>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Connessa</span>
            </div>
            <p className="text-sm text-muted-foreground">Epson TM-T88VI • IP: 192.168.1.100</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Stampante Cassa</span>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Connessa</span>
            </div>
            <p className="text-sm text-muted-foreground">Star TSP143 • USB</p>
          </div>
          <Button variant="outline" className="w-full">
            + Aggiungi stampante
          </Button>
        </div>
      </div>
    </div>
  );
};

const NotificationsSettings = () => {
  const notifications = [
    { name: "Nuovo ordine", description: "Ricevi notifica per ogni nuovo ordine", email: true, push: true, sound: true },
    { name: "Ordine pronto", description: "Quando un ordine è pronto per la consegna", email: false, push: true, sound: true },
    { name: "Nuova prenotazione", description: "Ricevi notifica per nuove prenotazioni", email: true, push: true, sound: false },
    { name: "Recensione ricevuta", description: "Quando un cliente lascia una recensione", email: true, push: false, sound: false },
    { name: "Report giornaliero", description: "Riepilogo vendite a fine giornata", email: true, push: false, sound: false },
  ];

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Bell className="w-5 h-5 text-primary" />
        Preferenze notifiche
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 pb-3 border-b border-border text-sm font-medium text-muted-foreground">
          <span>Tipo</span>
          <span className="text-center">Email</span>
          <span className="text-center">Push</span>
          <span className="text-center">Suono</span>
        </div>
        {notifications.map((notif) => (
          <div key={notif.name} className="grid grid-cols-4 gap-4 items-center p-3 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium text-foreground">{notif.name}</p>
              <p className="text-xs text-muted-foreground">{notif.description}</p>
            </div>
            <div className="flex justify-center">
              <Switch defaultChecked={notif.email} />
            </div>
            <div className="flex justify-center">
              <Switch defaultChecked={notif.push} />
            </div>
            <div className="flex justify-center">
              <Switch defaultChecked={notif.sound} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  const themes = [
    { name: "Chiaro", value: "light" },
    { name: "Scuro", value: "dark" },
    { name: "Sistema", value: "system" },
  ];

  const colors = [
    { name: "Viola", value: "hsl(280, 100%, 60%)" },
    { name: "Blu", value: "hsl(220, 100%, 60%)" },
    { name: "Verde", value: "hsl(160, 100%, 40%)" },
    { name: "Rosso", value: "hsl(0, 100%, 60%)" },
    { name: "Arancione", value: "hsl(30, 100%, 50%)" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Tema
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.value}
              className={`p-4 rounded-xl border-2 transition-colors ${
                theme.value === "dark"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className={`w-full h-12 rounded-lg mb-2 ${
                theme.value === "light" ? "bg-white border border-border" : 
                theme.value === "dark" ? "bg-gray-900" : 
                "bg-gradient-to-r from-white to-gray-900"
              }`} />
              <span className="text-sm font-medium text-foreground">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Colore primario
        </h3>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`w-12 h-12 rounded-xl transition-transform hover:scale-110 ${
                color.name === "Viola" ? "ring-2 ring-offset-2 ring-primary ring-offset-background" : ""
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Il colore primario verrà applicato a pulsanti, link e elementi interattivi.
        </p>
      </div>

      <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Sicurezza
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium text-foreground">Autenticazione a due fattori</p>
              <p className="text-sm text-muted-foreground">Aggiungi un livello extra di sicurezza</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium text-foreground">Sessione automatica</p>
              <p className="text-sm text-muted-foreground">Disconnetti dopo 30 min di inattività</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};
