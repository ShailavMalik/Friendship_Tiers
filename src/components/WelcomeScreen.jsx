import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * WelcomeScreen Component
 * Initial screen to capture user's name before showing tiers
 */
const WelcomeScreen = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Welcome Card */}
        <motion.div
          initial={{ scale: 0.5, rotateY: -180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 1,
          }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md w-full mx-4"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}>
          {/* Glowing Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-20 blur-2xl animate-pulse-slow"></div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-8xl text-center mb-6">
            👋
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4 font-['Space_Grotesk']"
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.5)",
            }}>
            Welcome!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 text-center mb-8 text-lg">
            Let's start this friendship journey! ✨
          </motion.p>

          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}>
              <label
                htmlFor="userName"
                className="block text-white text-sm font-semibold mb-3 text-center">
                What's your name?
              </label>
              <input
                type="text"
                id="userName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl text-white placeholder-white/50 text-center text-xl font-semibold focus:border-white/60 focus:ring-4 focus:ring-white/20 transition-all outline-none"
                placeholder="Enter your name"
                autoFocus
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full mt-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">Let's Go! 🚀</span>
            </motion.button>
          </form>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen;
