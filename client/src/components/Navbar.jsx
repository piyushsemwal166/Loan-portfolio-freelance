import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBars, FaMoon, FaSun, FaXmark } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems } from '../utils/content';
import { useTheme } from '../hooks/useTheme';

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [activeHash, setActiveHash] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      return undefined;
    }

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 120) {
          setActiveHash('#home');
          return;
        }

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length) {
          setActiveHash(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        root: null,
        rootMargin: '-90px 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const onScrollTopCheck = () => {
      if (window.scrollY < 120) {
        setActiveHash('#home');
      }
    };

    window.addEventListener('scroll', onScrollTopCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollTopCheck);
    };
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage || !location.hash) {
      return;
    }

    const target = document.querySelector(location.hash);

    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveHash(location.hash);
  }, [isHomePage, location.hash]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const handleNavClick = (event, href) => {
    event.preventDefault();

    if (!isHomePage) {
      navigate(`/${href}`);
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveHash(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-(--border-color) bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-lg"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, '#home')}
          className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-(--heading-color) md:text-base"
        >
          Manish Dutt Loan Services
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {isHomePage
            ? navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`text-sm font-medium transition ${
                    activeHash === item.href
                      ? 'font-semibold text-(--brand)'
                      : 'text-(--text-muted) hover:text-(--heading-color)'
                  }`}
                >
                  <span className="relative inline-block pb-1">
                    {item.label}
                    {activeHash === item.href ? (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-(--brand)"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                  </span>
                </a>
              ))
            : (
                <>
                  <Link to="/" className="text-sm font-medium text-(--text-muted) transition hover:text-(--heading-color)">
                    Home
                  </Link>
                  <Link
                      to="/why-clients-trust-us"
                    className="relative inline-block pb-1 text-sm font-semibold text-(--brand)"
                  >
                      Why Clients Trust Us
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-(--brand)" />
                  </Link>
                </>
              )}

          {isHomePage ? (
            <Link
              to="/why-clients-trust-us"
              className="rounded-full border border-(--border-color) px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-(--heading-color) transition hover:border-(--brand) hover:text-(--brand)"
            >
              Why Clients Trust Us
            </Link>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-(--border-color) px-3 py-2 text-xs font-medium text-(--heading-color) transition hover:border-(--brand) hover:text-(--brand)"
            aria-label="Toggle light and dark mode"
          >
            {isDark ? <FaSun /> : <FaMoon />}
            {isDark ? 'Light' : 'Dark'}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--border-color) text-(--heading-color) transition hover:border-(--brand) hover:text-(--brand) md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="border-t border-(--border-color) bg-(--surface) px-4 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {isHomePage
              ? navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      activeHash === item.href
                        ? 'bg-[color-mix(in_srgb,var(--brand)_18%,transparent)] text-(--brand)'
                        : 'text-(--text-muted) hover:bg-(--surface-elevated) hover:text-(--heading-color)'
                    }`}
                  >
                    {item.label}
                  </a>
                ))
              : (
                  <Link
                    to="/"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-(--text-muted) transition hover:bg-(--surface-elevated) hover:text-(--heading-color)"
                  >
                    Home
                  </Link>
                )}

            <Link
              to="/why-clients-trust-us"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-(--heading-color) transition hover:bg-(--surface-elevated) hover:text-(--brand)"
            >
              Why Clients Trust Us
            </Link>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}

export default Navbar;

