import { motion } from 'framer-motion';
import {
  FaBolt,
  FaBuildingColumns,
  FaChartLine,
  FaCircleCheck,
  FaHandshake,
  FaShieldHeart,
} from 'react-icons/fa6';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';
import { achievements } from '../utils/content';

const reasons = [
  {
    title: 'Banking and Investment Expertise',
    description: '11+ years in banking and 7+ years in investment guidance for practical decision-making.',
    icon: FaChartLine,
  },
  {
    title: 'Transparent Loan Advisory',
    description: 'Clear ROI comparison, eligibility checks, and realistic repayment planning.',
    icon: FaCircleCheck,
  },
  {
    title: 'Fast Process Coordination',
    description: 'From document checks to sanction and disbursal follow-up with quick turnaround.',
    icon: FaBolt,
  },
  {
    title: 'Trusted Property Insights',
    description: 'Guidance for authority-approved properties and investment-focused locations.',
    icon: FaBuildingColumns,
  },
  {
    title: 'Client First Support',
    description: 'Personalized consultation based on profile, risk appetite, and financial goals.',
    icon: FaHandshake,
  },
  {
    title: 'Compliance and Safety',
    description: 'Careful paperwork and process checks to reduce surprises and delays.',
    icon: FaShieldHeart,
  },
];

function WhyChooseUsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-(--surface) text-(--text-color)">
      <div className="page-gradient" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />

        <main className="px-4 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
          <section className="mx-auto max-w-7xl rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-8 md:p-12">
            <div className="text-center">
              <span className="inline-flex rounded-full border border-(--border-color) px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--brand)">
                Why Clients Trust Us
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-(--heading-color) md:text-5xl">
                Professional Advisory with Proven Outcomes
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-(--text-muted) md:text-base">
                Manish Dutt Loan Services combines market insight, process discipline, and customer-first
                consultation to deliver better loan outcomes and long-term financial confidence.
              </p>
            </div>
          </section>

          <section className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <motion.article
                key={item.label}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="rounded-2xl border border-(--border-color) bg-(--surface-elevated) p-5"
              >
                <p className="text-3xl font-semibold text-(--heading-color)">
                  {item.value}
                  {item.suffix}
                </p>
                <p className="mt-2 text-sm text-(--text-muted)">{item.label}</p>
              </motion.article>
            ))}
          </section>

          <section className="mx-auto mt-10 max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;

                return (
                  <motion.article
                    key={reason.title}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    whileHover={{ y: -6 }}
                    className="rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-6"
                  >
                    <div className="inline-flex rounded-xl bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] p-3 text-(--brand)">
                      <Icon />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-(--heading-color)">{reason.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-(--text-muted)">{reason.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </section>
        </main>

        <Footer />
        <ChatbotWidget />
      </div>
    </div>
  );
}

export default WhyChooseUsPage;
