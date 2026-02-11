
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, RefreshCw, Quote } from 'lucide-react';

const DUAS = [
  {
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    meaning: "O Allah, I ask You for forgiveness and well-being in this world and the hereafter.",
    source: "Sunan Abu Dawood"
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    meaning: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    source: "Surah Al-Baqarah 2:201"
  },
  {
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    meaning: "O Allah, help me to remember You, to thank You, and to worship You in the best of manners.",
    source: "Sunan Abu Dawood"
  }
];

const DuaCard: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % DUAS.length);
    }, 60000); // 1 minute auto-refresh
    return () => clearInterval(timer);
  }, []);

  const copyDua = () => {
    const text = `"${DUAS[index].meaning}" - ${DUAS[index].source}`;
    navigator.clipboard.writeText(text);
    alert('Dua copied to clipboard');
  };

  return (
    <div className="container mx-auto px-8 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass relative overflow-hidden rounded-[3rem] p-12 md:p-16 border-gold/20 shadow-2xl max-w-4xl mx-auto"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Quote className="w-32 h-32 text-gold" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="flex items-center space-x-3 text-gold/60">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Dua of the Moment</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-gold leading-relaxed">
                {DUAS[index].arabic}
              </h3>
              <p className="text-charcoal/70 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto italic">
                "{DUAS[index].meaning}"
              </p>
              <div className="w-12 h-0.5 bg-gold/20 mx-auto" />
              <p className="text-[10px] font-bold text-gold/50 uppercase tracking-widest">
                Source: {DUAS[index].source}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center space-x-6 pt-4">
            <button 
              onClick={copyDua}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gold/5 border border-gold/10 text-gold hover:bg-gold hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <Copy size={14} /> <span>Copy</span>
            </button>
            <button 
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gold/5 border border-gold/10 text-gold hover:bg-gold hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <Share2 size={14} /> <span>Share</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DuaCard;
