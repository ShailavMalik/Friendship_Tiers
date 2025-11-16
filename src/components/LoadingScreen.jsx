import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen Component
 * Stunning futuristic 3D loading screen with holographic effects
 */
const LoadingScreen = ({ onComplete }) => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [progress, setProgress] = useState(0);

  const slogans = [
    "Building Bridges of Friendship... 🌉",
    "Crafting Connections... ✨",
    "Brewing Memories Over Chai... ☕",
    "Where Every Bond Matters... 💖",
    "Friendship: The Best Investment... 🎯",
  ];

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 2000);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(sloganInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ exit: { duration: 0.8 } }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, #1a0b2e 0%, #0a0118 100%)",
        }}>
        {/* Animated Holographic Grid Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
              transform: "perspective(1000px) rotateX(60deg)",
              transformOrigin: "center center",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "100px 100px"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Massive Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.4), rgba(139, 92, 246, 0.3), transparent)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.3), transparent)",
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 146, 60, 0.3), rgba(244, 114, 182, 0.3), transparent)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          {/* Futuristic 3D Holographic Logo */}
          <motion.div
            initial={{ scale: 0, rotateY: -180, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: 0.2,
            }}
            className="mb-16"
            style={{ perspective: "2000px" }}>
            {/* Outer Rotating Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                  width: 280 + i * 80,
                  height: 280 + i * 80,
                  borderColor:
                    i === 0
                      ? "rgba(236, 72, 153, 0.3)"
                      : i === 1
                      ? "rgba(139, 92, 246, 0.3)"
                      : "rgba(59, 130, 246, 0.3)",
                }}
                animate={{
                  rotateZ: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  rotateZ: {
                    duration: 15 - i * 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}

            <motion.div
              animate={{
                rotateY: [0, 360],
                rotateZ: [0, 10, -10, 0],
              }}
              transition={{
                rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative inline-block"
              style={{ transformStyle: "preserve-3d" }}>
              {/* Glowing Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.4))",
                }}
              />

              {/* Main Holographic Circle */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-[2px] shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)",
                  backgroundSize: "300% 300%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.4), rgba(26, 11, 46, 0.95))",
                  }}>
                  {/* Holographic Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
                    }}
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Central Icon with 3D Effect */}
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        rotateZ: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-8xl md:text-9xl"
                      style={{
                        filter:
                          "drop-shadow(0 0 20px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.6))",
                      }}>
                      🤝
                    </motion.div>
                  </div>

                  {/* Inner Glow Pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow:
                        "inset 0 0 60px rgba(236, 72, 153, 0.4), inset 0 0 80px rgba(139, 92, 246, 0.3)",
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Orbiting Holographic Elements */}
              {[
                { emoji: "☕", color: "rgba(251, 146, 60, 0.8)", radius: 140 },
                { emoji: "💖", color: "rgba(236, 72, 153, 0.8)", radius: 140 },
                { emoji: "✨", color: "rgba(139, 92, 246, 0.8)", radius: 140 },
                { emoji: "🎉", color: "rgba(59, 130, 246, 0.8)", radius: 140 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transformOrigin: "0 0",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.25,
                  }}>
                  <motion.div
                    className="relative"
                    style={{
                      transform: `translateX(${
                        Math.cos((i * Math.PI) / 2) * item.radius
                      }px) translateY(${
                        Math.sin((i * Math.PI) / 2) * item.radius
                      }px)`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}>
                    {/* Glow behind emoji */}
                    <motion.div
                      className="absolute inset-0 -z-10 blur-xl"
                      style={{
                        background: item.color,
                        width: "60px",
                        height: "60px",
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-5xl">{item.emoji}</span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Title with Holographic Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            className="text-6xl md:text-8xl font-bold mb-8 font-['Space_Grotesk'] relative"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #ec4899 25%, #8b5cf6 50%, #3b82f6 75%, #ffffff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter:
                "drop-shadow(0 0 30px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.3))",
            }}>
            <motion.span
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #ec4899 25%, #8b5cf6 50%, #3b82f6 75%, #ffffff 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Friendship Offers™
            </motion.span>
          </motion.h1>

          {/* Animated Slogan with 3D Flip */}
          <div className="h-20 mb-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlogan}
                initial={{
                  opacity: 0,
                  rotateX: -90,
                  y: 40,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotateX: 90,
                  y: -40,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                className="text-2xl md:text-4xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #fbbf24, #f472b6, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px rgba(251, 146, 60, 0.4))",
                }}>
                {slogans[currentSlogan]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Futuristic Loading Bar with Percentage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="max-w-xl mx-auto">
            {/* Percentage Display */}
            <motion.div
              className="text-6xl font-bold mb-6 font-['Space_Grotesk']"
              style={{
                background:
                  "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))",
              }}>
              {progress}%
            </motion.div>

            {/* Progress Bar Container */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Progress Fill */}
              <motion.div
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="relative h-full rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)",
                    backgroundSize: "200% 100%",
                  }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-md"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(236, 72, 153, 0.8), rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8))",
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-6 text-lg"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Preparing your friendship journey...
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Energy Particles with Trails */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background:
                  i % 3 === 0
                    ? "rgba(236, 72, 153, 0.8)"
                    : i % 3 === 1
                    ? "rgba(139, 92, 246, 0.8)"
                    : "rgba(59, 130, 246, 0.8)",
                boxShadow:
                  i % 3 === 0
                    ? "0 0 20px rgba(236, 72, 153, 0.6)"
                    : i % 3 === 1
                    ? "0 0 20px rgba(139, 92, 246, 0.6)"
                    : "0 0 20px rgba(59, 130, 246, 0.6)",
              }}
              animate={{
                y: [0, -Math.random() * 300 - 100, -Math.random() * 600 - 200],
                x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Light Rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: "50%",
              height: "2px",
              background: `linear-gradient(90deg, 
                ${
                  i % 2 === 0
                    ? "rgba(236, 72, 153, 0.4)"
                    : "rgba(139, 92, 246, 0.4)"
                }, 
                transparent)`,
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
