import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANG_NAMES } from '@/lib/translations';
import type { Language } from '@/lib/translations';
import { Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export default function Header({ onOrderClick }: HeaderProps) {
  const { currentLang, setLang, t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 h-20 transition-all duration-500 ${
        scrolled
          ? 'h-16 bg-dark-bg/95 shadow-lg shadow-black/40'
          : 'bg-dark-bg/85'
      }`}
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(212,175,55,0.1)',
      }}
      dir={dir}
    >
      <div className="font-bebas text-4xl tracking-wider text-gold gold-glow-text cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        BİŞİŞ
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <button
          onClick={() => scrollToSection('about')}
          className="text-sm font-semibold text-muted-foreground hover:text-gold transition-all duration-300 relative group"
        >
          {t.about}
          <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
        </button>
        <button
          onClick={() => scrollToSection('packages')}
          className="text-sm font-semibold text-muted-foreground hover:text-gold transition-all duration-300 relative group"
        >
          {t.packages}
          <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
        </button>

        {/* Language Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-full text-xs font-bold text-gold hover:bg-gold/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold"
          >
            <Globe className="w-3.5 h-3.5" />
            {LANG_NAMES[currentLang]}
          </button>
          {langOpen && (
            <div
              className="absolute top-14 right-0 bg-dark-bg2 border border-gold/20 rounded-xl min-w-[140px] py-2 z-50"
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLang(lang.code); setLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-gold/10 ${
                    currentLang === lang.code ? 'text-gold' : 'text-[#F0E6D3]'
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={onOrderClick} className="btn-primary-gold text-sm">
          {t.headerCta}
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gold p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="absolute top-20 left-0 right-0 bg-dark-bg/98 border-b border-gold/10 p-6 md:hidden flex flex-col gap-4"
          style={{ backdropFilter: 'blur(24px)' }}
        >
          <button onClick={() => scrollToSection('about')} className="text-left text-lg font-semibold text-[#F0E6D3] hover:text-gold transition-colors">
            {t.about}
          </button>
          <button onClick={() => scrollToSection('packages')} className="text-left text-lg font-semibold text-[#F0E6D3] hover:text-gold transition-colors">
            {t.packages}
          </button>
          <div className="flex gap-2 flex-wrap">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLang(lang.code); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  currentLang === lang.code
                    ? 'bg-gold/20 border-gold text-gold'
                    : 'border-white/10 text-muted-foreground hover:border-gold/30'
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
          <button onClick={() => { onOrderClick(); setMobileMenuOpen(false); }} className="btn-primary-gold w-full text-center">
            {t.headerCta}
          </button>
        </div>
      )}
    </header>
  );
}
