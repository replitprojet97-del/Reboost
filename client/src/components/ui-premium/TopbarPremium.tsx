import React from "react";
import ButtonPremium from "./ButtonPremium";

type Props = {
  onMenuClick?: () => void;
  rightNode?: React.ReactNode;
};

export default function TopbarPremium({ onMenuClick, rightNode }: Props) {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between py-3 px-4 md:px-6">

        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button 
              onClick={onMenuClick} 
              className="p-2 rounded-md hover:bg-gray-100 md:hidden"
              data-testid="button-menu-toggle"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="#0f172a" strokeWidth="1.6"/></svg>
            </button>
          )}

          <div className="flex items-center gap-3">
            <img src="/logo-altus.svg" className="h-8" alt="Altus Finance Group" data-testid="img-logo" />
            <span className="font-semibold text-lg text-altus-ink hidden md:inline" data-testid="text-brand-name">
              Altus Finance Group
            </span>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-altus-muted">
          <a href="/" className="hover:text-altus-royal" data-testid="link-home">Accueil</a>
          <a href="/products" className="hover:text-altus-royal" data-testid="link-products">Nos Prêts</a>
          <a href="/how" className="hover:text-altus-royal" data-testid="link-how">Fonctionnement</a>
          <a href="/faq" className="hover:text-altus-royal" data-testid="link-faq">FAQ</a>
        </nav>

        <div>
          {rightNode ?? <ButtonPremium size="sm" data-testid="button-my-space">Mon espace</ButtonPremium>}
        </div>

      </div>
    </header>
  );
}
