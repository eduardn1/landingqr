import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Sparkles,
  Layout,
  Grid3X3,
  Layers,
  Play,
  Eye,
  Check,
  ChevronRight,
  Smartphone,
  Monitor,
  Settings,
  Image,
  Type,
  Brush
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Template data
const templates = [
  {
    id: "tema-1",
    name: "Tema 1",
    description: "Elegante con effetti vetro e trasparenze",
    style: "Moderno",
    color: "from-violet-500 to-purple-600",
    preview: "bg-gradient-to-br from-violet-900/90 via-purple-900/80 to-indigo-900/90",
    features: ["Effetti blur", "Trasparenze", "Gradients"],
    popular: true,
  },
  {
    id: "tema-2",
    name: "Tema 2",
    description: "Tradizionale e raffinato",
    style: "Classico",
    color: "from-amber-600 to-orange-700",
    preview: "bg-gradient-to-br from-amber-900/90 via-orange-900/80 to-red-900/90",
    features: ["Typography serif", "Colori caldi"],
    popular: false,
  },
  {
    id: "tema-3",
    name: "Tema 3",
    description: "Grid asimmetrica moderna",
    style: "Minimal",
    color: "from-slate-500 to-zinc-600",
    preview: "bg-gradient-to-br from-slate-900/90 via-zinc-900/80 to-neutral-900/90",
    features: ["Grid layout", "Spazi ampi"],
    popular: true,
  },
  {
    id: "tema-4",
    name: "Tema 4",
    description: "Layout gallery per menu fotografici",
    style: "Gallery",
    color: "from-pink-500 to-rose-600",
    preview: "bg-gradient-to-br from-pink-900/90 via-rose-900/80 to-red-900/90",
    features: ["Foto grandi", "Visual-first"],
    popular: false,
  },
  {
    id: "tema-5",
    name: "Tema 5",
    description: "Gradients animati premium",
    style: "Premium",
    color: "from-cyan-500 to-blue-600",
    preview: "bg-gradient-to-br from-cyan-900/90 via-blue-900/80 to-indigo-900/90",
    features: ["Animazioni fluide", "Alto impatto"],
    popular: true,
  },
  {
    id: "tema-6",
    name: "Tema 6",
    description: "Effetto profondità e scroll",
    style: "Immersivo",
    color: "from-emerald-500 to-teal-600",
    preview: "bg-gradient-to-br from-emerald-900/90 via-teal-900/80 to-cyan-900/90",
    features: ["Parallax scroll", "Esperienza 3D"],
    popular: false,
  },
];

const customizationOptions = [
  { id: "colors", label: "Colori Brand", icon: Brush, desc: "Primario, secondario, accenti" },
  { id: "logo", label: "Logo", icon: Image, desc: "Header, footer, favicon" },
  { id: "fonts", label: "Typography", icon: Type, desc: "Font titoli e testo" },
  { id: "layout", label: "Layout", icon: Layout, desc: "Sezioni e spaziature" },
];

export const TemplatesContent = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("tema-1");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [showCustomization, setShowCustomization] = useState(false);

  const activeTemplate = templates.find(t => t.id === selectedTemplate)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Template Homepage</h2>
          <p className="text-muted-foreground">Scegli e personalizza il design del tuo menu digitale</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showCustomization ? "default" : "outline"}
            onClick={() => setShowCustomization(!showCustomization)}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Personalizza
          </Button>
        </div>
      </div>

      {/* Customization Panel */}
      <AnimatePresence>
        {showCustomization && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-card border border-border mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Personalizzazione</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {customizationOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{option.label}</p>
                          <p className="text-xs text-muted-foreground">{option.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-foreground">6 Temi Disponibili</h3>
          </div>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "bg-primary/10 border-2 border-primary/30"
                    : "bg-card border border-border hover:border-primary/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0`}>
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-sm truncate">{template.name}</h4>
                      {template.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-medium flex-shrink-0">
                          Popolare
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{template.style}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Template Preview */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl bg-card border border-border">
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{activeTemplate.name}</h3>
                <p className="text-sm text-muted-foreground">{activeTemplate.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-2 rounded-lg transition-colors ${
                    previewDevice === "desktop" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-2 rounded-lg transition-colors ${
                    previewDevice === "mobile" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Window */}
            <div className={`relative rounded-xl overflow-hidden border border-border ${
              previewDevice === "mobile" ? "max-w-[320px] mx-auto" : ""
            }`}>
              <motion.div
                key={selectedTemplate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${activeTemplate.preview} ${
                  previewDevice === "mobile" ? "aspect-[9/16]" : "aspect-video"
                } relative`}
              >
                {/* Mock UI Elements */}
                <div className="absolute inset-0 p-4 md:p-8 flex flex-col">
                  {/* Mock Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm" />
                      <div className="h-3 w-20 bg-white/30 rounded" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-2 w-12 bg-white/20 rounded" />
                      <div className="h-2 w-12 bg-white/20 rounded" />
                      <div className="h-2 w-12 bg-white/20 rounded" />
                    </div>
                  </div>

                  {/* Mock Hero */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="h-4 w-32 mx-auto bg-white/40 rounded" />
                      <div className="h-8 w-48 mx-auto bg-white/60 rounded" />
                      <div className="h-3 w-64 mx-auto bg-white/30 rounded" />
                      <div className="flex justify-center gap-3 mt-6">
                        <div className={`h-10 w-28 rounded-lg bg-gradient-to-r ${activeTemplate.color}`} />
                        <div className="h-10 w-28 rounded-lg border border-white/30 bg-white/10" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Mock Footer Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="aspect-square rounded-lg bg-white/10 backdrop-blur-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Features */}
            <div className="mt-4 flex flex-wrap gap-2">
              {activeTemplate.features.map((feature) => (
                <span key={feature} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {feature}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 gap-2">
                <Check className="w-4 h-4" />
                Applica Template
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Eye className="w-4 h-4" />
                Anteprima Completa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
