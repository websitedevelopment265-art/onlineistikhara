
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Heart, Moon, Sun, Sunrise, Sunset } from 'lucide-react';

const StatusTracker: React.FC = () => {
  const [pulse, setPulse] = useState(99);
  const [currentPrayer, setCurrentPrayer] = useState('Loading...');

  const getPakistanTime = () => {
    const options = {
      timeZone: 'Asia/Karachi',
      hour: 'numeric',
      hour12: false,
      minute: 'numeric',
    } as const;
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(new Date());
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    return { hour, minute };
  };

  const getPrayerStatus = () => {
    const { hour, minute } = getPakistanTime();
    const timeVal = hour + minute / 60;

    // Standard Sunni Prayer Time windows for Pakistan (Approximate)
    if (timeVal >= 4.5 && timeVal < 6.5) return { name: 'Fajr', icon: Sunrise, color: 'text-orange-400' };
    if (timeVal >= 6.5 && timeVal < 12) return { name: 'Ishraq', icon: Sun, color: 'text-yellow-500' };
    if (timeVal >= 12 && timeVal < 15.5) return { name: 'Zuhr', icon: Sun, color: 'text-yellow-600' };
    if (timeVal >= 15.5 && timeVal < 18) return { name: 'Asr', icon: Sun, color: 'text-orange-500' };
    if (timeVal >= 18 && timeVal < 19.5) return { name: 'Maghrib', icon: Sunset, color: 'text-rose-500' };
    if (timeVal >= 19.5 && timeVal < 23.5) return { name: 'Isha', icon: Moon, color: 'text-indigo-500' };
    return { name: 'Tahajjud', icon: Moon, color: 'text-indigo-700' };
  };

  useEffect(() => {
    const updateStats = () => {
      setPulse(Math.floor(Math.random() * 3) + 97); // Realistic fluctuation 97-99%
      const status = getPrayerStatus();
      setCurrentPrayer(status.name);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentStatus = getPrayerStatus();

  const stats = [
    { label: 'Energy Level', value: `${pulse}%`, icon: Zap, color: 'text-yellow-500' },
    { label: 'Protection', value: 'Active', icon: Shield, color: 'text-emerald-600' },
    { label: 'Peace Level', value: 'Serene', icon: Heart, color: 'text-rose-500' },
    { label: 'Pakistan Time', value: currentStatus.name, icon: currentStatus.icon, color: currentStatus.color },
  ];

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-[1.5rem] flex items-center space-x-5 border border-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border-l-4 border-l-gold hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`p-4 rounded-2xl bg-gold/5 ${stat.color} group-hover:scale-110 transition-transform flex items-center justify-center`}>
              <stat.icon className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/50 font-black mb-1">
                {stat.label}
              </span>
              <span className="text-xl font-serif font-bold text-charcoal tracking-tight">
                {stat.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatusTracker;
