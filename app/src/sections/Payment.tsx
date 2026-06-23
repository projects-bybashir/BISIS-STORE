import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { WALLET } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, Shield, Wallet } from 'lucide-react';

export default function Payment() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [txid, setTxid] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(WALLET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const submitTxid = () => {
    if (!txid.trim()) return;
    
    const orders = JSON.parse(localStorage.getItem('bisis_orders') || '[]');
    if (orders.length > 0) {
      orders[orders.length - 1].txid = txid;
      localStorage.setItem('bisis_orders', JSON.stringify(orders));
    }
    
    setSubmitted(true);
    setTxid('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      ref={ref}
      id="payment-section"
      className="relative py-24 md:py-32 px-4 md:px-12 lg:px-20 bg-dark-bg2"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gold uppercase mb-4">
          <span className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
          {t.payEyebrow}
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">{t.payTitle}</h2>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {t.payDesc}
        </p>

        {/* Network Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest px-4 py-2 rounded-full mb-8">
          <Shield className="w-3.5 h-3.5" />
          {t.networkBadge}
        </div>

        {/* Wallet Address */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-dark-bg3 border border-gold/20 rounded-xl p-5 mb-8 flex items-center gap-4 text-left group hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300"
        >
          <Wallet className="w-5 h-5 text-gold flex-shrink-0" />
          <span className="flex-1 font-mono text-sm text-gold-light break-all">
            {WALLET}
          </span>
          <button
            onClick={copyAddress}
            className="flex-shrink-0 px-4 py-2 bg-gold/10 border border-gold/30 rounded-lg text-gold text-xs font-bold hover:bg-gold hover:text-dark-bg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '✅' : t.copyBtn}
          </button>
        </motion.div>

        {/* Payment Steps */}
        <div className="bg-gold/[0.04] border border-gold/10 rounded-xl p-6 mb-8 text-right">
          <p
            className="text-sm text-muted-foreground leading-loose"
            dangerouslySetInnerHTML={{ __html: t.paySteps }}
          />
        </div>

        {/* TXID Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          <input
            type="text"
            value={txid}
            onChange={(e) => setTxid(e.target.value)}
            placeholder={t.txidPlaceholder}
            className="w-full px-5 py-4 bg-dark-bg3 border border-white/[0.08] rounded-xl text-[#F0E6D3] text-sm font-cairo outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] placeholder:text-muted-foreground/50"
          />
          <button
            onClick={submitTxid}
            className="btn-primary-gold w-full py-4 text-base"
          >
            {submitted ? '✅ Confirmed!' : t.txidBtn}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
