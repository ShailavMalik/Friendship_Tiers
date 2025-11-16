import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * TierCard Component
 * Displays individual friendship tier with gradient background, perks, and action button
 *
 * @param {Object} tier - Tier data object
 * @param {number} index - Card index for staggered animation
 * @param {Function} onSelectTier - Callback when tier is selected
 * @param {string} userName - Current user's name
 */
const TierCard = ({ tier, index, onSelectTier, userName }) => {
  const [showAllPerks, setShowAllPerks] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showEligibilityWarning, setShowEligibilityWarning] = useState(false);

  const {
    name,
    price,
    emoji,
    icon,
    cursorEmoji,
    mainPerks,
    allPerks,
    buttonText,
    gradient,
    disabled,
    badge,
  } = tier;

  const buildCursor = (emojiChar) => {
    if (!emojiChar) return "pointer";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48">${emojiChar}</text></svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(
      svg
    )}") 32 32, pointer`;
  };

  const handleShowMore = async () => {
    setIsExpanding(true);
    setShowAllPerks(true);

    // Send email with user's name
    try {
      await fetch("/api/show-more", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          tierName: name,
        }),
      });
    } catch (error) {
      // Silently handle error
    }
  };

  const perksToShow = showAllPerks ? allPerks : mainPerks;

  const isSoulmate = name === "Soulmate";
  const buttonIsDisabled = disabled && !isSoulmate; // Allow click on soulmate even if logically disabled to show message

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
      className={`group relative rounded-3xl p-8 shadow-2xl transition-all duration-300 ${
        disabled
          ? "opacity-75"
          : "hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
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
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            className="text-7xl drop-shadow-2xl filter group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.9)] transition-all">
            {emoji}
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5 }}
            className="text-5xl drop-shadow-lg">
            {icon}
          </motion.div>
        </div>

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
      <ul className="space-y-3 mb-4 min-h-[200px]">
        <AnimatePresence>
          {perksToShow.map((perk, i) => (
            <motion.li
              key={`${name}-${perk}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                delay: showAllPerks ? i * 0.05 : index * 0.15 + i * 0.05,
              }}
              className="flex items-start text-white/95 bg-white/5 p-3 rounded-lg backdrop-blur-sm hover:bg-white/20 hover:shadow-lg hover:translate-x-2 transition-all duration-200 cursor-default">
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
              <span className="text-sm leading-relaxed font-medium">
                {perk}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Show More Button */}
      {!showAllPerks && (
        <button
          onClick={handleShowMore}
          className="w-full mb-4 py-3 px-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white font-semibold text-sm hover:bg-white/40 hover:border-white/50 hover:shadow-xl transition-all duration-200 cursor-pointer select-none active:scale-95">
          Show More Features ✨
        </button>
      )}

      {/* Action Button */}
      <button
        onClick={() => {
          if (isSoulmate && disabled) {
            setShowEligibilityWarning(true);
            // Auto-hide after a few seconds
            setTimeout(() => setShowEligibilityWarning(false), 6000);
            return;
          }
          if (!disabled) onSelectTier(tier);
        }}
        onMouseDown={(e) => {
          if (!buttonIsDisabled) {
            const cursor = buildCursor(cursorEmoji);
            e.currentTarget.style.cursor = cursor;
            document.body.style.cursor = cursor;
          }
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.cursor = "pointer";
          document.body.style.cursor = "auto";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.cursor = "pointer";
          document.body.style.cursor = "auto";
        }}
        disabled={buttonIsDisabled}
        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 relative overflow-hidden select-none ${
          buttonIsDisabled
            ? "bg-gray-400 cursor-not-allowed text-gray-700"
            : "bg-white text-purple-900 hover:bg-opacity-95 hover:shadow-2xl hover:scale-[1.02] shadow-xl cursor-pointer active:scale-95"
        }`}>
        {!buttonIsDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 pointer-events-none"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
        <span className="relative z-10 pointer-events-none">{buttonText}</span>
      </button>

      {/* Soulmate Eligibility Warning */}
      {isSoulmate && disabled && showEligibilityWarning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-4 p-4 rounded-xl bg-red-500/20 border border-red-400/40 text-red-100 text-sm backdrop-blur-sm shadow-lg">
          <p className="font-semibold mb-1">Not Eligible Yet 🚫</p>
          <p>U are not eligible. Have to be in GF tier for it. 😅</p>
        </motion.div>
      )}

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
