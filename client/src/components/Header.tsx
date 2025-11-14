import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useTranslations, useLanguage, type Language } from '@/lib/i18n';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'de', name: 'DE', flag: '🇩🇪' },
  { code: 'es', name: 'ES', flag: '🇪🇸' },
  { code: 'nl', name: 'NL', flag: '🇳🇱' },
  { code: 'it', name: 'IT', flag: '🇮🇹' },
  { code: 'pt', name: 'PT', flag: '🇵🇹' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[72px] z-[9999] bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity duration-300">
              <img src="/logo.png" alt="ALTUS" className="h-10" />
              <span className="font-semibold text-lg text-gray-900 hidden lg:block">
                Altus Finance Group
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/">
              <span className="text-sm font-medium text-gray-700 hover:text-[#005DFF] transition-colors duration-300 cursor-pointer" data-testid="link-home-desktop">
                {t.nav.home}
              </span>
            </Link>

            <Link href="/products">
              <span className="text-sm font-medium text-gray-700 hover:text-[#005DFF] transition-colors duration-300 cursor-pointer" data-testid="link-loans-desktop">
                Nos Prêts
              </span>
            </Link>

            <Link href="/how-it-works">
              <span className="text-sm font-medium text-gray-700 hover:text-[#005DFF] transition-colors duration-300 cursor-pointer" data-testid="link-how-it-works-desktop">
                {t.nav.howItWorks}
              </span>
            </Link>

            <Link href="/contact">
              <span className="text-sm font-medium text-gray-700 hover:text-[#005DFF] transition-colors duration-300 cursor-pointer" data-testid="link-contact-desktop">
                {t.nav.contact}
              </span>
            </Link>

            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#005DFF] transition-colors duration-300"
                data-testid="button-more-menu"
              >
                Plus
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Link href="/resources">
                    <span
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] transition-colors cursor-pointer"
                      data-testid="link-faq-dropdown"
                    >
                      FAQ
                    </span>
                  </Link>
                  <Link href="/about">
                    <span
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] transition-colors cursor-pointer"
                      data-testid="link-about-dropdown"
                    >
                      À propos
                    </span>
                  </Link>
                  <Link href="/terms">
                    <span
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] transition-colors cursor-pointer"
                      data-testid="link-terms-dropdown"
                    >
                      Mentions légales
                    </span>
                  </Link>
                  <Link href="/privacy">
                    <span
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] transition-colors cursor-pointer"
                      data-testid="link-privacy-dropdown"
                    >
                      Politique de confidentialité
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                data-testid="button-language-selector"
              >
                <Globe className="w-4 h-4" />
                <span className="text-lg">{currentLang.flag}</span>
                <span>{currentLang.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                        language === lang.code
                          ? 'bg-[#005DFF] text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      data-testid={`button-language-${lang.code}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/login">
              <button
                className="px-6 py-2.5 bg-[#005DFF] hover:bg-[#0044FF] text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                data-testid="button-mon-espace-desktop"
              >
                {t.hero.cta2}
              </button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-gray-800 hover:text-[#005DFF] transition-colors"
            data-testid="button-mobile-menu"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99998] animate-in fade-in duration-300 lg:hidden"
            onClick={closeMobileMenu}
          />
          
          <div className="fixed top-0 right-0 h-full w-full max-w-[350px] bg-white z-[99999] shadow-2xl animate-in slide-in-from-right duration-300 ease-out lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="font-semibold text-lg text-gray-900">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-[#005DFF] transition-colors"
                  data-testid="button-close-menu"
                  aria-label="Fermer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6">
                <nav className="space-y-1">
                  <Link href="/" onClick={closeMobileMenu}>
                    <span className="block px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-home-mobile">
                      {t.nav.home}
                    </span>
                  </Link>

                  <Link href="/products" onClick={closeMobileMenu}>
                    <span className="block px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-loans-mobile">
                      Nos Prêts
                    </span>
                  </Link>

                  <Link href="/how-it-works" onClick={closeMobileMenu}>
                    <span className="block px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-how-it-works-mobile">
                      {t.nav.howItWorks}
                    </span>
                  </Link>

                  <Link href="/contact" onClick={closeMobileMenu}>
                    <span className="block px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-contact-mobile">
                      {t.nav.contact}
                    </span>
                  </Link>

                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Plus d'informations
                    </div>
                    
                    <Link href="/resources" onClick={closeMobileMenu}>
                      <span className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-faq-mobile">
                        FAQ
                      </span>
                    </Link>

                    <Link href="/about" onClick={closeMobileMenu}>
                      <span className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-about-mobile">
                        À propos
                      </span>
                    </Link>

                    <Link href="/terms" onClick={closeMobileMenu}>
                      <span className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-terms-mobile">
                        Mentions légales
                      </span>
                    </Link>

                    <Link href="/privacy" onClick={closeMobileMenu}>
                      <span className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#005DFF] rounded-lg transition-colors cursor-pointer" data-testid="link-privacy-mobile">
                        Politique de confidentialité
                      </span>
                    </Link>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Langue
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            language === lang.code
                              ? 'bg-[#005DFF] text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                          data-testid={`button-language-${lang.code}-mobile`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>

              <div className="p-6 border-t border-gray-100">
                <Link href="/login" onClick={closeMobileMenu}>
                  <button className="w-full px-6 py-3.5 bg-[#005DFF] hover:bg-[#0044FF] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-mon-espace-mobile">
                    {t.hero.cta2}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
