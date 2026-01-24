import { useState, useEffect, useRef, useCallback } from 'react';
import * as React from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { MenuIcon, CloseIcon, SearchIcon, ChevronDownIcon, UserIcon, GlobeIcon } from './icons';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import SearchModal from './SearchModal';
import { useLanguage } from '../contexts/LanguageContext';

interface MobileNavLinkProps {
  to: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const MobileNavLink = ({ to, children, onClose }: MobileNavLinkProps) => (
  <NavLink
    to={to}
    onClick={onClose}
    className={({ isActive }) => `block py-3 text-xl text-center transition-colors duration-300 ${isActive ? 'text-orange-600 font-bold' : 'text-slate-700 dark:text-slate-200 font-medium hover:text-orange-500'}`}
  >
    {children}
  </NavLink>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { currentUser, isAuthenticated, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const userDropdownRef = useRef<HTMLLIElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = useCallback(() => {
    logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  }, [logout, navigate]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Performance Optimization: Throttle scroll event
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLinkClass = 'text-orange-600 dark:text-orange-400 font-bold';
  const inactiveLinkClass = 'text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors duration-200';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out px-4 py-4`}
      >
        <div
          className={`container mx-auto px-6 h-16 sm:h-20 flex justify-between items-center rounded-2xl sm:rounded-[2rem] border border-white/30 dark:border-white/10 shadow-lg backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-none border-transparent bg-transparent backdrop-blur-none'}`}
        >
          <nav className="flex justify-between items-center w-full">
            <NavLink to="/" onClick={handleLogoClick} className="flex items-center group">
              <Logo className="h-8 sm:h-9 w-auto filter drop-shadow-sm" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <ul className="flex items-center space-x-6 text-sm tracking-wide">
                <li><NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.home')}</NavLink></li>
                <li><NavLink to="/adopt" className={({ isActive }) => (isActive || location.pathname.startsWith('/adopt') || location.pathname === '/quiz' ? activeLinkClass : inactiveLinkClass)}>{t('nav.adopt')}</NavLink></li>
                <li><NavLink to="/report" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.report')}</NavLink></li>
                <li><a href="https://www.facebook.com/catwaala/" target="_blank" rel="noopener noreferrer" className={inactiveLinkClass}>{t('nav.community')}</a></li>
                <li><NavLink to="/find-vet" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.findVet')}</NavLink></li>

                {/* More Dropdown */}
                <li className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`${inactiveLinkClass} flex items-center focus:outline-none`}
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                  >
                    {t('nav.more')} <ChevronDownIcon className={`w-3 h-3 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute right-0 mt-4 w-48 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700 rounded-2xl shadow-xl py-2 transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                    <NavLink to="/volunteer" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.volunteer')}</NavLink>
                    <NavLink to="/memorial" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.memorial')}</NavLink>
                  </div>
                </li>
              </ul>

              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600/50"></div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                  aria-label={t('buttons.search')}
                >
                  <SearchIcon className="w-5 h-5" />
                </button>

                <div className="relative" ref={langDropdownRef}>
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                    aria-label="Change language"
                  >
                    <GlobeIcon className="w-5 h-5" />
                  </button>
                  <div className={`absolute right-0 mt-4 w-32 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-2xl shadow-xl py-2 transition-all duration-200 origin-top-right ${isLangDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                    <button onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-orange-600 font-bold bg-orange-50 dark:bg-white/10' : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10'}`}>English</button>
                    <button onClick={() => { setLanguage('bn'); setIsLangDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'bn' ? 'text-orange-600 font-bold bg-orange-50 dark:bg-white/10' : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10'}`}>বাংলা</button>
                  </div>
                </div>

                <ThemeToggle />

                {isAuthenticated ? (
                  <li className="relative list-none ml-2" ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full bg-white/50 dark:bg-black/30 hover:bg-white/80 dark:hover:bg-black/50 transition-all border border-white/40 dark:border-white/10 shadow-sm"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 pr-1">{currentUser?.name.split(' ')[0]}</span>
                      <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute right-0 mt-4 w-48 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-2xl shadow-xl py-2 transition-all duration-200 origin-top-right ${isUserDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                      <Link to="/dashboard" onClick={() => setIsUserDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.dashboard')}</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.logout')}</button>
                    </div>
                  </li>
                ) : (
                  <NavLink to="/login" className="ml-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-2.5 px-6 rounded-xl text-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {t('nav.login')}
                  </NavLink>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-slate-800 dark:text-slate-200 p-3 rounded-full hover:bg-white/20 active:scale-95 transition-transform"
              >
                <SearchIcon className="w-6 h-6" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-slate-800 dark:text-slate-200 p-3 rounded-full hover:bg-white/20 active:scale-95 transition-transform"
                aria-label="Open menu"
              >
                <MenuIcon className="w-8 h-8" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Glass */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl"></div>
        <div className="relative container mx-auto px-4 sm:px-6 h-20 flex justify-between items-center border-b border-slate-200/30 dark:border-slate-700/30">
          <NavLink to="/" onClick={(e) => { handleLogoClick(e); setIsMenuOpen(false); }} className="flex items-center">
            <Logo className="h-8 w-auto" />
          </NavLink>
          <button onClick={() => setIsMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-orange-600 transition-colors p-2 bg-white/20 dark:bg-black/20 rounded-full">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="relative flex-grow flex flex-col justify-center items-center overflow-y-auto pb-20 px-6">
          <nav className="flex flex-col space-y-2 text-center w-full max-w-sm">
            {isAuthenticated && <MobileNavLink to="/dashboard" onClose={() => setIsMenuOpen(false)}>{t('nav.dashboard')}</MobileNavLink>}
            <MobileNavLink to="/" onClose={() => setIsMenuOpen(false)}>{t('nav.home')}</MobileNavLink>
            <MobileNavLink to="/adopt" onClose={() => setIsMenuOpen(false)}>{t('nav.adopt')}</MobileNavLink>
            <MobileNavLink to="/report" onClose={() => setIsMenuOpen(false)}>{t('nav.report')}</MobileNavLink>
            <a href="https://www.facebook.com/catwaala/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block py-3 text-xl text-center transition-colors duration-300 text-slate-700 dark:text-slate-200 font-medium hover:text-orange-500">{t('nav.community')}</a>
            <MobileNavLink to="/find-vet" onClose={() => setIsMenuOpen(false)}>{t('nav.findVet')}</MobileNavLink>

            <MobileNavLink to="/volunteer" onClose={() => setIsMenuOpen(false)}>{t('nav.volunteer')}</MobileNavLink>
            <MobileNavLink to="/memorial" onClose={() => setIsMenuOpen(false)}>{t('nav.memorial')}</MobileNavLink>

            <div className="mt-8 flex justify-center gap-4 bg-white/30 dark:bg-black/30 p-1.5 rounded-full mx-auto w-fit backdrop-blur-md">
              <button onClick={() => { setLanguage('en'); }} className={`px-6 py-2 rounded-full transition-all text-sm font-bold ${language === 'en' ? 'bg-white shadow-md text-slate-900' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'}`}>EN</button>
              <button onClick={() => { setLanguage('bn'); }} className={`px-6 py-2 rounded-full transition-all text-sm font-bold ${language === 'bn' ? 'bg-white shadow-md text-slate-900' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'}`}>BN</button>
            </div>

            <div className="mt-10 w-full">
              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/20 text-slate-900 dark:text-white font-bold py-4 rounded-2xl text-lg hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
                >
                  {t('nav.logout')}
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {t('nav.login')}
                </NavLink>
              )}
            </div>
          </nav>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;