
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
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { NAV_ITEMS } from './constants.ts';
import ParticleBackground from './components/ParticleBackground.tsx';
import IstikharaForm from './components/IstikharaForm.tsx';
import StatusTracker from './components/StatusTracker.tsx';
import BismillahSVG from './components/BismillahSVG.tsx';
import TasbeehCounter from './components/TasbeehCounter.tsx';
import MoonPhaseWidget from './components/MoonPhaseWidget.tsx';
import DuaCard from './components/DuaCard.tsx';
import AboutSection from './components/AboutSection.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import CookieBanner from './components/CookieBanner.tsx';

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
      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-black/40 border border-current ${colorClass} shadow-[0_0_40px_currentColor]`}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight premium-heading">
      {title} <span className="italic gold-gradient-text arabic-font" dir="rtl">{urduTitle}</span>
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 100 }}
      className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4"
    />
  </div>
);

const DetailBlock: React.FC<{ 
  id: string; 
  title: string; 
  content: string; 
  theme: 'emerald' | 'gold' | 'royal' | 'amber';
}> = ({ id, title, content, theme }) => {
  const themes = {
    emerald: { glass: 'glass-emerald', text: 'text-emerald-400' },
    gold: { glass: 'glass-gold', text: 'text-gold' },
    royal: { glass: 'glass-gold', text: 'text-gold' },
    amber: { glass: 'glass-gold', text: 'text-gold' }
  };
  const current = themes[theme] || themes.gold;

  return (
    <div className="relative group h-full">
      <motion.div 
        id={id.replace('#', '')} 
        variants={itemVariants}
        whileHover={{ y: -10, scale: 1.02 }}
        className={`scroll-mt-48 aspect-square p-10 md:p-12 rounded-[3rem] backdrop-blur-xl border-2 transition-all duration-700 relative overflow-hidden flex flex-col justify-center bg-white/[0.03] border-gold/10 hover:border-gold/30 hover:shadow-[0_40px_100px_rgba(197,160,89,0.15)]`}
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/5 blur-[50px] group-hover:bg-gold/10 transition-colors" />
        
        <h4 className={`text-3xl font-serif font-bold mb-6 transition-colors ${current.text} premium-heading uppercase tracking-tighter`}>{title}</h4>
        <p className="text-ivory/90 mb-8 leading-[2.2] urdu-font text-2xl md:text-3xl overflow-hidden" dir="rtl">{content}</p>
        
        <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className={`flex items-center space-x-4 font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:translate-x-3 text-gold`}>
          <span>Request Guidance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  }, []);

  if (adminMode === 'login') return <AdminLogin onLogin={(success) => setAdminMode(success ? 'dashboard' : 'login')} />;
  if (adminMode === 'dashboard') return <AdminDashboard onLogout={() => setAdminMode('none')} />;

  return (
    <AnimatePresence>
      <ParticleBackground />
      {isLoading ? (
        <motion.div key="loader" exit={{ opacity: 0, scale: 1.15 }} className="fixed inset-0 z-[1000] bg-charcoal flex flex-col items-center justify-center overflow-hidden px-6">
          <BackgroundSlider />
          <div className="relative z-10 flex flex-col items-center text-center">
            <BismillahSVG />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              <h1 className="text-gold arabic-font font-bold text-5xl md:text-7xl leading-tight mb-6 drop-shadow-[0_0_40px_rgba(197,160,89,0.5)] text-center" dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
              <h2 className="text-goldLight font-sans font-black text-xl tracking-[1em] mb-12 uppercase opacity-40">BISMILLAH</h2>
            </motion.div>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onClick={() => setIsLoading(false)} className="px-16 py-5 bg-gold text-charcoal text-xs font-black tracking-[0.5em] rounded-full mirror-button shadow-2xl">ASCEND TO LIGHT</motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="relative min-h-screen bg-charcoal text-ivory">
          <BackgroundSlider />
          
          <header className="fixed top-0 left-0 right-0 z-[110]">
            <div className={`bg-gold text-charcoal overflow-hidden relative z-50 transition-all duration-700 ${scrolled ? 'py-1' : 'py-2'}`}>
              <div className="flex items-center justify-center space-x-6">
                <span className={`font-bold uppercase tracking-[0.4em] text-charcoal/80 arabic-font transition-all duration-700 ${scrolled ? 'text-[10px]' : 'text-[12px]'}`} dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
              </div>
            </div>

            <nav className={`w-full transition-all duration-700 ease-in-out ${scrolled ? 'px-4 pt-2' : 'px-6 pt-8'}`}>
              <div className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-700 ease-in-out rounded-[2.5rem] border ${scrolled ? 'bg-black/80 backdrop-blur-3xl border-gold/40 shadow-2xl px-10 py-4' : 'bg-transparent border-transparent px-12 py-7'}`}>
                <a href="#" onClick={(e) => scrollToId(e, '#')} className="flex items-center space-x-4 group">
                  <motion.div animate={{ scale: scrolled ? 0.9 : 1.1 }} className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.6)]">
                    <span className="text-charcoal font-black text-xl">N</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-start">
                    <motion.span animate={{ fontSize: scrolled ? '1.1rem' : '1.3rem' }} className="text-white font-serif font-bold tracking-tight uppercase gold-gradient-text leading-none">NUR-UL-HUDA</motion.span>
                    <span className="text-[8px] tracking-[0.6em] text-gold/60 uppercase font-black">Sacred Legacy</span>
                  </motion.div>
                </a>
                
                <div className="hidden lg:flex items-center space-x-12">
                  <div className="flex items-center space-x-10">
                    {NAV_ITEMS.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="relative h-full flex items-center" 
                        onMouseEnter={() => setActiveDropdown(item.label)} 
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <a 
                          href={item.href} 
                          onClick={(e) => scrollToId(e, item.href)} 
                          className={`flex items-center space-x-3 font-black uppercase tracking-[0.3em] transition-all duration-500 py-6 border-b-2 border-transparent hover:border-gold/30 ${activeDropdown === item.label ? 'text-gold' : 'text-ivory/70 hover:text-gold'} ${scrolled ? 'text-[10px]' : 'text-[11px]'}`}
                        >
                          <span>{item.label}</span>
                          {item.children && <ChevronDown size={12} className={`opacity-40 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                        </a>

                        {item.children && (
                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div 
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-96 bg-[#211f1e]/95 backdrop-blur-2xl rounded-[3.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] z-[150] border border-gold/10 overflow-hidden pointer-events-auto"
                              >
                                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
                                <div className="relative z-10 space-y-12">
                                  {item.children.map((child, cIdx) => (
                                    <a 
                                      key={cIdx} 
                                      href={child.href}
                                      onClick={(e) => scrollToId(e, child.href)}
                                      className="group/item flex flex-col transition-all duration-300 cursor-pointer"
                                    >
                                      <span className="text-xl font-serif font-bold tracking-widest text-white group-hover/item:text-gold transition-colors uppercase">
                                        {child.label}
                                      </span>
                                      {child.benefits && (
                                        <div className="flex flex-wrap gap-4 mt-3">
                                          {child.benefits.map((b, bIdx) => (
                                            <span key={bIdx} className="text-[9px] text-gold/40 font-black uppercase tracking-widest flex items-center group-hover/item:text-gold/60 transition-colors">
                                              <span className="mr-2 opacity-50">•</span> {b}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => window.open('https://wa.me/923057615767', '_blank')} 
                    className={`bg-gold text-charcoal rounded-full font-black uppercase tracking-[0.5em] transition-all duration-700 mirror-button animate-button-glow border-2 border-white/20 active:scale-95 ml-8 hover:bg-goldLight flex items-center justify-center ${scrolled ? 'px-10 py-3 text-[10px]' : 'px-14 py-5 text-[11px]'}`}
                  >
                    CONSULTATION
                  </button>
                </div>
              </div>
            </nav>
          </header>

          <main>
            <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
              <FloatingLantern className="top-1/4 left-10" />
              <div className="container mx-auto px-6 relative z-10 text-center py-10">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 flex justify-center"><BismillahSVG /></motion.div>
                <div className="relative inline-block mb-12">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col items-center">
                    <span className="text-gold arabic-font text-6xl md:text-8xl font-bold tracking-widest leading-none drop-shadow-[0_0_40px_rgba(197,160,89,0.7)]" dir="rtl">نور الہدیٰ</span>
                    <div className="w-24 h-1 bg-gold/30 my-8" />
                  </motion.div>
                  <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-4xl md:text-6xl font-serif font-bold text-white premium-heading">
                    <span className="urdu-font" dir="rtl">روحانی</span> <br />
                    <span className="gold-gradient-text italic urdu-font" dir="rtl">مرکزِ ہدایت</span>
                  </motion.h1>
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <a 
                    href="#marriage" 
                    onClick={(e) => scrollToId(e, '#marriage')} 
                    className="px-20 py-10 bg-gold text-charcoal rounded-[2.5rem] shadow-[0_20px_60px_rgba(197,160,89,0.4)] mirror-button font-black tracking-widest text-4xl urdu-font border-2 border-white/20 transition-all hover:scale-105 active:scale-95"
                  >
                    خدماتِ روحانی
                  </a>
                </motion.div>
              </div>
            </section>

            <AboutSection />

            <section id="marriage" className="py-32 relative z-10 scroll-mt-24">
              <div className="container mx-auto px-8 max-w-[90rem]">
                <SectionHeader title="Love &" urduTitle="Marriage" icon={Heart} colorClass="text-rose-400" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <DetailBlock theme="gold" id="#pasand" title="Pasand ki Shadi" content="Shari hudood mein rehte hue pasand ki shadi ki rukawaton ko door karne ka hal." />
                  <DetailBlock theme="amber" id="#dua-marriage" title="Dua for Marriage" content="Naye rishton ki talash aur mangni ke baad toot jane wale rishton ke liye makhsoos duain." />
                  <DetailBlock theme="royal" id="#breakup" title="Breakup Recovery" content="Toote hue rishton ko jorne aur na-chaqi door karne ke liye roohani rehnumai." />
                  <DetailBlock theme="gold" id="#manpasand" title="Manpasand Shadi" content="Seeking the path of happiness with your chosen partner via divine wazaif." />
                </div>
              </div>
            </section>

            <section id="family" className="py-32 relative z-10 scroll-mt-24">
              <div className="container mx-auto px-8 max-w-[90rem]">
                <SectionHeader title="Family" urduTitle="Harmony" icon={Home} colorClass="text-emerald-400" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <DetailBlock theme="emerald" id="#divorce" title="Divorce Problem" content="Gharloo na-chaqi aur talaq jaise masail ka Quran-o-Sunnah ki roshni mein mustanad hal." />
                  <DetailBlock theme="gold" id="#aulad" title="No Child Issue" content="Aulaad ki nemat se mehroom joron ke liye khas roohani wazaif aur masnoon duain." />
                  <DetailBlock theme="amber" id="#harmony" title="Conflict Resolution" content="Ghar ke roz marrah ke jhagray aur sakhti khatam karne ke liye roohani asar." />
                  <DetailBlock theme="emerald" id="#domestic-peace" title="Gharloo Sukun" content="Ghar mein barkat aur apas ki muhabbat ko barhane ke liye roohani hisar." />
                </div>
              </div>
            </section>

            <section id="istikhara" className="py-32 relative z-10 scroll-mt-24">
              <div className="container mx-auto px-8 max-w-[90rem]">
                <SectionHeader title="Divine" urduTitle="Istikhara" icon={Sparkles} colorClass="text-gold" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <DetailBlock theme="gold" id="#business-istikhara" title="Business Growth" content="Naye karobar ya sarmaya kari se pehle Allah ki hidayat maloom karne ka roohani tariqa." />
                  <DetailBlock theme="amber" id="#travel-istikhara" title="Travel Hifazat" content="Safar ki kamyabi aur hifazat ke liye khas masnoon istikhara." />
                  <DetailBlock theme="royal" id="#life-decisions" title="Roohani Mashwara" content="Zindagi ke ahem faislo mein ghalati se bachne ke liye Quranic rasta." />
                  <DetailBlock theme="gold" id="#marriage-istikhara" title="Marriage Clarity" content="Rishtey ki bandish aur sahi shareek-e-hayat ke intekhab ke liye Istikhara." />
                </div>
              </div>
            </section>

            <section id="protection" className="py-32 relative z-10 scroll-mt-24">
              <div className="container mx-auto px-8 max-w-[90rem]">
                <SectionHeader title="Spiritual" urduTitle="Protection" icon={Shield} colorClass="text-emerald-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <DetailBlock theme="emerald" id="#magic-removal" title="Magic Removal" content="Har qism ke purane jadu, sifli amliyat aur bandishon ka mukammal Quranic ilaaj." />
                  <DetailBlock theme="amber" id="#evil-eye" title="Nazar-e-Bad" content="Hasideen ki nazar aur dushmanon ke shar se hifazat ka hisar." />
                  <DetailBlock theme="gold" id="#bandish" title="Bandish Removal" content="Karobar, shadi aur sehat mein har kism ki bandish ka roohani torh." />
                  <DetailBlock theme="emerald" id="#spiritual-shield" title="Hifazati Hisar" content="Apne ghar aur karobar ko hamesha ke liye roohani tor par mehfooz rakhein." />
                </div>
              </div>
            </section>

            <section id="istikhara-form" className="py-40 relative z-10 scroll-mt-24">
              <IstikharaForm />
            </section>

            <DuaCard />
          </main>

          <footer className="relative pt-24 pb-12 z-10 bg-forest border-t border-gold/20 overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
              <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold blur-[150px] rounded-full" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald blur-[150px] rounded-full" />
            </div>

            <div className="container mx-auto px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                
                {/* Column 1: Brand & Intro */}
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.3)] border-2 border-charcoal">
                      <span className="text-charcoal font-black text-3xl">N</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                     <p className="text-gold arabic-font text-2xl leading-loose font-bold" dir="rtl">
                      أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
                    </p>
                    <p className="text-ivory/90 text-xl urdu-font leading-loose" dir="rtl">
                       بیشک اللہ کی یاد میں دلوں کا سکون ہے۔
                    </p>
                  </div>
                  
                  <p className="text-ivory/70 text-lg leading-loose urdu-font pt-2 border-t border-gold/10" dir="rtl">
                    نور الہدیٰ آپ کی روحانی اور جسمانی مشکلات کے حل کے لیے ایک مستند مرکز ہے۔
                  </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="lg:pl-8">
                  <div className="mb-8">
                    <h4 className="text-2xl font-serif font-bold text-white urdu-font mb-1" dir="rtl">سریع رابطہ</h4>
                    <p className="text-[9px] text-gold/60 font-black uppercase tracking-[0.2em]">Quick Links</p>
                  </div>
                  <ul className="space-y-4">
                    {[
                      { label: 'Home', href: '#' },
                      { label: 'About Us', href: '#about' },
                      { label: 'Services', href: '#marriage' },
                      { label: 'Contact', href: 'https://wa.me/923057615767' },
                      { label: 'Blog', href: '#' }
                    ].map((item) => (
                      <li key={item.label}>
                        <a href={item.href} onClick={(e) => { if (item.href.startsWith('#')) scrollToId(e, item.href) }} className="flex items-center justify-between text-ivory/70 hover:text-gold transition-colors group border-b border-gold/5 pb-2">
                          <span className="text-[12px] font-bold uppercase tracking-[0.15em] group-hover:translate-x-2 transition-transform">{item.label}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold group-hover:shadow-[0_0_10px_#c5a059] transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Services */}
                <div>
                   <div className="mb-8">
                    <h4 className="text-2xl font-serif font-bold text-white urdu-font mb-1" dir="rtl">ہماری خدمات</h4>
                    <p className="text-[9px] text-gold/60 font-black uppercase tracking-[0.2em]">Our Services</p>
                  </div>
                  <ul className="space-y-4">
                    {[
                      { label: 'Istikhara', href: '#istikhara' },
                      { label: 'Kala Jadu Removal', href: '#magic-removal' },
                      { label: 'Pasand ki Shadi', href: '#pasand' },
                      { label: 'Roohani Shifa', href: '#protection' },
                      { label: 'Gharloo Sukun', href: '#domestic-peace' }
                    ].map((item) => (
                      <li key={item.label}>
                        <a href={item.href} onClick={(e) => scrollToId(e, item.href)} className="flex items-center justify-between text-ivory/70 hover:text-gold transition-colors group border-b border-gold/5 pb-2">
                          <span className="text-[12px] font-bold uppercase tracking-[0.15em] group-hover:translate-x-2 transition-transform">{item.label}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold group-hover:shadow-[0_0_10px_#c5a059] transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 4: Contact */}
                <div>
                  <div className="mb-8">
                    <h4 className="text-2xl font-serif font-bold text-white urdu-font mb-1" dir="rtl">رابطہ کریں</h4>
                    <p className="text-[9px] text-gold/60 font-black uppercase tracking-[0.2em]">Contact Us</p>
                  </div>
                  <div className="space-y-6">
                    <a href="https://wa.me/923057615767" className="group block">
                      <div className="bg-white/5 p-5 rounded-3xl border border-gold/10 group-hover:border-gold/30 transition-all group-hover:bg-white/10 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                          <PhoneCall size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gold/50 mb-1">WhatsApp</p>
                          <p className="text-ivory font-serif text-lg font-bold group-hover:text-gold transition-colors">+92 305 7615767</p>
                        </div>
                      </div>
                    </a>
                    
                    <a href="mailto:help@nurulhuda.com" className="group block">
                      <div className="bg-white/5 p-5 rounded-3xl border border-gold/10 group-hover:border-gold/30 transition-all group-hover:bg-white/10 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gold/50 mb-1">Email Address</p>
                          <p className="text-ivory font-serif text-md font-bold group-hover:text-gold transition-colors">help@nurulhuda.com</p>
                        </div>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 pt-4">
                       {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                        <a 
                          key={idx} 
                          href="#" 
                          className="w-12 h-12 rounded-full bg-charcoal border border-gold/20 flex items-center justify-center text-gold hover:text-charcoal hover:bg-gold transition-all duration-300 hover:scale-110 shadow-lg group"
                        >
                          <Icon size={20} className="group-hover:animate-pulse" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  © 2026 Nur-ul-Huda - All Rights Reserved.
                </p>
                <div className="flex items-center space-x-6">
                   <span className="text-[10px] font-bold text-gold/30 uppercase tracking-widest hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
                   <span className="text-[10px] font-bold text-gold/30 uppercase tracking-widest hover:text-gold cursor-pointer transition-colors">Terms of Service</span>
                </div>
              </div>
            </div>
          </footer>
          <CookieBanner />
          <TasbeehCounter />
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;
