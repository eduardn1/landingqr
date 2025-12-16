/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Instagram Feed Demo
 * Integrazione feed Instagram nel menu digitale
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  RefreshCw,
  ExternalLink,
  Settings,
  Check,
  Image,
  Grid3X3,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Mock Instagram posts
const mockPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    caption: "La nostra Margherita DOC 🍕 Pomodoro San Marzano, mozzarella di bufala, basilico fresco. #pizza #italianfood",
    likes: 234,
    comments: 18,
    date: "2 ore fa"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
    caption: "Insalata Caesar con pollo grigliato 🥗 Freschezza e gusto! #healthy #salad",
    likes: 156,
    comments: 12,
    date: "5 ore fa"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    caption: "Tagliata di Black Angus con rucola e scaglie di parmigiano 🥩 #steak #gourmet",
    likes: 312,
    comments: 24,
    date: "1 giorno fa"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    caption: "Cocktail time! 🍹 Il nostro Aperol Spritz è pronto per il weekend #aperitivo #cocktails",
    likes: 189,
    comments: 15,
    date: "1 giorno fa"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop",
    caption: "Pasta alla Carbonara 🍝 La ricetta tradizionale romana. Guanciale, pecorino, uovo. #carbonara #roma",
    likes: 445,
    comments: 32,
    date: "2 giorni fa"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    caption: "Tiramisù della casa 🍰 Fatto con amore ogni giorno! #dessert #tiramisu",
    likes: 267,
    comments: 21,
    date: "3 giorni fa"
  },
];

const stats = [
  { label: "Follower", value: "12.4K" },
  { label: "Post", value: "234" },
  { label: "Engagement", value: "4.2%" },
];

export const InstagramContent = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [showInMenu, setShowInMenu] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Instagram Feed</h2>
            <p className="text-muted-foreground">@ristorante_nestify</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sincronizza
          </Button>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Apri Instagram
            </Button>
          </a>
        </div>
      </div>

      {/* Stats & Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Statistiche Account</h3>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Stato connessione</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isConnected ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
              }`}>
                {isConnected ? "Connesso" : "Disconnesso"}
              </span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Impostazioni Feed</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Auto-sincronizzazione</p>
                <p className="text-sm text-muted-foreground">Aggiorna automaticamente ogni ora</p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Mostra nel Menu</p>
                <p className="text-sm text-muted-foreground">Visualizza feed nella homepage</p>
              </div>
              <Switch checked={showInMenu} onCheckedChange={setShowInMenu} />
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Post Recenti</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("carousel")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "carousel" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedPost(post)}
            className="group relative rounded-xl overflow-hidden cursor-pointer bg-card border border-border"
          >
            <div className="aspect-square relative">
              <img 
                src={post.image} 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white">
                  <span className="flex items-center gap-1">
                    <Heart className="w-5 h-5 fill-white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5" /> {post.comments}
                  </span>
                </div>
              </div>
            </div>
            {viewMode === "carousel" && (
              <div className="p-4">
                <p className="text-sm text-foreground line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between mt-3 text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <MessageCircle className="w-4 h-4" /> {post.comments}
                    </span>
                  </div>
                  <span className="text-xs">{post.date}</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                <img 
                  src={selectedPost.image} 
                  alt="" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">ristorante_nestify</p>
                      <p className="text-xs text-muted-foreground">{selectedPost.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground flex-1">{selectedPost.caption}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Heart className="w-5 h-5" /> {selectedPost.likes}
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <MessageCircle className="w-5 h-5" /> {selectedPost.comments}
                      </button>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
