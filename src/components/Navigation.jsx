import React from "react";
import { motion } from "framer-motion";

/**
 * Navigation Component
 * Responsive navigation bar with Home and About Me tabs
 * Desktop: Only About Me tab shown, logo is clickable for home
 * Mobile: Both Home and About Me tabs shown
 */
const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About Me", icon: "👤" },
  ];

  // On desktop, only show About Me tab
  const visibleTabs = tabs.filter(
    (tab) => tab.id === "about" || window.innerWidth < 768
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-pink-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Clickable on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setActiveTab("home")}
            className="flex items-center space-x-3 cursor-pointer select-none group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-3xl group-hover:scale-110 transition-transform">
              ✨
            </motion.div>
            <span className="text-xl md:text-2xl font-bold text-white font-['Space_Grotesk'] group-hover:text-pink-200 transition-colors">
              Friendship Offers™
            </span>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full p-1.5">
            {/* Home tab - mobile only */}
            <motion.button
              onClick={() => setActiveTab("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`md:hidden relative px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer select-none ${
                activeTab === "home"
                  ? "text-white"
                  : "text-white/70 hover:text-white/90"
              }`}>
              {activeTab === "home" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">🏠</span>
              </span>
            </motion.button>

            {/* About Me tab - always visible */}
            <motion.button
              onClick={() => setActiveTab("about")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 cursor-pointer select-none ${
                activeTab === "about"
                  ? "text-white"
                  : "text-white/70 hover:text-white/90"
              }`}>
              {activeTab === "about" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">👤</span>
                <span className="hidden md:inline">About Me</span>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
