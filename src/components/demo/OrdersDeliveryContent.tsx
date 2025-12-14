/**
 * Ordini & Delivery Combined Content
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrdersContent } from "./OrdersContent";
import { DeliveryContent } from "./DeliveryContent";
import { ShoppingBag, Truck } from "lucide-react";

export const OrdersDeliveryContent = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted/50">
          <TabsTrigger value="orders" className="gap-2 py-2.5 text-xs sm:text-sm">
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Ordini</span>
          </TabsTrigger>
          <TabsTrigger value="delivery" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Truck className="w-4 h-4" />
            <span className="hidden sm:inline">Delivery</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-4">
          <OrdersContent />
        </TabsContent>
        <TabsContent value="delivery" className="mt-4">
          <DeliveryContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
