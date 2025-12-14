import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Clock, Phone, User, Package, Navigation, AlertCircle, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Restaurant location (center of Rome - Piazza Navona area)
const restaurantLocation = { lat: 41.8992, lng: 12.4730 };

// Driver routes - each driver has a path to follow
const driverRoutes: Record<number, { lat: number; lng: number }[]> = {
  1: [
    { lat: 41.9028, lng: 12.4964 },
    { lat: 41.9015, lng: 12.4920 },
    { lat: 41.9000, lng: 12.4880 },
    { lat: 41.8985, lng: 12.4840 },
    { lat: 41.8975, lng: 12.4800 },
    { lat: 41.8970, lng: 12.4760 },
    { lat: 41.8980, lng: 12.4740 },
    { lat: 41.8992, lng: 12.4730 },
  ],
  2: [
    { lat: 41.9109, lng: 12.5050 },
    { lat: 41.9090, lng: 12.5000 },
    { lat: 41.9070, lng: 12.4950 },
    { lat: 41.9050, lng: 12.4900 },
    { lat: 41.9030, lng: 12.4850 },
    { lat: 41.9010, lng: 12.4800 },
    { lat: 41.8995, lng: 12.4760 },
    { lat: 41.8992, lng: 12.4730 },
  ],
  3: [
    { lat: 41.8956, lng: 12.4822 },
    { lat: 41.8940, lng: 12.4800 },
    { lat: 41.8920, lng: 12.4780 },
    { lat: 41.8900, lng: 12.4760 },
    { lat: 41.8920, lng: 12.4740 },
    { lat: 41.8950, lng: 12.4730 },
    { lat: 41.8970, lng: 12.4728 },
    { lat: 41.8992, lng: 12.4730 },
  ],
  4: [
    { lat: 41.9100, lng: 12.4650 },
    { lat: 41.9080, lng: 12.4670 },
    { lat: 41.9060, lng: 12.4690 },
    { lat: 41.9040, lng: 12.4700 },
    { lat: 41.9020, lng: 12.4710 },
    { lat: 41.9000, lng: 12.4720 },
    { lat: 41.8995, lng: 12.4725 },
    { lat: 41.8992, lng: 12.4730 },
  ],
};

type DriverStatus = "available" | "delivering" | "returning";

interface Driver {
  id: number;
  name: string;
  status: DriverStatus;
  orders: number;
  currentOrder: string | null;
  eta: string | null;
  location: { lat: number; lng: number };
  phone: string;
  progress: number; // 0 to 1 along the route
}

const initialDrivers: Driver[] = [
  { id: 1, name: "Marco Verdi", status: "delivering", orders: 2, currentOrder: "#1245", eta: "12 min", location: { lat: 41.9028, lng: 12.4964 }, phone: "+39 333 1234567", progress: 0 },
  { id: 2, name: "Luca Rossi", status: "available", orders: 0, currentOrder: null, eta: null, location: { lat: 41.9109, lng: 12.5050 }, phone: "+39 333 7654321", progress: 0 },
  { id: 3, name: "Anna Bianchi", status: "delivering", orders: 1, currentOrder: "#1247", eta: "5 min", location: { lat: 41.8956, lng: 12.4822 }, phone: "+39 333 9876543", progress: 0 },
  { id: 4, name: "Giuseppe Neri", status: "returning", orders: 0, currentOrder: null, eta: "8 min", location: { lat: 41.9100, lng: 12.4650 }, phone: "+39 333 4567890", progress: 0 },
];

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
    case "available": return "#22c55e";
    case "delivering": return "#f59e0b";
    case "returning": return "#8b5cf6";
    default: return "#6b7280";
  }
};

// Interpolate position along route
const getPositionAlongRoute = (route: { lat: number; lng: number }[], progress: number) => {
  const totalSegments = route.length - 1;
  const segmentProgress = progress * totalSegments;
  const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1);
  const segmentT = segmentProgress - segmentIndex;
  
  const start = route[segmentIndex];
  const end = route[segmentIndex + 1] || route[segmentIndex];
  
  return {
    lat: start.lat + (end.lat - start.lat) * segmentT,
    lng: start.lng + (end.lng - start.lng) * segmentT,
  };
};

