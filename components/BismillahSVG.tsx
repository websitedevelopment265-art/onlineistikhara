
import React from 'react';
import { motion } from 'framer-motion';

const BismillahSVG: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center py-4 w-full"
    >
      <div className="relative w-full max-w-[600px] flex justify-center overflow-hidden">
        <motion.svg 
          viewBox="0 0 600 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="drop-shadow-[0_0_30px_rgba(197,160,89,0.5)] w-full h-auto max-h-[300px] object-contain"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Divine Aura Glow */}
          <motion.circle
            cx="300"
            cy="100"
            r="90"
            fill="url(#sacredGlow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Calligraphic Path */}
          <motion.path
            d="M50,120 Q120,40 180,120 T300,120 T420,120 T550,80 M100,80 Q200,30 300,80 T500,80 M250,140 Q300,160 350,140"
            stroke="#c5a059"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          />
          
          {/* Flourishes */}
          <motion.path
            d="M150,60 C180,40 220,40 250,60 M350,60 C380,40 420,40 450,60"
            stroke="#e9d5a1"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ delay: 2, duration: 2 }}
          />

          {/* Dots */}
          {[180, 240, 360, 420].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={i % 2 === 0 ? 60 : 140}
              r="4"
              fill="#e9d5a1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.5 + i * 0.2, type: "spring", stiffness: 200 }}
            />
          ))}

          <defs>
            <radialGradient id="sacredGlow">
              <stop offset="0%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          <motion.text
            x="50%"
            y="210"
            textAnchor="middle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="font-serif text-[36px] fill-gold font-black tracking-[0.2em] drop-shadow-[0_4px_15px_rgba(197,160,89,0.8)]"
            style={{ filter: 'drop-shadow(0 0 8px rgba(197,160,89,0.5))' }}
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.text>
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default BismillahSVG;
