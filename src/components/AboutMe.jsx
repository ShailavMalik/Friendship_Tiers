import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";

/**
 * AboutMe Component
 * Displays information about Shailav Malik
 */
const AboutMe = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Animated gradient blobs background */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-52 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-400 opacity-25 blur-3xl"
        animate={{ scale: [1, 1.25, 1], rotate: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] rounded-full bg-gradient-to-t from-indigo-500 via-violet-500 to-fuchsia-500 opacity-20 blur-[90px]"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          {/* Profile Section */}
          <div className="text-center mb-16 relative">
            {/* Rotating gradient ring */}
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-amber-400 opacity-60 blur-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            {/* Pulsing outer ring */}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full border-2 border-pink-400/30"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 18,
                delay: 0.25,
              }}
              className="relative w-40 h-40 mx-auto mb-8 rounded-full p-[3px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400 shadow-[0_0_35px_rgba(255,255,255,0.4)]">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-40"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.img
                src={profileImg}
                alt="Shailav Malik profile"
                className="w-full h-full rounded-full object-cover"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                draggable={false}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-4 font-['Space_Grotesk'] tracking-tight">
              <motion.span
                className="bg-gradient-to-r from-fuchsia-300 via-pink-200 to-amber-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}>
                Shailav Malik
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 mb-2">
              Creator of Friendship Offers™
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 flex-wrap">
              {["Developer", "Designer", "Friend"].map((tag, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600/40 via-pink-500/40 to-amber-400/40 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/20 shadow-inner">
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 text-white/90 text-lg leading-relaxed">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-pink-500/20" />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                <span>🎯</span> Mission
              </h2>
              <p>
                To bring transparency and fun to friendships! This platform
                showcases different levels of friendship with a touch of humor
                and creativity. Because every connection deserves to be
                celebrated! ✨
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                <span>💡</span> Why Friendship Tiers?
              </h2>
              <p>
                Inspired by subscription models and tier-based systems, I
                created this playful take on friendships. It's a fun way to show
                the different levels of connection we have with people in our
                lives - from casual acquaintances to soulmates!
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20" />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                <span>🚀</span> Tech Stack
              </h2>
              <p className="mb-4">
                Built with modern web technologies for a smooth, beautiful
                experience:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "React",
                  "Tailwind CSS",
                  "Framer Motion",
                  "Node.js",
                  "Express",
                  "Nodemailer",
                ].map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.12, rotate: 2, y: -3 }}
                    className="relative bg-gradient-to-br from-purple-600/30 via-fuchsia-500/30 to-pink-500/30 backdrop-blur-sm rounded-xl px-4 py-2 text-center font-semibold border border-white/20 shadow-lg overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.3,
                      }}
                    />
                    <span className="relative z-10">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-gradient-to-r from-purple-600/25 via-pink-500/25 to-amber-400/25 backdrop-blur-xl rounded-2xl p-6 border border-pink-300/30 relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                <span>☕</span> Fun Fact
              </h2>
              <p>
                The pricing in chai and snacks is inspired by college life where
                friendships are often built over cutting chai, samosas, and
                late-night canteen sessions. Those were the days! 🎓
              </p>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center">
            <p className="text-white/80 text-lg mb-6">
              Ready to choose your friendship tier? 🎉
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.a
                href="https://github.com/ShailavMalik"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-fuchsia-600/30 via-violet-600/30 to-pink-600/30 backdrop-blur-xl border border-white/30 rounded-xl text-white font-semibold hover:shadow-xl hover:brightness-110 transition-all flex items-center gap-2">
                <span>🐙</span> GitHub
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/shailavmalik"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-xl border border-white/30 rounded-xl text-white font-semibold hover:shadow-xl hover:brightness-110 transition-all flex items-center gap-2">
                <span>💼</span> LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
