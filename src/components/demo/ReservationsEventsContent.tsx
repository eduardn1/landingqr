/**
 * Prenotazioni & Eventi Combined Content
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReservationsContent } from "./ReservationsContent";
import { EventsContent } from "./EventsContent";
import { Calendar, Sparkles } from "lucide-react";

export const ReservationsEventsContent = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="reservations" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted/50">
          <TabsTrigger value="reservations" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Prenotazioni</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Eventi</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reservations" className="mt-4">
          <ReservationsContent />
        </TabsContent>
        <TabsContent value="events" className="mt-4">
          <EventsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
