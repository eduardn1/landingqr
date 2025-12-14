/**
 * Promo & Stories Combined Content
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromoContent } from "./PromoContent";
import { StoriesContent } from "./StoriesContent";
import { InstagramContent } from "./InstagramContent";
import { Gift, Instagram, Image } from "lucide-react";

export const PromoStoriesContent = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="promo" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted/50">
          <TabsTrigger value="promo" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Gift className="w-4 h-4" />
            <span className="hidden sm:inline">Promo</span>
          </TabsTrigger>
          <TabsTrigger value="stories" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Instagram className="w-4 h-4" />
            <span className="hidden sm:inline">Stories</span>
          </TabsTrigger>
          <TabsTrigger value="instagram" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Feed</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="promo" className="mt-4">
          <PromoContent />
        </TabsContent>
        <TabsContent value="stories" className="mt-4">
          <StoriesContent />
        </TabsContent>
        <TabsContent value="instagram" className="mt-4">
          <InstagramContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
