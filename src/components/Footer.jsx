import React from "react";
import { motion } from "framer-motion";

/**
 * Footer Component
 * Displays footer information with social links and credits
 */
const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center text-white/80">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="max-w-4xl mx-auto">
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-6"></div>

        {/* Main Text */}
        <p className="text-lg font-semibold mb-2">
          Made with ☕ and 💖 by Shailav Malik
        </p>

        <p className="text-sm mb-4 text-white/60">
          Choose your tier wisely - Friendship is an investment! 😄
        </p>

        {/* Emoji Decoration */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl mb-4">
          ☕ 🎓 📚 🏏 🎬
        </motion.div>

        {/* Copyright */}
        <p className="text-xs text-white/50">
          © 2025 Friendship Offers™ | All tiers reserved | Terms & Conditions
          apply*
        </p>

        <p className="text-xs text-white/40 mt-2 italic">
          *Actual friendship quality may vary based on mood, time, and chai
          availability
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
