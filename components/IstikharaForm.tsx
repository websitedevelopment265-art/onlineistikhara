
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, MessageSquare, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const steps = [
  { title: 'Personal Info', sub: 'Details about you' },
  { title: 'Inquiry', sub: 'What are you asking about?' },
  { title: 'Review', sub: 'Verify your request' }
];

const IstikharaForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    details: ''
  });

  const next = () => setStep(s => Math.min(s + 1, steps.length));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-5xl mx-auto glass p-16 md:p-24 rounded-[4rem] relative overflow-hidden shadow-2xl border border-gold/10">
      {/* Decorative Background Icon */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
        <CheckCircle className="w-64 h-64 text-gold" />
      </div>

      {/* Progress Bar Area */}
      <div className="flex justify-between mb-24 relative px-4 md:px-14">
        <div className="absolute top-1/2 left-14 right-14 h-1 bg-white/5 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-14 h-1 bg-gold -translate-y-1/2 z-0 transition-all duration-700"
          style={{ width: `calc(${((step - 1) / (steps.length - 1)) * 100}% - 30px)` }}
        />
        {steps.map((s, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center">
            <motion.div 
              animate={{ 
                scale: step >= idx + 1 ? 1.3 : 1,
                backgroundColor: step >= idx + 1 ? '#c5a059' : '#1a1817'
              }}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-black transition-colors border-2 ${step >= idx + 1 ? 'border-gold text-charcoal shadow-[0_0_30px_rgba(197,160,89,0.5)]' : 'border-white/10 text-ivory/30'}`}
            >
              {idx + 1}
            </motion.div>
            <span className={`text-[12px] mt-6 font-black uppercase tracking-[0.4em] transition-colors ${step >= idx + 1 ? 'text-gold' : 'text-ivory/20'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-[400px]"
        >
          {step === 1 && (
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white premium-heading">Let's start with your info</h2>
                <p className="text-ivory/40 text-2xl">Please provide your name and contact for spiritual guidance.</p>
              </div>
              
              <div className="space-y-8 mt-14">
                <div className="relative">
                  <User className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-gold/30" />
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-8 pl-20 pr-8 text-ivory text-2xl focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all focus:bg-white/10"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-gold/30" />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp / Phone Number" 
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-8 pl-20 pr-8 text-ivory text-2xl focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all focus:bg-white/10"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white premium-heading">What's on your mind?</h2>
                <p className="text-ivory/40 text-2xl">Describe the matter you wish to seek Istikhara for.</p>
              </div>
              
              <div className="space-y-8 mt-14">
                <div className="relative">
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-8 px-8 text-ivory text-2xl focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all appearance-none cursor-pointer"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="" disabled className="bg-charcoal">Select Category</option>
                    <option value="Marriage" className="bg-charcoal">Marriage / Proposal</option>
                    <option value="Business" className="bg-charcoal">Business / Job</option>
                    <option value="Health" className="bg-charcoal">Health & Protection</option>
                    <option value="Other" className="bg-charcoal">Other Matter</option>
                  </select>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-gold/50">
                    <ArrowRight className="w-8 h-8 rotate-90" />
                  </div>
                </div>

                <div className="relative">
                  <textarea 
                    rows={6}
                    placeholder="Brief details about the situation..." 
                    className="w-full bg-white/5 border border-white/10 rounded-[3rem] py-8 px-10 text-ivory text-2xl focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all focus:bg-white/10 urdu-font leading-relaxed"
                    value={formData.details}
                    onChange={e => setFormData({...formData, details: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-14 text-center flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 bg-emerald/10 rounded-full flex items-center justify-center border border-emerald/20 shadow-3xl mb-6"
              >
                <CheckCircle className="w-16 h-16 text-emerald-400" />
              </motion.div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white premium-heading">Verify Your Request</h2>
                <p className="text-ivory/40 text-2xl max-w-2xl mx-auto">Please review your spiritual inquiry before submitting to our sanctuary.</p>
              </div>
              
              <div className="bg-white/5 rounded-[3rem] p-12 text-left space-y-8 w-full max-w-3xl border border-white/10">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gold/40">Full Name</span>
                  <span className="text-2xl text-ivory font-serif">{formData.name || '---'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gold/40">Contact</span>
                  <span className="text-2xl text-ivory font-serif">{formData.phone || '---'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gold/40">Inquiry Category</span>
                  <span className="text-2xl text-gold font-serif">{formData.subject || '---'}</span>
                </div>
              </div>
              <p className="text-lg text-ivory/30 italic">By submitting, you agree to receive a response via WhatsApp or Phone call from our spiritual elders.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-20 flex items-center justify-between">
        <button 
          onClick={prev}
          disabled={step === 1}
          className={`flex items-center text-[12px] font-black uppercase tracking-[0.5em] transition-all px-10 py-6 rounded-2xl ${step === 1 ? 'text-ivory/10 cursor-not-allowed' : 'text-gold hover:text-white hover:bg-white/5'}`}
        >
          <ArrowLeft className="mr-4 w-6 h-6" /> Previous Path
        </button>

        {step < 3 ? (
          <button 
            onClick={next}
            className="bg-gold hover:bg-goldLight text-charcoal px-20 py-7 rounded-[2rem] font-black uppercase tracking-[0.5em] text-[12px] flex items-center transition-all shadow-[0_20px_50px_rgba(197,160,89,0.3)] mirror-button"
          >
            Ascend Next <ArrowRight className="ml-4 w-6 h-6" />
          </button>
        ) : (
          <button 
            onClick={() => alert('Your Sacred Request has been sent. Peace be upon you.')}
            className="bg-emerald/80 hover:bg-emerald text-white px-20 py-7 rounded-[2rem] font-black uppercase tracking-[0.5em] text-[12px] flex items-center transition-all shadow-[0_20px_50px_rgba(6,78,59,0.4)] mirror-button"
          >
            Submit to Divine <CheckCircle className="ml-4 w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default IstikharaForm;
