
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
  Volume2,
  VolumeX,
  Share2,
  ShieldCheck,
  Check,
  ArrowRight,
  MapPin,
  Mail,
  Zap,
  Heart,
  Home,
  Shield,
  Sunrise,
  ArrowUp
} from 'lucide-react';
import { NAV_ITEMS, SERVICES } from './constants';
import ServiceCard from './components/ServiceCard';
import ParticleBackground from './components/ParticleBackground';
import IstikharaForm from './components/IstikharaForm';
import StatusTracker from './components/StatusTracker';
import CustomCursor from './components/CustomCursor';
import BismillahSVG from './components/BismillahSVG';
import TasbeehCounter from './components/TasbeehCounter';
import MoonPhaseWidget from './components/MoonPhaseWidget';
import DuaCard from './components/DuaCard';
import { NavItem } from './types';

// --- SUB-COMPONENTS ---

/**
 * AyahBanner component to display a sacred verse from the Quran.
 */
const AyahBanner: React.FC = () => (
  <div className="bg-charcoal text-white py-2 overflow-hidden border-b border-gold/10 relative z-50">
    <div className="flex items-center justify-center space-x-4">
      <Sparkles className="w-3 h-3 text-gold animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-goldLight">
        "Verily, with hardship comes ease" — Al-Inshirah 94:6
      </span>
      <Sparkles className="w-3 h-3 text-gold animate-pulse" />
    </div>
  </div>
);

