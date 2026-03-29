const axios = require('axios');
const { validationResult } = require('express-validator');

const FAQ_CONTEXT = [
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
      'EMI is calculated using principal amount, monthly interest rate, and total tenure in months.',
  },
  {
    question: 'Do you guide on investment in real estate?',
    answer:
      'Yes. Smart investment guidance is available for clients looking for long-term real estate returns and better portfolio decisions.',
  },
];

const CONTACT_CONTEXT = {
  name: 'Manish Dutt',
  phone: '+91-8557996728',
  email: 'Manishhssht2@gmail.com',
};

const formatDetectedAmount = (rawAmount, unit) => {
  const numeric = Number(rawAmount);

  if (!Number.isFinite(numeric) || numeric <= 0) {
    return null;
  }

  const normalizedUnit = unit.toLowerCase();

  if (['cr', 'crore', 'crores'].includes(normalizedUnit)) {
    return `${numeric} crore`;
  }

  if (['lac', 'lakh', 'lakhs'].includes(normalizedUnit)) {
    return `${numeric} lakh`;
  }

  if (normalizedUnit === 'k') {
    return `${numeric} thousand`;
  }

  return null;
};

const buildLoanIntentReply = (message) => {
  const normalized = message.toLowerCase();
  const hasLoanIntent = /(loan|home loan|housing loan|lap|loan against property)/i.test(normalized);
  const amountMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(cr|crore|crores|lac|lakh|lakhs|k)\b/i);

  if (!hasLoanIntent || !amountMatch) {
    return null;
  }

  const formattedAmount = formatDetectedAmount(amountMatch[1], amountMatch[2]) || amountMatch[0];

  return [
    `Great. You are looking for a loan around ${formattedAmount}.`,
    '',
    'To give the best lender match and ROI, please share:',
    '- Monthly income and job type (salaried or self-employed)',
    '- Existing EMIs (if any)',
    '- Preferred tenure (for example 15/20/25 years)',
    '- Property value and city',
    '',
    'Basic documents usually needed:',
    '- Identity proof and address proof',
    '- Income proof and bank statements',
    '- Property papers',
    '',
    `Call/WhatsApp ${CONTACT_CONTEXT.phone} for a quick eligibility check and EMI estimate.`,
  ].join('\n');
};

const buildPrompt = (userMessage, history = []) => {
  const faqText = FAQ_CONTEXT.map(
    (item, index) => `${index + 1}. Q: ${item.question}\n   A: ${item.answer}`,
  ).join('\n');

  const historyText = history.length
    ? history.map((item) => `${item.role === 'user' ? 'User' : 'Assistant'}: ${item.text}`).join('\n')
    : 'No previous context.';

  return [
    'You are a support assistant for Manish Dutt Loan Services in India.',
    'Keep responses concise, practical, friendly, and easy to read.',
    'Prefer short bullet points when suggesting next steps.',
    'If user expresses a target loan amount, acknowledge the amount and ask for income, existing EMI, tenure, and property details in a structured way.',
    'If user asks for rates/eligibility, mention these are indicative and depend on profile and lender checks.',
    'Only answer about loans, EMI, balance transfer, loan against property, documentation, and real-estate investment guidance.',
    'If the question is outside this domain, politely ask user to contact support.',
    `Support contact: ${CONTACT_CONTEXT.name}, Phone: ${CONTACT_CONTEXT.phone}, Email: ${CONTACT_CONTEXT.email}`,
    'Use this FAQ context when relevant:',
    faqText,
    'Recent conversation context:',
    historyText,
    `User question: ${userMessage}`,
  ].join('\n\n');
};

const getChatReply = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array(),
      });
    }

    const { message, history = [] } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const loanIntentReply = buildLoanIntentReply(message);

    if (loanIntentReply) {
      return res.status(200).json({
        success: true,
        data: { reply: loanIntentReply },
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter((item) => item && (item.role === 'user' || item.role === 'bot') && typeof item.text === 'string')
          .slice(-8)
          .map((item) => ({ role: item.role, text: item.text.slice(0, 400) }))
      : [];

    const prompt = buildPrompt(message, safeHistory);

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        timeout: 12000,
      },
    );

    const rawReply =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Please contact support for a detailed answer based on your profile.';

    const reply = rawReply.slice(0, 1600);

    return res.status(200).json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getChatReply,
};
