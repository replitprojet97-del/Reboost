export const seoConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5000',
  siteName: 'Altus Finance Group',
  defaultTitle: 'Altus Finance Group - Solutions de Prêt Professionnel | Financement pour Entreprises',
  defaultDescription: 'Altus Finance Group offre des solutions de prêt professionnel adaptées à votre entreprise. Accédez rapidement à des fonds avec des taux compétitifs et un processus de validation transparent.',
  defaultKeywords: 'prêt professionnel, financement entreprise, crédit professionnel, prêt rapide, taux compétitif, financement TPE PME, crédit business, solution de financement, prêt personnel, crédit auto, crédit immobilier, prêt étudiant, crédit consommation, prêt travaux, crédit renouvelable, prêt sans justificatif, loan, business loan, personal loan, car loan, student loan, financing, credit, mortgage, professional financing, enterprise funding',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@altusfinancegroup',
  themeColor: '#0066cc',
  locale: 'fr_FR',
  alternateLangs: ['en', 'es', 'pt', 'it', 'de'],
  organization: {
    name: 'Altus Finance Group',
    logo: '/logo.png',
    telephone: '+33-1-XX-XX-XX-XX',
    address: {
      streetAddress: '123 Avenue des Champs-Élysées',
      addressLocality: 'Paris',
      postalCode: '75008',
      addressCountry: 'FR'
    },
    geo: {
      latitude: 48.8566,
      longitude: 2.3522
    },
    sameAs: [
      'https://www.facebook.com/altusfinancegroup',
      'https://www.linkedin.com/company/altusfinancegroup',
      'https://twitter.com/altusfinancegroup'
    ]
  }
} as const;
