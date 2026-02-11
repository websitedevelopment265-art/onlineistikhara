
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Menu, 
  X, 
  Sparkles, 
  PhoneCall, 
  Instagram, 
  Facebook, 
  Twitter,
  ChevronDown,
  ShieldCheck,
  Check,
  ArrowRight,
  MapPin,
  Heart,
  Home,
  Shield,
  Sunrise,
  ArrowUp,
  Lamp
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
import { NavItem } from './types';

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
      {/* Cinematic God Rays */}
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

const AyahBanner: React.FC = () => (
  <div className="bg-forest text-white py-2 overflow-hidden border-b border-gold/30 relative z-50">
    <div className="flex items-center justify-center space-x-6">
      <Sparkles className="w-3 h-3 text-gold animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-goldLight drop-shadow-[0_0_8px_rgba(233,213,161,0.5)]">
        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
      </span>
      <Sparkles className="w-3 h-3 text-gold animate-pulse" />
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; urduTitle: string; icon: any; colorClass: string }> = ({ title, urduTitle, icon: Icon, colorClass }) => (
  <div className="text-center mb-20 relative">
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-black/40 border border-current ${colorClass} shadow-[0_0_40px_currentColor]`}
    >
      <Icon className="w-10 h-10" />
    </motion.div>
    <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
      {title} <span className="italic gold-gradient-text drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{urduTitle}</span>
    </h2>
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
  dua: string; 
  theme: 'emerald' | 'gold' | 'royal' | 'amber' 
}> = ({ id, title, content, benefits, dua, theme }) => {
  const themes = {
    emerald: { glass: 'glass-emerald', glow: 'hover:shadow-[0_0_60px_rgba(6,78,59,0.5)]', text: 'text-emerald-400' },
    gold: { glass: 'glass-gold', glow: 'hover:shadow-[0_0_60px_rgba(197,160,89,0.5)]', text: 'text-gold' },
    royal: { glass: 'glass-royal', glow: 'hover:shadow-[0_0_60px_rgba(11,29,61,0.5)]', text: 'text-blue-400' },
    amber: { glass: 'glass-amber', glow: 'hover:shadow-[0_0_60px_rgba(139,94,26,0.5)]', text: 'text-amber-400' }
  };
  const current = themes[theme];

  return (
    <motion.div 
      id={id} 
      whileHover={{ y: -20, scale: 1.02 }}
      className={`scroll-mt-32 p-12 rounded-[3rem] backdrop-blur-xl border-2 transition-all duration-700 relative overflow-hidden group ${current.glass} ${current.glow}`}
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 blur-[60px] group-hover:bg-white/10 transition-colors" />
      
      <h4 className={`text-4xl font-serif font-bold mb-6 transition-colors ${current.text}`}>{title}</h4>
      <p className="text-ivory/80 mb-8 leading-relaxed italic text-lg">{content}</p>
      
      <div className="grid md:grid-cols-2 gap-10 mb-10">
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
        <div className="bg-black/40 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-4">Sacred Remedy / Dua</p>
          <p className="text-ivory font-serif text-2xl leading-relaxed">{dua}</p>
        </div>
      </div>

      <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className={`flex items-center space-x-4 font-black text-xs uppercase tracking-[0.4em] transition-all hover:translate-x-3 ${current.text}`}>
        <span>Request Guidance</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
              <h1 className="text-gold font-serif font-bold text-6xl md:text-[9rem] leading-none mb-6 drop-shadow-[0_0_60px_rgba(197,160,89,0.9)]">
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
            <AyahBanner />
            <nav className={`w-full px-6 pt-6 transition-all duration-1000`}>
              <div className={`mx-auto max-w-7xl flex items-center justify-between px-10 py-5 rounded-[2rem] border ${scrolled ? 'bg-charcoal/80 backdrop-blur-2xl border-gold/40 shadow-2xl' : 'bg-transparent border-transparent'}`}>
                <a href="#" className="flex items-center space-x-4 group">
                  <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.6)] group-hover:scale-110 transition-transform">
                    <span className="text-charcoal font-black text-2xl">N</span>
                  </div>
                  <span className="text-white font-serif text-2xl font-bold tracking-tight gold-gradient-text uppercase">NUR-UL-HUDA</span>
                </a>
                <div className="hidden lg:flex items-center space-x-12">
                  <MoonPhaseWidget />
                  {NAV_ITEMS.map((item, idx) => (
                    <a key={idx} href={item.href} className="text-[11px] font-black uppercase tracking-[0.2em] text-ivory/70 hover:text-gold transition-all hover:drop-shadow-[0_0_12px_rgba(197,160,89,0.6)]">
                      {item.label}
                    </a>
                  ))}
                  <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className="bg-gold text-charcoal px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mirror-button shadow-[0_0_15px_rgba(197,160,89,0.3)]">CONSULTATION</button>
                </div>
              </div>
            </nav>
          </div>

          {/* ENHANCED HERO SECTION - UPDATED TO URDU */}
          <section className="relative min-h-screen flex items-center justify-center pt-40 overflow-hidden">
            <FloatingLantern className="top-1/4 left-10" delay={0} />
            <FloatingLantern className="top-1/3 right-20" delay={2} />
            <FloatingLantern className="bottom-1/4 left-1/4" delay={4} />

            <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="mb-10"
              >
                <BismillahSVG />
              </motion.div>

              <div className="relative inline-block mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-gold font-serif text-6xl md:text-9xl font-bold tracking-widest leading-none drop-shadow-[0_0_40px_rgba(197,160,89,0.7)] animate-float">نور الہدیٰ</span>
                  <div className="w-24 h-1 bg-gold/40 my-10 divine-glow" />
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1.2 }}
                  className="text-7xl md:text-[11rem] font-serif font-bold text-white leading-[0.85] tracking-tight drop-shadow-[0_10px_60px_rgba(0,0,0,0.9)]"
                >
                  روحانی <br />
                  <span className="gold-gradient-text italic drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">مرکزِ ہدایت</span>
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 2, duration: 1 }}
                className="text-ivory text-xl md:text-3xl font-serif italic mb-16 tracking-wide max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
              >
                "قرآنِ پاک کی نورانی روشنی میں، ہم آپ کے روحانی سفر اور دلی سکون کی منزل کو روشن کرتے ہیں۔"
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-12"
              >
                <a href="#istikhara" className="px-16 py-7 bg-gold text-charcoal rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(197,160,89,0.4)] text-[11px] mirror-button">
                  روحانی استخارہ
                </a>
                <a href="#about" className="px-16 py-7 bg-white/5 backdrop-blur-2xl border border-white/20 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] mirror-button hover:bg-white/10 transition-colors">
                  ہمارا مشن
                </a>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.5em] mb-4">نیچے سکرول کریں</span>
                <div className="w-0.5 h-16 bg-gradient-to-b from-gold to-transparent" />
              </motion.div>
            </div>
          </section>

          {/* Sections with unique themes */}
          <section id="about" className="py-40 relative z-10 scroll-mt-32">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="Our Sacred" urduTitle="Legacy" icon={ShieldCheck} colorClass="text-emerald-400" />
              <div className="grid md:grid-cols-2 gap-24">
                <motion.div whileHover={{ scale: 1.03 }} className="glass-emerald p-14 rounded-[4rem] border-2 shadow-2xl relative">
                  <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-400/30" />
                  <p className="text-ivory/90 text-3xl font-serif italic leading-relaxed">
                    "A beacon of light founded on Quran and Sunnah. We hold your trust in the highest sanctity and provide authentic roohani solutions."
                  </p>
                </motion.div>
                <div className="space-y-12 py-10">
                  <p className="text-ivory/70 text-2xl leading-relaxed font-serif">Our roohani guidance is rooted in decades of traditional wisdom, passed down through generations of spiritual excellence. We provide a protected sanctuary for the global Ummah.</p>
                  <button className="bg-emerald text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] mirror-button shadow-[0_0_30px_rgba(6,78,59,0.4)]">THE HISTORY</button>
                </div>
              </div>
            </div>
          </section>

          <section id="marriage" className="py-40 relative z-10 bg-black/50 scroll-mt-32 border-y border-gold/10">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="Hearts &" urduTitle="Unions" icon={Heart} colorClass="text-amber-500" />
              <div className="grid gap-20">
                <DetailBlock theme="amber" id="pasand" title="Pasand ki Shadi" content="Divine solutions for love marriage obstacles under Allah's will. We help resolve parental resistance and spiritual blocks." benefits={['Consent Dua', 'Bandish Removal', 'Barakah in Rishta']} dua="Rabbi inni lima anzalta ilayya min khairin faqir." />
                <DetailBlock theme="gold" id="dua-marriage" title="Marriage Acceptance" content="Quranic wazaif for mutual love and relationship bonding to bring hearts closer together in a halal manner." benefits={['Proposal Success', 'Wafa Dua', 'Acceptance Acceptance']} dua="Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yun." />
              </div>
            </div>
          </section>

          <section id="family" className="py-40 relative z-10 scroll-mt-32">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="The Family" urduTitle="Sanctuary" icon={Home} colorClass="text-blue-400" />
              <div className="grid gap-20">
                <DetailBlock theme="royal" id="divorce" title="Divorce Prevention" content="Healing broken ties and softening hearts through roohani methods. Restore peace to your household with divine help." benefits={['Conflict Resolution', 'Evil Eye Shield', 'Reconciliation']} dua="Wa alqaytu 'alayka mahabbatan minni." />
                <DetailBlock theme="emerald" id="aulad" title="Aulad ki Shifa" content="Seeking Allah's blessing for offspring and removing physical/spiritual blocks that hinder the miracle of birth." benefits={['Prophetic Dua', 'Bandish Clear', 'Healthy Offspring']} dua="Rabbi la tadharni fardan wa anta khayrul warithin." />
              </div>
            </div>
          </section>

          <section id="istikhara" className="py-40 relative z-10 bg-black/70 scroll-mt-32 border-y border-gold/10">
            <div className="container mx-auto px-8 max-w-7xl">
              <SectionHeader title="Divine" urduTitle="Counsel" icon={Sunrise} colorClass="text-gold" />
              <div className="flex flex-col lg:flex-row gap-24 items-center">
                <div className="lg:w-1/2 space-y-12">
                  <DetailBlock theme="gold" id="business-istikhara" title="Business Istikhara" content="Consulting the Almighty for financial decisions, new investments, and career transitions to avoid loss." benefits={['Clarity of Vision', 'Risk Prevention', 'Barakah in Wealth']} dua="Allahumma inni astakhiruka bi'ilmika wa astaqdiruka bi-qudratika." />
                  <p className="text-ivory/50 italic font-serif text-xl border-l-2 border-gold/30 pl-8">"Successful is the one who seeks the counsel of the Creator and consults the created."</p>
                </div>
                <div className="lg:w-1/2 scale-110"><IstikharaForm /></div>
              </div>
            </div>
          </section>

          <section id="protection" className="py-40 relative z-10 scroll-mt-32">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="The Divine" urduTitle="Shield" icon={Shield} colorClass="text-emerald-500" />
              <div className="grid gap-20">
                <DetailBlock theme="emerald" id="magic-removal" title="Magic Neutralization" content="Complete purging of negative energy, evil eye, and black magic through the indestructible light of the Quran." benefits={['Sihr Removal', 'Permanent Guard', 'Energy Purge']} dua="Recite The Four Quls daily after Fajr and Maghrib for ultimate shield." />
              </div>
            </div>
          </section>

          <DuaCard />
          <TasbeehCounter />
          <StatusTracker />

          <footer id="contact" className="relative pt-60 pb-20 z-10 bg-black border-t-2 border-gold/40">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none" style={{backgroundImage: `url(${SLIDER_IMAGES[0]})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
            
            <div className="container mx-auto px-10 text-center relative z-10">
              <BismillahSVG />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mt-32 text-left">
                <div className="space-y-12">
                  <h3 className="text-6xl font-serif font-bold gold-gradient-text drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">نور الہدیٰ</h3>
                  <p className="text-ivory/50 text-xl font-serif leading-relaxed italic">"Our mission is to lead hearts away from darkness toward tranquility through sacred divine wisdom."</p>
                  <div className="flex space-x-8">
                    {[Instagram, Facebook, Twitter].map((I, i) => <motion.a key={i} whileHover={{ y: -15, color: '#c5a059', dropShadow: '0 0 10px #c5a059' }} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center transition-all bg-white/5"><I size={24} /></motion.a>)}
                  </div>
                </div>
                <div className="space-y-8">
                  <h4 className="text-gold uppercase tracking-[0.5em] text-xs font-black drop-shadow-[0_0_5px_rgba(197,160,89,0.3)]">Sacred Services</h4>
                  <ul className="space-y-6 text-ivory/70 font-bold uppercase text-[11px] tracking-[0.3em]">
                    <li className="hover:text-gold transition-all cursor-pointer hover:translate-x-2">Divine Istikhara</li>
                    <li className="hover:text-gold transition-all cursor-pointer hover:translate-x-2">Roohani Ilaj</li>
                    <li className="hover:text-gold transition-all cursor-pointer hover:translate-x-2">Marriage Solutions</li>
                    <li className="hover:text-gold transition-all cursor-pointer hover:translate-x-2">Family Harmony</li>
                  </ul>
                </div>
                <div className="space-y-12">
                  <h4 className="text-gold uppercase tracking-[0.5em] text-xs font-black drop-shadow-[0_0_5px_rgba(197,160,89,0.3)]">Immediate Action</h4>
                  <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className="w-full bg-forest text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] mirror-button flex items-center justify-center space-x-6 shadow-[0_20px_50px_rgba(3,48,37,0.5)]">
                    <MessageCircle size={28} className="animate-pulse" />
                    <span>WHATSAPP GUIDANCE</span>
                  </button>
                  <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="flex items-center space-x-6 text-gold/60 hover:text-gold transition-all text-[11px] font-black uppercase tracking-[0.6em] group">
                    <span className="group-hover:translate-y-[-5px] transition-transform">RETURN TO LIGHT</span>
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                      <ArrowUp size={18} />
                    </div>
                  </button>
                </div>
              </div>
              <p className="mt-48 text-ivory/10 text-[11px] uppercase font-black tracking-[1em] border-t border-white/5 pt-12">&copy; 2024 Nur-ul-Huda. Sacred Spiritual Excellence. All Rights Protected.</p>
            </div>
          </footer>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;
