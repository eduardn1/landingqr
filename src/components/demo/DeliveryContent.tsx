import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Clock, Phone, User, Package, Navigation, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Mock driver data with Rome coordinates
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
    location: { lat: 41.9109, lng: 12.5050 },
    phone: "+39 333 7654321"
  },
  { 
    id: 3, 
    name: "Anna Bianchi", 
    status: "delivering", 
    orders: 1, 
    currentOrder: "#1247",
    eta: "5 min",
    location: { lat: 41.8956, lng: 12.4822 },
    phone: "+39 333 9876543"
  },
  { 
    id: 4, 
    name: "Giuseppe Neri", 
    status: "returning", 
    orders: 0, 
    currentOrder: null,
    eta: "8 min al rientro",
    location: { lat: 41.9100, lng: 12.4650 },
    phone: "+39 333 4567890"
  },
];

// Restaurant location (center of Rome - Piazza Navona area)
const restaurantLocation = { lat: 41.8992, lng: 12.4730 };

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

const getMarkerColor = (status: string) => {
  switch (status) {
    case "available": return "#22c55e"; // green
    case "delivering": return "#f59e0b"; // amber
    case "returning": return "#8b5cf6"; // violet
    default: return "#6b7280";
  }
};

export const DeliveryContent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
    
    if (!token) {
      setMapError("Token Mapbox non configurato");
      return;
    }

    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [restaurantLocation.lng, restaurantLocation.lat],
        zoom: 13,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        "top-right"
      );

      map.current.on("load", () => {
        // Add restaurant marker
        const restaurantEl = document.createElement("div");
        restaurantEl.className = "restaurant-marker";
        restaurantEl.innerHTML = `
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.5);
            border: 3px solid white;
            cursor: pointer;
          ">
            <span style="color: white; font-weight: bold; font-size: 18px;">F</span>
          </div>
        `;

        new mapboxgl.Marker(restaurantEl)
          .setLngLat([restaurantLocation.lng, restaurantLocation.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">Flavour Restaurant</h3>
                <p style="font-size: 12px; color: #666;">Sede centrale</p>
              </div>
            `)
          )
          .addTo(map.current!);

        // Add driver markers
        mockDrivers.forEach((driver) => {
          const el = document.createElement("div");
          el.className = "driver-marker";
          el.innerHTML = `
            <div style="
              position: relative;
              width: 40px;
              height: 40px;
              background: ${getMarkerColor(driver.status)};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 15px ${getMarkerColor(driver.status)}80;
              border: 2px solid white;
              cursor: pointer;
              transition: transform 0.2s;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 17h4V5H2v12h3"/>
                <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/>
                <path d="M14 17h1"/>
                <circle cx="7.5" cy="17.5" r="2.5"/>
                <circle cx="17.5" cy="17.5" r="2.5"/>
              </svg>
              ${driver.status === "delivering" ? `
                <div style="
                  position: absolute;
                  inset: -4px;
                  border-radius: 50%;
                  border: 2px solid ${getMarkerColor(driver.status)};
                  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                "></div>
              ` : ""}
            </div>
          `;

          el.addEventListener("mouseenter", () => {
            el.querySelector("div")!.style.transform = "scale(1.2)";
          });
          el.addEventListener("mouseleave", () => {
            el.querySelector("div")!.style.transform = "scale(1)";
          });

          const marker = new mapboxgl.Marker(el)
            .setLngLat([driver.location.lng, driver.location.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="padding: 8px; min-width: 150px;">
                  <h3 style="font-weight: bold; margin-bottom: 4px;">${driver.name}</h3>
                  <p style="font-size: 12px; color: #666; margin-bottom: 4px;">${getDriverStatusLabel(driver.status)}</p>
                  ${driver.currentOrder ? `
                    <p style="font-size: 12px; color: #8b5cf6;">
                      Ordine: ${driver.currentOrder}<br/>
                      ETA: ${driver.eta}
                    </p>
                  ` : ""}
                </div>
              `)
            )
            .addTo(map.current!);

          markersRef.current.push(marker);
        });

        // Add animation styles
        const style = document.createElement("style");
        style.textContent = `
          @keyframes ping {
            75%, 100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      });

      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setMapError("Errore nel caricamento della mappa");
      });

    } catch (error) {
      console.error("Map initialization error:", error);
      setMapError("Errore nell'inizializzazione della mappa");
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, []);

  // Fly to driver when selected
  const handleDriverClick = (driverId: number) => {
    const driver = mockDrivers.find(d => d.id === driverId);
    if (driver && map.current) {
      setSelectedDriver(driverId);
      map.current.flyTo({
        center: [driver.location.lng, driver.location.lat],
        zoom: 15,
        pitch: 60,
        duration: 1500,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Mappa in tempo reale
            </h3>
            <span className="text-xs text-muted-foreground">Roma, Italia</span>
          </div>
          
          {mapError ? (
            <div className="h-[400px] flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                <p className="text-muted-foreground">{mapError}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Verifica che il token Mapbox sia configurato correttamente
                </p>
              </div>
            </div>
          ) : (
            <div ref={mapContainer} className="h-[400px] w-full" />
          )}

          {/* Map Legend */}
          <div className="p-3 border-t border-border bg-muted/30">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Disponibile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">In consegna</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-muted-foreground">In rientro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent" />
                <span className="text-muted-foreground">Ristorante</span>
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
                  onClick={() => handleDriverClick(driver.id)}
                  className={`p-3 rounded-xl transition-all cursor-pointer ${
                    selectedDriver === driver.id 
                      ? "bg-primary/10 border border-primary/30" 
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {driver.name.split(" ").map((n) => n[0]).join("")}
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 h-8 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDriverClick(driver.id);
                      }}
                    >
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
                    <span className="text-xs text-muted-foreground">
                      {delivery.customer} • {delivery.items} piatti
                    </span>
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
};
