
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0, active: false });

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Magnetic Logic
      const interactiveElements = document.querySelectorAll('.mirror-button, .glass, button, a');
      let foundMagnetic = false;

      interactiveElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(clientX - centerX, clientY - centerY);

        if (dist < 80) { // Detection radius
          foundMagnetic = true;
          // Apply a 20% "pull" towards the center of the element
          mouseX.set(clientX + (centerX - clientX) * 0.2);
          mouseY.set(clientY + (centerY - clientY) * 0.2);
          setMagneticPos({ x: centerX, y: centerY, active: true });
        }
      });

      if (!foundMagnetic) {
        mouseX.set(clientX);
        mouseY.set(clientY);
        setMagneticPos(prev => ({ ...prev, active: false }));
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('.mirror-button, button, a, .glass') as HTMLElement;
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
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(197, 160, 89, 0.15)' : 'rgba(0,0,0,0)',
          boxShadow: isHovering ? '0 0 50px rgba(197, 160, 89, 0.6)' : 'none',
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.8)' : 'rgba(197, 160, 89, 1)',
        }}
        transition={{ duration: 0.2 }}
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
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
      />

      {/* Trailing Glow Particle */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold/30 blur-sm rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </>
  );
};

export default CustomCursor;
