import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ModalForm Component
 * Displays a modal with a form to collect user details for tier selection
 *
 * @param {Object} selectedTier - The tier object selected by the user
 * @param {Function} onClose - Callback to close the modal
 * @param {string} userName - Current user's name
 */
const ModalForm = ({ selectedTier, onClose, userName }) => {
  const [formData, setFormData] = useState({
    name: userName || "",
    message: "",
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [notHiringShown, setNotHiringShown] = useState(false); // GF role special message
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const isGFRole = selectedTier.isGF;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (isGFRole) {
        // For GF role, do not actually create application; show not hiring message
        setNotHiringShown(true);
        setSubmitStatus("success");
        // Auto close after delay
        setTimeout(() => {
          onClose();
        }, 4500);
      } else {
        const response = await fetch("/api/submit-tier", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            message: formData.message,
            mobile: formData.mobile || undefined,
            tier: selectedTier.name,
            price: selectedTier.price,
          }),
        });
        if (response.ok) {
          setSubmitStatus("success");
          setTimeout(() => {
            onClose();
          }, 3000);
        } else {
          setSubmitStatus("error");
        }
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
        {/* Modal Container */}
        <motion.div
          initial={{
            scale: isMobile ? 0.9 : 0.5,
            opacity: 0,
            y: isMobile ? 30 : 100,
            rotateX: isMobile ? 0 : -30,
          }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{
            scale: isMobile ? 0.95 : 0.5,
            opacity: 0,
            y: isMobile ? 20 : 100,
            rotateX: isMobile ? 0 : 30,
          }}
          transition={
            isMobile
              ? { duration: 0.25 }
              : { type: "spring", damping: 20, stiffness: 300 }
          }
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative">
          {/* Animated Border Glow - disabled on mobile */}
          {!isMobile && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-20 blur-xl"></div>
          )}

          {/* Header */}
          <div
            className="p-8 text-white text-center relative z-10"
            style={{ background: selectedTier.gradient }}>
            <motion.div
              animate={
                !isMobile
                  ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1.1, 1],
                    }
                  : {
                      scale: [1, 1.05, 1],
                    }
              }
              transition={
                !isMobile
                  ? { duration: 1.5, repeat: Infinity, repeatDelay: 2 }
                  : { duration: 2, repeat: Infinity }
              }
              className="text-6xl mb-4 filter drop-shadow-2xl">
              {selectedTier.emoji}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0.1 : 0.2, duration: 0.3 }}
              className="text-4xl font-bold mb-2 font-['Space_Grotesk'] drop-shadow-lg">
              {isGFRole ? "GF Role Interview" : selectedTier.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isMobile ? 0.15 : 0.3, duration: 0.3 }}
              className="text-xl opacity-95 bg-white/20 px-4 py-1 rounded-full inline-block">
              {isGFRole ? "Schedule Your Interview 😅" : selectedTier.price}
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5 relative z-10">
            {isGFRole && !notHiringShown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-pink-50 border-2 border-pink-300 rounded-xl p-4 mb-4">
                <p className="text-pink-800 text-center font-semibold text-sm">
                  🎉 Your interview is scheduled for the GF role! Fill in the
                  details below to proceed. 😄
                </p>
              </motion.div>
            )}
            {isGFRole && notHiringShown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-300 rounded-xl p-5 mb-4 text-center">
                <p className="text-red-700 font-bold text-sm mb-1">
                  We Are Not Hiring 😅
                </p>
                <p className="text-red-600 text-xs">
                  This role is currently closed. We'll inform you when
                  applications open again!
                </p>
              </motion.div>
            )}

            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name ✨
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                readOnly
                className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-800 font-medium cursor-not-allowed"
                placeholder="Enter your name"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2">
                {isGFRole
                  ? "Why should you be selected? 💭"
                  : "Message (Optional) 💬"}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all outline-none resize-none text-gray-800"
                placeholder={
                  isGFRole
                    ? "Tell us why you're perfect for this role..."
                    : "Any message for Shailav?"
                }
              />
            </motion.div>

            {/* Mobile (Optional) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 }}>
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile (Optional) 📱
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9+\-() ]{7,20}"
                className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all outline-none text-gray-800"
                placeholder="e.g. +91 98765 43210"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional. Digits & + - ( ) allowed.
              </p>
            </motion.div>

            {/* Submit Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 text-green-800 px-5 py-4 rounded-xl text-center font-semibold shadow-lg">
                  <div className="text-3xl mb-2">🎉</div>
                  <div className="text-lg font-bold mb-1">
                    {notHiringShown
                      ? "Submission Received"
                      : "Message Sent Successfully!"}
                  </div>
                  <div className="text-sm">
                    {isGFRole
                      ? notHiringShown
                        ? "We are not hiring for this role right now. You'll be notified when it opens."
                        : "Your GF role interview has been scheduled! 💖"
                      : `Welcome to ${selectedTier.name}!`}
                  </div>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl text-center font-semibold">
                  ❌ Oops! Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 px-6 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer select-none active:scale-95">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (isGFRole && notHiringShown)}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-xl font-bold hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden cursor-pointer select-none active:scale-95">
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 pointer-events-none"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                {isSubmitting ? (
                  <span className="flex items-center justify-center pointer-events-none">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="relative z-10 pointer-events-none">
                    {isGFRole && notHiringShown ? "Closed" : "Submit 🚀"}
                  </span>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalForm;
