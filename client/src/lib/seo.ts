export type Language = 'fr' | 'en' | 'es' | 'pt' | 'it' | 'de' | 'nl';

export const SEO_CONTENT: Record<Language, { title: string; description: string }> = {
  fr: {
    title: 'Solventis Group – Financement en ligne rapide pour particuliers et entreprises',
    description: 'Solventis Group propose des solutions de financement entièrement en ligne pour particuliers et entreprises. Demande simplifiée en quelques minutes, réponse rapide et mise à disposition des fonds dans des délais optimisés.'
  },
  en: {
    title: 'Solventis Group – Fast online financing for individuals and businesses',
    description: 'Solventis Group provides fully online financing solutions for individuals and businesses. Simple application process, fast response and quick access to funds.'
  },
  es: {
    title: 'Solventis Group – Financiación online rápida para particulares y empresas',
    description: 'Solventis Group ofrece soluciones de financiación 100 % online para particulares y empresas. Solicitud sencilla, respuesta rápida y acceso ágil a los fondos.'
  },
  pt: {
    title: 'Solventis Group – Financiamento online rápido para particulares e empresas',
    description: 'A Solventis Group disponibiliza soluções de financiamento totalmente online para particulares e empresas, com pedido simplificado, resposta rápida e liberação eficiente dos fundos.'
  },
  it: {
    title: 'Solventis Group – Finanziamenti online rapidi per privati e imprese',
    description: 'Solventis Group offre soluzioni di finanziamento completamente online per privati e imprese, con richiesta semplificata, risposta rapida e rapida erogazione dei fondi.'
  },
  de: {
    title: 'Solventis Group – Schnelle Online-Finanzierung für Privat- und Geschäftskunden',
    description: 'Solventis Group bietet vollständig digitale Finanzierungslösungen für Privatpersonen und Unternehmen mit einfacher Antragstellung, schneller Entscheidung und zügiger Auszahlung.'
  },
  nl: {
    title: 'Solventis Group – Snelle online financiering voor particulieren en bedrijven',
    description: 'Solventis Group biedt volledig online financieringsoplossingen voor particulieren en bedrijven, met een eenvoudig aanvraagproces, snelle beslissing en vlotte uitbetaling.'
  }
};

export const LANGUAGE_CODES: Record<Language, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-PT',
  it: 'it-IT',
  de: 'de-DE',
  nl: 'nl-NL'
};

export const LANGUAGES: Language[] = ['fr', 'en', 'es', 'pt', 'it', 'de', 'nl'];

export function getLanguageFromUrl(): Language {
  if (typeof window === 'undefined') return 'en';
  const pathname = window.location.pathname;
  const lang = pathname.split('/')[1];
  return LANGUAGES.includes(lang as Language) ? (lang as Language) : 'en';
}

export function getLanguageFromNavigator(): Language {
  if (typeof navigator === 'undefined') return 'en';
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  return LANGUAGES.includes(browserLang as Language) ? (browserLang as Language) : 'en';
}

export function getLanguageFromIP(): Language {
  const lang = (window as any).__LANGUAGE_FROM_IP || getLanguageFromNavigator();
  return LANGUAGES.includes(lang as Language) ? (lang as Language) : 'en';
}

export function detectLanguage(): Language {
  return getLanguageFromIP();
}

export function getSEOContent(language: Language = 'en') {
  return SEO_CONTENT[language] || SEO_CONTENT.en;
}

export function getHrefLang(language: Language): string {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://solventisgroup.org';
  return `${baseUrl}`;
}
