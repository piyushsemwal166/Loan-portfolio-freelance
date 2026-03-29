import {
  FaArrowTrendUp,
  FaBuilding,
  FaBuildingColumns,
  FaHelmetSafety,
  FaHouse,
  FaLayerGroup,
  FaMoneyBillTransfer,
  FaPiggyBank,
} from 'react-icons/fa6';

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    title: 'Home Loan',
    description:
      'GMADA, HUDA authority, CAT A Builder projects and MC property with best ROI.',
    icon: FaHouse,
  },
  {
    title: 'Balance Transfer',
    description: 'Best ROI from existing to new bank.',
    icon: FaMoneyBillTransfer,
  },
  {
    title: 'Loan Against Property',
    description: 'Government approved authority property only.',
    icon: FaBuildingColumns,
  },
  {
    title: 'Top-up Loan',
    description: 'Flexible top-up facilities for existing eligible loan holders.',
    icon: FaArrowTrendUp,
  },
  {
    title: 'Plot Loan',
    description: 'Structured financing for plot purchase with clear documentation support.',
    icon: FaBuilding,
  },
  {
    title: 'Construction Loan',
    description: 'Stage-wise disbursal and guidance for construction project financing.',
    icon: FaHelmetSafety,
  },
  {
    title: 'Smart Investment Guidance',
    description: 'Real estate investment planning for higher future returns.',
    icon: FaPiggyBank,
  },
];

export const howItWorksSteps = [
  {
    title: 'Profile Review',
    description: 'Understand income profile, property type, and objective to shortlist the right lenders.',
    step: '01',
  },
  {
    title: 'Eligibility and Offer Match',
    description: 'Compare ROI, tenure, and repayment structures to lock the most suitable loan plan.',
    step: '02',
  },
  {
    title: 'Documentation to Disbursal',
    description: 'End-to-end guidance for document checks, sanction process, and timely final disbursal.',
    step: '03',
  },
];

export const partnerBanks = [
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'SBI',
  'Punjab National Bank',
  'Kotak Mahindra Bank',
  'Bank of Baroda',
  'IDFC FIRST Bank',
];

export const achievements = [
  { label: 'Loans Processed', value: 2500, suffix: '+' },
  { label: 'Happy Clients', value: 3500, suffix: '+' },
  { label: 'Insurance Wins', value: 450, suffix: '+' },
  { label: 'Cities Served', value: 18, suffix: '+' },
];

export const testimonials = [
  {
    name: 'Rohit Sharma',
    quote:
      'I got a better balance transfer deal than expected. The process was transparent and very fast.',
  },
  {
    name: 'Amanpreet Kaur',
    quote:
      'From property document checks to disbursal, every step was guided professionally. Highly recommended.',
  },
  {
    name: 'Sandeep Verma',
    quote:
      'Excellent advice on both home loan and investment planning. Great service and follow-up support.',
  },
];

export const faqs = [
  {
    question: 'What documents are needed for a home loan?',
    answer:
      'Usually identity proof, address proof, income proof, bank statements, and property papers are needed. The exact list depends on your profile and property type.',
  },
  {
    question: 'Can I transfer my existing loan to another bank?',
    answer:
      'Yes. Balance transfer is possible when a better ROI and terms are available from a different lender, subject to eligibility.',
  },
  {
    question: 'How is EMI calculated?',
    answer:
      'EMI is calculated using principal amount, monthly interest rate, and total tenure in months. Our calculator gives real-time output based on your values.',
  },
  {
    question: 'Do you guide on investment in real estate?',
    answer:
      'Yes. Smart investment guidance is available for clients looking for long-term real estate returns and better portfolio decisions.',
  },
];

export const contactDetails = {
  name: 'Manish Dutt',
  phone: '+91-8557996728',
  email: 'Manishhssht2@gmail.com',
};

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
