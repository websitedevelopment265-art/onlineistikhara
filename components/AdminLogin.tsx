
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Sparkles } from 'lucide-react';
import BismillahSVG from './BismillahSVG';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credentials
    if (username === 'admin' && password === 'nurulhuda786') {
      onLogin(true);
    } else {
      setError('Invalid spiritual credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-charcoal">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10 rounded-[2.5rem] border border-gold/20 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
            <Lock className="text-gold w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mb-2 premium-heading">Admin Access</h2>
          <p className="text-gold/60 text-[10px] font-black uppercase tracking-[0.3em]">Spiritual Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
            <input 
              type="text" 
              placeholder="Spiritual Identifier"
              className="w-full bg-white/5 border border-gold/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
            <input 
              type="password" 
              placeholder="Sacred Key"
              className="w-full bg-white/5 border border-gold/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            className="w-full bg-gold text-charcoal py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] mirror-button shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
          >
            Enter Sanctuary
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 flex justify-center opacity-40">
          <BismillahSVG />
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
