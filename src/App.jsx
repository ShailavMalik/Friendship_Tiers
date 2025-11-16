import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import TierCard from "./components/TierCard";
import ModalForm from "./components/ModalForm";
import Footer from "./components/Footer";
import WelcomeScreen from "./components/WelcomeScreen";
import Navigation from "./components/Navigation";
import AboutMe from "./components/AboutMe";
import LoadingScreen from "./components/LoadingScreen";
import FriendRecognitionPopup from "./components/FriendRecognitionPopup";
import { findFriendTier } from "./data/friendsData";

function App() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [hasGFTier, setHasGFTier] = useState(false);
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [friendInfo, setFriendInfo] = useState(null);
  const [showFriendPopup, setShowFriendPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleWelcomeSubmit = (name) => {
    setUserName(name);
    setShowWelcome(false);

    // Check if this is a known friend
    const recognized = findFriendTier(name);
    if (recognized) {
      setFriendInfo(recognized);
      // Show popup after a short delay to let welcome screen close
      setTimeout(() => {
        setShowFriendPopup(true);
      }, 500);
    }
  };

  const tiers = [
    {
      id: 1,
      name: "Anonymous",
      price: "Free",
      emoji: "👻",
      icon: "🤫",
      cursorEmoji: "👻",
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
      gradient:
        "linear-gradient(135deg, #6366F1 0%, #8B5CF6 45%, #EC4899 100%)",
      disabled: false,
    },
    {
      id: 2,
      name: "Just Knowing",
      price: "1 Cutting Chai",
      emoji: "☕",
      icon: "👋",
      cursorEmoji: "☕",
      mainPerks: [
        "Basic recognition in hallway",
        "Wishes on birthdays (sometimes late)",
        "Occasional emoji reactions",
      ],
      allPerks: [
        "Basic recognition in hallway",
        "Emoji reactions to stories",
        "Wishes on birthdays (sometimes late)",
        "May respond if tagged in group",
      ],
      buttonText: "Know Me Better",
      gradient:
        "linear-gradient(135deg, #F59E0B 0%, #F97316 45%, #EF4444 100%)",
      disabled: false,
    },
    {
      id: 3,
      name: "Close Acquaintance",
      price: "2 Cutting Chai",
      emoji: "👀",
      icon: "🧑‍🤝‍🧑",
      cursorEmoji: "👀",
      mainPerks: [
        "Member of group chat (mostly lurks)",
        "Small talks in corridor/canteen",
        "Likes posts occasionally",
      ],
      allPerks: [
        "Member of group chat (mostly lurks)",
        "Small talks in corridor/canteen",
        "Replies to reels sometimes",
        "Likes posts occasionally, especially festivals",
        "Will wave from a distance",
        "Might share exam doubts last minute",
      ],
      buttonText: "Get Closer",
      gradient:
        "linear-gradient(135deg, #34D399 0%, #10B981 40%, #06B6D4 100%)",
      disabled: false,
    },
    {
      id: 4,
      name: "Friends",
      price: "5 Cutting Chai Runs",
      emoji: "🤝",
      icon: "🤜🤛",
      cursorEmoji: "🤝",
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
      gradient:
        "linear-gradient(135deg, #0EA5E9 0%, #6366F1 50%, #8B5CF6 100%)",
      disabled: false,
    },
    {
      id: 5,
      name: "Close Friends",
      price: "10 Irani Cafe Snacks",
      emoji: "🍛",
      icon: "🫂",
      cursorEmoji: "🍛",
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
      gradient:
        "linear-gradient(135deg, #F43F5E 0%, #FB7185 40%, #FBBF24 100%)",
      disabled: false,
      badge: "🔥 PREMIUM",
    },
    {
      id: 6,
      name: "BFF (Best Friend Forever)",
      price: "15 Pizza Parties",
      emoji: "🎉",
      icon: "💫",
      cursorEmoji: "🎉",
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
      gradient:
        "linear-gradient(135deg, #06B6D4 0%, #3B82F6 40%, #6366F1 75%, #A78BFA 100%)",
      disabled: false,
      badge: "✨ BESTIES",
    },
    {
      id: 7,
      name: "GF",
      price: "Lifetime Commitment",
      emoji: "💖",
      icon: "❤️",
      cursorEmoji: "💖",
      mainPerks: [
        "All BFF perks +",
        "24/7 availability guaranteed",
        "Priority in life decisions",
        "Emotional support system",
      ],
      allPerks: [
        "All BFF perks",
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
        "linear-gradient(135deg, #EC4899 0%, #DB2777 40%, #F472B6 70%, #FDE68A 100%)",
      disabled: false,
      badge: "💖 ULTRA PREMIUM",
      isGF: true,
    },
    {
      id: 8,
      name: "Soulmate",
      price: "VIP",
      emoji: "👑",
      icon: "💍",
      cursorEmoji: "👑",
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
        "linear-gradient(135deg, #FDE68A 0%, #FBBF24 25%, #F59E0B 50%, #F97316 75%, #EF4444 100%)",
      disabled: !hasGFTier,
      badge: "👑 LIFETIME VIP",
    },
  ];

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    // GF tier now id 7 after insertion
    if (tier.id === 7) {
      setHasGFTier(true);
    }
  };

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
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className="fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #1a0b2e 0%, #0f0720 50%, #050208 100%)",
        }}></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Reduce animations on mobile for performance */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.3, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(139, 92, 246, 0.4), transparent)",
          }}
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 1.4, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/4 w-[900px] h-[900px] rounded-full blur-[120px] opacity-30 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(168, 85, 247, 0.4), transparent)",
          }}
        />
        {/* Show fewer orbs on mobile */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.5, 1.2, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full blur-[100px] opacity-25 will-change-transform hidden md:block"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 146, 60, 0.5), rgba(244, 114, 182, 0.4), transparent)",
          }}
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -50, 0],
            scale: [1, 1.3, 1.15, 1],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/3 w-[750px] h-[750px] rounded-full blur-[110px] opacity-25 will-change-transform hidden md:block"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.4), transparent)",
          }}
        />
      </div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10 hidden md:block">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            backgroundPosition: {
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            },
            opacity: { duration: 8, repeat: Infinity },
          }}
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      {/* Reduce particles on mobile */}
      {[...Array(isMobile ? 10 : 30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none will-change-transform"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background:
              i % 3 === 0
                ? "rgba(236, 72, 153, 0.6)"
                : i % 3 === 1
                ? "rgba(139, 92, 246, 0.6)"
                : "rgba(59, 130, 246, 0.6)",
            boxShadow:
              i % 3 === 0
                ? "0 0 15px rgba(236, 72, 153, 0.8)"
                : i % 3 === 1
                ? "0 0 15px rgba(139, 92, 246, 0.8)"
                : "0 0 15px rgba(59, 130, 246, 0.8)",
          }}
          animate={{
            y: [0, Math.random() * -200 - 100, Math.random() * -400 - 200],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        />
      ))}
      <div className="relative z-10">
        {activeTab === "about" ? (
          <AboutMe />
        ) : (
          <>
            <Header userName={userName} friendInfo={friendInfo} />
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={!isMobile ? { scale: 1.02, y: -3 } : undefined}
                className="mt-12 max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-[2px] shadow-2xl">
                {/* Animated border gradient - simplified on mobile */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)",
                    backgroundSize: "300% 300%",
                  }}
                  animate={
                    !isMobile
                      ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                      : undefined
                  }
                  transition={
                    !isMobile
                      ? {
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }
                      : undefined
                  }
                />

                {/* Glowing aura - disabled on mobile */}
                {!isMobile && (
                  <motion.div
                    className="absolute -inset-2 rounded-3xl blur-2xl opacity-50"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(236, 72, 153, 0.6), rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6))",
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.98, 1.02, 0.98],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                )}

                <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 text-center text-white">
                  {/* Holographic shimmer - disabled on mobile */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background:
                          "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
                      }}
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  <motion.div
                    animate={
                      !isMobile
                        ? {
                            rotate: 360,
                            scale: [1, 1.1, 1],
                          }
                        : {
                            scale: [1, 1.05, 1],
                          }
                    }
                    transition={
                      !isMobile
                        ? {
                            rotate: {
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }
                        : {
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }
                    }
                    className="inline-block text-6xl mb-6 relative"
                    style={{
                      filter: isMobile
                        ? "drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))"
                        : "drop-shadow(0 0 20px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.6))",
                    }}>
                    🎯
                  </motion.div>
                  <h3
                    className="text-4xl font-bold mb-6 font-['Space_Grotesk'] relative"
                    style={{
                      background:
                        "linear-gradient(135deg, #ffffff, #ec4899, #8b5cf6, #3b82f6, #ffffff)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                    <motion.span
                      animate={{
                        backgroundPosition: ["0% center", "200% center"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background:
                          "linear-gradient(135deg, #ffffff, #ec4899, #8b5cf6, #3b82f6, #ffffff)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                      How It Works
                    </motion.span>
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed relative text-white/90">
                    Choose your desired friendship tier and fill out the form!
                    Each tier offers unique perks tailored to your connection
                    level.
                    <span
                      className="block mt-4 font-bold text-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #fbbf24, #f472b6, #c084fc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 15px rgba(251, 191, 36, 0.5))",
                      }}>
                      Start with a chai and work your way up! ☕✨
                    </span>
                  </p>
                  <div className="flex justify-center gap-6 mt-8 text-4xl relative">
                    {["☕", "🍛", "💖", "👑"].map((emoji, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          y: [0, -15, 0],
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        style={{
                          filter: `drop-shadow(0 0 10px ${
                            i === 0
                              ? "rgba(251, 146, 60, 0.8)"
                              : i === 1
                              ? "rgba(234, 179, 8, 0.8)"
                              : i === 2
                              ? "rgba(236, 72, 153, 0.8)"
                              : "rgba(251, 191, 36, 0.8)"
                          })`,
                        }}>
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </main>
          </>
        )}
        <Footer />
      </div>
      {selectedTier && (
        <ModalForm
          selectedTier={selectedTier}
          onClose={handleCloseModal}
          userName={userName}
        />
      )}
      <FriendRecognitionPopup
        friendInfo={friendInfo}
        isVisible={showFriendPopup}
        onClose={() => setShowFriendPopup(false)}
      />
    </div>
  );
}

export default App;
