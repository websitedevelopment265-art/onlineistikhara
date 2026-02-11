
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Sparkles, 
  Instagram, 
  Facebook, 
  Twitter,
  ShieldCheck,
  Check,
  ArrowRight,
  Heart,
  Home,
  Shield,
  Sunrise,
  ArrowUp,
  Lamp,
  ChevronDown
} from 'lucide-react';
import { NAV_ITEMS } from './constants';
import ParticleBackground from './components/ParticleBackground';
import IstikharaForm from './components/IstikharaForm';
import StatusTracker from './components/StatusTracker';
import CustomCursor from './components/CustomCursor';
import BismillahSVG from './components/BismillahSVG';
import TasbeehCounter from './components/TasbeehCounter';
import MoonPhaseWidget from './components/MoonPhaseWidget';
import DuaCard from './components/DuaCard';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- SACRED BACKGROUND SLIDER ---
const SLIDER_IMAGES = [
  "https://i.pinimg.com/1200x/f2/b8/ff/f2b8ff55f6d209ab8c3d7a45257b10c9.jpg",
  "https://i.pinimg.com/736x/13/51/39/135139ea55f21e2fc65078b3fa8c5221.jpg",
  "https://i.pinimg.com/736x/a6/76/ab/a676abc078e729fa4549cad4bf769052.jpg",
  "https://i.pinimg.com/1200x/f2/b8/ff/f2b8ff55f6d209ab8c3d7a45257b10c9.jpg"
];

const BackgroundSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${SLIDER_IMAGES[index]})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal opacity-95" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-50%] god-rays opacity-20 pointer-events-none" 
      />
    </div>
  );
};

// --- SUB-COMPONENTS ---

const FloatingLantern: React.FC<{ className?: string; delay?: number }> = ({ className, delay = 0 }) => (
  <motion.div
    animate={{ 
      y: [0, -40, 0],
      rotate: [-3, 3, -3]
    }}
    transition={{ 
      duration: 6 + delay, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: delay
    }}
    className={`absolute z-20 text-gold/40 hover:text-gold transition-colors duration-700 ${className}`}
  >
    <div className="relative">
      <Lamp size={48} strokeWidth={1} className="animate-swing" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-gold/20 blur-xl rounded-full" />
    </div>
  </motion.div>
);

