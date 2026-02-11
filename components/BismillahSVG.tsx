
import React from 'react';
import { motion } from 'framer-motion';

const BismillahSVG: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center py-8"
    >
      <svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_40px_rgba(197,160,89,0.5)]">
        {/* Divine Aura Glow */}
        <motion.circle
          cx="300"
          cy="100"
          r="90"
          fill="url(#sacredGlow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1.1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Improved Calligraphic Path - Stylized Basmala */}
        <motion.path
          d="M50,120 Q120,40 180,120 T300,120 T420,120 T550,80 M100,80 Q200,30 300,80 T500,80 M250,140 Q300,160 350,140"
          stroke="#c5a059"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        />
        
        {/* Subtle Ornamental Flourishes */}
        <motion.path
          d="M150,60 C180,40 220,40 250,60 M350,60 C380,40 420,40 450,60"
          stroke="#e9d5a1"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ delay: 2, duration: 2 }}
        />

        {/* Nuqtas (Dots) */}
        {[180, 240, 360, 420].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={i % 2 === 0 ? 60 : 140}
            r="3.5"
            fill="#c5a059"
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
          y="180"
          textAnchor="middle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="font-serif text-[10px] uppercase fill-gold font-bold tracking-[1em]"
        >
          بسم اللہ الرحمن الرحیم
        </motion.text>
      </svg>
    </motion.div>
  );
};

export default BismillahSVG;
