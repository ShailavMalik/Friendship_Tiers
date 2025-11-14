import React from "react";
import { motion } from "framer-motion";

/**
 * TierCard Component
 * Displays individual friendship tier with gradient background, perks, and action button
 *
 * @param {Object} tier - Tier data object
 * @param {number} index - Card index for staggered animation
 * @param {Function} onSelectTier - Callback when tier is selected
 */
const TierCard = ({ tier, index, onSelectTier }) => {
  const { name, price, emoji, perks, buttonText, gradient, disabled, badge } =
    tier;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: disabled ? 1 : 1.08,
        y: disabled ? 0 : -15,
        rotateY: disabled ? 0 : 5,
        transition: { duration: 0.3 },
      }}
      className={`relative rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
        disabled ? "opacity-75" : "hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      }`}
      style={{
        background: gradient,
        transformStyle: "preserve-3d",
      }}>
      {/* Premium Badge */}
      {badge && (
        <motion.div
          initial={{ rotate: -12, scale: 0 }}
          animate={{ rotate: -12, scale: 1 }}
          transition={{
            delay: index * 0.15 + 0.4,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ rotate: 0, scale: 1.1 }}
          className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-2xl z-10 animate-pulse-slow">
          {badge}
        </motion.div>
      )}

      {/* Glowing Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-20 transition-opacity duration-500 bg-white pointer-events-none"></div>

      {/* Card Header */}
      <div className="text-center mb-6">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          className="text-7xl mb-4 drop-shadow-2xl filter hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
          {emoji}
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-2 font-['Space_Grotesk'] drop-shadow-lg">
          {name}
        </h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.5 }}
          className="text-xl text-white/90 font-semibold bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block">
          {price}
        </motion.p>
      </div>

      {/* Perks List */}
      <ul className="space-y-3 mb-6 min-h-[300px]">
        {perks.map((perk, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + i * 0.05 }}
            whileHover={{ x: 5, transition: { duration: 0.2 } }}
            className="flex items-start text-white/95 bg-white/5 p-2 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all">
            <motion.span
              className="mr-2 mt-1 flex-shrink-0 text-yellow-300"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}>
              ✨
            </motion.span>
            <span className="text-sm leading-relaxed font-medium">{perk}</span>
          </motion.li>
        ))}
      </ul>

      {/* Action Button */}
      <motion.button
        whileHover={
          disabled
            ? {}
            : { scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }
        }
        whileTap={disabled ? {} : { scale: 0.95 }}
        onClick={() => !disabled && onSelectTier(tier)}
        disabled={disabled}
        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
          disabled
            ? "bg-gray-400 cursor-not-allowed text-gray-700"
            : "bg-white text-purple-900 hover:bg-opacity-90 shadow-xl hover:shadow-2xl"
        }`}>
        {!disabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
        <span className="relative z-10">{buttonText}</span>
      </motion.button>

      {/* Decorative Corner Elements with Animation */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-br-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}></motion.div>
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-tl-full"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}></motion.div>

      {/* Floating Particles */}
      {!disabled && (
        <>
          <motion.div
            className="absolute top-10 right-10 w-2 h-2 bg-white/40 rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-2 h-2 bg-white/40 rounded-full"
            animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
        </>
      )}
    </motion.div>
  );
};

export default TierCard;
