import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { packages, TG_HANDLE } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Send, Lock, DollarSign } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
}

export default function OrderModal({ isOpen, onClose, selectedPackage }: OrderModalProps) {
  const { t, currentLang } = useLanguage();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pkg: selectedPackage || '',
    bottleneck: '',
    revenue: '',
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pkgs = packages[currentLang] || packages.en;

  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({ ...prev, pkg: selectedPackage }));
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('form');
      setErrors({});
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.pkg) newErrors.pkg = 'Please select a package';
    if (!captchaVerified) newErrors.captcha = 'Please verify';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('bisis_orders') || '[]');
    orders.push({
      ...formData,
      date: new Date().toISOString(),
    });
    localStorage.setItem('bisis_orders', JSON.stringify(orders));

    // Send via Telegram
    const text = `📩 *New System Request*%0A%0A👤 *Name:* ${formData.name}%0A📧 *Email:* ${formData.email}%0A🛠️ *Package:* ${formData.pkg}%0A📝 *Bottleneck:* ${formData.bottleneck || 'N/A'}%0A💰 *Revenue Target:* ${formData.revenue || 'N/A'}%0A%0A🕒 ${new Date().toLocaleString()}`;
    const telegramUrl = `https://t.me/${TG_HANDLE}?start=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');

    setStep('success');
  };

  const goToPayment = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 bg-dark-bg3 border rounded-xl text-[#F0E6D3] text-sm font-cairo outline-none transition-all duration-300 placeholder:text-muted-foreground/50 ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
        : 'border-white/[0.08] focus:border-gold focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)]'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
            className="bg-dark-bg2 border border-gold/15 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,175,55,0.05)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06] sticky top-0 bg-dark-bg2/95 backdrop-blur-xl z-10 rounded-t-3xl">
              <h3 className="text-xl font-extrabold text-white">{t.modalTitle}</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/[0.04] text-muted-foreground hover:bg-gold/15 hover:text-gold flex items-center justify-center transition-all duration-300 hover:rotate-90 border border-transparent hover:border-gold/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === 'form' ? (
              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.lblName} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.lblEmail} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Package */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.lblPackage} *
                  </label>
                  <select
                    value={formData.pkg}
                    onChange={(e) => setFormData(prev => ({ ...prev, pkg: e.target.value }))}
                    className={inputClass('pkg')}
                  >
                    <option value="">— {t.lblPackage} —</option>
                    {pkgs.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                  {errors.pkg && <p className="text-red-400 text-xs mt-1">{errors.pkg}</p>}
                </div>

                {/* Bottleneck */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.lblBottleneck}{' '}
                    <span className="text-gold font-normal normal-case">({t.optional})</span>
                  </label>
                  <textarea
                    value={formData.bottleneck}
                    onChange={(e) => setFormData(prev => ({ ...prev, bottleneck: e.target.value }))}
                    placeholder="e.g. fundraising, brand awareness..."
                    rows={3}
                    className={`${inputClass('bottleneck')} resize-vertical`}
                  />
                </div>

                {/* Revenue */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.lblRevenue}{' '}
                    <span className="text-gold font-normal normal-case">({t.optional})</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      type="text"
                      value={formData.revenue}
                      onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
                      placeholder="$50k – $250k"
                      className={`${inputClass('revenue')} pl-10`}
                    />
                  </div>
                </div>

                {/* Captcha */}
                <div>
                  <div
                    onClick={() => setCaptchaVerified(true)}
                    className={`flex items-center justify-center gap-2 py-4 bg-dark-bg3 rounded-xl border cursor-pointer transition-all duration-300 min-h-[55px] ${
                      captchaVerified
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : 'border-white/[0.08] hover:border-gold/40 hover:bg-gold/5'
                    }`}
                  >
                    {captchaVerified ? (
                      <>
                        <Check className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-sm">{t.captchaVerified}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm">{t.captchaText}</span>
                      </>
                    )}
                  </div>
                  {errors.captcha && <p className="text-red-400 text-xs mt-1">{errors.captcha}</p>}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 btn-primary-gold py-4 text-base flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {t.submitBtn}
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-4 border border-white/[0.08] rounded-full text-muted-foreground font-semibold hover:border-muted-foreground hover:text-[#F0E6D3] transition-all duration-300"
                  >
                    {t.cancelBtn}
                  </button>
                </div>
              </div>
            ) : (
              /* Success Step */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="p-10 text-center"
              >
                <div className="text-6xl mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                  >
                    ✅
                  </motion.div>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4">{t.sucTitle}</h3>
                <p
                  className="text-muted-foreground mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.sucDesc }}
                />
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={goToPayment} className="btn-primary-gold">
                    {t.payNowBtn}
                  </button>
                  <button onClick={onClose} className="btn-ghost-gold">
                    {t.payLaterBtn}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
