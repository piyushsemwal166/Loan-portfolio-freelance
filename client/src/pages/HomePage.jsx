import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import AchievementsSection from '../components/AchievementsSection';
import BackToTopButton from '../components/BackToTopButton';
import ContactSection from '../components/ContactSection';
import ChatbotWidget from '../components/ChatbotWidget';
import EmiCalculatorSection from '../components/EmiCalculatorSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import MobileStickyCta from '../components/MobileStickyCta';
import Navbar from '../components/Navbar';
import PartnerBanksSection from '../components/PartnerBanksSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function RevealSection({ children }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <div ref={sectionRef} className="relative">
      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {children}
      </motion.div>
      {!isInView ? <div className="section-skeleton-overlay" aria-hidden="true" /> : null}
    </div>
  );
}

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-(--surface) text-[var(--text-color)]">
      <div className="page-gradient" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <RevealSection>
            <PartnerBanksSection />
          </RevealSection>
          <RevealSection>
            <ServicesSection />
          </RevealSection>
          <RevealSection>
            <HowItWorksSection />
          </RevealSection>
          <RevealSection>
            <AboutSection />
          </RevealSection>
          <RevealSection>
            <AchievementsSection />
          </RevealSection>
          <RevealSection>
            <EmiCalculatorSection />
          </RevealSection>
          <RevealSection>
            <TestimonialsSection />
          </RevealSection>
          <RevealSection>
            <FaqSection />
          </RevealSection>
          <RevealSection>
            <ContactSection />
          </RevealSection>
        </main>
        <Footer />
        <MobileStickyCta />
        <ChatbotWidget />
        <BackToTopButton />
      </div>
    </div>
  );
}

export default HomePage;

