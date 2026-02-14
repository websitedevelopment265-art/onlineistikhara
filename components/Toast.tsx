
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ show, message, onClose }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, x: '-50%', opacity: 0 }}
          animate={{ y: 24, x: '-50%', opacity: 1 }}
          exit={{ y: -100, x: '-50%', opacity: 0 }}
          className="fixed top-24 left-1/2 z-[500] w-full max-w-sm px-4"
        >
          <div className="glass-gold border-2 border-gold/40 p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center border border-emerald/40 flex-shrink-0">
              <CheckCircle2 className="text-emerald-400 w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-ivory font-serif font-bold text-lg urdu-font leading-none mb-1" dir="rtl">
                {message}
              </p>
              <p className="text-[8px] font-black uppercase tracking-widest text-gold/60">Success • Nur-ul-Huda</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
