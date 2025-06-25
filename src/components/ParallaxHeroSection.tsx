import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ParallaxHeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'], // track scrolling from the start of the element until the end of the element reaches the start of the viewport
  });

  // Create a parallax effect for the background image
  // It will move 50% of its height as the user scrolls through the section
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Create a parallax effect for the text, making it move up faster than the scroll
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-200%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  console.log('ParallaxHeroSection loaded');

  return (
    <section
      ref={ref}
      className="w-full h-screen overflow-hidden relative flex items-center justify-center"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2560&auto=format&fit=crop')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: backgroundY,
        }}
      />
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      {/* Foreground Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center text-white px-4"
        style={{ y: textY, opacity: textOpacity }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          Culinary Cloud
        </h1>
        <p className="max-w-xl md:max-w-2xl text-lg md:text-xl text-neutral-200 mb-8"
           style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          A new dimension of dining. Exquisite dishes, crafted with passion, delivered to your door.
        </p>
        <Button asChild size="lg" className="font-semibold text-base md:text-lg">
          <Link to="/menu">
            View Our Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default ParallaxHeroSection;