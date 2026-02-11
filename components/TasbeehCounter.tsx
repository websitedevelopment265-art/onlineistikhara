
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Fingerprint } from 'lucide-react';

const phrases = ["SubhanAllah", "Alhamdulillah", "Allahu Akbar"];

const TasbeehCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Cycles phrases every 33 counts (traditional)
    if (count > 0 && count % 33 === 0) {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }
  }, [count]);

  const increment = () => {
    setCount(prev => prev + 1);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
    setPhraseIndex(0);
  };

  return (
    <div className="fixed bottom-32 right-10 z-[70] flex flex-col items-center space-y-4">
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={reset}
            className="p-3 bg-white/40 backdrop-blur-md border border-gold/20 rounded-full text-gold hover:bg-gold hover:text-white transition-all shadow-lg"
            title="Reset Counter"
          >
            <RotateCcw size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative group"
      >
        {/* Label Popup */}
        <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <motion.div 
            key={phraseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest/90 backdrop-blur-md text-goldLight px-4 py-2 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase border border-gold/20 shadow-2xl"
          >
            {phrases[phraseIndex]}
          </motion.div>
        </div>

        {/* Main Counter Button */}
        <motion.button
          animate={{ 
            scale: isPressed ? 0.9 : 1,
            boxShadow: isPressed ? '0 0 0px rgba(197,160,89,0)' : '0 20px 40px rgba(197,160,89,0.2)'
          }}
          onClick={increment}
          className="w-24 h-24 bg-white/60 backdrop-blur-xl border-2 border-gold rounded-full flex flex-col items-center justify-center overflow-hidden magnetic-target"
        >
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <span className="text-2xl font-serif font-bold text-charcoal relative z-10">
            {count}
          </span>
          
          <div className="flex items-center space-x-1 mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <Fingerprint size={12} className="text-gold" />
            <span className="text-[7px] font-bold uppercase tracking-tighter text-gold">Tap</span>
          </div>

          {/* Liquid Progress Fill */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-emerald/10 z-0"
            initial={{ height: 0 }}
            animate={{ height: `${(count % 33) / 33 * 100}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TasbeehCounter;
