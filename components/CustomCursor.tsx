
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverBounds, setHoverBounds] = useState({ width: 0, height: 0 });

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('.magnetic-target, button, a, .glass') as HTMLElement;
      
      if (interactive) {
        const bounds = interactive.getBoundingClientRect();
        setIsHovering(true);
        setHoverBounds({ width: bounds.width, height: bounds.height });
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Magnetic Gold Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] border-2 border-gold rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(197, 160, 89, 0.2)' : 'rgba(0,0,0,0)',
          boxShadow: isHovering ? '0 0 30px rgba(197, 160, 89, 0.5)' : 'none',
          borderColor: isHovering ? 'rgba(197, 160, 89, 0.8)' : 'rgba(197, 160, 89, 1)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
};

export default CustomCursor;
