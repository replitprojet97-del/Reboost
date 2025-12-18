import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useTranslations, useLanguage, type Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Francais', flag: 'FR' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'es', name: 'Espanol', flag: 'ES' },
  { code: 'nl', name: 'Nederlands', flag: 'NL' },
  { code: 'it', name: 'Italiano', flag: 'IT' },
  { code: 'pt', name: 'Portugues', flag: 'PT' },
];

export default function HeaderPremium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const { language, setLanguage } = useLanguage();
  const [, setLocation] = useLocation();

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const navLinks = [
    { href: '/products', label: t.nav.products },
    { href: '/how-it-works', label: t.nav.howItWorks },
    { href: '/resources', label: t.nav.faq },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-white dark:bg-background'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group" data-testid="link-logo">
                <span className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
                  Solventis
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); setLocation(link.href); }}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
                  data-testid={`link-${link.href.slice(1)}-desktop`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
                  data-testid="button-language-selector"
                >
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.flag}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-44 bg-white dark:bg-card rounded-xl shadow-lg border border-border py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
                          language === lang.code
                            ? 'bg-muted font-medium text-foreground'
                            : 'text-foreground/70 hover:bg-muted/50 hover:text-foreground'
                        }`}
                        data-testid={`button-language-${lang.code}`}
                      >
                        <span className="font-medium">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
                <Button 
                  variant="ghost"
                  className="text-sm font-medium"
                  data-testid="button-login-desktop"
                >
                  {isAuthenticated ? t.nav.dashboard : t.auth.login}
                </Button>
              </Link>

              <Link href={isAuthenticated ? "/dashboard" : "/auth?signup"}>
                <Button 
                  className="px-6 text-sm font-semibold rounded-full"
                  data-testid="button-cta-desktop"
                >
                  {isAuthenticated ? t.nav.dashboard : t.hero.cta2}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-foreground"
              data-testid="button-mobile-menu"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[99998] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div className="fixed inset-y-0 right-0 w-full max-w-sm z-[99999] bg-white dark:bg-background shadow-xl lg:hidden animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="text-lg font-bold text-foreground">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-foreground/60 hover:text-foreground"
                  data-testid="button-close-menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-1">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <div className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors" data-testid="link-home-mobile">
                      {t.nav.home}
                    </div>
                  </Link>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors" data-testid={`link-${link.href.slice(1)}-mobile`}>
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Mobile Language Selector */}
                <div className="mt-8 px-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {t.nav.language}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          language === lang.code
                            ? 'bg-foreground text-background'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                        data-testid={`button-mobile-language-${lang.code}`}
                      >
                        {lang.flag}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Mobile CTA */}
              <div className="px-6 py-6 border-t border-border space-y-3">
                <Link href={isAuthenticated ? "/dashboard" : "/auth"} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full" data-testid="button-login-mobile">
                    {isAuthenticated ? t.nav.dashboard : t.auth.login}
                  </Button>
                </Link>
                <Link href={isAuthenticated ? "/dashboard" : "/auth?signup"} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full" data-testid="button-cta-mobile">
                    {isAuthenticated ? t.nav.dashboard : t.hero.cta2}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