const NavDropdown: React.FC<{ item: NavItem; isOpen: boolean; onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }> = ({ item, isOpen, onNavClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-[100]"
        >
          <div className="absolute inset-x-10 -bottom-10 h-20 bg-gradient-to-t from-gold/5 to-transparent blur-2xl opacity-40 pointer-events-none" />
          
          <div className="glass w-[640px] rounded-[3rem] overflow-hidden border-gold/30 shadow-[0_30px_100px_rgba(197,160,89,0.1)] p-10 relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none arabesque-overlay" />
            
            <div className="grid grid-cols-5 gap-10 relative z-10">
              <div className="col-span-2 space-y-8 pr-6 border-r border-gold/10">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-gold font-serif text-3xl font-bold">{item.urduLabel}</span>
                  </div>
                  <h4 className="text-charcoal font-serif text-xl font-bold mb-3">{item.label}</h4>
                  <p className="text-charcoal/60 text-xs leading-relaxed italic font-medium">{item.summary}</p>
                </div>
                
                <div className="pt-6 space-y-4">
                  <a 
                    href={item.href} 
                    onClick={(e) => onNavClick(e, item.href)}
                    className="group flex items-center justify-between bg-charcoal text-white p-4 rounded-2xl hover:bg-gold transition-all duration-500 shadow-xl mirror-button"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="col-span-3 space-y-5">
                {item.children?.map((child, idx) => (
                  <motion.a 
                    key={idx} 
                    href={child.href}
                    onClick={(e) => onNavClick(e, child.href)}
                    className="block group bg-white/40 p-5 rounded-2xl border border-gold/5 hover:border-gold/30 hover:bg-white/80 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-lg text-charcoal group-hover:text-gold transition-colors">{child.label}</span>
                    </div>
                    <p className="text-[10px] text-charcoal/50 leading-snug font-medium mb-4">{child.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {child.benefits.slice(0, 3).map((b, bi) => (
                        <span key={bi} className="text-[8px] font-bold uppercase tracking-wider bg-gold/10 text-gold px-2.5 py-1 rounded-lg">
                          {b}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SectionHeader: React.FC<{ title: string; urduTitle: string; icon: any }> = ({ title, urduTitle, icon: Icon }) => (
  <div className="text-center mb-16 relative">
    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <Icon className="w-8 h-8 text-gold" />
    </div>
    <h2 className="text-4xl md:text-6xl font-serif font-bold text-charcoal mb-4">
      {title} <span className="italic gold-gradient-text">{urduTitle}</span>
    </h2>
    <div className="w-12 h-0.5 bg-gold/20 mx-auto" />
  </div>
);

const DetailBlock: React.FC<{ id: string; title: string; content: string; benefits: string[]; dua: string }> = ({ id, title, content, benefits, dua }) => (
  <div id={id} className="scroll-mt-32 p-10 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-gold/10 hover:border-gold/30 transition-all shadow-sm">
    <h4 className="text-2xl font-serif font-bold text-charcoal mb-4">{title}</h4>
    <p className="text-gray-600 mb-6 leading-relaxed italic">{content}</p>
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="space-y-3">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-center space-x-3 text-gold">
            <Check className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{b}</span>
          </div>
        ))}
      </div>
      <div className="bg-gold/5 p-6 rounded-2xl border border-gold/10">
        <p className="text-[9px] font-bold text-gold uppercase tracking-[0.2em] mb-2">Masnoon Dua / Remedy</p>
        <p className="text-charcoal font-serif text-lg leading-relaxed">{dua}</p>
      </div>
    </div>
    <button onClick={() => window.open('https://wa.me/923057615767', '_blank')} className="flex items-center space-x-3 text-gold font-bold text-[10px] uppercase tracking-[0.3em] hover:text-charcoal transition-colors">
      <span>Get Personal Guidance</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setHeaderVisible(window.scrollY < 100 || window.scrollY < (window as any).lastScrollY);
      (window as any).lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id || 'root');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
        setActiveNav(null);
      }
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div 
          key="loader" 
          exit={{ opacity: 0, scale: 1.1 }} 
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-ivory flex flex-col items-center justify-center overflow-hidden px-6"
        >
          {/* Background Watermark during Load */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none arabesque-overlay" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
            {/* Arabic Style Decorative Elements */}
            <BismillahSVG />
            
            {/* THE MAJESTIC BISMILLAH IN ARABIC - Bold & Beautiful */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="mb-10"
            >
              <h1 className="text-gold font-serif font-bold text-5xl md:text-8xl lg:text-[7rem] leading-tight drop-shadow-[0_10px_30px_rgba(197,160,89,0.4)]">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </h1>
            </motion.div>
            
            {/* BISMILLAH IN BOLD CAPITAL LETTERS - Secondary */}
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-gold/60 font-sans font-black text-xl md:text-2xl tracking-[0.8em] mb-12 uppercase"
            >
              BISMILLAH
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-gold font-serif text-5xl md:text-7xl font-bold tracking-widest mb-4 leading-none">نور الہدیٰ</span>
              <h1 className="font-serif font-bold text-2xl md:text-3xl text-charcoal uppercase tracking-tighter gold-gradient-text">Nur-ul-Huda</h1>
              <div className="w-16 h-0.5 bg-gold/20 my-6" />
              <p className="text-charcoal/40 text-[10px] font-black uppercase tracking-[0.6em]">Sacred Spiritual Excellence</p>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              onClick={() => setIsLoading(false)} 
              className="mt-20 px-16 py-5 bg-gold text-white text-[11px] font-bold tracking-[0.4em] rounded-full mirror-button shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              ENTER SANCTUARY
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div key="main-app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-ivory font-sans arabesque-overlay overflow-x-hidden">
          <motion.div style={{ rotate: rotateBg }} className="parallax-pattern" />
          <CustomCursor />
          <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gold z-[200] origin-left" style={{ scaleX }} />

          {/* Navigation */}
          <div className="fixed top-0 left-0 right-0 z-[110] flex flex-col">
            <AyahBanner />
            <nav className={`w-full px-4 md:px-12 pt-4 transition-all duration-700 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
              <div className={`mx-auto max-w-7xl flex items-center justify-between px-8 py-3 rounded-2xl border ${scrolled ? 'bg-white/95 backdrop-blur-md border-gold/20 shadow-xl' : 'bg-white/60 border-gold/10'}`}>
                <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg"><span className="text-white font-serif font-bold text-xl">N</span></div>
                  <span className="text-charcoal font-serif text-lg font-bold tracking-tight uppercase">NUR-UL-HUDA</span>
                </a>

                <div className="hidden lg:flex items-center space-x-8">
                  <MoonPhaseWidget />
                  {NAV_ITEMS.map((item, idx) => (
                    <div key={idx} className="relative group/nav-item" onMouseEnter={() => setActiveNav(item.label)} onMouseLeave={() => setActiveNav(null)}>
                      <a 
                        href={item.href} 
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`font-serif text-base transition-all py-4 flex items-center space-x-2 ${activeNav === item.label ? 'text-gold' : 'text-charcoal/80 hover:text-gold'}`}
                      >
                        <span className="font-bold">{item.label}</span>
                        {item.children && <motion.div animate={{ rotate: activeNav === item.label ? 180 : 0 }}><ChevronDown className="w-3 h-3 text-gold/50" /></motion.div>}
                      </a>
                      {item.children && <NavDropdown item={item} isOpen={activeNav === item.label} onNavClick={handleNavClick} />}
                    </div>
                  ))}
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gold hover:bg-charcoal text-white px-6 py-3 rounded-lg text-[9px] font-bold uppercase tracking-[0.1em] transition-all shadow-lg mirror-button">CONTACT US</button>
                </div>

                <button className="lg:hidden text-charcoal" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
              </div>
            </nav>
          </div>

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
            <ParticleBackground />
            <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }}><BismillahSVG /></motion.div>
              <h1 className="text-6xl md:text-[7rem] font-serif font-bold text-charcoal mb-8 leading-[0.9] tracking-tighter">Divine <br /><span className="gold-gradient-text italic">Nur-ul-Huda</span></h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-12">
                <a href="#istikhara" onClick={(e) => handleNavClick(e, '#istikhara')} className="px-10 py-5 bg-gold text-white rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl text-[10px] mirror-button">Request Istikhara</a>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="px-10 py-5 bg-white/40 backdrop-blur-md border border-gold/30 text-charcoal rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] mirror-button">Our Story</a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32 relative bg-white/50 border-y border-gold/10 scroll-mt-32">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="Our Sacred" urduTitle="Commitment" icon={ShieldCheck} />
              <div className="grid md:grid-cols-2 gap-16">
                <p className="text-charcoal/80 text-2xl font-serif italic leading-relaxed">Nur-ul-Huda is a beacon of light founded on Quran and Sunnah. Hum aapki privacy aur trust ko sabse upar rakhte hain, providing authentic Roohani guidance.</p>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">Our legacy of spiritual healing is built on decades of trust. We offer a sanctuary where your concerns are met with empathy and divine wisdom. 100% Confidential (Pardah) consultation.</p>
                  <button className="bg-gold/10 text-gold px-8 py-3 rounded-lg font-bold text-[9px] uppercase tracking-widest mirror-button">Explore Legacy</button>
                </div>
              </div>
            </div>
          </section>

          {/* Love & Marriage Section */}
          <section id="marriage" className="py-32 relative bg-gold/5 scroll-mt-32">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="Love &" urduTitle="Marriage" icon={Heart} />
              <div className="grid gap-12">
                <DetailBlock 
                  id="pasand" 
                  title="Pasand ki Shadi (Love Marriage)" 
                  content="Allah ki raza ke mutabiq pasand ki shadi mein rukawaton ka roohani hal. Hum aapki madad karte hain taake aapka rishta deeni aur dunyawi dono aitbar se ba-barkat ho."
                  benefits={['Parental Consent Dua', 'Removal of Bandish', 'Barakah in Rishta']}
                  dua="Rabbi inni lima anzalta ilayya min khairin faqir."
                />
                <DetailBlock 
                  id="dua-marriage" 
                  title="Dua for Marriage Acceptance" 
                  content="Quran-o-Sunnah se makhsoos duayein jo dilo mein mohabbat aur rishton mein sachi wafa paida karti hain."
                  benefits={['Increase in Muhabbat', 'Proposal Acceptance', 'Azdawaji Sukun']}
                  dua="Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yun."
                />
                <DetailBlock 
                  id="breakup" 
                  title="Relationship Restoration" 
                  content="Toote hue rishton ko jorne aur na-chaqi door karne ke liye roohani rehnumai aur makhsoos wazaif."
                  benefits={['Emotional Healing', 'Sabr & Strength', 'Relationship Restore']}
                  dua="Ya Wadoodo - Recite 1000x for 11 days with pure intent."
                />
              </div>
            </div>
          </section>

          {/* Family Problems Section */}
          <section id="family" className="py-32 relative bg-white scroll-mt-32 border-y border-gold/10">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="Family" urduTitle="Peace" icon={Home} />
              <div className="grid gap-12">
                <DetailBlock 
                  id="divorce" 
                  title="Divorce Problem Solution" 
                  content="Talaq ke masail aur mian biwi ke darmiyan shadeed jhagray khatam karne ka roohani hal."
                  benefits={['Stopping Divorce', 'Evil Eye Protection', 'Heart Softening']}
                  dua="Wa alqaytu 'alayka mahabbatan minni."
                />
                <DetailBlock 
                  id="aulad" 
                  title="Aulad ki Bandish (No Child Issue)" 
                  content="Aulad ki bandish aur be-auladi ke masail ka Quranic Shifa se mukammal hal."
                  benefits={['Dua of Zakariya (AS)', 'Bandish Removal', 'Healthy Offspring']}
                  dua="Rabbi la tadharni fardan wa anta khayrul warithin."
                />
                <DetailBlock 
                  id="harmony" 
                  title="Gharloo Harmony" 
                  content="Ghar ke roz marrah ke jhagray aur sakhti khatam kar ke aman-o-aman paida karna."
                  benefits={['Peace at Home', 'Financial Barakah', 'Mutual Respect']}
                  dua="Bismillah-ir-Rahman-ir-Rahim - Recite before entering home."
                />
              </div>
            </div>
          </section>

          {/* Istikhara Section */}
          <section id="istikhara" className="py-32 bg-gold/5 relative scroll-mt-32">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="Divine" urduTitle="Istikhara" icon={Sunrise} />
              <div className="flex flex-col lg:flex-row gap-20">
                <div className="lg:w-1/2 space-y-8">
                  <DetailBlock id="business-istikhara" title="Business Istikhara" content="Allah se mashwara for investments and career paths." benefits={['Loss Prevention', 'Strategic Clarity', 'Divine Approval']} dua="Allahumma inni astakhiruka bi'ilmika..." />
                  <DetailBlock id="travel-istikhara" title="Travel Guidance" content="Safe journeys for Hajj, Ub-mrah, or migration." benefits={['Travel Safety', 'Purpose Success', 'Peace of Mind']} dua="Subhanalladhi sakhkhara lana hadha..." />
                  <DetailBlock id="life-decisions" title="Critical Life Choices" content="Seeking light in the crossroads of life." benefits={['Regret Prevention', 'Confidence', 'Spiritual Backing']} dua="Istikhara Sunnah Prayer - 2 Rakat." />
                </div>
                <div className="lg:w-1/2"><IstikharaForm /></div>
              </div>
            </div>
          </section>

          {/* Protection Section */}
          <section id="protection" className="py-32 relative bg-forest/5 scroll-mt-32 border-y border-gold/10">
            <div className="container mx-auto px-8 max-w-6xl">
              <SectionHeader title="Protection &" urduTitle="Healing" icon={Shield} />
              <div className="grid gap-12">
                <DetailBlock 
                  id="magic-removal" 
                  title="Kala Jadu ka Torh" 
                  content="Sihr aur jadu ke asrat ko Quran ki ayato se jarr se khatam karein."
                  benefits={['Immediate Relief', 'Permanent Protection', 'Negative Energy Purge']}
                  dua="The Four Quls - Recite daily after Fajr and Maghrib."
                />
                <DetailBlock 
                  id="evil-eye" 
                  title="Nazar-e-Bad Shield" 
                  content="Hasid ki nazar aur buri quwwato se hifazat ke liye hifazati azkar."
                  benefits={['Daily Protection', 'Health Restoration', 'Shielding for Kids']}
                  dua="A'udhu bi-kalimatillahil-tammati min sharri ma khalaq."
                />
                <DetailBlock 
                  id="bandish" 
                  title="Bandish Removal" 
                  content="Karobar, shadi aur sehat mein har kism ki rukawaton ka roohani torh."
                  benefits={['Path Opening', 'Success Multiplier', 'Psychological Peace']}
                  dua="Surah Al-Fath - Recite for opening paths."
                />
              </div>
            </div>
          </section>

          <DuaCard />
          <TasbeehCounter />
          <StatusTracker />

          {/* Enhanced Footer */}
          <footer id="contact" className="relative pt-40 pb-16 bg-gradient-to-b from-white to-ivory border-t border-gold/20 overflow-hidden scroll-mt-32">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none arabesque-overlay" />
            
            <div className="container mx-auto px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32">
                {/* Brand Identity Column */}
                <div className="space-y-12">
                  <div className="group cursor-pointer">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-2 rounded-full border border-dashed border-gold/40"
                        />
                        <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-white shadow-[0_10px_40px_rgba(197,160,89,0.3)] transition-transform group-hover:scale-105">
                          <span className="font-serif font-bold text-4xl">N</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gold font-serif text-2xl font-bold tracking-widest leading-none">نور الہدیٰ</span>
                        <h1 className="font-serif font-bold text-3xl text-charcoal uppercase tracking-tighter mt-1">Nur-ul-Huda</h1>
                      </div>
                    </div>
                  </div>
                  <p className="text-charcoal/60 font-medium text-xl italic leading-relaxed">
                    "Leading the heart towards the ultimate truth and tranquility through sacred wisdom."
                  </p>
                  <div className="flex items-center space-x-4">
                    {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                      <motion.a
                        key={idx}
                        href="#"
                        whileHover={{ scale: 1.1, backgroundColor: '#c5a059', color: '#fff' }}
                        className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-all shadow-sm"
                      >
                        <Icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Sacred Navigation Column */}
                <div>
                  <h4 className="font-serif font-bold mb-10 text-2xl gold-gradient-text uppercase tracking-widest">Sacred Paths</h4>
                  <ul className="space-y-6">
                    {['Marriage Solutions', 'Family Peace', 'Protection Guidance', 'Istikhara Services', 'Spiritual Healing'].map((link, idx) => (
                      <li key={idx}>
                        <a href="#" className="group flex items-center text-charcoal/70 hover:text-gold font-bold text-[10px] uppercase tracking-[0.2em] transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/30 mr-4 group-hover:scale-150 group-hover:bg-gold transition-all" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Contact Column */}
                <div className="space-y-8">
                  <h4 className="font-serif font-bold mb-10 text-2xl gold-gradient-text uppercase tracking-widest">Sanctuary Details</h4>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="glass p-5 rounded-2xl border-gold/10 hover:border-gold/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                        <MapPin size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase text-gold tracking-widest mb-1">Our Location</span>
                        <span className="text-charcoal/80 text-xs font-bold leading-relaxed">Millat Town, Faisalabad, Pakistan.</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="glass p-5 rounded-2xl border-gold/10 hover:border-gold/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                        <PhoneCall size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase text-gold tracking-widest mb-1">Direct Hotline</span>
                        <span className="text-gold text-sm font-black">+92 305 7615767</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Direct Counseling CTA Column */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold mb-8 text-2xl gold-gradient-text uppercase tracking-widest">Global Reach</h4>
                    <p className="text-charcoal/50 text-[10px] uppercase tracking-widest font-black mb-8 leading-loose">
                      Join thousands of seekers worldwide finding clarity through divine light.
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold to-emerald opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                    <button 
                      onClick={() => window.open('https://wa.me/923057615767', '_blank')} 
                      className="relative w-full overflow-hidden bg-forest text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all mirror-button flex items-center justify-center space-x-4 active:scale-95"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                      <MessageCircle size={22} className="animate-pulse" />
                      <span>WhatsApp Consultation</span>
                    </button>
                  </div>
                  <button onClick={scrollToTop} className="mt-12 self-end flex items-center space-x-3 text-gold/40 hover:text-gold transition-colors group">
                    <span className="text-[8px] font-black uppercase tracking-widest">Back to Heavens</span>
                    <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold/50">
                      <ArrowUp size={14} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Bottom Signature Bar */}
              <div className="pt-16 border-t border-gold/10 text-center flex flex-col items-center">
                <div className="opacity-10 mb-8 max-w-[200px]">
                  <BismillahSVG />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <span className="text-gray-400 text-[9px] font-bold tracking-[0.4em] uppercase mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} Nur-ul-Huda Spiritual Platform. Sacred Excellence.
                  </span>
                  <div className="flex items-center space-x-8 text-[9px] font-bold tracking-[0.2em] uppercase text-gold/50">
                    <a href="#" className="hover:text-gold transition-colors">Privacy Sanctum</a>
                    <a href="#" className="hover:text-gold transition-colors">Spiritual Terms</a>
                    <a href="#" className="hover:text-gold transition-colors">Ummah Impact</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
