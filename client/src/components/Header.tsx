import { Link } from 'wouter';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from '@/lib/i18n';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import logoUrl from '@assets/Logo_1762619815448.jpeg';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-primary/20 ${
      scrolled 
        ? 'bg-white dark:bg-[#003D6F] shadow-md' 
        : 'bg-white dark:bg-[#003D6F] shadow-sm'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-all">
              <img src={logoUrl} alt="Altus Finance Group" className="h-10 sm:h-12 lg:h-16 w-auto flex-shrink-0" />
              <span className="text-base sm:text-lg lg:text-xl font-bold text-primary whitespace-nowrap hidden sm:block">
                Altus Finance Group
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link href="/" className="text-xs xl:text-sm font-medium transition-all px-2 xl:px-4 py-2 rounded-md hover:bg-primary hover:text-white whitespace-nowrap" data-testid="link-home">
              {t.nav.home}
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs xl:text-sm font-medium px-2 xl:px-4 whitespace-nowrap" data-testid="button-loans-menu">
                    {t.nav.loansMenu.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[350px] xl:w-[450px] gap-2 p-4">
                      {t.nav.loansMenu.items.map((item, index) => (
                        <li key={index}>
                          <NavigationMenuLink asChild>
                            <Link 
                              href={item.href} 
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover-elevate"
                              data-testid={`link-loan-${item.href.split('/').pop()}`}
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/how-it-works" className="text-xs xl:text-sm font-medium transition-all px-2 xl:px-4 py-2 rounded-md hover:bg-primary hover:text-white whitespace-nowrap" data-testid="link-how-it-works">
              {t.nav.howItWorks}
            </Link>
            <Link href="/resources" className="text-xs xl:text-sm font-medium transition-all px-2 xl:px-4 py-2 rounded-md hover:bg-primary hover:text-white whitespace-nowrap" data-testid="link-faq">
              {t.nav.faq}
            </Link>
            <Link href="/about" className="text-xs xl:text-sm font-medium transition-all px-2 xl:px-4 py-2 rounded-md hover:bg-primary hover:text-white whitespace-nowrap" data-testid="link-about">
              {t.nav.about}
            </Link>
            <Link href="/contact" className="text-xs xl:text-sm font-medium transition-all px-2 xl:px-4 py-2 rounded-md hover:bg-primary hover:text-white whitespace-nowrap" data-testid="link-contact">
              {t.nav.contact}
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-1 xl:gap-3 flex-shrink-0">
            <a 
              href={`tel:${t.nav.phone}`} 
              className="text-xs xl:text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap hidden xl:block"
              data-testid="link-phone"
            >
              {t.nav.phone}
            </a>
            <LanguageSwitcher scrolled={true} />
            <Link href="/login">
              <Button 
                variant="default" 
                className="text-xs xl:text-sm px-3 xl:px-4 whitespace-nowrap"
                data-testid="button-mon-espace"
              >
                {t.hero.cta2}
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md transition-colors hover:bg-accent flex-shrink-0"
            data-testid="button-mobile-menu"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-sm font-medium transition-all px-4 py-2 rounded-md hover:bg-primary hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-home-mobile"
              >
                {t.nav.home}
              </Link>
              
              <div className="px-4 py-2">
                <div className="text-sm font-semibold text-muted-foreground mb-2">{t.nav.loansMenu.label}</div>
                {t.nav.loansMenu.items.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="block text-sm transition-all px-3 py-2 rounded-md hover:bg-primary hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-loan-${item.href.split('/').pop()}-mobile`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/contact" 
                className="text-sm font-medium transition-all px-4 py-2 rounded-md hover:bg-primary hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-contact-mobile"
              >
                {t.nav.contact}
              </Link>
              
              <div className="flex items-center gap-2 pt-2 px-4">
                <LanguageSwitcher scrolled={true} />
              </div>
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mon-espace-mobile"
                className="px-4"
              >
                <Button className="w-full" variant="default">
                  {t.hero.cta2}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
