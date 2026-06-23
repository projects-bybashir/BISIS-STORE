import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 md:py-20 px-4 md:px-12 lg:px-20 bg-dark-bg2 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Logo */}
        <div className="font-bebas text-5xl text-gold gold-glow-text tracking-widest mb-4">
          BİŞİŞ
        </div>

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          {t.footerSub}
        </p>

        {/* Links */}
        <div className="flex gap-8 flex-wrap justify-center mb-8">
          {[
            { label: t.about, id: 'about' },
            { label: t.packages, id: 'packages' },
            { label: t.whatsapp, href: `https://wa.me/970597997040` },
            { label: t.telegram, href: `https://t.me/bisis_store_bot` },
          ].map((link, i) => (
            <a
              key={i}
              href={link.href || `#${link.id}`}
              onClick={link.id ? (e) => { e.preventDefault(); scrollToSection(link.id!); } : undefined}
              target={link.href ? '_blank' : undefined}
              rel={link.href ? 'noopener noreferrer' : undefined}
              className="text-sm font-semibold text-muted-foreground hover:text-gold transition-all duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.06] pt-8 text-xs text-muted-foreground tracking-wider">
          © {currentYear} BİŞİŞ — {t.allRights}
        </div>
      </motion.div>
    </footer>
  );
}
