import React from "react";
import { motion } from "framer-motion";

/**
 * Header Component
 * Displays the main title and tagline with animated effects
 */
const Header = () => {
  return (
    <header className="text-center py-16 px-4 relative">
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
        className="text-6xl md:text-8xl font-bold text-white mb-6 font-['Space_Grotesk'] relative z-10"
        style={{
          textShadow:
            "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(138,43,226,0.5)",
        }}>
        <motion.span
          animate={{
            textShadow: [
              "0 0 40px rgba(255,255,255,0.3)",
              "0 0 60px rgba(255,255,255,0.5)",
              "0 0 40px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}>
          Friendship Offers™
        </motion.span>
      </motion.h1>

      {/* Subtitle with Gradient */}
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
        <motion.span
          className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 text-transparent bg-clip-text"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ backgroundSize: "200% auto" }}>
          by Shailav Malik
        </motion.span>
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 relative z-10">
        ☕ Choose Your Friendship Tier - Because Every Connection Has a Price!
        😄
      </motion.p>

      {/* Decorative Emoji Line */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8 text-5xl flex justify-center gap-6 relative z-10">
        {["👻", "☕", "🍛", "💖", "👑"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.3, rotate: 20 }}
            className="cursor-pointer filter drop-shadow-lg">
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-8 h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
      />
    </header>
  );
};

export default Header;
