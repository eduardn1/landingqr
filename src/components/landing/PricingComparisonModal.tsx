/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Pricing Comparison Modal
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PricingComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  { name: "Starter", price: "29", slug: "starter" },
  { name: "Pro", price: "59", slug: "pro", featured: true },
  { name: "Enterprise", price: "Custom", slug: "enterprise" },
];

const featureCategories = [
  {
    name: "Menu & Contenuti",
    features: [
      { name: "Menu QR", starter: "Illimitato", pro: "Illimitato", enterprise: "Illimitato" },
      { name: "Piatti", starter: "Illimitati", pro: "Illimitati", enterprise: "Illimitati" },
      { name: "Lingue", starter: "3", pro: "Illimitate", enterprise: "Illimitate" },
      { name: "Foto piatti", starter: true, pro: true, enterprise: true },
      { name: "Menu stagionali", starter: true, pro: true, enterprise: true },
    ],
  },
  {
    name: "Prenotazioni & Ordini",
    features: [
      { name: "Prenotazioni online", starter: true, pro: true, enterprise: true },
      { name: "Ordini asporto", starter: false, pro: true, enterprise: true },
      { name: "Ordini delivery", starter: false, pro: true, enterprise: true },
      { name: "Commissioni ordini", starter: "-", pro: "0%", enterprise: "0%" },
    ],
  },
  {
    name: "Gestione & Supporto",
    features: [
      { name: "Sedi", starter: "1", pro: "Fino a 3", enterprise: "Illimitate" },
      { name: "Supporto email", starter: "48h", pro: "24h", enterprise: "4h" },
      { name: "Supporto WhatsApp", starter: false, pro: true, enterprise: true },
      { name: "Account manager", starter: false, pro: false, enterprise: true },
    ],
  },
];

const renderValue = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? (
      <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mx-auto">
        <Check className="w-3.5 h-3.5 text-success" />
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mx-auto">
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
    );
  }
  return <span className="text-foreground font-medium text-sm">{value}</span>;
};

const PricingComparisonModal = memo(({ isOpen, onClose }: PricingComparisonModalProps) => {
  const { openLeadForm } = useLeadForm();

  const handleSelectPlan = (slug: string) => {
    onClose();
    openLeadForm(`comparison-${slug}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-foreground">
              Confronta i piani
            </DialogTitle>
          </DialogHeader>

          {/* Plan Headers */}
          <div className="grid grid-cols-4 gap-2 mt-6 sticky top-0 bg-card z-10 pb-4 border-b border-border">
            <div className="col-span-1" />
            {plans.map((plan) => (
              <div key={plan.slug} className="text-center">
                {plan.featured && (
                  <div className="badge-primary text-xs mb-2 mx-auto">
                    <Star className="w-3 h-3" />
                    <span>Popolare</span>
                  </div>
                )}
                <h3 className="font-bold text-foreground">{plan.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {plan.price === "Custom" ? "Su misura" : `€${plan.price}/mese`}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Categories */}
          <div className="space-y-6 mt-4">
            {featureCategories.map((category) => (
              <div key={category.name}>
                <h4 className="text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">
                  {category.name}
                </h4>
                <div className="space-y-2">
                  {category.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="grid grid-cols-4 gap-2 py-2 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <div className="text-sm text-muted-foreground">
                        {feature.name}
                      </div>
                      <div className="text-center">
                        {renderValue(feature.starter)}
                      </div>
                      <div className="text-center">
                        {renderValue(feature.pro)}
                      </div>
                      <div className="text-center">
                        {renderValue(feature.enterprise)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="grid grid-cols-4 gap-2 mt-8 pt-4 border-t border-border">
            <div className="col-span-1" />
            {plans.map((plan) => (
              <div key={plan.slug} className="text-center">
                <Button
                  onClick={() => handleSelectPlan(plan.slug)}
                  size="sm"
                  className={`w-full ${
                    plan.featured
                      ? "gradient-button"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                >
                  Scegli
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

PricingComparisonModal.displayName = 'PricingComparisonModal';

export default PricingComparisonModal;
