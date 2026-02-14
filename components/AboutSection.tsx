
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, BookOpen, Quote, PhoneCall, CheckCircle } from 'lucide-react';
import BismillahSVG from './BismillahSVG.tsx';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-32 z-10 scroll-mt-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-emerald blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-8 max-w-7xl">
        {/* Intro Section */}
        <div className="text-center mb-24">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <BismillahSVG />
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 premium-heading urdu-font mt-8" dir="rtl">
              ہمارے بارے میں <br />
              <span className="gold-gradient-text italic text-4xl md:text-5xl">Our Sacred Legacy</span>
            </h2>
            <div className="w-24 h-1 bg-gold/30 mx-auto mb-10" />
            <p className="max-w-3xl mx-auto text-ivory/80 text-2xl md:text-3xl leading-[2.2] urdu-font" dir="rtl">
              نور الہدیٰ ایک ایسا روحانی مرکز ہے جہاں زندگی کے پیچیدہ ترین مسائل کا حل قرآن و سنت کی روشنی میں نکالا جاتا ہے۔ ہمارا مقصد بھٹکی ہوئی روحوں کو سکون اور ہدایت کی راہ دکھانا ہے۔
            </p>
          </motion.div>
        </div>

        {/* Experience & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div 
            variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="glass p-12 rounded-[3.5rem] border border-gold/10 relative overflow-hidden"
          >
            <Quote className="absolute top-8 right-8 text-gold/5 w-32 h-32" />
            <h3 className="text-3xl font-serif font-bold text-gold mb-8 premium-heading">Our Philosophy</h3>
            <div className="space-y-6 text-ivory/90 text-xl md:text-2xl leading-[2] urdu-font" dir="rtl">
              <p>ہمارا ایمان ہے کہ ہر درد کی دوا کلامِ الٰہی میں موجود ہے۔ ہم ہر قسم کے غیر اسلامی افعال، سفلی علم اور جادو ٹونے سے سختی سے گریز کرتے ہیں۔</p>
              <p className="text-goldLight/80">ہمارا تمام تر کام صرف "نورانی" اور "روحانی" طریقے سے کیا جاتا ہے جو آپ کی دنیا اور آخرت دونوں کو محفوظ رکھتا ہے۔</p>
            </div>
            <div className="mt-10 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/60">Authentic Spiritual Path</span>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="glass p-12 rounded-[3.5rem] border border-gold/10 relative overflow-hidden flex flex-col justify-center"
          >
            <Sparkles className="absolute bottom-8 left-8 text-gold/5 w-32 h-32" />
            <h3 className="text-3xl font-serif font-bold text-gold mb-8 premium-heading">Years of Excellence</h3>
            <p className="text-ivory/90 text-xl md:text-2xl leading-[2] urdu-font mb-8" dir="rtl">
              روحانی مشورہ اور علاج میں برسوں کا تجربہ ہمیں دوسروں سے ممتاز کرتا ہے۔ ہزاروں لوگ ہمارے مرکز سے فیضیاب ہو کر اپنی زندگیوں میں شفا اور سکون پا چکے ہیں۔
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-3xl font-bold text-white mb-1">15K+</h4>
                <p className="text-[9px] uppercase tracking-widest text-gold/40 font-black">Souls Guided</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-3xl font-bold text-white mb-1">100%</h4>
                <p className="text-[9px] uppercase tracking-widest text-gold/40 font-black">Privacy Assured</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Mention Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-white mb-4 premium-heading">Our Expertise</h3>
            <p className="text-gold/60 text-[11px] font-black uppercase tracking-[0.4em]">Spiritual Mastery Across Domains</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, label: "Marriage Solutions", detail: "Pasand ki Shadi aur Rishton mein rukawat ka hal." },
              { icon: Sparkles, label: "Spiritual Healing", detail: "Kala Jadu aur Nazar-e-Bad se hifazat." },
              { icon: ShieldCheck, label: "Family Peace", detail: "Gharloo jhagray aur sakoon ki dua." },
              { icon: BookOpen, label: "Divine Istikhara", detail: "Business aur Shadi ke ahem faislay." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 p-8 rounded-3xl border border-white/5 text-center group transition-all hover:bg-white/[0.08]"
              >
                <item.icon className="w-10 h-10 text-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-serif font-bold text-white mb-3">{item.label}</h4>
                <p className="text-ivory/50 text-sm urdu-font leading-relaxed" dir="rtl">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass rounded-[4rem] p-16 text-center border-2 border-gold/20 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-8 border border-gold/20">
              <PhoneCall className="text-gold animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 premium-heading urdu-font" dir="rtl">
              کیا آپ کسی پریشانی کا شکار ہیں؟
            </h2>
            <p className="text-goldLight/60 text-[12px] font-black uppercase tracking-[0.5em] mb-12">Don't suffer in silence. Divine help is a message away.</p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <button 
                onClick={() => window.open('https://wa.me/923057615767', '_blank')}
                className="px-16 py-8 bg-gold text-charcoal rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm mirror-button shadow-2xl flex items-center space-x-4"
              >
                <span>Consult Now</span>
                <CheckCircle size={20} />
              </button>
              
              <a href="#istikhara-form" className="text-gold/60 hover:text-gold transition-colors font-black uppercase tracking-[0.4em] text-[10px] border-b border-gold/20 pb-2">
                Submit Spiritual Request
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
