import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FriendDataPanel from "./FriendDataPanel";

/**
 * Footer Component
 * Enhanced footer with social links, stats, and professional design
 */
const Footer = () => {
  const [showFriendData, setShowFriendData] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const PASSWORD = "Gemini@123"; // Client-side (visible) – fine for casual gating

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  const socialLinks = [
    {
      name: "GitHub",
      icon: "🐙",
      url: "https://github.com/ShailavMalik",
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/shailavmalik",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "https://twitter.com/shailavmalik",
      color: "from-sky-500 to-blue-600",
    },
    {
      name: "Instagram",
      icon: "📸",
      url: "https://instagram.com/shailavmalik",
      color: "from-pink-600 to-purple-600",
    },
  ];

  const stats = [
    { label: "Friendship Tiers", value: "7" },
    { label: "Happy Friends", value: "∞" },
    { label: "Chai Cups", value: "1000+" },
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-transparent via-black/30 to-black/60 backdrop-blur-xl border-t border-white/10">
      {/* Visible trigger button (password protected) */}
      <button
        aria-label="Open friend data password gate"
        onClick={() => {
          setAuthVisible(true);
          setAuthError("");
          setPasswordInput("");
        }}
        className="absolute right-2 bottom-2 text-[11px] px-2 py-1 rounded bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition">
        Friend Data
      </button>
      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isMobile ? { opacity: 1, y: 0 } : undefined}
          whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
          viewport={!isMobile ? { once: true, amount: 0.3 } : undefined}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={!isMobile ? { scale: 1.05, y: -5 } : undefined}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2 font-['Space_Grotesk']">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white/60 font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Footer Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isMobile ? { opacity: 1, scale: 1 } : undefined}
            whileInView={!isMobile ? { opacity: 1, scale: 1 } : undefined}
            viewport={!isMobile ? { once: true, amount: 0.3 } : undefined}
            transition={{ duration: 0.5 }}
            className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-4xl">
                ✨
              </motion.span>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-['Space_Grotesk']">
                Friendship Offers™
              </h3>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-4xl">
                ✨
              </motion.span>
            </div>
            <p className="text-white/70 text-lg mb-2">
              Where Every Connection Counts 💖
            </p>
            <p className="text-white/50 text-sm italic">
              Choose your tier wisely - Friendship is an investment!
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={!isMobile ? { once: true, amount: 0.3 } : undefined}
            transition={{ delay: 0.2 }}
            className="mb-8">
            <p className="text-white/60 text-sm mb-4 font-semibold">
              Connect with Shailav
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={!isMobile ? { scale: 1.1, y: -3 } : undefined}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative px-5 py-3 bg-gradient-to-r ${link.color} rounded-xl shadow-lg hover:shadow-2xl transition-all border border-white/20`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{link.icon}</span>
                    <span className="text-white font-semibold text-sm hidden md:inline">
                      {link.name}
                    </span>
                  </div>
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isMobile ? { scaleX: 1 } : undefined}
            whileInView={!isMobile ? { scaleX: 1 } : undefined}
            viewport={!isMobile ? { once: true, amount: 0.3 } : undefined}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"
          />

          {/* Creator Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isMobile ? { opacity: 1 } : undefined}
            whileInView={!isMobile ? { opacity: 1 } : undefined}
            viewport={!isMobile ? { once: true, amount: 0.3 } : undefined}
            transition={{ delay: 0.3 }}
            className="mb-6">
            <p className="text-white/80 text-lg font-semibold mb-3">
              Crafted with <span className="text-red-400">❤️</span>,{" "}
              <span className="text-amber-400">☕</span> &{" "}
              <span className="text-purple-400">Code</span>
            </p>
            <p className="text-white/70 text-base">
              by <span className="font-bold text-white">Shailav Malik</span>
            </p>
          </motion.div>

          {/* Fun Icons */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl mb-6 space-x-3">
            <span>☕</span>
            <span>💻</span>
            <span>🎓</span>
            <span>🏏</span>
            <span>🎬</span>
            <span>📚</span>
          </motion.div>

          {/* Copyright & Legal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isMobile ? { opacity: 1 } : undefined}
            whileInView={!isMobile ? { opacity: 1 } : undefined}
            viewport={!isMobile ? { once: true, amount: 0.3 } : undefined}
            transition={{ delay: 0.4 }}
            className="space-y-2">
            <p className="text-white/60 text-sm font-medium">
              © 2025 Friendship Offers™ • All rights reserved
            </p>
            <p className="text-white/40 text-xs italic max-w-2xl mx-auto">
              *Actual friendship quality may vary based on mood, time, chai
              availability, and exam season stress levels. No refunds,
              exchanges, or downgrades allowed once committed. 😄
            </p>
            <p className="text-white/30 text-xs mt-4">
              Built with React • Tailwind CSS • Framer Motion • Love
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-t from-purple-500/20 via-pink-500/10 to-transparent blur-3xl pointer-events-none" />
      {/* Password Gate Overlay */}
      {authVisible && !showFriendData && (
        <div className="fixed inset-0 z-[190] flex items-end justify-end p-4 pointer-events-none">
          <div className="pointer-events-auto w-64 bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-pink-900/90 border border-white/20 rounded-xl shadow-xl p-4 text-white text-xs space-y-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-[13px]">Enter Password</span>
              <button
                onClick={() => setAuthVisible(false)}
                className="text-white/40 hover:text-white/70 text-xs">
                ✕
              </button>
            </div>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-[12px] focus:outline-none focus:border-pink-300 placeholder-white/30"
            />
            {authError && (
              <p className="text-red-400 text-[11px]">{authError}</p>
            )}
            <button
              onClick={() => {
                if (passwordInput === PASSWORD) {
                  setShowFriendData(true);
                  setAuthVisible(false);
                } else {
                  setAuthError("Invalid password.");
                }
              }}
              className="w-full bg-white/20 hover:bg-white/30 rounded py-1 text-[12px] font-semibold transition">
              Unlock
            </button>
            <p className="text-white/40 text-[10px] italic">
              Private manual list.
            </p>
          </div>
        </div>
      )}
      <FriendDataPanel
        visible={showFriendData}
        onClose={() => {
          setShowFriendData(false);
          setAuthVisible(false);
        }}
      />
    </footer>
  );
};

export default Footer;
