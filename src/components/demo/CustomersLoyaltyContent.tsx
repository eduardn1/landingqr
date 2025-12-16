/**
 * Clienti & Loyalty Combined Content
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveCustomersContent } from "./InteractiveCustomersContent";
import { LoyaltyContent } from "./LoyaltyContent";
import { Users, Trophy } from "lucide-react";

export const CustomersLoyaltyContent = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted/50">
          <TabsTrigger value="customers" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Clienti</span>
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Loyalty</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="mt-4">
          <InteractiveCustomersContent />
        </TabsContent>
        <TabsContent value="loyalty" className="mt-4">
          <LoyaltyContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
