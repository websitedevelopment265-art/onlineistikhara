
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Sparkles, 
  ShieldCheck,
  Check,
  ArrowRight,
  Heart,
  Home,
  Shield,
  Sunrise,
  ArrowUp,
  Lamp,
  ChevronDown,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Quote
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
      staggerChildren: 0.1,
      delayChildren: 0.1
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
  <div className="text-center mb-16 relative">
    <motion.div 
      variants={itemVariants}
      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-black/40 border border-current ${colorClass} shadow-[0_0_30px_currentColor]`}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
    <motion.h2 variants={itemVariants} className="text-3xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight premium-heading">
      {title} <span className="italic gold-gradient-text drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] arabic-font" dir="rtl">{urduTitle}</span>
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4"
    />
  </div>
);

const DetailBlock: React.FC<{ 
  id: string; 
  title: string; 
  content: string; 
  benefits?: string[]; 
  theme: 'emerald' | 'gold' | 'royal' | 'amber';
  isCompact?: boolean;
}> = ({ id, title, content, benefits, theme, isCompact = false }) => {
  const themes = {
    emerald: { glass: 'glass-emerald', glow: 'hover:shadow-[0_0_40px_rgba(6,78,59,0.3)]', text: 'text-emerald-400' },
    gold: { glass: 'glass-gold', glow: 'hover:shadow-[0_0_40px_rgba(197,160,89,0.3)]', text: 'text-gold' },
    royal: { glass: 'glass-royal', glow: 'hover:shadow-[0_0_40px_rgba(11,29,61,0.3)]', text: 'text-blue-400' },
    amber: { glass: 'glass-amber', glow: 'hover:shadow-[0_0_40px_rgba(139, 94, 26, 0.3)]', text: 'text-amber-400' }
  };
  const current = themes[theme];

  return (
    <div className="relative group">
      <motion.div 
        id={id.replace('#', '')} 
        variants={itemVariants}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`scroll-mt-48 p-8 rounded-[2rem] backdrop-blur-xl border-2 transition-all duration-700 relative overflow-hidden flex flex-col h-full ${current.glass} ${current.glow}`}
      >
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 blur-[40px] group-hover:bg-white/10 transition-colors" />
        
        <h4 className={`text-2xl font-serif font-bold mb-4 transition-colors ${current.text} premium-heading`}>{title}</h4>
        <p className="text-ivory/80 mb-6 leading-relaxed urdu-font text-lg md:text-xl" dir="rtl">{content}</p>
        
        {benefits && (
          <div className="space-y-3 mb-8 mt-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full bg-white/10 flex items-center justify-center ${current.text}`}>
                  <Check className="w-2 h-2" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ivory/80">{b}</span>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className={`mt-auto flex items-center space-x-3 font-black text-[9px] uppercase tracking-[0.3em] transition-all hover:translate-x-2 ${current.text}`}>
          <span>Request Guidance</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </motion.div>
      {/* Mirror Reflection */}
      <div className="reflection-mask h-32 w-full relative mt-[-5px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
          <div className={`w-full h-full rounded-[2rem] ${current.glass}`} />
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
              <h1 className="text-gold arabic-font font-bold text-6xl md:text-[9rem] leading-none mb-6 drop-shadow-[0_0_60px_rgba(197,160,89,0.9)] text-center premium-heading" dir="rtl">
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
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-goldLight drop-shadow-[0_0_8px_rgba(233,213,161,0.5)] arabic-font" dir="rtl">
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
                  <span className="text-white font-serif text-xl font-bold tracking-tight gold-gradient-text uppercase premium-heading">NUR-UL-HUDA</span>
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
                  <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className="bg-gold text-charcoal px-8 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest mirror-button shadow-[0_5px_15px_rgba(197,160,89,0.3)]">CONSULTATION</button>
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
                  <span className="text-gold arabic-font text-6xl md:text-9xl font-bold tracking-widest leading-none drop-shadow-[0_0_40px_rgba(197,160,89,0.7)] animate-float premium-heading" dir="rtl">نور الہدیٰ</span>
                  <div className="w-24 h-1 bg-gold/40 my-10 divine-glow" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1.2 }} className="text-6xl md:text-[10rem] font-serif font-bold text-white leading-[0.85] tracking-tight drop-shadow-[0_10px_60px_rgba(0,0,0,0.9)] premium-heading">
                  <span className="urdu-font" dir="rtl">روحانی</span> <br />
                  <span className="gold-gradient-text italic drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] urdu-font" dir="rtl">مرکزِ ہدایت</span>
                </motion.h1>
              </div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2, duration: 1 }} className="text-ivory text-xl md:text-3xl urdu-font mb-16 tracking-wide max-w-4xl mx-auto leading-relaxed" dir="rtl">
                "قرآنِ پاک ki noorani roshni mein, hum aap ke roohani safar aur dili sukoon ki manzil ko roshan karte hain."
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1 }} className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a href="#portals" onClick={(e) => scrollToId(e, '#portals')} className="px-12 py-6 bg-gold text-charcoal rounded-[1.5rem] font-black uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(197,160,89,0.4)] text-[10px] mirror-button">
                   خدماتِ روحانی
                </a>
                <a href="#istikhara" onClick={(e) => scrollToId(e, '#istikhara')} className="px-12 py-6 bg-white/5 backdrop-blur-2xl border border-white/20 text-white rounded-[1.5rem] font-black uppercase tracking-[0.4em] text-[10px] mirror-button">
                   آن لائن استخارہ
                </a>
              </motion.div>
            </div>
          </section>

          {/* MAIN SERVICES GRID: 4 COLUMN */}
          <motion.section 
            id="portals" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-24 relative z-10 scroll-mt-32"
          >
            <div className="container mx-auto px-8 max-w-7xl">
              <SectionHeader title="Sacred" urduTitle="Portals" icon={Sparkles} colorClass="text-gold" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <DetailBlock theme="amber" id="#pasand" title="Pasand ki Shadi" content="Allah ki madad se rishton ki rukawaton ko khatam karein. Hum Quran-o-Sunnah ke mutabiq aapki pasand ki shadi mein anay wali mushkilat ka hal nikaalte hain." benefits={['Rishta Success', 'Family Consent', 'Divine Barakah']} />
                <DetailBlock theme="gold" id="#manpasand" title="Manpasand Shadi" content="Toote hue rishton ko jorne aur na-chaqi door karne ke liye roohani rehnumai aur sabr. Healing emotional wounds." benefits={['Love Bonding', 'Heart Opening', 'Halal Union']} />
                <DetailBlock theme="emerald" id="#shifa" title="Roohani Shifa" content="Quran-o-Sunnah ki roshni mein zehni sukoon aur har qism ki jismani o roohani bimariyon ka ilaj. Finding cure in the Almighty." benefits={['Mental Peace', 'Physical Healing', 'Soul Cleansing']} />
                <DetailBlock theme="royal" id="#decisions" title="Istikhara" content="Karobar, safar, aur naukri jaise zindagi ke ahem faislon mein sahi rasta chunne ke liye Allah ki hidayat." benefits={['Career Guidance', 'Travel Safety', 'Financial Barakah']} />
              </div>
            </div>
          </motion.section>

          {/* DYNAMIC SECTIONS: ALL EXPANDED TO 4 BOXES */}
          <div className="container mx-auto px-8 max-w-7xl space-y-60 pb-60">
            {/* About Section */}
            <motion.section id="about" variants={containerVariants} initial="hidden" whileInView="visible" className="scroll-mt-32">
              <SectionHeader title="Our Sacred" urduTitle="Legacy" icon={ShieldCheck} colorClass="text-emerald-400" />
              <div className="grid md:grid-cols-2 gap-24 items-center">
                <motion.div variants={itemVariants} className="glass-emerald p-14 rounded-[3rem] border-2 shadow-2xl relative">
                   <p className="text-ivory/90 text-2xl urdu-font leading-relaxed" dir="rtl">
                    "A beacon of light founded on Quran and Sunnah. We hold your trust in the highest sanctity and provide authentic roohani solutions for every walk of life."
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-8">
                   <h3 className="text-gold text-3xl font-serif premium-heading">Mission & Values</h3>
                   <p className="text-ivory/70 text-lg leading-relaxed urdu-font" dir="rtl">Humara mission andheron se nikal kar dilon ko sukoon aur hidayat ki taraf le jana hai. Decades of spiritual experience combined with traditional wisdom.</p>
                   <ul className="space-y-4">
                     <li className="flex items-center space-x-3 text-ivory/60 text-sm"><Check className="text-gold" size={16}/> <span>Privacy & Trust Guaranteed</span></li>
                     <li className="flex items-center space-x-3 text-ivory/60 text-sm"><Check className="text-gold" size={16}/> <span>Rooted in Quran & Sunnah</span></li>
                   </ul>
                </motion.div>
              </div>
            </motion.section>

            {/* Marriage Section: 4 BOXES */}
            <motion.section id="marriage" variants={containerVariants} initial="hidden" whileInView="visible" className="scroll-mt-32">
              <SectionHeader title="Love &" urduTitle="Marriage" icon={Heart} colorClass="text-amber-500" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {NAV_ITEMS.find(n => n.label === 'Love & Marriage')?.children?.map((child, i) => (
                  <DetailBlock key={i} theme={i % 2 === 0 ? 'amber' : 'gold'} id={child.href} title={child.label} content={child.description} benefits={child.benefits} />
                ))}
              </div>
            </motion.section>

            {/* Family Section: 4 BOXES */}
            <motion.section id="family" variants={containerVariants} initial="hidden" whileInView="visible" className="scroll-mt-32">
              <SectionHeader title="Family" urduTitle="Harmony" icon={Home} colorClass="text-blue-400" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {NAV_ITEMS.find(n => n.label === 'Family Problems')?.children?.map((child, i) => (
                  <DetailBlock key={i} theme={i % 2 === 0 ? 'royal' : 'emerald'} id={child.href} title={child.label} content={child.description} benefits={child.benefits} />
                ))}
              </div>
            </motion.section>

            {/* Istikhara Section: 4 BOXES + Form */}
            <motion.section id="istikhara" variants={containerVariants} initial="hidden" whileInView="visible" className="scroll-mt-32">
              <SectionHeader title="Divine" urduTitle="Counsel" icon={Sunrise} colorClass="text-gold" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {NAV_ITEMS.find(n => n.label === 'Istikhara')?.children?.map((child, i) => (
                  <DetailBlock key={i} theme="gold" id={child.href} title={child.label} content={child.description} benefits={child.benefits} />
                ))}
              </div>
              <div className="max-w-4xl mx-auto">
                <IstikharaForm />
              </div>
            </motion.section>

            {/* Protection Section: 4 BOXES */}
            <motion.section id="protection" variants={containerVariants} initial="hidden" whileInView="visible" className="scroll-mt-32">
              <SectionHeader title="Sacred" urduTitle="Shields" icon={Shield} colorClass="text-charcoal" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {NAV_ITEMS.find(n => n.label === 'Black Magic')?.children?.map((child, i) => (
                  <DetailBlock key={i} theme="emerald" id={child.href} title={child.label} content={child.description} benefits={child.benefits} />
                ))}
              </div>
            </motion.section>
          </div>

          <StatusTracker />
          <DuaCard />
          <TasbeehCounter />

          {/* SACRED PREMIUM FOOTER */}
          <footer id="contact" className="relative pt-32 pb-16 z-10 bg-emerald border-t border-gold/40">
            <div className="container mx-auto px-8 max-w-7xl relative z-10">
              {/* Spiritual Header */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24 space-y-8"
              >
                <h3 className="text-5xl md:text-7xl font-serif font-bold text-gold premium-heading arabic-font" dir="rtl">
                  أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
                </h3>
                <p className="text-ivory/80 text-2xl md:text-3xl urdu-font italic" dir="rtl">
                  Beshak Allah ki yaad hi mein dilon ka sukoon hai
                </p>
                <div className="w-32 h-[1px] bg-gold/30 mx-auto mt-10" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 mb-24">
                {/* Column 1: Services (Urdu) */}
                <div className="space-y-10">
                  <h4 className="text-gold uppercase tracking-[0.5em] text-xs font-black border-b border-gold/10 pb-5 inline-block">Sacred Services</h4>
                  <ul className="space-y-6 urdu-font text-ivory/70 text-xl" dir="rtl">
                    <li><a href="#istikhara" onClick={(e) => scrollToId(e, '#istikhara')} className="hover:text-gold transition-colors duration-300">استخارہ</a></li>
                    <li><a href="#shifa" onClick={(e) => scrollToId(e, '#shifa')} className="hover:text-gold transition-colors duration-300">روحانی شفا</a></li>
                    <li><a href="#pasand" onClick={(e) => scrollToId(e, '#pasand')} className="hover:text-gold transition-colors duration-300">پسند کی شادی</a></li>
                    <li><a href="#family" onClick={(e) => scrollToId(e, '#family')} className="hover:text-gold transition-colors duration-300">خاندانی مسائل</a></li>
                  </ul>
                </div>

                {/* Column 2: Quick Navigation */}
                <div className="space-y-10">
                  <h4 className="text-gold uppercase tracking-[0.5em] text-xs font-black border-b border-gold/10 pb-5 inline-block">Quick Access</h4>
                  <ul className="space-y-6 text-ivory/70 font-bold uppercase text-sm tracking-[0.2em]">
                    <li><a href="#" onClick={(e) => scrollToId(e, '#')} className="hover:text-gold transition-colors duration-300">Home Path</a></li>
                    <li><a href="#about" onClick={(e) => scrollToId(e, '#about')} className="hover:text-gold transition-colors duration-300">Sacred Legacy</a></li>
                    <li><a href="#contact" onClick={(e) => scrollToId(e, '#contact')} className="hover:text-gold transition-colors duration-300">Contact Center</a></li>
                    <li><a href="#" className="hover:text-gold transition-colors duration-300">Spiritual Blog</a></li>
                  </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div className="space-y-12">
                  <h4 className="text-gold uppercase tracking-[0.5em] text-xs font-black border-b border-gold/10 pb-5 inline-block">Contact Info</h4>
                  <div className="space-y-8">
                    <a href="https://wa.me/923057615767" target="_blank" className="flex items-center space-x-5 group">
                      <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center border border-gold/20 text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-500 shadow-lg">
                        <MessageCircle size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-gold/40 mb-1">WhatsApp Guidance</span>
                        <span className="text-ivory/90 font-bold tracking-widest text-base">+92 305 7615767</span>
                      </div>
                    </a>
                    <a href="mailto:guidance@nurulhuda.com" className="flex items-center space-x-5 group">
                      <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center border border-gold/20 text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-500 shadow-lg">
                        <Mail size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-gold/40 mb-1">Direct Email</span>
                        <span className="text-ivory/90 font-bold tracking-widest text-base">guidance@nurulhuda.com</span>
                      </div>
                    </a>
                  </div>
                  <div className="flex items-center space-x-8 pt-6 opacity-60">
                    <Facebook size={22} className="hover:text-gold cursor-pointer transition-all hover:scale-110" />
                    <Twitter size={22} className="hover:text-gold cursor-pointer transition-all hover:scale-110" />
                    <Instagram size={22} className="hover:text-gold cursor-pointer transition-all hover:scale-110" />
                  </div>
                </div>
              </div>

              {/* Bottom Bar (Barakat) */}
              <div className="pt-16 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                <div className="text-xs font-bold uppercase tracking-[0.4em] text-gold/60 leading-relaxed">
                  Allah ki rehmat aur barakat ke sath — <span className="text-ivory font-black">Nur-ul-Huda 2026</span>
                </div>
                <button 
                  onClick={(e) => scrollToId(e, '#')}
                  className="group flex items-center space-x-4 text-gold/40 hover:text-gold transition-all text-xs font-black uppercase tracking-[0.5em]"
                >
                  <span>RETURN TO LIGHT</span>
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <ArrowUp size={18} />
                  </div>
                </button>
              </div>
            </div>

            {/* Mirror Reflection Edge */}
            <div className="reflection-mask h-32 w-full absolute bottom-0 left-0 opacity-10 pointer-events-none overflow-hidden rotate-180">
              <div className="container mx-auto px-8 max-w-7xl h-full flex flex-col justify-end">
                <div className="w-full h-[2px] bg-gold/20 mb-6" />
                <div className="flex justify-between items-center opacity-40">
                  <div className="w-48 h-3 bg-gold/10 rounded-full" />
                  <div className="w-24 h-3 bg-gold/10 rounded-full" />
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