export const DeliveryContent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<number, mapboxgl.Marker>>(new Map());
  const animationRef = useRef<number | null>(null);
  
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [isSimulating, setIsSimulating] = useState(true);

  // Animation loop for smooth movement
  useEffect(() => {
    if (!isSimulating || !mapLoaded) return;

    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      setDrivers(prevDrivers => 
        prevDrivers.map(driver => {
          // Only move drivers that are delivering or returning
          if (driver.status === "available") return driver;
          
          const route = driverRoutes[driver.id];
          if (!route) return driver;

          // Speed: complete route in ~20 seconds
          const speed = 0.05 * deltaTime;
          let newProgress = driver.progress + speed;
          let newStatus = driver.status;
          let newEta = driver.eta;
          let newOrder = driver.currentOrder;

          // When reaching end of route
          if (newProgress >= 1) {
            newProgress = 0;
            // Cycle through statuses
            if (driver.status === "delivering") {
              newStatus = "returning";
              newOrder = null;
              newEta = "8 min";
            } else if (driver.status === "returning") {
              newStatus = "delivering";
              newOrder = `#${1250 + Math.floor(Math.random() * 10)}`;
              newEta = "12 min";
            }
          }

          // Update ETA based on progress
          if (newStatus === "delivering" || newStatus === "returning") {
            const remainingProgress = 1 - newProgress;
            const remainingMinutes = Math.ceil(remainingProgress * 15);
            newEta = `${remainingMinutes} min`;
          }

          const newLocation = getPositionAlongRoute(route, newProgress);

          return {
            ...driver,
            progress: newProgress,
            location: newLocation,
            status: newStatus,
            eta: newEta,
            currentOrder: newOrder,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating, mapLoaded]);

  // Update marker positions on map
  useEffect(() => {
    if (!mapLoaded) return;

    drivers.forEach(driver => {
      const marker = markersRef.current.get(driver.id);
      if (marker) {
        marker.setLngLat([driver.location.lng, driver.location.lat]);
        
        // Update marker color based on status
        const el = marker.getElement();
        const innerDiv = el.querySelector("div") as HTMLElement;
        if (innerDiv) {
          innerDiv.style.background = getMarkerColor(driver.status);
          innerDiv.style.boxShadow = `0 4px 15px ${getMarkerColor(driver.status)}80`;
        }
      }
    });
  }, [drivers, mapLoaded]);

  // Fetch Mapbox token from backend
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke<{ token?: string }>("mapbox-token");

        if (error) {
          console.error("Errore dal backend mappa:", error);
          setMapError("Errore dal backend mappa");
          return;
        }

        if (!data?.token) {
          setMapError("Token Mapbox non disponibile dal backend");
          return;
        }

        mapboxgl.accessToken = data.token;

        if (!mapContainer.current) return;

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
          initialDrivers.forEach((driver) => {
            const el = document.createElement("div");
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
                transition: transform 0.2s, background 0.3s, box-shadow 0.3s;
              ">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 17h4V5H2v12h3"/>
                  <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/>
                  <path d="M14 17h1"/>
                  <circle cx="7.5" cy="17.5" r="2.5"/>
                  <circle cx="17.5" cy="17.5" r="2.5"/>
                </svg>
              </div>
            `;

            el.addEventListener("mouseenter", () => {
              const innerDiv = el.querySelector("div") as HTMLElement;
              if (innerDiv) innerDiv.style.transform = "scale(1.2)";
            });
            el.addEventListener("mouseleave", () => {
              const innerDiv = el.querySelector("div") as HTMLElement;
              if (innerDiv) innerDiv.style.transform = "scale(1)";
            });

            const marker = new mapboxgl.Marker(el)
              .setLngLat([driver.location.lng, driver.location.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`
                  <div style="padding: 8px; min-width: 150px;">
                    <h3 style="font-weight: bold; margin-bottom: 4px;">${driver.name}</h3>
                    <p style="font-size: 12px; color: #666;">${getDriverStatusLabel(driver.status)}</p>
                  </div>
                `)
              )
              .addTo(map.current!);

            markersRef.current.set(driver.id, marker);
          });

          // Add animation styles
          const style = document.createElement("style");
          style.textContent = `
            @keyframes ping {
              75%, 100% { transform: scale(1.5); opacity: 0; }
            }
          `;
          document.head.appendChild(style);

          setMapLoaded(true);
        });

        map.current.on("error", (e) => {
          console.error("Mapbox error:", e);
          setMapError("Errore nel caricamento della mappa");
        });
      } catch (error) {
        console.error("Map initialization error:", error);
        setMapError("Errore nell'inizializzazione della mappa");
      }
    };

    fetchToken();

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current.clear();
      map.current?.remove();
    };
  }, []);

  const handleDriverClick = useCallback((driverId: number) => {
    const driver = drivers.find(d => d.id === driverId);
    if (driver && map.current) {
      setSelectedDriver(driverId);
      map.current.flyTo({
        center: [driver.location.lng, driver.location.lat],
        zoom: 15,
        pitch: 60,
        duration: 1500,
      });
    }
  }, [drivers]);

  const toggleSimulation = () => {
    setIsSimulating(prev => !prev);
  };

  const activeDelivering = drivers.filter(d => d.status === "delivering").length;
  const activeReturning = drivers.filter(d => d.status === "returning").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Driver attivi", value: drivers.length.toString(), icon: User, color: "from-blue-500 to-cyan-500" },
          { label: "In consegna", value: activeDelivering.toString(), icon: Truck, color: "from-warning to-orange-500" },
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
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleSimulation}
                className="gap-1"
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span className="hidden sm:inline">Pausa</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span className="hidden sm:inline">Avvia</span>
                  </>
                )}
              </Button>
              <span className={`text-xs px-2 py-1 rounded-full ${isSimulating ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                {isSimulating ? "Live" : "Pausa"}
              </span>
            </div>
          </div>
          
          {mapError ? (
            <div className="h-[400px] flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                <p className="text-muted-foreground">{mapError}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Verifica che il token Mapbox sia configurato
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
              Driver ({drivers.length})
            </h3>
            <div className="space-y-3">
              {drivers.map((driver) => (
                <motion.div
                  key={driver.id}
                  layout
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
                    <motion.span 
                      key={driver.status}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`text-xs px-2 py-0.5 rounded-full ${getDriverStatusColor(driver.status)}`}
                    >
                      {getDriverStatusLabel(driver.status)}
                    </motion.span>
                  </div>
                  {(driver.status === "delivering" || driver.status === "returning") && (
                    <>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{driver.currentOrder ? `Ordine: ${driver.currentOrder}` : "Rientro"}</span>
                        <motion.span 
                          key={driver.eta}
                          className="text-primary font-medium"
                        >
                          ETA: {driver.eta}
                        </motion.span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${driver.status === "delivering" ? "bg-warning" : "bg-violet-500"}`}
                          style={{ width: `${driver.progress * 100}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </>
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
