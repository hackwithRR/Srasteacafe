"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1;
      });
    }, 80);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, visibility: "hidden" }}
          transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary bg-grain"
        >
          <div className="flex flex-col items-center">
            {/* Custom SVG Icon: Minimalist Steaming Tea/Leaf Arc */}
            <div className="w-16 h-16 mb-8 relative flex items-center justify-center">
              <svg
                className="w-full h-full text-secondary"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="svg-draw"
                  d="M 50,15 C 30,15 20,35 20,55 C 20,75 35,85 50,85 C 65,85 80,75 80,55 C 80,35 70,15 50,15 Z M 50,25 C 50,25 50,75 50,75"
                  stroke="#F7F2E8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="svg-draw"
                  d="M 35,45 C 40,40 45,40 50,45 C 55,50 60,50 65,45"
                  stroke="#C89B63"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ animationDelay: "0.6s" }}
                />
              </svg>
            </div>

            {/* Typography with Letter Stagger Reveal */}
            <h1 className="font-display text-3xl md:text-4xl tracking-[0.3em] font-light text-secondary uppercase mb-4 pl-[0.3em]">
              <span className="char">S</span>
              <span className="char">R</span>
              <span className="char">A</span>
              <span className="char">S</span>
              <span className="char">H</span>
              <span className="char">T</span>
              <span className="char">E</span>
              <span className="char">A</span>
            </h1>

            {/* Minimal Divider Line */}
            <div className="line-expand h-[1px] bg-accent/60 mb-4" />

            {/* Tagline */}
            <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-secondary/60 font-light">
              Crafted For Conversations
            </p>
          </div>

          {/* Progress Indicator Counter */}
          <div className="absolute bottom-12 font-body text-xs tracking-widest text-secondary/40 font-light">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;