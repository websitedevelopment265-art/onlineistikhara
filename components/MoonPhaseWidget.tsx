
import React from 'react';
import { motion } from 'framer-motion';

const MoonPhaseWidget: React.FC = () => {
  // Approximate Hijri Calculation (Mock for UI)
  const hijriDate = "14 Ramadan 1446"; 

  return (
    <div className="flex flex-col items-center justify-center space-y-1 glass px-4 py-2 rounded-2xl border-gold/10">
      <div className="flex items-center space-x-3">
        <div className="relative w-6 h-6">
          {/* Static Background Glow */}
          <div className="absolute inset-0 bg-gold/20 blur-md rounded-full" />
          
          {/* Animated Crescent */}
          <motion.svg 
            viewBox="0 0 24 24" 
            className="w-full h-full text-gold relative z-10"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              filter: ["drop-shadow(0 0 2px #c5a059)", "drop-shadow(0 0 8px #c5a059)", "drop-shadow(0 0 2px #c5a059)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <path 
              fill="currentColor" 
              d="M12,2C14.7,2 17.1,3 19,4.8C16.8,5.4 15,7.5 15,10C15,13.3 17.7,16 21,16C20.4,18.4 18.4,20.4 16,21C13.5,21.6 10.9,21 8.8,19.5C6.7,18 5.3,15.6 5,13C4.7,10.4 5.5,7.8 7.2,5.8C8.9,3.8 11.4,2.4 14,2.1L12,2Z" 
            />
          </motion.svg>
        </div>
        <span className="text-[10px] font-bold text-charcoal/80 uppercase tracking-widest leading-none">
          {hijriDate}
        </span>
      </div>
    </div>
  );
};

export default MoonPhaseWidget;
