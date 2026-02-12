
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  // Main Cursor Physics
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Snake Trailing Nodes Physics (Increasing damping/mass for lag effect)
  const trail1X = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.6 });
  const trail1Y = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.6 });

  const trail2X = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.8 });
  const trail2Y = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.8 });

  const trail3X = useSpring(mouseX, { damping: 35, stiffness: 100, mass: 1 });
  const trail3Y = useSpring(mouseY, { damping: 35, stiffness: 100, mass: 1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Magnetic Logic
      const interactiveElements = document.querySelectorAll('.mirror-button, .glass, button, a, .magnetic-target');
      let foundMagnetic = false;

      interactiveElements.forEach((el) => {
        const element = el as HTMLElement;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const radius = Math.max(rect.width, rect.height, 120);
        const dist = Math.hypot(clientX - centerX, clientY - centerY);

        if (dist < radius * 0.7) { 
          foundMagnetic = true;
          const pullStrength = 0.35;
          const targetX = clientX + (centerX - clientX) * pullStrength;
          const targetY = clientY + (centerY - clientY) * pullStrength;
          
          mouseX.set(targetX);
          mouseY.set(targetY);
        }
      });

      if (!foundMagnetic) {
        mouseX.set(clientX);
        mouseY.set(clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('.mirror-button, button, a, .glass, .magnetic-target') as HTMLElement;
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Snake Node 3 (Furthest Trail) */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-gold/10 rounded-full pointer-events-none z-[9996]"
        style={{
          x: trail3X,
          y: trail3Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Snake Node 2 */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold/20 rounded-full pointer-events-none z-[9997]"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Snake Node 1 (Closest Trail) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold/30 rounded-full pointer-events-none z-[9998]"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Main Magnetic Gold Ring - Fixed Scale and Removed Blur */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-gold/40"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1, // Reduced scale so it doesn't obscure
          backgroundColor: isHovering ? 'rgba(197, 160, 89, 0.15)' : 'rgba(0,0,0,0)',
          boxShadow: isHovering 
            ? '0 0 30px rgba(197, 160, 89, 0.4)' 
            : '0 0 0px rgba(197, 160, 89, 0)',
          borderColor: isHovering ? 'rgba(197, 160, 89, 0.8)' : 'rgba(197, 160, 89, 0.4)',
          // Removed backdropFilter entirely to prevent blurring underlying text
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
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
          scale: isHovering ? 0.5 : 1,
          opacity: isHovering ? 0.5 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
