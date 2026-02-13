import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // Motion values for coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // States for interaction
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Spring Physics for the Core (Snappy)
  const coreX = useSpring(mouseX, { damping: 20, stiffness: 800 });
  const coreY = useSpring(mouseY, { damping: 20, stiffness: 800 });

  // Spring Physics for the Outer Ring (Delayed/Fluid Lag)
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 1 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 1 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Define what elements trigger the expanded state
      const isInteractive = target.closest('button, a, .mirror-button, .glass, .magnetic-target, input, textarea, select');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseOut = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-wrapper fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      
      {/* 1. THE OUTER RING (AURA/HALO) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-gold/40 pointer-events-none flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 44,
          height: 44,
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 1.8 : 1),
          borderColor: isHovering ? 'rgba(212, 175, 55, 1)' : 'rgba(212, 175, 55, 0.4)',
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.05)' : 'rgba(0,0,0,0)',
          boxShadow: isHovering 
            ? '0 0 30px rgba(212, 175, 55, 0.4)' 
            : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {/* Optional Inner Pulse Glow when hovering */}
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1.5 }}
            className="absolute inset-0 bg-gold rounded-full blur-xl"
          />
        )}
      </motion.div>

      {/* 2. THE CORE (SOUL/POINTER) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: coreX,
          y: coreY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          backgroundColor: '#D4AF37', // User specified Gold
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.8)',
        }}
        animate={{
          scale: isClicking ? 1.5 : (isHovering ? 0.6 : 1),
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
      />

    </div>
  );
};

export default CustomCursor;