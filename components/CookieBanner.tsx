
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('user_consent');
    if (!consent) {
      // Small delay for better UX after page load
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('user_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="fixed bottom-8 left-8 right-8 z-[300] md:left-auto md:right-12 md:w-80"
        >
          <div className="glass border-2 border-gold/30 p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4 border border-gold/20">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            </div>
            <p className="text-ivory/70 text-xs font-medium leading-relaxed mb-6 urdu-font" dir="rtl">
              بہتر تجربہ کے لیے ہم کوکیز کا استعمال کرتے ہیں۔ کیا آپ متفق ہیں؟
            </p>
            <button
              onClick={handleAccept}
              className="w-full bg-gold text-charcoal py-4 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] mirror-button shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-all active:scale-95"
            >
              Qabool Hai
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