const SectionHeader: React.FC<{ title: string; urduTitle: string; icon: any; colorClass: string }> = ({ title, urduTitle, icon: Icon, colorClass }) => (
  <div className="text-center mb-20 relative">
    <motion.div 
      variants={itemVariants}
      className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-black/40 border border-current ${colorClass} shadow-[0_0_40px_currentColor]`}
    >
      <Icon className="w-10 h-10" />
    </motion.div>
    <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
      {title} <span className="italic gold-gradient-text drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{urduTitle}</span>
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 100 }}
      className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"
    />
  </div>
);

const DetailBlock: React.FC<{ 
  id: string; 
  title: string; 
  content: string; 
  benefits: string[]; 
  theme: 'emerald' | 'gold' | 'royal' | 'amber' 
}> = ({ id, title, content, benefits, theme }) => {
  const themes = {
    emerald: { glass: 'glass-emerald', glow: 'hover:shadow-[0_0_60px_rgba(6,78,59,0.3)]', text: 'text-emerald-400' },
    gold: { glass: 'glass-gold', glow: 'hover:shadow-[0_0_60px_rgba(197,160,89,0.3)]', text: 'text-gold' },
    royal: { glass: 'glass-royal', glow: 'hover:shadow-[0_0_60px_rgba(11,29,61,0.3)]', text: 'text-blue-400' },
    amber: { glass: 'glass-amber', glow: 'hover:shadow-[0_0_60px_rgba(139,94,26,0.3)]', text: 'text-amber-400' }
  };
  const current = themes[theme];

  return (
    <div className="relative group mb-12">
      <motion.div 
        id={id.replace('#', '')} 
        variants={itemVariants}
        whileHover={{ y: -10, scale: 1.01 }}
        className={`scroll-mt-48 p-12 rounded-[3rem] backdrop-blur-xl border-2 transition-all duration-700 relative overflow-hidden ${current.glass} ${current.glow}`}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 blur-[60px] group-hover:bg-white/10 transition-colors" />
        
        <h4 className={`text-4xl font-serif font-bold mb-6 transition-colors ${current.text}`}>{title}</h4>
        <p className="text-ivory/80 mb-8 leading-relaxed italic text-lg">{content}</p>
        
        <div className="grid md:grid-cols-1 gap-6 mb-10">
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className={`w-6 h-6 rounded-full bg-white/10 flex items-center justify-center ${current.text}`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-ivory/90">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className={`flex items-center space-x-4 font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:translate-x-3 ${current.text}`}>
          <span>Request Sacred Guidance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
      {/* Mirror Reflection */}
      <div className="reflection-mask h-48 w-full relative mt-[-10px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
          <div className={`w-full h-full rounded-[3rem] ${current.glass}`} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetId = id.startsWith('#') ? id : `#${id}`;
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 140;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div 
          key="loader" 
          exit={{ opacity: 0, scale: 1.15 }} 
          className="fixed inset-0 z-[1000] bg-charcoal flex flex-col items-center justify-center overflow-hidden px-6"
        >
          <BackgroundSlider />
          <div className="relative z-10 flex flex-col items-center text-center">
            <BismillahSVG />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              <h1 className="text-gold font-serif font-bold text-6xl md:text-[9rem] leading-none mb-6 drop-shadow-[0_0_60px_rgba(197,160,89,0.9)] text-center">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </h1>
              <h2 className="text-white font-sans font-black text-2xl tracking-[1.2em] mb-12 uppercase opacity-70">BISMILLAH</h2>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
              onClick={() => setIsLoading(false)} 
              className="px-24 py-7 bg-gold text-charcoal text-xs font-black tracking-[0.6em] rounded-full mirror-button shadow-[0_0_40px_rgba(197,160,89,0.6)]"
            >
              ASCEND TO LIGHT
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="relative min-h-screen bg-charcoal text-ivory">
          <BackgroundSlider />
          <div className="parallax-pattern" />
          <CustomCursor />

          {/* Navigation */}
          <div className="fixed top-0 left-0 right-0 z-[110]">
            <div className="bg-forest text-white py-2 overflow-hidden border-b border-gold/30 relative z-50">
              <div className="flex items-center justify-center space-x-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-goldLight drop-shadow-[0_0_8px_rgba(233,213,161,0.5)]">
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </span>
              </div>
            </div>
            <nav className={`w-full px-6 pt-6 transition-all duration-1000`}>
              <div className={`mx-auto max-w-7xl flex items-center justify-between px-10 py-5 rounded-[2rem] border ${scrolled ? 'bg-charcoal/90 backdrop-blur-2xl border-gold/40 shadow-2xl' : 'bg-transparent border-transparent'}`}>
                <a href="#" onClick={(e) => scrollToId(e, '#')} className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.6)] group-hover:scale-110 transition-transform">
                    <span className="text-charcoal font-black text-xl">N</span>
                  </div>
                  <span className="text-white font-serif text-xl font-bold tracking-tight gold-gradient-text uppercase">NUR-UL-HUDA</span>
                </a>
                
                <div className="hidden lg:flex items-center space-x-8">
                  {NAV_ITEMS.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a 
                        href={item.href} 
                        onClick={(e) => scrollToId(e, item.href)}
                        className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-ivory/70 hover:text-gold transition-all"
                      >
                        <span>{item.label}</span>
                        {item.children && <ChevronDown size={12} className="opacity-40" />}
                      </a>
                      
                      {item.children && (
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 mt-4 w-64 glass-gold rounded-2xl p-4 space-y-2 shadow-2xl"
                            >
                              {item.children.map((child, cIdx) => (
                                <a 
                                  key={cIdx} 
                                  href={child.href}
                                  onClick={(e) => scrollToId(e, child.href)}
                                  className="block px-4 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-ivory/60 hover:text-gold hover:bg-white/5 rounded-xl transition-all"
                                >
                                  {child.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}
                  <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className="bg-gold text-charcoal px-8 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest mirror-button">CONSULTATION</button>
                </div>
              </div>
            </nav>
          </div>

          {/* HERO SECTION */}
          <section className="relative min-h-screen flex items-center justify-center pt-40 overflow-hidden">
            <FloatingLantern className="top-1/4 left-10" delay={0} />
            <FloatingLantern className="top-1/3 right-20" delay={2} />
            <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="mb-10">
                <BismillahSVG />
              </motion.div>
              <div className="relative inline-block mb-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="flex flex-col items-center">
                  <span className="text-gold font-serif text-6xl md:text-9xl font-bold tracking-widest leading-none drop-shadow-[0_0_40px_rgba(197,160,89,0.7)] animate-float">نور الہدیٰ</span>
                  <div className="w-24 h-1 bg-gold/40 my-10 divine-glow" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1.2 }} className="text-6xl md:text-[10rem] font-serif font-bold text-white leading-[0.85] tracking-tight drop-shadow-[0_10px_60px_rgba(0,0,0,0.9)]">
                  روحانی <br />
                  <span className="gold-gradient-text italic drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">مرکزِ ہدایت</span>
                </motion.h1>
              </div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2, duration: 1 }} className="text-ivory text-lg md:text-2xl font-serif italic mb-16 tracking-wide max-w-4xl mx-auto leading-relaxed">
                "قرآنِ پاک کی نورانی روشنی میں، ہم آپ کے روحانی سفر اور دلی سکون کی منزل کو روشن کرتے ہیں۔"
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1 }} className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a href="#istikhara" onClick={(e) => scrollToId(e, '#istikhara')} className="px-12 py-6 bg-gold text-charcoal rounded-[1.5rem] font-black uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(197,160,89,0.4)] text-[10px] mirror-button">
                  روحانی استخارہ
                </a>
                <a href="#about" onClick={(e) => scrollToId(e, '#about')} className="px-12 py-6 bg-white/5 backdrop-blur-2xl border border-white/20 text-white rounded-[1.5rem] font-black uppercase tracking-[0.4em] text-[10px] mirror-button">
                  ہمارا مشن
                </a>
              </motion.div>
            </div>
          </section>

          {/* DYNAMIC SECTIONS */}
          <div className="container mx-auto px-8 max-w-6xl space-y-60 pb-60">
            {/* About Section */}
            <motion.section 
              id="about" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <SectionHeader title="Our Sacred" urduTitle="Legacy" icon={ShieldCheck} colorClass="text-emerald-400" />
              <div className="grid md:grid-cols-2 gap-24 items-center">
                <motion.div variants={itemVariants} className="glass-emerald p-14 rounded-[3rem] border-2 shadow-2xl relative">
                   <p className="text-ivory/90 text-2xl font-serif italic leading-relaxed">
                    "A beacon of light founded on Quran and Sunnah. We hold your trust in the highest sanctity and provide authentic roohani solutions for every walk of life."
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-8">
                   <h3 className="text-gold text-3xl font-serif">Mission & Values</h3>
                   <p className="text-ivory/70 text-lg leading-relaxed font-serif">Humara mission andheron se nikal kar dilon ko sukoon aur hidayat ki taraf le jana hai. Decades of spiritual experience combined with traditional wisdom.</p>
                   <ul className="space-y-4">
                     <li className="flex items-center space-x-3 text-ivory/60 text-sm"><Check className="text-gold" size={16}/> <span>Privacy & Trust Guaranteed</span></li>
                     <li className="flex items-center space-x-3 text-ivory/60 text-sm"><Check className="text-gold" size={16}/> <span>Rooted in Quran & Sunnah</span></li>
                     <li className="flex items-center space-x-3 text-ivory/60 text-sm"><Check className="text-gold" size={16}/> <span>Global Reach for Ummah</span></li>
                   </ul>
                </motion.div>
              </div>
            </motion.section>

            {/* Content for Marriage */}
            <motion.section 
              id="marriage" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <SectionHeader title="Love &" urduTitle="Marriage" icon={Heart} colorClass="text-amber-500" />
              <div className="grid md:grid-cols-2 gap-10">
                {NAV_ITEMS.find(n => n.label === 'Love & Marriage')?.children?.map((child, i) => (
                  <DetailBlock 
                    key={i}
                    theme={i % 2 === 0 ? 'amber' : 'gold'}
                    id={child.href}
                    title={child.label}
                    content={child.description}
                    benefits={child.benefits}
                  />
                ))}
              </div>
            </motion.section>

            {/* Content for Family */}
            <motion.section 
              id="family" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <SectionHeader title="The Family" urduTitle="Sanctuary" icon={Home} colorClass="text-blue-400" />
              <div className="grid md:grid-cols-2 gap-10">
                {NAV_ITEMS.find(n => n.label === 'Family Problems')?.children?.map((child, i) => (
                  <DetailBlock 
                    key={i}
                    theme={i % 2 === 0 ? 'royal' : 'emerald'}
                    id={child.href}
                    title={child.label}
                    content={child.description}
                    benefits={child.benefits}
                  />
                ))}
              </div>
            </motion.section>

            {/* Content for Istikhara */}
            <motion.section 
              id="istikhara" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <SectionHeader title="Divine" urduTitle="Counsel" icon={Sunrise} colorClass="text-gold" />
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-1/2 space-y-10">
                  {NAV_ITEMS.find(n => n.label === 'Istikhara')?.children?.map((child, i) => (
                    <DetailBlock 
                      key={i}
                      theme="gold"
                      id={child.href}
                      title={child.label}
                      content={child.description}
                      benefits={child.benefits}
                    />
                  ))}
                </div>
                <div className="lg:w-1/2 w-full">
                  <IstikharaForm />
                </div>
              </div>
            </motion.section>

            {/* Content for Protection */}
            <motion.section 
              id="protection" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <SectionHeader title="Sacred" urduTitle="Shields" icon={Shield} colorClass="text-charcoal" />
              <div className="grid md:grid-cols-2 gap-10">
                {NAV_ITEMS.find(n => n.label === 'Black Magic')?.children?.map((child, i) => (
                  <DetailBlock 
                    key={i}
                    theme="emerald"
                    id={child.href}
                    title={child.label}
                    content={child.description}
                    benefits={child.benefits}
                  />
                ))}
              </div>
            </motion.section>
          </div>

          <StatusTracker />
          <DuaCard />
          <TasbeehCounter />

          <footer id="contact" className="relative pt-60 pb-20 z-10 bg-black border-t-2 border-gold/40">
            <div className="container mx-auto px-10 text-center relative z-10">
              <BismillahSVG />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mt-32 text-left">
                <div className="space-y-8">
                  <h3 className="text-4xl font-serif font-bold gold-gradient-text">نور الہدیٰ</h3>
                  <p className="text-ivory/50 text-lg font-serif italic">"Andheron se nikal kar dilon ko sukoon aur hidayat ki taraf le jana humara mission hai."</p>
                  <div className="flex space-x-6">
                    {[Instagram, Facebook, Twitter].map((I, i) => <a key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><I size={18} /></a>)}
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-gold uppercase tracking-[0.5em] text-[10px] font-black">Sacred Links</h4>
                  <ul className="space-y-4 text-ivory/50 font-bold uppercase text-[9px] tracking-[0.3em]">
                    <li><a href="#about" onClick={(e) => scrollToId(e, '#about')}>About Us</a></li>
                    <li><a href="#marriage" onClick={(e) => scrollToId(e, '#marriage')}>Marriage Success</a></li>
                    <li><a href="#family" onClick={(e) => scrollToId(e, '#family')}>Family Harmony</a></li>
                    <li><a href="#istikhara" onClick={(e) => scrollToId(e, '#istikhara')}>Istikhara Service</a></li>
                  </ul>
                </div>
                <div className="space-y-8">
                  <h4 className="text-gold uppercase tracking-[0.5em] text-[10px] font-black">Direct Access</h4>
                  <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className="w-full bg-forest text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] mirror-button flex items-center justify-center space-x-4">
                    <MessageCircle size={20} />
                    <span>WHATSAPP GUIDANCE</span>
                  </button>
                  <button onClick={(e) => scrollToId(e, '#')} className="flex items-center space-x-4 text-gold/60 hover:text-gold transition-all text-[10px] font-black uppercase tracking-[0.6em]">
                    <span>RETURN TO LIGHT</span>
                    <ArrowUp size={16} />
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;
