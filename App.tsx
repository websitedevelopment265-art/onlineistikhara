
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
  Youtube,
  Quote,
  Settings,
  PhoneCall,
  Search,
  CheckCircle2
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
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

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
  "https://i.pinimg.com/736x/a6/76/ab/a676abc078e729fa4549cad4bf769052.jpg"
];

const BackgroundSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-charcoal">
      {/* Fixed typo: changed closing tag </AnPresence> to </AnimatePresence> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.25, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${SLIDER_IMAGES[index]})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal opacity-90" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
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
    className={`absolute z-20 text-gold/30 hover:text-gold transition-colors duration-700 ${className}`}
  >
    <div className="relative">
      <Lamp size={48} strokeWidth={1} className="animate-swing" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-gold/10 blur-xl rounded-full" />
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
    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight premium-heading">
      {title} <span className="italic gold-gradient-text arabic-font" dir="rtl">{urduTitle}</span>
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
}> = ({ id, title, content, benefits, theme }) => {
  const themes = {
    emerald: { glass: 'glass-emerald', text: 'text-emerald-400' },
    gold: { glass: 'glass-gold', text: 'text-gold' },
    royal: { glass: 'glass-gold', text: 'text-gold' },
    amber: { glass: 'glass-gold', text: 'text-gold' }
  };
  const current = themes[theme] || themes.gold;

  return (
    <div className="relative group">
      <motion.div 
        id={id.replace('#', '')} 
        variants={itemVariants}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`scroll-mt-48 p-8 rounded-[2rem] backdrop-blur-xl border-2 transition-all duration-700 relative overflow-hidden flex flex-col h-full bg-white/[0.03] border-gold/10 hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(197,160,89,0.1)]`}
      >
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold/5 blur-[40px] group-hover:bg-gold/10 transition-colors" />
        
        <h4 className={`text-2xl font-serif font-bold mb-4 transition-colors ${current.text} premium-heading`}>{title}</h4>
        <p className="text-ivory/80 mb-6 leading-[2] urdu-font text-lg md:text-xl" dir="rtl">{content}</p>
        
        {benefits && (
          <div className="space-y-3 mb-8 mt-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full bg-gold/10 flex items-center justify-center text-gold`}>
                  <Check className="w-2 h-2" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-goldLight/60">{b}</span>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className={`mt-auto flex items-center space-x-3 font-black text-[9px] uppercase tracking-[0.3em] transition-all hover:translate-x-2 text-gold`}>
          <span>Request Guidance</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Admin State
  const [adminMode, setAdminMode] = useState<'none' | 'login' | 'dashboard'>('none');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
      const offset = 120;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, []);

  if (adminMode === 'login') {
    return <AdminLogin onLogin={(success) => setAdminMode(success ? 'dashboard' : 'login')} />;
  }

  if (adminMode === 'dashboard') {
    return <AdminDashboard onLogout={() => setAdminMode('none')} />;
  }

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
              <h1 className="text-gold arabic-font font-bold text-5xl md:text-7xl leading-tight mb-6 drop-shadow-[0_0_40px_rgba(197,160,89,0.5)] text-center" dir="rtl">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </h1>
              <h2 className="text-goldLight font-sans font-black text-xl tracking-[1em] mb-12 uppercase opacity-40">BISMILLAH</h2>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              onClick={() => setIsLoading(false)} 
              className="px-16 py-5 bg-gold text-charcoal text-xs font-black tracking-[0.5em] rounded-full mirror-button shadow-2xl"
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
          <header className="fixed top-0 left-0 right-0 z-[110]">
            <div className={`bg-gold text-charcoal overflow-hidden relative z-50 transition-all duration-700 ${scrolled ? 'py-1' : 'py-2'}`}>
              <div className="flex items-center justify-center space-x-6">
                <span className={`font-bold uppercase tracking-[0.4em] text-charcoal/80 arabic-font transition-all duration-700 ${scrolled ? 'text-[8px]' : 'text-[10px]'}`} dir="rtl">
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </span>
              </div>
            </div>

            <nav className={`w-full transition-all duration-700 ease-in-out ${scrolled ? 'px-4 pt-2' : 'px-6 pt-6'}`}>
              <div className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-700 ease-in-out rounded-[2rem] border ${
                scrolled 
                ? 'bg-black/60 backdrop-blur-3xl border-gold/40 shadow-2xl px-8 py-3' 
                : 'bg-transparent border-transparent px-10 py-5'
              }`}>
                <a href="#" onClick={(e) => scrollToId(e, '#')} className="flex items-center space-x-3 group">
                  <motion.div 
                    animate={{ scale: scrolled ? 0.8 : 1 }}
                    className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.5)] group-hover:scale-110 transition-transform"
                  >
                    <span className="text-charcoal font-black text-lg">N</span>
                  </motion.div>
                  <motion.span 
                    animate={{ fontSize: scrolled ? '1rem' : '1.15rem' }}
                    className="text-white font-serif font-bold tracking-tight uppercase premium-heading gold-gradient-text"
                  >
                    NUR-UL-HUDA
                  </motion.span>
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
                        className={`flex items-center space-x-2 font-black uppercase tracking-[0.2em] text-ivory/60 hover:text-gold transition-all duration-500 ${scrolled ? 'text-[8px]' : 'text-[9px]'}`}
                      >
                        <span>{item.label}</span>
                        {item.children && <ChevronDown size={10} className="opacity-40" />}
                      </a>
                      
                      {item.children && (
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 glass rounded-2xl p-4 space-y-2 shadow-2xl z-[150]"
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
                  <button 
                    onClick={() => window.open('https://wa.me/923057615767', '_blank')} 
                    className={`bg-gold text-charcoal rounded-xl font-black uppercase tracking-widest transition-all duration-700 mirror-button shadow-lg ${
                      scrolled ? 'px-6 py-2.5 text-[8px]' : 'px-8 py-3 text-[9px]'
                    }`}
                  >
                    CONSULTATION
                  </button>
                </div>
              </div>
            </nav>
          </header>

          {/* HERO SECTION */}
          <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            <FloatingLantern className="top-1/4 left-10" delay={0} />
            <FloatingLantern className="top-1/3 right-20" delay={2} />
            <div className="container mx-auto px-6 relative z-10 text-center py-10">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="mb-6 flex justify-center">
                <BismillahSVG />
              </motion.div>
              
              <div className="relative inline-block mb-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="flex flex-col items-center">
                  <span className="text-gold arabic-font text-5xl md:text-7xl font-bold tracking-widest leading-none drop-shadow-[0_0_30px_rgba(197,160,89,0.7)] animate-float premium-heading" dir="rtl">نور الہدیٰ</span>
                  <div className="w-16 h-0.5 bg-gold/30 my-6" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="text-3xl md:text-5xl font-serif font-bold text-white leading-relaxed tracking-tight premium-heading">
                  <span className="urdu-font" dir="rtl">روحانی</span> <br />
                  <span className="gold-gradient-text italic urdu-font" dir="rtl">مرکزِ ہدایت</span>
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.5, duration: 1 }} className="text-ivory/80 text-xl md:text-2xl urdu-font mb-12 tracking-wide max-w-4xl mx-auto leading-loose" dir="rtl">
                "قرآنِ پاک کی نورانی روشنی میں، ہم آپ کے روحانی سفر اور دلی سکون کی منزل کو روشن کرتے ہیں۔"
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="#portals" onClick={(e) => scrollToId(e, '#portals')} className="px-10 py-5 bg-gold text-charcoal rounded-xl font-black uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(197,160,89,0.4)] text-[9px] mirror-button">
                   خدماتِ روحانی
                </a>
                <a href="#istikhara" onClick={(e) => scrollToId(e, '#istikhara')} className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-xl font-black uppercase tracking-[0.3em] text-[9px] mirror-button">
                   آن لائن استخارہ
                </a>
              </motion.div>
            </div>
          </section>

          {/* MAIN SERVICES GRID */}
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
                <DetailBlock 
                  theme="gold" 
                  id="#pasand" 
                  title="Pasand ki Shadi" 
                  content="Mohabbat ki shadi mein aanay wali har qism ki rukawat, bandish, aur walidain ki na-razamandi ka Quran-o-Sunnah ki roshni mein mujarrab hal. Hum dilon mein mohabbat aur narm-gosha paida karne ke liye roohani madad faraham karte hain." 
                  benefits={['Rishta Success', 'Family Consent', 'Divine Barakah']} 
                />
                <DetailBlock 
                  theme="amber" 
                  id="#marriage-dua" 
                  title="Dua for Marriage" 
                  content="Naye rishton ki talash mein pareshani ya mangni ke baad toot jane wale rishton ke liye makhsoos duain. Apni azdwaji zindagi ko hasad aur buri nazar se mahfooz rakhne ke liye hum se ruju karein." 
                  benefits={['Love Bonding', 'Heart Opening', 'Halal Union']} 
                />
                <DetailBlock 
                  theme="emerald" 
                  id="#shifa" 
                  title="Roohani Shifa" 
                  content="Zehni dabao (Depression), khauf, aur la-ilaaj jismani bimariyon ka roohani ilaj. Allah ke pak kalam ki tilawat aur makhsoos azkar ke zariye dilon ka sukoon aur jismani tandurusti hasil karein." 
                  benefits={['Mental Peace', 'Physical Healing', 'Soul Cleansing']} 
                />
                <DetailBlock 
                  theme="royal" 
                  id="#decisions" 
                  title="Istikhara for Decisions" 
                  content="Zindagi ke ahem mod par ghalat faislon se bachne ke liye Allah ki hidayat talab karein. Karobar, bahar ka safar, ya ghar ki tabdeeli—har kaam se pehle sunnat-e-nabwi ke mutabiq istikhara karein." 
                  benefits={['Career Guidance', 'Travel Safety', 'Financial Barakah']} 
                />
              </div>
            </div>
          </motion.section>

          {/* OUR MISSION SECTION */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="py-24 relative z-10 overflow-hidden"
          >
             <div className="container mx-auto px-8 max-w-5xl">
                <div className="glass border-2 border-gold/10 p-12 md:p-20 rounded-[3.5rem] relative overflow-hidden text-center">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none">
                      <Shield size={200} className="text-gold" />
                   </div>
                   <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 tracking-tight premium-heading">
                      Hamara <span className="gold-gradient-text italic arabic-font" dir="rtl">Maqsad</span>
                   </h2>
                   <p className="text-ivory/90 text-2xl md:text-3xl urdu-font leading-[2] drop-shadow-md" dir="rtl">
                      "نور الہدیٰ کا مقصد لوگوں کو جادو ٹونہ اور غلط عملیات کے دھوکے سے نکال کر قرآنِ پاک کی ہدایت اور روحانی سکون کی طرف لانا ہے۔ ہماری تمام خدمات خالص دینی اور انسانی ہمدردی کی بنیاد پر ہیں۔"
                   </p>
                   <div className="w-24 h-1 bg-gold/20 mx-auto mt-12 rounded-full" />
                </div>
             </div>
          </motion.section>

          {/* HOW IT WORKS SECTION */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="py-24 relative z-10"
          >
             <div className="container mx-auto px-8 max-w-7xl">
                <SectionHeader title="Process" urduTitle="Hidayat" icon={Sunrise} colorClass="text-gold" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {[
                      { icon: PhoneCall, label: "Rabta", desc: "Hamein apni pareshani tafseel se batayein.", step: "01" },
                      { icon: Search, label: "Tashkhees", desc: "Hum aapke maslay ka roohani mushahida karenge.", step: "02" },
                      { icon: CheckCircle2, label: "Hal", desc: "Aapko makhsoos wazaif aur dua ka rasta dikhaya jayega.", step: "03" }
                   ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        className="glass p-10 rounded-[2.5rem] border border-gold/5 text-center space-y-6 group hover:border-gold/20 transition-all duration-700"
                      >
                         <div className="relative inline-block">
                            <div className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                               <item.icon size={32} />
                            </div>
                            <span className="absolute -top-4 -right-4 text-[10px] font-black text-gold/40 bg-charcoal border border-gold/10 w-8 h-8 rounded-full flex items-center justify-center">
                               {item.step}
                            </span>
                         </div>
                         <h3 className="text-2xl font-serif font-bold text-white urdu-font premium-heading" dir="rtl">{item.label}</h3>
                         <p className="text-ivory/60 text-lg urdu-font leading-loose" dir="rtl">{item.desc}</p>
                      </motion.div>
                   ))}
                </div>
             </div>
          </motion.section>

          {/* DYNAMIC SECTIONS */}
          <div className="container mx-auto px-8 max-w-7xl space-y-40 pb-40">
            {/* About Section */}
            <motion.section id="about" variants={containerVariants} initial="hidden" whileInView="visible" className="scroll-mt-32">
              <SectionHeader title="Our Sacred" urduTitle="Legacy" icon={ShieldCheck} colorClass="text-gold" />
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-gold/10 shadow-2xl relative">
                   <p className="text-ivory/90 text-2xl urdu-font leading-loose" dir="rtl">
                    "نور الہدیٰ ایک ایسا روحانی مرکز ہے جو قرآن و سنت کی روشنی میں آپ کے ہر مسئلے کا حل پیش کرتا ہے۔ آپ کا اعتماد ہماری سب سے بڑی طاقت ہے۔"
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-6">
                   <h3 className="text-gold text-3xl font-serif premium-heading">Mission & Values</h3>
                   <p className="text-ivory/60 text-lg leading-loose urdu-font" dir="rtl">ہمارا مقصد دکھی انسانیت کی خدمت اور صراطِ مستقیم کی طرف رہنمائی کرنا ہے۔ عشروں کا روحانی تجربہ اور مستند قرآنی حل۔</p>
                   <ul className="space-y-4">
                     <li className="flex items-center space-x-3 text-goldLight/70 text-sm"><Check className="text-gold" size={16}/> <span>Privacy & Trust Guaranteed</span></li>
                     <li className="flex items-center space-x-3 text-goldLight/70 text-sm"><Check className="text-gold" size={16}/> <span>Rooted in Quran & Sunnah</span></li>
                   </ul>
                </motion.div>
              </div>
            </motion.section>

            {/* Istikhara Section */}
            <motion.section id="istikhara" variants={containerVariants} initial="hidden" whileInView="visible" className="scroll-mt-32">
              <SectionHeader title="Divine" urduTitle="Counsel" icon={Sunrise} colorClass="text-gold" />
              <div className="max-w-4xl mx-auto">
                <IstikharaForm />
              </div>
            </motion.section>
          </div>

          <StatusTracker />
          <DuaCard />
          <TasbeehCounter />

          {/* UPDATED PREMIUM FOOTER */}
          <footer id="contact" className="relative pt-32 pb-16 z-10 bg-forest border-t border-gold/20 overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none urdu-font text-[20vw] text-gold flex items-center justify-center select-none leading-none">
              نور الہدیٰ
            </div>

            <div className="container mx-auto px-8 max-w-7xl relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
                
                {/* Column 1: Identity */}
                <div className="space-y-8 md:col-span-1">
                  <div className="space-y-4">
                    <h3 className="arabic-font text-5xl md:text-6xl text-gold leading-none drop-shadow-[0_4px_10px_rgba(197,160,89,0.5)] premium-heading" dir="rtl">
                      أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
                    </h3>
                    <div className="h-px w-20 bg-gold/20" />
                    <p className="urdu-font text-ivory/90 text-2xl leading-relaxed" dir="rtl">
                      بیشک اللہ کی یاد میں دلوں کا سکون ہے۔
                    </p>
                  </div>
                </div>

                {/* Column 2: Services */}
                <div className="space-y-8">
                  <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-black border-b border-gold/10 pb-4 inline-block">Sacred Services</h4>
                  <ul className="urdu-font space-y-4 text-ivory/60 text-xl" dir="rtl">
                    <li><a href="#istikhara" onClick={(e) => scrollToId(e, '#istikhara')} className="hover:text-gold transition-all duration-300">استخارہ</a></li>
                    <li><a href="#portals" onClick={(e) => scrollToId(e, '#shifa')} className="hover:text-gold transition-all duration-300">روحانی شفا</a></li>
                    <li><a href="#portals" onClick={(e) => scrollToId(e, '#pasand')} className="hover:text-gold transition-all duration-300">پسند کی شادی</a></li>
                    <li><a href="#" className="hover:text-gold transition-all duration-300">وظائف</a></li>
                  </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="space-y-8">
                  <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-black border-b border-gold/10 pb-4 inline-block">Direct Rabta</h4>
                  <div className="space-y-6">
                    <a href="https://wa.me/923057615767" target="_blank" className="flex items-center space-x-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-forest transition-all duration-500 shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                        <MessageCircle size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest text-gold/40 font-black">WhatsApp Guidance</span>
                        <span className="text-ivory/90 font-bold tracking-widest text-sm">+92 305 7615767</span>
                      </div>
                    </a>
                    <a href="mailto:guidance@nurulhuda.com" className="flex items-center space-x-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-forest transition-all duration-500 shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                        <Mail size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest text-gold/40 font-black">Sacred Email</span>
                        <span className="text-ivory/90 font-bold tracking-widest text-sm">guidance@nurulhuda.com</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Column 4: Socials */}
                <div className="space-y-8">
                  <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-black border-b border-gold/10 pb-4 inline-block">Follow the Path</h4>
                  <div className="flex items-center space-x-6">
                    <a href="#" className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-forest hover:border-gold transition-all duration-500 shadow-xl group">
                      <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-forest hover:border-gold transition-all duration-500 shadow-xl group">
                      <Youtube size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-forest hover:border-gold transition-all duration-500 shadow-xl group">
                      <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                  <div className="pt-6">
                    <button 
                      onClick={() => setAdminMode('login')} 
                      className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-gold/30 hover:text-gold transition-colors"
                    >
                      <Settings size={14} />
                      <span>Admin Access</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Copyright Bar */}
              <div className="pt-12 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="text-[11px] font-black uppercase tracking-[0.4em] text-gold/40 max-w-lg leading-loose">
                  Allah ki rehmat aur barakat ke sath — <span className="text-ivory">Nur-ul-Huda 2026</span>
                </div>
                <button 
                  onClick={(e) => scrollToId(e, '#')}
                  className="group flex items-center space-x-4 text-gold/40 hover:text-gold transition-all text-[10px] font-black uppercase tracking-[0.5em]"
                >
                  <ArrowUp size={16} className="group-hover:-translate-y-1.5 transition-transform duration-500" />
                  <span>BACK TO ASCENSION</span>
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;
