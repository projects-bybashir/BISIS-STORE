import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { packages as packagesData } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { Rocket, TrendingUp, Crown, Clock } from 'lucide-react';

interface PackagesProps {
  onOrderClick: (pkgName?: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'fa-rocket': <Rocket className="w-10 h-10" />,
  'fa-chart-line': <TrendingUp className="w-10 h-10" />,
  'fa-crown': <Crown className="w-10 h-10" />,
};

export default function Packages({ onOrderClick }: PackagesProps) {
  const { t, currentLang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const pkgs = packagesData[currentLang] || packagesData.en;

  return (
    <section
      ref={ref}
      id="packages"
      className="relative py-24 md:py-32 px-4 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gold uppercase mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
            {t.pkgEyebrow}
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            dangerouslySetInnerHTML={{ __html: t.pkgTitle }}
          />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            {t.pkgSub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pkgs.map((pkg, i) => {
            const isFeatured = i === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * i }}
                className={`glass-card p-8 flex flex-col gap-5 relative overflow-hidden shimmer-effect ${
                  isFeatured
                    ? 'border-t-[3px] border-t-gold bg-gradient-to-b from-gold/[0.06] to-gold/[0.02] md:scale-105 hover:md:scale-[1.08]'
                    : 'border-t-[3px] border-t-transparent hover:border-t-gold/50'
                }`}
                style={{
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-gold to-gold-dark text-dark-bg text-xs font-extrabold px-4 py-1.5 rounded-bl-xl tracking-widest uppercase shadow-gold">
                    {pkg.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="text-gold gold-glow-text transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {iconMap[pkg.icon] || <Rocket className="w-10 h-10" />}
                </div>

                {/* Name */}
                <h3 className="text-2xl font-extrabold text-white">{pkg.name}</h3>

                {/* Price */}
                <div className="font-bebas text-4xl text-gold gold-glow-text tracking-wide">
                  {pkg.price}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {pkg.desc}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {pkg.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="text-sm text-[#F0E6D3] flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1"
                    >
                      <span className="text-gold text-lg leading-none mt-0.5">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => onOrderClick(pkg.name)}
                  className={`w-full py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                    isFeatured
                      ? 'btn-primary-gold'
                      : 'bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-dark-bg hover:-translate-y-0.5 hover:shadow-gold'
                  }`}
                >
                  {t.chooseThis}
                </button>

                {/* Scarcity */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-gold animate-pulse" />
                  {t.scarcity}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
