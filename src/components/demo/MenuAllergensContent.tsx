/**
 * Menu & Allergeni Combined Content
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuContent } from "./MenuContent";
import { AllergensContent } from "./AllergensContent";
import { MoodContent } from "./MoodContent";
import { UtensilsCrossed, Filter, Sparkles } from "lucide-react";

export const MenuAllergensContent = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted/50">
          <TabsTrigger value="menu" className="gap-2 py-2.5 text-xs sm:text-sm">
            <UtensilsCrossed className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
          </TabsTrigger>
          <TabsTrigger value="allergens" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Allergeni</span>
          </TabsTrigger>
          <TabsTrigger value="mood" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Mood</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="menu" className="mt-4">
          <MenuContent />
        </TabsContent>
        <TabsContent value="allergens" className="mt-4">
          <AllergensContent />
        </TabsContent>
        <TabsContent value="mood" className="mt-4">
          <MoodContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
