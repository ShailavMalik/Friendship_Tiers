import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FriendRecognitionPopup Component
 * Animated popup to celebrate recognized friends
 * @param {object} friendInfo - Friend tier information { tier, displayName }
 * @param {boolean} isVisible - Whether popup should be shown
 * @param {function} onClose - Callback when popup is dismissed
 */
const FriendRecognitionPopup = ({ friendInfo, isVisible, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (isVisible && friendInfo) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, friendInfo, onClose]);

  if (!friendInfo) return null;

  const getTierEmoji = (tier) => {
    switch (tier) {
      case "BFF":
        return "🎉💫";
      case "Close Friends":
        return "🔥🫂";
      case "Friends":
        return "🤝✨";
      default:
        return "🎊";
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "BFF":
        return "from-cyan-400 via-blue-500 to-purple-600";
      case "Close Friends":
        return "from-pink-400 via-orange-500 to-yellow-500";
      case "Friends":
        return "from-blue-400 via-cyan-500 to-teal-500";
      default:
        return "from-purple-400 via-pink-500 to-red-500";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={
              isMobile
                ? {
                    duration: 0.3,
                  }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }
            }
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/20 max-w-lg w-full p-8 pointer-events-auto"
              animate={
                !isMobile
                  ? {
                      boxShadow: [
                        "0 0 60px rgba(168, 85, 247, 0.4)",
                        "0 0 80px rgba(236, 72, 153, 0.6)",
                        "0 0 60px rgba(168, 85, 247, 0.4)",
                      ],
                    }
                  : undefined
              }
              transition={
                !isMobile ? { duration: 2, repeat: Infinity } : undefined
              }>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full">
                ×
              </button>

              {/* Confetti Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(isMobile ? 8 : 15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{
                      top: "-10%",
                      left: `${Math.random() * 100}%`,
                      rotate: Math.random() * 360,
                    }}
                    animate={{
                      top: "110%",
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: isMobile ? 4 : 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "linear",
                    }}>
                    {
                      ["🎉", "✨", "🎊", "💫", "⭐", "🌟"][
                        Math.floor(Math.random() * 6)
                      ]
                    }
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Emoji Banner */}
                <motion.div
                  initial={{ scale: 0, rotate: isMobile ? 0 : -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={
                    isMobile
                      ? {
                          duration: 0.3,
                          delay: 0.1,
                        }
                      : {
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }
                  }
                  className="text-7xl mb-4">
                  {getTierEmoji(friendInfo.tier)}
                </motion.div>

                {/* Main Message */}
                <motion.h2
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.15 : 0.3, duration: 0.4 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Space_Grotesk']">
                  Welcome Back!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: isMobile ? 0.2 : 0.4, duration: 0.3 }}
                  className="mb-4">
                  <p className="text-xl text-white/90 mb-2">
                    Hey{" "}
                    <span className="font-bold text-yellow-300">
                      {friendInfo.displayName}
                    </span>
                    ! 👋
                  </p>
                </motion.div>

                {/* Tier Badge */}
                <motion.div
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.25 : 0.5, duration: 0.3 }}
                  className="relative inline-block mb-6">
                  <div
                    className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${getTierColor(
                      friendInfo.tier
                    )} shadow-2xl`}>
                    <p className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
                      You're already a
                    </p>
                    <p className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mt-1">
                      {friendInfo.tier}
                    </p>
                    <p className="text-xl font-bold text-white/90 drop-shadow-md mt-1">
                      {/* Personalized Message */}
                      {friendInfo.message && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: isMobile ? 0.3 : 0.55,
                            duration: 0.3,
                          }}
                          className="text-white/90 text-lg italic mb-4 px-4">
                          {friendInfo.message}
                        </motion.p>
                      )}
                      of Shailav! 🎉
                    </p>
                  </div>

                  {/* Glow Effect - simplified on mobile */}
                  {!isMobile && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getTierColor(
                        friendInfo.tier
                      )} blur-xl -z-10`}
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/80 text-sm">
                  Feel free to explore other tiers or enjoy your current perks!
                  ✨
                </motion.p>

                {/* Auto-dismiss indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6">
                  <motion.div
                    className="h-1 bg-white/20 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}>
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </motion.div>
                  <p className="text-white/60 text-xs mt-2">
                    Auto-closing in 5 seconds...
                  </p>
                </motion.div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/20 to-transparent rounded-br-3xl" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FriendRecognitionPopup;
