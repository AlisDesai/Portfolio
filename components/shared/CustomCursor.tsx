"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/shared/usePrefersReducedMotion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  // Mouse position values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the trailing ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices and if user allows motion
    if (window.matchMedia("(pointer: coarse)").matches || reduceMotion) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over a clickable element
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer");
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor globally, except for text inputs
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      input, textarea {
        cursor: text !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY, reduceMotion]);

  if (!isVisible || reduceMotion) return null;

  return (
    <>
      {/* Primary Center Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-2.5 rounded-full bg-accent"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Trailing Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] size-10 rounded-full border-[1.5px] border-accent/70"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(129, 140, 248, 0.1)" : "transparent",
          borderColor: isHovering ? "rgba(129, 140, 248, 1)" : "rgba(129, 140, 248, 0.7)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
