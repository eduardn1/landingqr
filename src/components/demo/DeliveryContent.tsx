/**
 * Delivery Content - Enhanced Map & Driver Tracking
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Clock, Phone, User, Package, Navigation, AlertCircle, Play, Pause, ZoomIn, ZoomOut, Locate, Layers, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Restaurant location (center of Rome - Piazza Navona area)
const restaurantLocation = { lat: 41.8992, lng: 12.4730 };

// Driver routes with more waypoints for smoother animation
const driverRoutes: Record<number, { lat: number; lng: number }[]> = {
  1: [
    { lat: 41.9028, lng: 12.4964 },
    { lat: 41.9020, lng: 12.4940 },
    { lat: 41.9015, lng: 12.4920 },
    { lat: 41.9010, lng: 12.4900 },
    { lat: 41.9000, lng: 12.4880 },
    { lat: 41.8990, lng: 12.4860 },
    { lat: 41.8985, lng: 12.4840 },
    { lat: 41.8980, lng: 12.4820 },
    { lat: 41.8975, lng: 12.4800 },
    { lat: 41.8972, lng: 12.4780 },
    { lat: 41.8970, lng: 12.4760 },
    { lat: 41.8975, lng: 12.4745 },
    { lat: 41.8980, lng: 12.4740 },
    { lat: 41.8985, lng: 12.4735 },
    { lat: 41.8992, lng: 12.4730 },
  ],
  2: [
    { lat: 41.9109, lng: 12.5050 },
    { lat: 41.9100, lng: 12.5030 },
    { lat: 41.9090, lng: 12.5000 },
    { lat: 41.9080, lng: 12.4975 },
    { lat: 41.9070, lng: 12.4950 },
    { lat: 41.9060, lng: 12.4925 },
    { lat: 41.9050, lng: 12.4900 },
    { lat: 41.9040, lng: 12.4875 },
    { lat: 41.9030, lng: 12.4850 },
    { lat: 41.9020, lng: 12.4825 },
    { lat: 41.9010, lng: 12.4800 },
    { lat: 41.9000, lng: 12.4775 },
    { lat: 41.8995, lng: 12.4760 },
    { lat: 41.8993, lng: 12.4745 },
    { lat: 41.8992, lng: 12.4730 },
  ],
  3: [
    { lat: 41.8956, lng: 12.4822 },
    { lat: 41.8950, lng: 12.4815 },
    { lat: 41.8940, lng: 12.4800 },
    { lat: 41.8930, lng: 12.4790 },
    { lat: 41.8920, lng: 12.4780 },
    { lat: 41.8910, lng: 12.4770 },
    { lat: 41.8900, lng: 12.4760 },
    { lat: 41.8910, lng: 12.4750 },
    { lat: 41.8920, lng: 12.4740 },
    { lat: 41.8935, lng: 12.4735 },
    { lat: 41.8950, lng: 12.4730 },
    { lat: 41.8965, lng: 12.4728 },
    { lat: 41.8980, lng: 12.4729 },
    { lat: 41.8992, lng: 12.4730 },
  ],
  4: [
    { lat: 41.9100, lng: 12.4650 },
    { lat: 41.9090, lng: 12.4660 },
    { lat: 41.9080, lng: 12.4670 },
    { lat: 41.9070, lng: 12.4680 },
    { lat: 41.9060, lng: 12.4690 },
    { lat: 41.9050, lng: 12.4695 },
    { lat: 41.9040, lng: 12.4700 },
    { lat: 41.9030, lng: 12.4705 },
    { lat: 41.9020, lng: 12.4710 },
    { lat: 41.9010, lng: 12.4715 },
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
  progress: number;
  speed: number;
}

const initialDrivers: Driver[] = [
  { id: 1, name: "Marco Verdi", status: "delivering", orders: 2, currentOrder: "#1245", eta: "12 min", location: { lat: 41.9028, lng: 12.4964 }, phone: "+39 333 1234567", progress: 0, speed: 1 },
  { id: 2, name: "Luca Rossi", status: "available", orders: 0, currentOrder: null, eta: null, location: { lat: 41.9109, lng: 12.5050 }, phone: "+39 333 7654321", progress: 0, speed: 0.8 },
  { id: 3, name: "Anna Bianchi", status: "delivering", orders: 1, currentOrder: "#1247", eta: "5 min", location: { lat: 41.8956, lng: 12.4822 }, phone: "+39 333 9876543", progress: 0.3, speed: 1.2 },
  { id: 4, name: "Giuseppe Neri", status: "returning", orders: 0, currentOrder: null, eta: "8 min", location: { lat: 41.9100, lng: 12.4650 }, phone: "+39 333 4567890", progress: 0.5, speed: 0.9 },
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

// Smooth interpolation along route
const getPositionAlongRoute = (route: { lat: number; lng: number }[], progress: number) => {
  if (!route || route.length === 0) return { lat: 0, lng: 0 };
  if (route.length === 1) return { lat: route[0].lat, lng: route[0].lng };
  
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const totalSegments = route.length - 1;
  const segmentProgress = clampedProgress * totalSegments;
  const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1);
  const segmentT = segmentProgress - segmentIndex;
  
  const start = route[segmentIndex];
  const end = route[segmentIndex + 1] || start;
  
  // Smooth easing
  const easedT = segmentT * segmentT * (3 - 2 * segmentT);
  
  return {
    lat: start.lat + (end.lat - start.lat) * easedT,
    lng: start.lng + (end.lng - start.lng) * easedT,
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
  const [mapStyle, setMapStyle] = useState<"dark" | "light" | "satellite">("dark");
  const [showRoutes, setShowRoutes] = useState(true);

  // Animation loop
  useEffect(() => {
    if (!isSimulating || !mapLoaded) return;

    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setDrivers(prevDrivers => 
        prevDrivers.map(driver => {
          if (driver.status === "available") return driver;
          
          const route = driverRoutes[driver.id];
          if (!route) return driver;

          const speed = 0.03 * deltaTime * driver.speed;
          let newProgress = driver.progress + speed;
          let newStatus = driver.status;
          let newEta = driver.eta;
          let newOrder = driver.currentOrder;

          if (newProgress >= 1) {
            newProgress = 0;
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

  // Update markers
  useEffect(() => {
    if (!mapLoaded) return;

    drivers.forEach(driver => {
      const marker = markersRef.current.get(driver.id);
      if (marker) {
        marker.setLngLat([driver.location.lng, driver.location.lat]);
        
        const el = marker.getElement();
        const innerDiv = el.querySelector(".driver-marker") as HTMLElement;
        if (innerDiv) {
          innerDiv.style.background = getMarkerColor(driver.status);
          innerDiv.style.boxShadow = `0 4px 20px ${getMarkerColor(driver.status)}80`;
        }
      }
    });
  }, [drivers, mapLoaded]);

  // Map initialization
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const baseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!baseUrl) {
          setMapError("URL backend non configurato");
          return;
        }

        const response = await fetch(`${baseUrl}/functions/v1/mapbox-token`);
        if (!response.ok) {
          setMapError("Errore dal backend mappa");
          return;
        }

        const data = await response.json() as { token?: string; error?: string };

        if (!data.token) {
          setMapError("Token Mapbox non disponibile");
          return;
        }

        mapboxgl.accessToken = data.token;

        if (!mapContainer.current) return;

        const mapStyles = {
          dark: "mapbox://styles/mapbox/dark-v11",
          light: "mapbox://styles/mapbox/light-v11",
          satellite: "mapbox://styles/mapbox/satellite-streets-v12",
        };

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: mapStyles[mapStyle],
          center: [restaurantLocation.lng, restaurantLocation.lat],
          zoom: 13,
          pitch: 45,
          bearing: -17.6,
        });

        map.current.on("load", () => {
          // Add routes if enabled
          if (showRoutes) {
            Object.entries(driverRoutes).forEach(([driverId, route]) => {
              const driver = initialDrivers.find(d => d.id === Number(driverId));
              if (!driver || driver.status === "available") return;

              map.current?.addSource(`route-${driverId}`, {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: route.map(p => [p.lng, p.lat]),
                  },
                },
              });

              map.current?.addLayer({
                id: `route-${driverId}`,
                type: "line",
                source: `route-${driverId}`,
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": getMarkerColor(driver.status),
                  "line-width": 3,
                  "line-opacity": 0.6,
                  "line-dasharray": [2, 2],
                },
              });
            });
          }

          // Restaurant marker
          const restaurantEl = document.createElement("div");
          restaurantEl.innerHTML = `
            <div class="restaurant-marker" style="
              width: 52px;
              height: 52px;
              background: linear-gradient(135deg, #8b5cf6, #ec4899);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 25px rgba(139, 92, 246, 0.6);
              border: 3px solid white;
              cursor: pointer;
              animation: pulse-ring 2s infinite;
            ">
              <span style="color: white; font-weight: bold; font-size: 20px;">F</span>
            </div>
          `;

          new mapboxgl.Marker(restaurantEl)
            .setLngLat([restaurantLocation.lng, restaurantLocation.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="padding: 12px; min-width: 180px;">
                  <h3 style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">🍕 Nestify Restaurant</h3>
                  <p style="font-size: 12px; color: #666;">Sede centrale</p>
                  <p style="font-size: 11px; color: #999; margin-top: 4px;">Via del Corso 123, Roma</p>
                </div>
              `)
            )
            .addTo(map.current!);

          // Driver markers with enhanced animation
          initialDrivers.forEach((driver) => {
            const el = document.createElement("div");
            el.className = "driver-marker-container";
            el.innerHTML = `
              <div class="driver-marker" style="
                position: relative;
                width: 44px;
                height: 44px;
                background: ${getMarkerColor(driver.status)};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px ${getMarkerColor(driver.status)}80;
                border: 2px solid white;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              ">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 17h4V5H2v12h3"/>
                  <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/>
                  <path d="M14 17h1"/>
                  <circle cx="7.5" cy="17.5" r="2.5"/>
                  <circle cx="17.5" cy="17.5" r="2.5"/>
                </svg>
                ${driver.status === "delivering" ? `
                  <div style="
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 12px;
                    height: 12px;
                    background: #ef4444;
                    border-radius: 50%;
                    border: 2px solid white;
                    animation: pulse 1.5s infinite;
                  "></div>
                ` : ""}
              </div>
            `;

            el.addEventListener("mouseenter", () => {
              const innerDiv = el.querySelector(".driver-marker") as HTMLElement;
              if (innerDiv) {
                innerDiv.style.transform = "scale(1.15)";
                innerDiv.style.boxShadow = `0 6px 30px ${getMarkerColor(driver.status)}`;
              }
            });
            el.addEventListener("mouseleave", () => {
              const innerDiv = el.querySelector(".driver-marker") as HTMLElement;
              if (innerDiv) {
                innerDiv.style.transform = "scale(1)";
                innerDiv.style.boxShadow = `0 4px 20px ${getMarkerColor(driver.status)}80`;
              }
            });

            const marker = new mapboxgl.Marker(el)
              .setLngLat([driver.location.lng, driver.location.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25, className: "driver-popup" }).setHTML(`
                  <div style="padding: 12px; min-width: 180px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                      <div style="width: 32px; height: 32px; border-radius: 50%; background: ${getMarkerColor(driver.status)}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
                        ${driver.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h3 style="font-weight: bold; font-size: 14px; margin: 0;">${driver.name}</h3>
                        <p style="font-size: 11px; color: #666; margin: 0;">${getDriverStatusLabel(driver.status)}</p>
                      </div>
                    </div>
                    ${driver.currentOrder ? `
                      <div style="background: #f3f4f6; padding: 8px; border-radius: 8px; font-size: 12px;">
                        <strong>Ordine:</strong> ${driver.currentOrder}<br/>
                        <strong>ETA:</strong> ${driver.eta}
                      </div>
                    ` : ""}
                  </div>
                `)
              )
              .addTo(map.current!);

            markersRef.current.set(driver.id, marker);
          });

          // Add CSS animations
          const style = document.createElement("style");
          style.textContent = `
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.8; }
            }
            @keyframes pulse-ring {
              0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.5); }
              70% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
              100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
            }
            .mapboxgl-popup-content { border-radius: 12px !important; box-shadow: 0 10px 40px rgba(0,0,0,0.2) !important; }
          `;
          document.head.appendChild(style);

          setMapLoaded(true);
        });

        map.current.on("error", () => {
          setMapError("Errore nel caricamento della mappa");
        });
      } catch {
        setMapError("Errore nell'inizializzazione della mappa");
      }
    };

    fetchToken();

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current.clear();
      map.current?.remove();
    };
  }, [mapStyle, showRoutes]);

  const handleDriverClick = useCallback((driverId: number) => {
    const driver = drivers.find(d => d.id === driverId);
    if (driver && map.current) {
      setSelectedDriver(driverId);
      map.current.flyTo({
        center: [driver.location.lng, driver.location.lat],
        zoom: 16,
        pitch: 60,
        bearing: 30,
        duration: 2000,
        essential: true,
      });
    }
  }, [drivers]);

  const handleZoomIn = () => map.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => map.current?.zoomOut({ duration: 300 });
  const handleRecenter = () => {
    map.current?.flyTo({
      center: [restaurantLocation.lng, restaurantLocation.lat],
      zoom: 13,
      pitch: 45,
      bearing: -17.6,
      duration: 1500,
    });
  };

  const activeDelivering = drivers.filter(d => d.status === "delivering").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Driver attivi", value: drivers.length.toString(), icon: User, color: "from-sky-500/60 to-blue-600/60" },
          { label: "In consegna", value: activeDelivering.toString(), icon: Truck, color: "from-amber-500/60 to-orange-600/60" },
          { label: "Consegne oggi", value: "47", icon: Package, color: "from-emerald-500/60 to-teal-600/60" },
          { label: "Tempo medio", value: "18 min", icon: Clock, color: "from-cyan-500/60 to-teal-600/60" },
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
          <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Mappa in tempo reale
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Map Controls */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRecenter}>
                  <Locate className="w-4 h-4" />
                </Button>
              </div>

              {/* Route toggle */}
              <Button 
                variant={showRoutes ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setShowRoutes(!showRoutes)}
                className="gap-1 h-8"
              >
                <Route className="w-4 h-4" />
                <span className="hidden sm:inline">Percorsi</span>
              </Button>

              {/* Style switcher */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                {(["dark", "light", "satellite"] as const).map((style) => (
                  <Button
                    key={style}
                    variant={mapStyle === style ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 px-2 text-xs capitalize"
                    onClick={() => setMapStyle(style)}
                  >
                    {style === "satellite" ? "Sat" : style === "dark" ? "🌙" : "☀️"}
                  </Button>
                ))}
              </div>

              {/* Play/Pause */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSimulating(!isSimulating)}
                className="gap-1 h-8"
              >
                {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <span className={`text-xs px-2 py-1 rounded-full ${isSimulating ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                {isSimulating ? "● Live" : "Pausa"}
              </span>
            </div>
          </div>
          
          {mapError ? (
            <div className="h-[400px] flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">{mapError}</p>
              </div>
            </div>
          ) : (
            <div ref={mapContainer} className="h-[400px] md:h-[500px] w-full" />
          )}
        </div>

        {/* Driver List */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border p-4">
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Driver ({drivers.length})
            </h4>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              <AnimatePresence>
                {drivers.map((driver) => (
                  <motion.div
                    key={driver.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedDriver === driver.id 
                        ? "border-primary bg-primary/5 shadow-md" 
                        : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => handleDriverClick(driver.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm`} style={{ background: getMarkerColor(driver.status) }}>
                        {driver.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{driver.name}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getDriverStatusColor(driver.status)}`}>
                            {getDriverStatusLabel(driver.status)}
                          </span>
                          {driver.eta && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {driver.eta}
                            </span>
                          )}
                        </div>
                      </div>
                      {driver.status !== "available" && (
                        <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${driver.progress * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Pending Deliveries */}
          <div className="rounded-2xl bg-card border border-border p-4">
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-warning" />
              In attesa ({pendingDeliveries.length})
            </h4>
            <div className="space-y-3">
              {pendingDeliveries.map((delivery) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl border border-border bg-muted/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-sm font-medium text-foreground">{delivery.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning">
                      {delivery.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" />
                    {delivery.address}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{delivery.customer}</span>
                    <span className="font-medium text-sm text-foreground">{delivery.total}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
