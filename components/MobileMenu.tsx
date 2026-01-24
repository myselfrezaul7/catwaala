
import React, { useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { CreativeCatPawIcon, XIcon } from './icons';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleLinkClick = useCallback((path: string) => {
    navigate(path);
    onClose();
  }, [navigate, onClose]);
  
  const handleLogout = useCallback(() => {
    logout();
    onClose();
    navigate('/');
  }, [logout, onClose, navigate]);

  const activeLinkClass = 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400';
  const inactiveLinkClass = 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';

  return (
    <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
        <div 
            className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl p-6 flex flex-col transition-transform duration-300 ease-in-out transform border-l border-white/20 dark:border-slate-700/50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                    <div className="bg-orange-500 text-white p-1.5 rounded-lg">
                        <CreativeCatPawIcon className="w-5 h-5" />
                    </div>
                    <span>CATWAALA</span>
                </div>
                 <button onClick={onClose} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={t('header.closeMenuAriaLabel')}>
                    <XIcon className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex flex-col space-y-2 text-lg font-medium">
                <NavLink to="/" onClick={onClose} className={({ isActive }) => `px-4 py-3 rounded-xl transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`}>{t('nav.home')}</NavLink>
                <NavLink to="/adopt" onClick={onClose} className={({ isActive }) => `px-4 py-3 rounded-xl transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`}>{t('nav.adopt')}</NavLink>
                <a href="https://www.facebook.com/groups/catwaala/" target="_blank" rel="noopener noreferrer" onClick={onClose} className={`px-4 py-3 rounded-xl transition-colors ${inactiveLinkClass}`}>{t('nav.community')}</a>
                <NavLink to="/report" onClick={onClose} className={({ isActive }) => `px-4 py-3 rounded-xl transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`}>{t('nav.report')}</NavLink>
                <NavLink to="/online-vet" onClick={onClose} className={({ isActive }) => `px-4 py-3 rounded-xl transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`}>{t('nav.findVet')}</NavLink>
                <NavLink to="/ai-vet" onClick={onClose} className={({ isActive }) => `px-4 py-3 rounded-xl transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`}>{t('nav.aiVet')}</NavLink>
            </nav>
            
            <div className="mt-auto">
                <div className="flex justify-center my-4">
                    <LanguageSwitcher />
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    {isAuthenticated && currentUser ? (
                        <div className="flex flex-col space-y-4">
                            <span className="font-semibold text-center text-slate-700 dark:text-slate-200">{t('header.greeting', { name: currentUser.name.split(' ')[0] })}</span>
                            <button onClick={handleLogout} className="w-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">{t('nav.logout')}</button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-3">
                            <button onClick={() => handleLinkClick('/login')} className="w-full font-semibold text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 py-3 px-5 rounded-xl transition-colors">{t('nav.login')}</button>
                            <button onClick={() => handleLinkClick('/signup')} className="w-full bg-orange-500 text-white font-bold py-3 px-5 rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all">{t('nav.signup')}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default MobileMenu;
