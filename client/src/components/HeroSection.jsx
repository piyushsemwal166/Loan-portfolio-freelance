import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaCircleCheck, FaUserTie } from 'react-icons/fa6';

function HeroSection() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const auraY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <section id="home" ref={heroRef} className="relative overflow-hidden px-4 pb-16 pt-20 md:px-8 md:pt-28">
      <motion.div
        className="hero-aura"
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: auraY }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-flex rounded-full border border-(--border-color) px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--brand)">
            Trusted Loan Partner
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-(--heading-color) md:text-6xl">
            Best Loan and Investment Solutions
          </h1>
          <p className="mt-5 max-w-xl text-base text-(--text-muted) md:text-lg">
            11+ Years Banking Experience | 7+ Years Investment Guidance
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-(--border-color) bg-(--surface-elevated) px-3 py-1 text-xs font-semibold text-(--heading-color)">
              3500+ Clients Guided
            </span>
            <span className="rounded-full border border-(--border-color) bg-(--surface-elevated) px-3 py-1 text-xs font-semibold text-(--heading-color)">
              ROI-Focused Planning
            </span>
            <span className="rounded-full border border-(--border-color) bg-(--surface-elevated) px-3 py-1 text-xs font-semibold text-(--heading-color)">
              Fast Documentation Support
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-(--brand) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--brand-strong)"
            >
              Apply Now
            </motion.a>
            <motion.a
              href="#calculator"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-(--border-color) px-6 py-3 text-sm font-semibold text-(--heading-color) transition hover:border-(--brand) hover:text-(--brand)"
            >
              Calculate EMI
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={shouldReduceMotion ? undefined : { y: cardY }}
          className="float-card rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-6 shadow-[0_20px_55px_-20px_rgba(0,0,0,0.55)]"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2 rounded-2xl border border-(--border-color) bg-(--surface) p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">Advisor Profile</p>
                  <p className="mt-2 text-lg font-semibold text-(--heading-color)">Manish Dutt</p>
                  <p className="mt-1 text-sm text-(--text-muted)">Self Employed | Loan and Investment Consultant</p>
                </div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--border-color) bg-(--surface-elevated) text-(--brand)">
                  <FaUserTie />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] px-2.5 py-1 text-[11px] font-semibold text-(--heading-color)">
                  <FaCircleCheck className="text-(--brand)" />
                  Verified Guidance
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] px-2.5 py-1 text-[11px] font-semibold text-(--heading-color)">
                  <FaBriefcase className="text-(--brand)" />
                  11+ Years Banking Experience
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-(--border-color) p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">Home Loan</p>
              <p className="mt-2 text-2xl font-semibold text-(--heading-color)">7.10%</p>
              <p className="mt-1 text-xs text-(--text-muted)">Starting ROI</p>
            </div>
            <div className="rounded-2xl border border-(--border-color) p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">Service Rating</p>
              <p className="mt-2 text-2xl font-semibold text-(--heading-color)">4.9/5</p>
              <p className="mt-1 text-xs text-(--text-muted)">Client feedback score</p>
            </div>
            <div className="sm:col-span-2 rounded-2xl border border-(--border-color) p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">Support Promise</p>
              <p className="mt-2 text-sm text-(--heading-color)">
                End-to-end assistance from eligibility check to final disbursal and post-loan support.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;

