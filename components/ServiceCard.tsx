
import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const Icon = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        stiffness: 80, 
        damping: 15, 
        delay: index * 0.1,
        bounce: 0.4
      }}
      className="relative group py-12"
    >
      {/* Background Decorative Glow behind card */}
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-700 pointer-events-none" />

      <div 
        className="glass relative overflow-hidden p-10 rounded-[2.5rem] cursor-pointer min-h-[360px] flex flex-col justify-center text-center transition-all duration-500 hover:shadow-[0_25px_80px_rgba(197,160,89,0.25)] hover:-translate-y-3 border-gold/20 hover:border-gold/50"
      >
        {/* Shimmer Effect Beam */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-shimmer" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-inner divine-glow group-hover:shadow-[0_0_20px_rgba(197,160,89,0.8)]">
            <Icon className="w-8 h-8 text-gold group-hover:text-ivory" />
          </div>
          
          <div>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-2 group-hover:text-gold transition-colors drop-shadow-sm group-hover:drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">
              {service.title}
            </h3>
            <p className="text-gold font-serif text-xl italic drop-shadow-sm group-hover:drop-shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all">
              {service.urduTitle}
            </p>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed max-w-[85%] font-medium group-hover:text-charcoal transition-colors">
            {service.description}
          </p>

          <div className="pt-4 flex items-center text-gold text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-all group-hover:drop-shadow-[0_0_5px_rgba(197,160,89,0.5)]">
            Learn More <LucideIcons.ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
