import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Apply cursor: none to body only after custom cursor is active
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
      @media (pointer: coarse) {
        * { cursor: auto !important; }
        .custom-cursor-container { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!isVisible) setIsVisible(true);

      // Hardware accelerated movement using translate3d
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect all buttons, links, and interactive elements
      const isInteractive = target.closest('button, a, input, select, textarea, .mirror-button, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.style.scale = '0.8';
    };
    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.style.scale = isHovering ? '1.5' : '1';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseenter', () => setIsVisible(true));
    window.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isHovering, isVisible]);

  return (
    <div 
      className={`custom-cursor-container fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border-2 pointer-events-none will-change-transform transition-all duration-300 ease-out"
        style={{
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-20px',
          borderColor: isHovering ? '#FFD700' : '#c5a059',
          scale: isHovering ? '1.5' : '1',
          backgroundColor: isHovering ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(255, 215, 0, 0.4)' : 'none',
        }}
      />

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          backgroundColor: isHovering ? '#FFD700' : '#c5a059',
          boxShadow: '0 0 10px rgba(197, 160, 89, 0.8)',
        }}
      />
    </div>
  );
};

export default CustomCursor;