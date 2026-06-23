import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';

export default function Steps() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [t.step1, t.step2, t.step3, t.step4];

  return (
    <section
      ref={ref}
      id="steps"
      className="relative py-24 md:py-32 px-4 md:px-12 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #05070A 0%, #0A0D14 100%)' }}
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gold uppercase mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
            {t.stepsEyebrow}
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            dangerouslySetInnerHTML={{ __html: t.stepsTitle }}
          />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            {t.stepsSub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="glass-card p-8 text-center relative group shimmer-effect"
            >
              {/* Step number */}
              <div className="font-bebas text-6xl text-gold/10 leading-none mb-4 transition-colors duration-300 group-hover:text-gold/25">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.2))' }}>
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Connection lines between steps (desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-[calc(25%+2rem)] right-[calc(25%+2rem)] h-px -translate-y-1/2 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20" />
        </div>
      </div>
    </section>
  );
}
