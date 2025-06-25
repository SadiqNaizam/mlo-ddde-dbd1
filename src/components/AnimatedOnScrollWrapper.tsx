import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface AnimatedOnScrollWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
};

const AnimatedOnScrollWrapper: React.FC<AnimatedOnScrollWrapperProps> = ({
  children,
  className,
  animationType = 'fadeIn',
  delay = 0,
  once = true,
  amount = 0.2, // Trigger when 20% of the element is in view
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  console.log('AnimatedOnScrollWrapper loaded');

  const selectedVariant = animationVariants[animationType];

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={selectedVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.25, 0.1, 0.25, 1.0] // A nice ease-out curve
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedOnScrollWrapper;