import * as React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, YouTubeIcon, TikTokIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      href: "https://www.facebook.com/catwaala/",
      label: "Facebook",
      Icon: FacebookIcon,
      // Default: Brand color text. Hover: Brand bg, White text, Blue Glow
      className: "text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]"
    },
    {
      href: "https://www.instagram.com/cat_waala/",
      label: "Instagram",
      Icon: InstagramIcon,
      // Default: Pink text. Hover: Gradient bg, White text, Pink Glow
      className: "text-[#E1306C] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:shadow-[0_0_20px_rgba(225,48,108,0.6)]"
    },
    {
      href: "https://youtube.com/@catwaala",
      label: "YouTube",
      Icon: YouTubeIcon,
      // Default: Red text. Hover: Red bg, White text, Red Glow
      className: "text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
    },
    {
      href: "https://www.tiktok.com/@catwaala",
      label: "TikTok",
      Icon: TikTokIcon,
      // Default: Black/White text. Hover: Inverted bg, Inverted text, Glow
      className: "text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
    },
  ];

  return (
    <footer className="mt-auto pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-xl">
          <div className="text-center">
            <p className="text-2xl italic text-slate-600 dark:text-slate-300 mb-8 font-light font-serif">
              {t('footer.tagline')}
            </p>
            <div className="flex justify-center items-center space-x-4 sm:space-x-6 mb-8">
              {socialLinks.map(({ href, label, Icon, className }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-3.5 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 shadow-sm ${className}`}
                >
                  <Icon className="w-6 h-6 fill-current" />
                </a>
              ))}
            </div>
            <nav className="flex justify-center flex-wrap gap-x-8 gap-y-3 mb-8 text-sm uppercase tracking-wide font-bold text-slate-700 dark:text-slate-300">
              <Link to="/adopt" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('nav.adopt')}</Link>
              <Link to="/volunteer" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('nav.volunteer')}</Link>
              <Link to="/memorial" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('nav.memorial')}</Link>
              <Link to="/faq" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">FAQ</Link>
              <a href="mailto:catwaala@gmail.com" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('footer.contact')}</a>
            </nav>
            <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent my-8"></div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              {t('footer.inquiries')} <a href="mailto:catwaala@gmail.com" className="font-semibold text-slate-800 dark:text-slate-200 hover:underline">catwaala@gmail.com</a>
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);