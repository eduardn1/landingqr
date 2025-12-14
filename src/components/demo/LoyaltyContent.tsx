import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Gift,
  Target,
  Zap,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Users,
  Heart,
  Sparkles,
  ChevronRight,
  Plus,
  Check,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock loyalty program data
const loyaltyLevels = [
  { id: 1, name: "Bronze", minPoints: 0, maxPoints: 500, icon: Medal, color: "from-amber-600 to-amber-700", perks: ["5% sconto", "Accesso anticipato offerte"] },
  { id: 2, name: "Silver", minPoints: 500, maxPoints: 1500, icon: Award, color: "from-slate-400 to-slate-500", perks: ["10% sconto", "Consegna gratuita", "Dolce omaggio compleanno"] },
  { id: 3, name: "Gold", minPoints: 1500, maxPoints: 3000, icon: Trophy, color: "from-yellow-500 to-amber-500", perks: ["15% sconto", "Priority delivery", "Eventi VIP", "Menu segreto"] },
  { id: 4, name: "Platinum", minPoints: 3000, maxPoints: 999999, icon: Crown, color: "from-violet-500 to-purple-600", perks: ["20% sconto", "Chef's table", "Concierge dedicato", "Tutto Gold"] },
];

const mockCustomerLoyalty = {
  name: "Marco Rossi",
  points: 1250,
  level: "Silver",
  totalSpent: "€2,340",
  visits: 47,
  nextLevel: "Gold",
  pointsToNext: 250,
};

const challenges = [
  { id: 1, title: "Ordine del Weekend", desc: "Ordina sabato o domenica", reward: 50, progress: 0, max: 1, icon: Target, active: true },
  { id: 2, title: "Prova 3 Pizze", desc: "Ordina 3 pizze diverse", reward: 100, progress: 2, max: 3, icon: Star, active: true },
  { id: 3, title: "Porta un Amico", desc: "Fai iscrivere un amico", reward: 200, progress: 0, max: 1, icon: Users, active: true },
  { id: 4, title: "Settimana Perfetta", desc: "Ordina 5 giorni consecutivi", reward: 300, progress: 3, max: 5, icon: Zap, active: false },
];

const badges = [
  { id: 1, name: "Prima Visita", icon: Star, earned: true, date: "15 Gen 2024" },
  { id: 2, name: "Fedele", icon: Heart, earned: true, date: "28 Mar 2024" },
  { id: 3, name: "Esploratore", icon: Target, earned: true, date: "10 Apr 2024" },
  { id: 4, name: "VIP", icon: Crown, earned: false, date: null },
  { id: 5, name: "Influencer", icon: Users, earned: false, date: null },
  { id: 6, name: "Leggenda", icon: Trophy, earned: false, date: null },
];

const rewards = [
  { id: 1, name: "Sconto 10%", points: 200, icon: Gift, available: true },
  { id: 2, name: "Bevanda Gratis", points: 150, icon: Sparkles, available: true },
  { id: 3, name: "Dolce Omaggio", points: 300, icon: Gift, available: true },
  { id: 4, name: "Consegna Gratis", points: 100, icon: Zap, available: true },
  { id: 5, name: "Cena per 2", points: 1000, icon: Heart, available: false },
];

const leaderboard = [
  { rank: 1, name: "Lucia V.", points: 4520, avatar: "LV" },
  { rank: 2, name: "Giuseppe M.", points: 3890, avatar: "GM" },
  { rank: 3, name: "Marco R.", points: 1250, avatar: "MR", isYou: true },
  { rank: 4, name: "Anna B.", points: 980, avatar: "AB" },
  { rank: 5, name: "Paolo S.", points: 720, avatar: "PS" },
];

