
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, RefreshCw, Quote, Check } from 'lucide-react';

const DUAS = [
  {
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    meaning: "O Allah, I ask You for forgiveness and well-being in this world and the hereafter.",
    source: "Sunan Abu Dawood",
    category: "General Well-being"
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    meaning: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    source: "Surah Al-Baqarah 2:201",
    category: "Success"
  },
  {
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    meaning: "O Allah, help me to remember You, to thank You, and to worship You in the best of manners.",
    source: "Sunan Abu Dawood",
    category: "Gratitude"
  },
  {
    arabic: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    meaning: "Allah is sufficient for me. There is no god but He. In Him do I trust, and He is the Lord of the Mighty Throne.",
    source: "Surah At-Tawbah 9:129",
    category: "Reliance"
  },
  {
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
    meaning: "O Living, O Sustaining, in Your Mercy I seek relief.",
    source: "Sunan At-Tirmidhi",
    category: "Distress"
  }
];

const REFRESH_INTERVAL = 60000; // 1 minute

const DuaCard: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextDua = useCallback(() => {
    setIndex(prev => (prev + 1) % DUAS.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextDua();
          return 0;
        }
        return prev + (100 / (REFRESH_INTERVAL / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [nextDua]);

  const copyDua = () => {
    const text = `"${DUAS[index].meaning}"\n\nArabic: ${DUAS[index].arabic}\nSource: ${DUAS[index].source}\nShared via Nur-ul-Huda`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareDua = async () => {
    const shareData = {
      title: 'Daily Dua',
      text: `"${DUAS[index].meaning}" - ${DUAS[index].source}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyDua();
    }
  };

  return (
    <section id="dua-moment" className="container mx-auto px-8 py-24 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass relative overflow-hidden rounded-[3.5rem] p-10 md:p-20 border-gold/20 shadow-[0_30px_100px_rgba(0,0,0,0.3)] max-w-5xl mx-auto"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
          <Quote className="w-48 h-48 text-gold" />
        </div>
        
        {/* Progress Bar (Subtle top indicator) */}
        <div className="absolute top-0 left-0 h-1 bg-gold/10 w-full overflow-hidden">
          <motion.div 
            className="h-full bg-gold/40"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-10">
          <motion.div 
            className="flex items-center space-x-4 px-6 py-2 rounded-full bg-gold/5 border border-gold/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <RefreshCw className="w-3.5 h-3.5 text-gold/60" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold/80">Dua of the Moment</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold/40 px-3 py-1 border border-gold/10 rounded-lg">
                  {DUAS[index].category}
                </span>
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.3] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  {DUAS[index].arabic}
                </h3>
              </div>

              <div className="max-w-3xl mx-auto">
                <p className="text-ivory/80 text-xl md:text-2xl font-serif italic leading-relaxed">
                  "{DUAS[index].meaning}"
                </p>
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-8 mb-4" />
                <p className="text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">
                  Source: {DUAS[index].source}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <button 
              onClick={copyDua}
              className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl border transition-all duration-500 text-[10px] font-black uppercase tracking-[0.3em] ${
                copied 
                ? 'bg-emerald/20 border-emerald/50 text-emerald-400' 
                : 'bg-white/5 border-white/10 text-ivory/60 hover:bg-gold hover:text-charcoal hover:border-gold'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} className="group-hover:rotate-12 transition-transform" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button 
              onClick={shareDua}
              className="group flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-ivory/60 hover:bg-white/10 hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <Share2 size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span>Share Blessing</span>
            </button>

            <button 
              onClick={nextDua}
              className="flex items-center space-x-3 px-6 py-4 rounded-2xl text-gold/40 hover:text-gold transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
              title="Next Dua"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DuaCard;
