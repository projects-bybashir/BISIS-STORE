import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -30, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -30, x: '-50%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed top-24 left-1/2 z-[300] px-8 py-3.5 bg-dark-bg3 border border-gold/25 rounded-full text-gold font-semibold text-sm whitespace-nowrap shadow-lg"
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.1)',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
