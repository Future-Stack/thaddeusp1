"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

interface AnimationWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  animationType?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
  viewportOnce?: boolean;
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  animationType = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  viewportOnce = true,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: "-100px" }}
      variants={variants[animationType]}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic-bezier for premium feel
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