export const LoyaltyContent = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "challenges" | "rewards" | "leaderboard">("overview");
  const [showConfetti, setShowConfetti] = useState(false);

  const currentLevel = loyaltyLevels.find(l => 
    mockCustomerLoyalty.points >= l.minPoints && mockCustomerLoyalty.points < l.maxPoints
  ) || loyaltyLevels[0];
  
  const nextLevel = loyaltyLevels.find(l => l.minPoints > mockCustomerLoyalty.points);
  const progressToNext = nextLevel 
    ? ((mockCustomerLoyalty.points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  const handleRedeemReward = (rewardId: number) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  scale: 1
                }}
                animate={{ 
                  opacity: 0, 
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  scale: 0
                }}
                transition={{ duration: 1.5, delay: Math.random() * 0.5 }}
                className="absolute text-2xl"
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                {["🎊", "⭐", "🏆", "💫", "✨"][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center shadow-lg`}>
                <currentLevel.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Livello attuale</p>
                <h3 className="text-2xl font-bold">{currentLevel.name}</h3>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{mockCustomerLoyalty.points} punti</span>
                {nextLevel && <span>{nextLevel.minPoints} punti</span>}
              </div>
              <Progress value={progressToNext} className="h-3 bg-white/20" />
            </div>
            
            {nextLevel && (
              <p className="text-sm text-white/80">
                <span className="font-bold text-white">{mockCustomerLoyalty.pointsToNext} punti</span> per raggiungere {nextLevel.name}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">Punti totali</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{mockCustomerLoyalty.points}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">Visite totali</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{mockCustomerLoyalty.visits}</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "overview", label: "Panoramica", icon: Trophy },
          { id: "challenges", label: "Sfide", icon: Target },
          { id: "rewards", label: "Premi", icon: Gift },
          { id: "leaderboard", label: "Classifica", icon: Crown },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Levels */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Livelli Loyalty</h3>
              <div className="space-y-4">
                {loyaltyLevels.map((level) => {
                  const Icon = level.icon;
                  const isCurrentOrPast = mockCustomerLoyalty.points >= level.minPoints;
                  return (
                    <div key={level.id} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${isCurrentOrPast ? "bg-primary/5" : "bg-muted/50"}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center ${!isCurrentOrPast && "opacity-40"}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold ${isCurrentOrPast ? "text-foreground" : "text-muted-foreground"}`}>{level.name}</p>
                        <p className="text-xs text-muted-foreground">{level.minPoints}+ punti</p>
                      </div>
                      {currentLevel.id === level.id && (
                        <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          Attuale
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badges */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Badge Ottenuti</h3>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.05 }}
                      className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                        badge.earned ? "bg-primary/10" : "bg-muted/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        badge.earned 
                          ? "bg-gradient-to-br from-amber-500 to-orange-500" 
                          : "bg-muted border-2 border-dashed border-border"
                      }`}>
                        {badge.earned ? (
                          <Icon className="w-6 h-6 text-white" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className={`text-xs font-medium text-center ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>
                        {badge.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "challenges" && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Sfide Attive</h3>
              <span className="text-sm text-muted-foreground">Si resettano ogni settimana</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {challenges.map((challenge) => {
                const Icon = challenge.icon;
                const isComplete = challenge.progress >= challenge.max;
                return (
                  <motion.div
                    key={challenge.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-5 rounded-2xl border transition-all ${
                      isComplete 
                        ? "bg-success/10 border-success/30" 
                        : challenge.active 
                          ? "bg-card border-border hover:border-primary/30" 
                          : "bg-muted/50 border-border opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isComplete 
                          ? "bg-success" 
                          : "bg-gradient-to-br from-primary/20 to-primary/10"
                      }`}>
                        {isComplete ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-foreground">{challenge.title}</h4>
                          <span className="text-sm font-bold text-primary">+{challenge.reward} pt</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{challenge.desc}</p>
                        <div className="flex items-center gap-2">
                          <Progress value={(challenge.progress / challenge.max) * 100} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">{challenge.progress}/{challenge.max}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "rewards" && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Riscatta Premi</h3>
              <span className="text-sm text-muted-foreground">
                <Star className="w-4 h-4 inline mr-1 text-amber-500" />
                {mockCustomerLoyalty.points} punti disponibili
              </span>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => {
                const Icon = reward.icon;
                const canRedeem = mockCustomerLoyalty.points >= reward.points && reward.available;
                return (
                  <motion.div
                    key={reward.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-5 rounded-2xl border transition-all ${
                      canRedeem 
                        ? "bg-card border-border hover:border-primary/30" 
                        : "bg-muted/50 border-border opacity-60"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                        canRedeem 
                          ? "bg-gradient-to-br from-primary to-primary/80" 
                          : "bg-muted"
                      }`}>
                        <Icon className={`w-8 h-8 ${canRedeem ? "text-white" : "text-muted-foreground"}`} />
                      </div>
                      <h4 className="font-bold text-foreground mb-1">{reward.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{reward.points} punti</p>
                      <Button
                        size="sm"
                        disabled={!canRedeem}
                        onClick={() => handleRedeemReward(reward.id)}
                        className={canRedeem ? "w-full" : "w-full opacity-50"}
                      >
                        {canRedeem ? "Riscatta" : "Punti insufficienti"}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "leaderboard" && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Classifica Mensile</h3>
            <div className="space-y-3">
              {leaderboard.map((user, i) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                    user.isYou 
                      ? "bg-primary/10 border border-primary/30" 
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    user.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white" :
                    user.rank === 2 ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white" :
                    user.rank === 3 ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {user.name} {user.isYou && <span className="text-primary">(Tu)</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{user.points.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">punti</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
