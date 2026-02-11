
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
    <div className="max-w-xl mx-auto glass p-8 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <CheckCircle className="w-24 h-24 text-gold" />
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gold -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((s, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= idx + 1 ? 'bg-gold text-charcoal' : 'bg-gray-800 text-gray-500'}`}>
              {idx + 1}
            </div>
            <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${step >= idx + 1 ? 'text-gold' : 'text-gray-600'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">Let's start with your info</h2>
              <p className="text-gray-400 text-sm">Please provide your name and contact for spiritual guidance.</p>
              
              <div className="relative mt-6">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                <input 
                  type="tel" 
                  placeholder="WhatsApp / Phone Number" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">What's on your mind?</h2>
              <p className="text-gray-400 text-sm">Describe the matter you wish to seek Istikhara for.</p>
              
              <div className="mt-6">
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="" disabled className="bg-charcoal">Select Category</option>
                  <option value="Marriage" className="bg-charcoal">Marriage / Proposal</option>
                  <option value="Business" className="bg-charcoal">Business / Job</option>
                  <option value="Health" className="bg-charcoal">Health & Protection</option>
                  <option value="Other" className="bg-charcoal">Other Matter</option>
                </select>
              </div>

              <div className="relative">
                <textarea 
                  rows={4}
                  placeholder="Brief details about the situation..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/20"
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">Verify Your Request</h2>
              <div className="bg-white/5 rounded-2xl p-6 text-left space-y-3">
                <p className="text-sm"><span className="text-gold font-bold">Name:</span> {formData.name}</p>
                <p className="text-sm"><span className="text-gold font-bold">Contact:</span> {formData.phone}</p>
                <p className="text-sm"><span className="text-gold font-bold">Category:</span> {formData.subject}</p>
              </div>
              <p className="text-xs text-gray-500">By submitting, you agree to receive a response via WhatsApp or Phone call.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between">
        <button 
          onClick={prev}
          disabled={step === 1}
          className={`flex items-center text-sm font-bold uppercase tracking-widest ${step === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gold hover:text-white transition-colors'}`}
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </button>

        {step < 3 ? (
          <button 
            onClick={next}
            className="bg-gold hover:bg-goldLight text-charcoal px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center transition-all"
          >
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={() => alert('Request Submitted Successfully!')}
            className="bg-emerald hover:bg-emerald/80 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center transition-all shadow-lg shadow-emerald/20"
          >
            Submit Request <CheckCircle className="ml-2 w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default IstikharaForm;
