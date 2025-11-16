import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { knownFriends } from "../data/friendsData";

/**
 * FriendDataPanel
 * Hidden overlay to show all manually fed friend data.
 * Props:
 *  - visible: boolean
 *  - onClose: function
 */
const FriendDataPanel = ({ visible, onClose }) => {
  const categories = [
    { key: "closeFriends", label: "Close Friends" },
    { key: "bff", label: "BFF" },
    { key: "closeAcquaintance", label: "Close Acquaintance" },
    { key: "friends", label: "Friends" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="relative max-w-lg w-full bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-pink-900/90 border border-white/20 rounded-2xl shadow-2xl p-6 text-white overflow-y-auto max-h-[70vh]">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition">
              Close
            </button>
            <h2 className="text-xl font-bold mb-4 font-['Space_Grotesk']">
              Manual Friend Data
            </h2>
            <p className="text-white/60 text-xs mb-4">
              Confidential list. Keep this between us 😉
            </p>
            <div className="space-y-5">
              {categories.map(({ key, label }) => {
                const list = knownFriends[key] || [];
                if (!list.length) return null;
                return (
                  <div key={key}>
                    <h3 className="text-sm font-semibold mb-2 text-purple-300">
                      {label}
                    </h3>
                    <ul className="space-y-1">
                      {list.map((f, i) => (
                        <li
                          key={key + i}
                          className="text-xs bg-white/5 rounded px-2 py-1 flex flex-col">
                          <span className="font-medium">{f.displayName}</span>
                          {f.message && (
                            <span className="text-[10px] text-white/50 italic">
                              {f.message}
                            </span>
                          )}
                          <span className="text-[10px] text-white/40">
                            Aliases: {f.names.join(", ")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FriendDataPanel;
