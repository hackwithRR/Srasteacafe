"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => {
      cursorRef.current?.classList.add("hovering");
    };

    const handleHoverEnd = () => {
      cursorRef.current?.classList.remove("hovering");
    };

    window.addEventListener("mousemove", moveCursor);

    // Interactive elements for cursor hover effect
    const interactiveElements = document.querySelectorAll<HTMLElement>(
      'a, button, [data-magnetic], input, textarea, .menu-card, .masonry-item'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  // Check for touch device
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  if (isTouchDevice) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    />
  );
};

export default CustomCursor;