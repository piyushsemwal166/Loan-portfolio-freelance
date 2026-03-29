import { motion } from 'framer-motion';
import { FaPhone } from 'react-icons/fa6';

function MobileStickyCta() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      className="fixed bottom-4 left-4 right-4 z-[70] md:hidden"
    >
      <div className="flex items-center justify-between rounded-2xl border border-(--border-color) bg-(--surface-elevated) p-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-(--text-muted)">Need quick support?</p>
          <p className="text-sm font-semibold text-(--heading-color)">Get callback in 15 minutes</p>
        </div>
        <a
          href="tel:+918557996728"
          className="inline-flex items-center gap-2 rounded-full bg-(--brand) px-4 py-2 text-xs font-semibold text-white"
        >
          <FaPhone />
          Call Now
        </a>
      </div>
    </motion.div>
  );
}

export default MobileStickyCta;
