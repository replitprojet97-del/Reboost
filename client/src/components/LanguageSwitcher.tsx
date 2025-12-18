import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, type Language } from '@/lib/i18n';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
];

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

export default function LanguageSwitcher({ scrolled = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((l) => l.code === language);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="language-switcher-container"
    >
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 hover-elevate active-elevate-2"
        data-testid="button-language-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl leading-none">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLang?.name}</span>
        <ChevronDown 
          className="h-3.5 w-3.5 opacity-50 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </Button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50 py-1 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          data-testid="language-dropdown"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full px-4 py-2 text-left hover:bg-accent/10 transition-colors flex items-center gap-3 ${
                language === lang.code ? 'bg-accent/5' : ''
              }`}
              data-testid={`button-language-${lang.code}`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
