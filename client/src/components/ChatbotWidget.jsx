import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaComments, FaPaperPlane, FaRotateLeft, FaXmark } from 'react-icons/fa6';
import { api } from '../utils/api';
import { faqs } from '../utils/content';

const fallbackReply = 'Thanks for your question. Please use the Contact section or call us for detailed help with your exact loan profile.';

const normalizeText = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value) => normalizeText(value).split(' ').filter((token) => token.length > 2);

function findBestFaqReply(query) {
  const queryTokens = tokenize(query);

  if (!queryTokens.length) {
    return null;
  }

  const matches = faqs
    .map((item) => {
      const questionTokens = tokenize(item.question);
      const score = queryTokens.reduce(
        (total, token) => (questionTokens.includes(token) ? total + 1 : total),
        0,
      );

      const overlapRatio = questionTokens.length ? score / questionTokens.length : 0;

      return { item, score, overlapRatio };
    })
    .sort((a, b) => b.score - a.score || b.overlapRatio - a.overlapRatio);

  const bestMatch = matches[0];

  if (!bestMatch) {
    return null;
  }

  // Avoid accidental FAQ hits for open-ended queries like "I want loan 1 cr".
  // Require stronger semantic overlap before using canned FAQ reply.
  const hasStrongMatch = bestMatch.score >= 2 || bestMatch.overlapRatio >= 0.6;

  return hasStrongMatch ? bestMatch.item.answer : null;
}

function ChatbotWidget() {
  const initialBotMessage = {
    role: 'bot',
    text: 'Hi, I am your loan assistant. Ask me a FAQ or tap a quick question below for instant replies.',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([initialBotMessage]);
  const messagesEndRef = useRef(null);

  const quickQuestions = useMemo(() => faqs.slice(0, 4), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages, isSending]);

  const getConversationHistory = () =>
    messages
      .filter((message) => message.role === 'user' || message.role === 'bot')
      .slice(-8)
      .map((message) => ({ role: message.role, text: message.text }));

  const addBotReplyForQuery = async (queryText) => {
    const matchedReply = findBestFaqReply(queryText);

    setMessages((prev) => [...prev, { role: 'user', text: queryText }]);

    if (matchedReply) {
      setMessages((prev) => [...prev, { role: 'bot', text: matchedReply }]);
      return;
    }

    try {
      setIsSending(true);
      const response = await api.post('/api/chat', {
        message: queryText,
        history: getConversationHistory(),
      });
      const reply = response.data?.data?.reply || fallbackReply;
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (_error) {
      setMessages((prev) => [...prev, { role: 'bot', text: fallbackReply }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = input.trim();

    if (!trimmed || isSending) {
      return;
    }

    await addBotReplyForQuery(trimmed);
    setInput('');
  };

  const handleQuickQuestion = async (question) => {
    if (isSending) {
      return;
    }

    await addBotReplyForQuery(question);
  };

  const handleResetChat = () => {
    if (isSending) {
      return;
    }

    setMessages([initialBotMessage]);
    setInput('');
  };

  return (
    <div className="fixed bottom-24 right-4 z-[80] md:bottom-6 md:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-(--border-color) bg-(--surface-elevated) shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between border-b border-(--border-color) px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-(--heading-color)">Loan FAQ Assistant</p>
                <p className="text-xs text-(--text-muted)">Instant replies for common questions</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border-color) text-(--heading-color) transition hover:border-(--brand) hover:text-(--brand)"
                  aria-label="Reset chat"
                >
                  <FaRotateLeft />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border-color) text-(--heading-color) transition hover:border-(--brand) hover:text-(--brand)"
                  aria-label="Close chat"
                >
                  <FaXmark />
                </button>
              </div>
            </div>

            <div className="max-h-80 space-y-2 overflow-y-auto px-3 py-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    message.role === 'user'
                      ? 'ml-auto bg-(--brand) text-white'
                      : 'mr-auto border border-(--border-color) bg-(--surface) text-(--heading-color)'
                  }`}
                >
                  {message.text}
                </div>
              ))}
              {isSending ? (
                <div className="mr-auto inline-flex items-center gap-2 rounded-2xl border border-(--border-color) bg-(--surface) px-3 py-2 text-xs text-(--text-muted)">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--brand)" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--brand) [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--brand) [animation-delay:240ms]" />
                  Thinking...
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-(--border-color) px-3 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {quickQuestions.map((item) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => handleQuickQuestion(item.question)}
                    className="rounded-full border border-(--border-color) px-3 py-1 text-xs text-(--heading-color) transition hover:border-(--brand) hover:text-(--brand)"
                  >
                    {item.question}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask a question..."
                  disabled={isSending}
                  className="w-full rounded-full border border-(--border-color) bg-(--surface) px-4 py-2 text-sm text-(--heading-color) outline-none transition focus:border-(--brand)"
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--brand) text-white transition hover:bg-(--brand-strong)"
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-(--brand) text-white shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)]"
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        <FaComments />
      </motion.button>
    </div>
  );
}

export default ChatbotWidget;
