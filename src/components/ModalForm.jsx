import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ModalForm Component
 * Displays a modal with a form to collect user details for tier selection
 *
 * @param {Object} selectedTier - The tier object selected by the user
 * @param {Function} onClose - Callback to close the modal
 */
const ModalForm = ({ selectedTier, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

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
      // Send data to backend
      const response = await fetch("http://localhost:5000/api/submit-tier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tier: selectedTier.name,
          price: selectedTier.price,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          initial={{ scale: 0.5, opacity: 0, y: 100, rotateX: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 100, rotateX: 30 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative">
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-20 blur-xl"></div>

          {/* Header */}
          <div
            className="p-8 text-white text-center relative z-10"
            style={{ background: selectedTier.gradient }}>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1.1, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl mb-4 filter drop-shadow-2xl">
              {selectedTier.emoji}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-2 font-['Space_Grotesk'] drop-shadow-lg">
              {selectedTier.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl opacity-95 bg-white/20 px-4 py-1 rounded-full inline-block">
              {selectedTier.price}
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5 relative z-10">
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
                className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all outline-none text-gray-800 font-medium"
                placeholder="Enter your name"
              />
            </motion.div>

            {/* Mobile Number Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}>
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number 📱
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all outline-none text-gray-800 font-medium"
                placeholder="9876543210"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2">
                Message (Optional) 💬
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all outline-none resize-none text-gray-800"
                placeholder="Any message for Shailav?"
              />
            </motion.div>

            {/* Submit Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-3 rounded-xl text-center font-semibold">
                  🎉 Successfully submitted! Welcome to {selectedTier.name}!
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
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3.5 px-6 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-all shadow-md hover:shadow-lg">
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-xl font-bold hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden">
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
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
                  <span className="relative z-10">Submit 🚀</span>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalForm;
