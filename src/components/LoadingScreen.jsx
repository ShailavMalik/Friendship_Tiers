import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen Component
 * Optimized loading screen - mobile-friendly with reduced animations
 */
const LoadingScreen = ({ onComplete }) => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slogans = [
    "Building Bridges of Friendship... 🌉",
    "Crafting Connections... ✨",
    "Brewing Memories Over Chai... ☕",
    "Where Every Bond Matters... 💖",
    "Friendship: The Best Investment... 🎯",
  ];

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768);

    const sloganInterval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 2000);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2.5;
      });
    }, 40);

    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(sloganInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ exit: { duration: 0.5 } }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, #1a0b2e 0%, #0a0118 100%)",
        }}>
        {/* Simplified Grid Background - Hidden on mobile */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
              }}
              animate={{
                backgroundPosition: ["0px 0px", "80px 80px"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        )}

        {/* Gradient Orbs - Reduced on mobile */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[80px] md:blur-[100px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.2), transparent)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[80px] md:blur-[100px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.2), transparent)",
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, 60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Reduced Particles - 8 on mobile, 20 on desktop */}
        {Array.from({ length: isMobile ? 8 : 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${isMobile ? 4 : 8}px rgba(168, 85, 247, 0.8)`,
            }}
            animate={{
              y: [0, Math.random() * 300 - 150],
              x: [0, Math.random() * 150 - 75],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Main Central Logo */}
        <div className="relative z-10 text-center px-4">
          {/* Glow Ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -m-16 md:-m-20"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}>
            <div
              className="w-52 h-52 md:w-72 md:h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, transparent 30%, rgba(139, 92, 246, 0.3) 60%, transparent 100%)",
                filter: isMobile ? "blur(20px)" : "blur(30px)",
              }}
            />
          </motion.div>

          {/* Main Holographic Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: 0.2,
            }}
            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center will-change-transform mb-12"
            style={{
              background: `linear-gradient(135deg, 
                rgba(236, 72, 153, 0.3),
                rgba(139, 92, 246, 0.3),
                rgba(59, 130, 246, 0.3),
                rgba(168, 85, 247, 0.3)
              )`,
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              boxShadow: `
                0 0 30px rgba(139, 92, 246, 0.5),
                inset 0 0 30px rgba(255, 255, 255, 0.1)
              `,
            }}>
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Central Handshake Emoji */}
            <motion.div
              className="text-6xl md:text-8xl z-10"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                filter: `drop-shadow(0 0 ${
                  isMobile ? 8 : 15
                }px rgba(236, 72, 153, 0.8))`,
              }}>
              🤝
            </motion.div>
          </motion.div>

          {/* Title with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-6 font-['Space_Grotesk']"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #ec4899 25%, #8b5cf6 50%, #3b82f6 75%, #ffffff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))",
            }}>
            Friendship Offers™
          </motion.h1>

          {/* Animated Slogan */}
          <div className="h-16 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlogan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #fbbf24, #f472b6, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                {slogans[currentSlogan]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-md mx-auto">
            {/* Percentage */}
            <motion.div
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              {Math.round(progress)}%
            </motion.div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)",
                  width: `${progress}%`,
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
                }}
              />

              {/* Shimmer on progress bar */}
              <motion.div
                className="absolute top-0 left-0 h-full w-20"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
                animate={{
                  x: ["-100%", "400%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
