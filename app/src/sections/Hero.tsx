import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ParticleBackground from '@/components/ParticleBackground';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-12 lg:px-20 pt-24 pb-16 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <ParticleBackground />
      <div className="absolute inset-0 hero-grid-lines z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 bg-gold/10 border border-gold/20 rounded-full px-5 py-2.5 text-xs font-bold text-gold tracking-wider mb-8 backdrop-blur-md relative overflow-hidden"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
          <span dangerouslySetInnerHTML={{ __html: t.badge }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6"
          dangerouslySetInnerHTML={{ __html: t.heroTitle }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mb-10"
        >
          {t.heroSub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-4 flex-wrap justify-center mb-16"
        >
          <button onClick={scrollToPackages} className="btn-primary-gold text-base px-8 py-4">
            {t.heroCta1}
          </button>
          <button onClick={scrollToAbout} className="btn-ghost-gold">
            {t.heroCta2}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex gap-6 md:gap-12 flex-wrap justify-center"
        >
          {[
            { num: 50, suffix: '+', label: t.stat1 },
            { num: 3, suffix: '', label: t.stat2 },
            { num: 0, suffix: 'USDC', label: t.stat3, isText: true },
            { num: 4, suffix: '', label: t.stat4 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              className="glass-card px-6 py-5 text-center min-w-[120px] shimmer-effect group"
            >
              <div className="font-bebas text-4xl md:text-5xl text-gold gold-glow-text leading-none">
                {stat.isText ? (
                  <span>USDC</span>
                ) : (
                  <CountUp end={stat.num} suffix={stat.suffix} duration={2.5} delay={0.5} />
                )}
              </div>
              <div className="text-xs font-semibold text-muted-foreground mt-2 tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
