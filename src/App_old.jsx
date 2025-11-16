import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import TierCard from "./components/TierCard";
import ModalForm from "./components/ModalForm";
import Footer from "./components/Footer";
import WelcomeScreen from "./components/WelcomeScreen";
import Navigation from "./components/Navigation";
import AboutMe from "./components/AboutMe";
import LoadingScreen from "./components/LoadingScreen";

/**
 * Main App Component
 * Manages the state and renders all tiers with their respective data
 */
function App() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [hasGFTier, setHasGFTier] = useState(false);
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  const handleWelcomeSubmit = (name) => {
    setUserName(name);
    setShowWelcome(false);
  };

  // Tier data with all perks, gradients, and configurations
  const tiers = [
    {
      id: 1,
      name: "Anonymous",
      price: "Free",
      emoji: "👻",
      mainPerks: [
        "Occasional nods in the hallway",
        "Watched WhatsApp status once",
        "Emergency nod during tests",
      ],
      allPerks: [
        "Occasional nods in the hallway",
        "Watched WhatsApp status once if mood permits",
        "May help if free and mood good",
        "Emergency nod during surprise tests",
        "Secretly knows your drama but won't confirm",
      ],
      buttonText: "Stay Hidden",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      disabled: false,
    },
    {
      id: 2,
      name: "Just Knowing",
      price: "1 Cutting Chai",
      emoji: "☕",
      mainPerks: [
        "Member of group chat (mostly lurks)",
        "Likes posts occasionally",
        "Wishes on birthdays",
      ],
      allPerks: [
        "Member of group chat (mostly lurks)",
        "Likes posts occasionally, especially festivals",
        "Wishes on birthdays (sometimes late)",
        "Small talks in corridor/canteen",
      ],
      buttonText: "Know Me Better",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      disabled: false,
    },
    {
      id: 3,
      name: "Friends",
      price: "5 Cutting Chai Runs",
      emoji: "🤝",
      mainPerks: [
        "Regular chai and samosa hangouts",
        "Shares memes and reels",
        "Weekend adda sessions",
      ],
      allPerks: [
        "Regular chai and samosa hangouts",
        "Shares Bollywood and campus memes",
        "Homework/project help (except last minute)",
        "Weekend adda and cricket matches",
        "Netflix password sharing",
      ],
      buttonText: "Be My Friend",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      disabled: false,
    },
    {
      id: 4,
      name: "Close Friends",
      price: "10 Irani Cafe Snacks",
      emoji: "🍛",
      mainPerks: [
        "All Friends perks +",
        "2AM crisis calls",
        "Room key holder",
        "Group project MVP",
      ],
      allPerks: [
        "All Friends perks",
        "2AM crisis calls",
        "Knows family & exam stress details",
        "Defends you from trolls",
        "Steals your lunch guilt-free",
        "Room key holder",
        'Calls you "bhai/sis/yaar"',
        "Group project MVP and canteen partner",
        "Covers for attendance roll calls",
      ],
      buttonText: "Become Close Friend",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      disabled: false,
      badge: "🔥 PREMIUM",
    },
    {
      id: 5,
      name: "BFF (Best Friend Forever)",
      price: "15 Pizza Parties",
      emoji: "🎉",
      mainPerks: [
        "All Close Friends perks +",
        "Late night deep conversations",
        "Knows all your secrets",
        "Travel buddy for life",
      ],
      allPerks: [
        "All Close Friends perks",
        "Late night deep conversations",
        "Knows all your secrets and keeps them",
        "Defends you in every argument",
        "Travel buddy for life",
        "Shares clothes and accessories",
        "FaceTime calls anytime",
        "Your personal hype person",
        "Emergency contact #1",
        "Inside jokes forever",
      ],
      buttonText: "Become My BFF",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      disabled: false,
      badge: "✨ BESTIES",
    },
    {
      id: 6,
      name: "GF",
      price: "Lifetime Commitment",
      emoji: "💖",
      mainPerks: [
        "All Close Friends perks +",
        "24/7 availability guaranteed",
        "Priority in life decisions",
        "Emotional support system",
      ],
      allPerks: [
        "All Close Friends perks",
        "24/7 availability; no battery excuses",
        "Priority in chats and life decisions",
        "Emotional mentor and study buddy",
        "100% exam assistance & notes",
        "Roasts lovingly",
        "Fights your battles",
        "Remembers embarrassing moments",
        "Road trip & chai stops companion",
        "Semester motivation & stress relief",
      ],
      buttonText: "Apply for GF Role",
      gradient:
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffc3a0 100%)",
      disabled: false,
      badge: "💖 ULTRA PREMIUM",
      isGF: true,
    },
    {
      id: 7,
      name: "Soulmate",
      price: "VIP",
      emoji: "👑",
      mainPerks: [
        "All GF perks permanently",
        "Instant 2-min replies forever",
        "Life coach & career mentor",
        "Forever & always",
      ],
      allPerks: [
        "All GF perks permanently",
        "Instant 2-min replies forever",
        "Priority in all major life decisions",
        "Campus legend & batch influencer",
        "Life coach & career mentor",
        "Job & relationship advisor",
        "Emergency contact & chai provider for life",
        "Organizes surprise parties & travel",
        "Unofficial therapist & cheerleader",
        "Binding contract: no downgrade, no ghosting",
        "Present in all milestones forever",
      ],
      buttonText: hasGFTier
        ? "Unlock Soulmate"
        : "Unlock Soulmate (Requires GF Tier)",
      gradient:
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff6e7f 100%)",
      disabled: !hasGFTier,
      badge: "👑 LIFETIME VIP",
    },
  ];

  // Handle tier selection
  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    // Unlock Soulmate tier if GF tier is selected
    if (tier.id === 6) {
      setHasGFTier(true);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedTier(null);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (showWelcome) {
    return <WelcomeScreen onSubmit={handleWelcomeSubmit} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 animate-gradient"></div>

      {/* Floating Shapes Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Animated Pattern Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Sparkle Effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">
        {/* Conditional Rendering based on Active Tab */}
        {activeTab === "about" ? (
          <AboutMe />
        ) : (
          <>
            <Header userName={userName} />

            {/* Tiers Grid */}
            <main className="container mx-auto px-4 pb-12 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, index) => (
              <TierCard
                key={tier.id}
                tier={tier}
                index={index}
                onSelectTier={handleSelectTier}
                userName={userName}
              />
            ))}
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            className="mt-12 max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center text-white shadow-2xl border border-white/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block text-4xl mb-4">
              🎯
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 font-['Space_Grotesk'] text-gradient from-yellow-300 via-pink-300 to-purple-300">
              How It Works
            </h3>
            <p className="text-base md:text-lg leading-relaxed">
              Choose your desired friendship tier and fill out the form! Each
              tier offers unique perks tailored to your connection level.
              <span className="block mt-3 font-semibold text-yellow-300">
                Start with a chai and work your way up! ☕✨
              </span>
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-4 mt-6 text-3xl">
              {["☕", "🍛", "💖", "👑"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}>
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </main>
          </>
        )}

        <Footer />
      </div>

      {/* Modal Form */}
      {selectedTier && (
        <ModalForm 
          selectedTier={selectedTier} 
          onClose={handleCloseModal}
          userName={userName}
        />
      )}
    </div>
  );
}

export default App;
