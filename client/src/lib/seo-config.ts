export const seoConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5000',
  siteName: 'SolventisGroup',
  defaultTitle: 'SolventisGroup - Solutions de Financement | Crédits Professionnels et Particuliers',
  defaultDescription: 'SolventisGroup propose des solutions de crédit adaptées à vos projets personnels et professionnels. Accédez rapidement à des fonds avec des taux avantageux et un processus de validation transparent.',
  defaultKeywords: 'crédit professionnel, financement entreprise, prêt personnel, emprunt rapide, taux avantageux, financement PME, crédit société, solution de financement, prêt particulier, crédit auto, prêt immobilier, crédit étudiant, crédit consommation, prêt travaux, crédit renouvelable, prêt sans justificatif, financement pro',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@solventisgroup',
  themeColor: '#0066cc',
  locale: 'en_US',
  alternateLangs: ['fr', 'es', 'pt', 'it', 'de'],
  organization: {
    name: 'SolventisGroup',
    logo: '/logo.png',
    telephone: '+353-431-5918',
    address: {
      streetAddress: '1 Pakenhamhall Rd, Townparks',
      addressLocality: 'Castlepollard',
      postalCode: 'N91 X6Y0',
      addressCountry: 'IE'
    },
    geo: {
      latitude: 49.6117,
      longitude: 6.1319
    },
    sameAs: [
      'https://www.facebook.com/solventisgroup',
      'https://www.linkedin.com/company/solventisgroup',
      'https://twitter.com/solventisgroup'
    ]
  }
} as const;
