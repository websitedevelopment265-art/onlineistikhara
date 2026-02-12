
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const Icon = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform motion values into degrees of rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      className="relative py-12 perspective-[1000px]"
    >
      {/* Background Decorative Glow behind card */}
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-700 pointer-events-none" />

      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="glass group relative overflow-hidden p-10 rounded-[2.5rem] cursor-pointer min-h-[360px] flex flex-col justify-center text-center transition-all duration-500 hover:shadow-[0_40px_100px_rgba(197,160,89,0.2)] border-gold/20 hover:border-gold/60"
      >
        {/* Shimmer Mirror Reflection Beam */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-35deg] group-hover:animate-[shimmer_2s_infinite_linear]" 
               style={{ mixBlendMode: 'overlay' }} />
        </div>

        {/* Floating Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center space-y-6" style={{ transform: "translateZ(50px)" }}>
          <div className="w-20 h-20 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 group-hover:bg-gold group-hover:text-white transition-all duration-700 shadow-inner group-hover:shadow-[0_0_30px_rgba(197,160,89,0.8)]">
            <Icon className="w-8 h-8 text-gold group-hover:text-ivory transition-colors duration-500" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-gold transition-colors drop-shadow-lg premium-heading">
              {service.title}
            </h3>
            <p className="text-goldLight font-serif text-xl italic drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(197,160,89,0.6)] transition-all arabic-font" dir="rtl">
              {service.urduTitle}
            </p>
          </div>
          
          <p className="text-ivory/60 text-sm leading-relaxed max-w-[90%] font-medium group-hover:text-ivory transition-colors duration-500 urdu-font" dir="rtl">
            {service.description}
          </p>

          <div className="pt-4 flex items-center text-gold text-[10px] font-black tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-all group-hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]">
            GUIDANCE PATH <LucideIcons.ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
          </div>
        </div>

        {/* Secondary Specular Highlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.08),transparent_50%)]" />
      </motion.div>

      {/* Mirror Reflection (Bottom) */}
      <div className="reflection-mask h-24 w-full relative mt-[-10px] opacity-10 pointer-events-none group-hover:opacity-30 transition-all duration-700">
          <div className="w-full h-full rounded-[2.5rem] glass" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
