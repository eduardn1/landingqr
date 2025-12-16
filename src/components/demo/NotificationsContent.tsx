/**
 * Notifiche Combined Content (WhatsApp + Push)
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhatsAppContent } from "./WhatsAppContent";
import { PushNotificationsContent } from "./PushNotificationsContent";
import { MessageCircle, Bell } from "lucide-react";

export const NotificationsContent = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted/50">
          <TabsTrigger value="whatsapp" className="gap-2 py-2.5 text-xs sm:text-sm">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="push" className="gap-2 py-2.5 text-xs sm:text-sm">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Push</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="whatsapp" className="mt-4">
          <WhatsAppContent />
        </TabsContent>
        <TabsContent value="push" className="mt-4">
          <PushNotificationsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
