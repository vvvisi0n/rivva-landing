"use client";

import { motion } from "framer-motion";

export default function LumiTypingBubble() {
  return (
    <div className="flex items-center justify-center mt-6">
      <motion.div
        className="flex gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-inner border border-purple-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span
          className="w-2 h-2 bg-purple-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        />

        <motion.span
          className="w-2 h-2 bg-purple-500 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        <motion.span
          className="w-2 h-2 bg-purple-600 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </motion.div>
    </div>
  );
}
