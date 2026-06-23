import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function FloatingButtons() {
  const { dir } = useLanguage();
  const isRTL = dir === 'rtl';

  return (
    <div
      className={`fixed bottom-6 z-[150] flex flex-col gap-3 ${
        isRTL ? 'left-6' : 'right-6'
      }`}
    >
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/970597997040"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1, y: -4 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
        style={{ boxShadow: '0 6px 25px rgba(0,0,0,0.5)' }}
        title="WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
          <path d="M16 3C8.832 3 3 8.832 3 16c0 2.304.618 4.563 1.79 6.527L3 29l6.668-1.745A13.03 13.03 0 0016 29c7.168 0 13-5.832 13-13S23.168 3 16 3zm0 24c-2.03 0-4.016-.544-5.76-1.574l-.41-.246-4.262 1.115 1.133-4.148-.27-.422A10.97 10.97 0 015 16c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.01-8.23c-.33-.165-1.952-.962-2.254-1.073-.303-.11-.524-.165-.744.165-.22.33-.855 1.073-1.048 1.292-.193.22-.386.247-.716.082-.33-.165-1.392-.513-2.65-1.635-.98-.873-1.64-1.95-1.833-2.28-.193-.33-.02-.508.145-.673.15-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.412-.028-.578-.083-.165-.744-1.793-1.019-2.456-.268-.645-.54-.558-.744-.568l-.634-.011a1.21 1.21 0 00-.88.412c-.303.33-1.156 1.128-1.156 2.751s1.184 3.19 1.348 3.41c.165.22 2.33 3.558 5.648 4.99.79.34 1.406.542 1.886.694.792.252 1.514.216 2.083.131.635-.094 1.953-.798 2.228-1.57.275-.77.275-1.43.193-1.57-.083-.138-.303-.22-.634-.385z"/>
        </svg>
      </motion.a>

      {/* Telegram */}
      <motion.a
        href="https://t.me/bisis_store_bot"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        whileHover={{ scale: 1.1, y: -4 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#229ED9] to-[#1A8BC3] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
        style={{ boxShadow: '0 6px 25px rgba(0,0,0,0.5)' }}
        title="Telegram"
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
          <path d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm6.408 8.87l-2.193 10.34c-.165.73-.594.91-1.203.567l-3.32-2.445-1.602 1.54c-.177.178-.326.326-.67.326l.238-3.38 6.16-5.566c.268-.238-.058-.37-.413-.132l-7.617 4.797-3.28-1.025c-.713-.223-.726-.713.15-1.055l12.804-4.938c.592-.215 1.11.144.946 1.07z"/>
        </svg>
      </motion.a>
    </div>
  );
}
