import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'fr' | 'en' | 'es';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
);

type TranslationKeys = {
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    trustIndicator: string;
  };
  nav: {
    home: string;
    products: string;
    howItWorks: string;
    resources: string;
    about: string;
    contact: string;
    dashboard: string;
    loans: string;
    transfers: string;
    history: string;
    settings: string;
    logout: string;
  };
  dashboard: {
    welcome: string;
    currentBalance: string;
    activeLoans: string;
    totalBorrowed: string;
    availableCredit: string;
    lastUpdated: string;
    borrowingCapacity: string;
    canBorrowUpTo: string;
    quickActions: string;
    newLoan: string;
    transferFunds: string;
    transactionHistory: string;
    fees: string;
    pendingTransfers: string;
    availableFunds: string;
    upcomingRepayments: string;
  };
  loan: {
    amount: string;
    interestRate: string;
    nextPayment: string;
    viewAll: string;
  };
  transfer: {
    requestSubmitted: string;
    documentVerification: string;
    complianceCheck: string;
    approvalPending: string;
    transferComplete: string;
    pending: string;
    inProgress: string;
    approved: string;
    rejected: string;
  };
  fee: {
    type: string;
    reason: string;
    amount: string;
    date: string;
    downloadStatement: string;
    loanFees: string;
    transferFees: string;
    accountFees: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
  };
  about: {
    title: string;
    subtitle: string;
    mission: string;
    missionText: string;
    stats: {
      clients: string;
      loansProvided: string;
      successRate: string;
      yearsExperience: string;
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  products: {
    title: string;
    subtitle: string;
    termLoans: string;
    termLoansDesc: string;
    lineOfCredit: string;
    lineOfCreditDesc: string;
    equipmentFinancing: string;
    equipmentFinancingDesc: string;
    invoiceFactoring: string;
    invoiceFactoringDesc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
  resources: {
    title: string;
    subtitle: string;
    faqTitle: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
  legal: {
    termsTitle: string;
    privacyTitle: string;
    lastUpdated: string;
    terms: {
      section1Title: string;
      section1Content: string;
      section2Title: string;
      section2Content: string;
      section3Title: string;
      section3Content: string;
      section4Title: string;
      section4Content: string;
      section5Title: string;
      section5Content: string;
      section6Title: string;
      section6Content: string;
    };
    privacy: {
      section1Title: string;
      section1Content: string;
      section2Title: string;
      section2Content: string;
      section2List: string[];
      section3Title: string;
      section3Content: string;
      section3List: string[];
      section4Title: string;
      section4Content: string;
      section5Title: string;
      section5Content: string;
      section6Title: string;
      section6Content: string;
      section7Title: string;
      section7Content: string;
    };
  };
  individualLoans: {
    title: string;
    subtitle: string;
    personalLoan: string;
    personalLoanDesc: string;
    mortgageLoan: string;
    mortgageLoanDesc: string;
    autoLoan: string;
    autoLoanDesc: string;
    studentLoan: string;
    studentLoanDesc: string;
    greenLoan: string;
    greenLoanDesc: string;
    renovationLoan: string;
    renovationLoanDesc: string;
    amount: string;
    rate: string;
    duration: string;
    rateDisclaimer: string;
    compareLoans: string;
  };
  features: {
    title: string;
    subtitle: string;
    security: string;
    securityDesc: string;
    fast: string;
    fastDesc: string;
    competitive: string;
    competitiveDesc: string;
    flexible: string;
    flexibleDesc: string;
  };
  stats: {
    clients: string;
    funded: string;
    satisfaction: string;
    years: string;
  };
};

export const translations: Record<Language, TranslationKeys> = {
  fr: {
    hero: {
      title: 'Réalisez vos projets avec ProLoan',
      subtitle: 'Solutions de financement pour particuliers et professionnels - Taux compétitifs et processus transparent',
      cta1: 'Demander un prêt',
      cta2: 'Mon espace',
      trustIndicator: 'Plus de 15 000 clients satisfaits nous font confiance',
    },
    nav: {
      home: 'Accueil',
      products: 'Nos Prêts',
      howItWorks: 'Comment ça marche',
      resources: 'Ressources',
      about: 'À propos',
      contact: 'Contact',
      dashboard: 'Tableau de bord',
      loans: 'Prêts',
      transfers: 'Transferts',
      history: 'Historique',
      settings: 'Paramètres',
      logout: 'Déconnexion',
    },
    dashboard: {
      welcome: 'Bienvenue',
      currentBalance: 'Solde actuel',
      activeLoans: 'Prêts actifs',
      totalBorrowed: 'Total emprunté',
      availableCredit: 'Crédit disponible',
      lastUpdated: 'Dernière mise à jour',
      borrowingCapacity: 'Capacité d\'emprunt',
      canBorrowUpTo: 'Vous pouvez emprunter jusqu\'à',
      quickActions: 'Actions rapides',
      newLoan: 'Nouveau prêt',
      transferFunds: 'Transférer des fonds',
      transactionHistory: 'Historique des transactions',
      fees: 'Frais',
      pendingTransfers: 'Transferts en attente',
      availableFunds: 'Fonds disponibles',
      upcomingRepayments: 'Remboursements à venir',
    },
    loan: {
      amount: 'Montant',
      interestRate: 'Taux d\'intérêt',
      nextPayment: 'Prochain paiement',
      viewAll: 'Voir tout',
    },
    transfer: {
      requestSubmitted: 'Demande soumise',
      documentVerification: 'Vérification des documents',
      complianceCheck: 'Contrôle de conformité',
      approvalPending: 'Approbation en attente',
      transferComplete: 'Transfert terminé',
      pending: 'En attente',
      inProgress: 'En cours',
      approved: 'Approuvé',
      rejected: 'Rejeté',
    },
    fee: {
      type: 'Type de frais',
      reason: 'Motif',
      amount: 'Montant',
      date: 'Date',
      downloadStatement: 'Télécharger le relevé',
      loanFees: 'Frais de prêt',
      transferFees: 'Frais de transfert',
      accountFees: 'Frais de compte',
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
    },
    about: {
      title: 'À propos de ProLoan',
      subtitle: 'Votre partenaire de confiance pour le financement professionnel',
      mission: 'Notre Mission',
      missionText: 'Chez ProLoan, nous nous engageons à fournir des solutions de financement flexibles et transparentes aux entreprises de toutes tailles. Notre mission est de rendre l\'accès au crédit professionnel simple, rapide et équitable.',
      stats: {
        clients: 'Clients actifs',
        loansProvided: 'Prêts accordés',
        successRate: 'Taux de satisfaction',
        yearsExperience: 'Années d\'expérience',
      },
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Un processus simple en 4 étapes',
      step1Title: 'Faites votre demande',
      step1Desc: 'Remplissez notre formulaire en ligne simple et sécurisé en quelques minutes',
      step2Title: 'Analyse et validation',
      step2Desc: 'Notre équipe analyse votre demande et vous répond sous 24-48 heures',
      step3Title: 'Recevez votre offre',
      step3Desc: 'Consultez votre offre personnalisée avec des conditions transparentes',
      step4Title: 'Déblocage des fonds',
      step4Desc: 'Une fois acceptée, les fonds sont transférés rapidement sur votre compte',
    },
    products: {
      title: 'Nos Solutions de Prêts',
      subtitle: 'Des produits adaptés à vos besoins professionnels',
      termLoans: 'Prêts à Terme',
      termLoansDesc: 'Financement à moyen et long terme pour vos investissements stratégiques. Jusqu\'à 500 000€ sur 1 à 7 ans.',
      lineOfCredit: 'Ligne de Crédit',
      lineOfCreditDesc: 'Crédit renouvelable flexible pour gérer votre trésorerie. Montants jusqu\'à 100 000€.',
      equipmentFinancing: 'Financement d\'Équipement',
      equipmentFinancingDesc: 'Financez vos équipements professionnels avec des conditions avantageuses. Jusqu\'à 300 000€.',
      invoiceFactoring: 'Affacturage',
      invoiceFactoringDesc: 'Transformez vos factures en liquidités immédiates. Avance jusqu\'à 90% du montant.',
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe est à votre écoute',
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Message',
      send: 'Envoyer',
      success: 'Message envoyé avec succès',
      error: 'Erreur lors de l\'envoi du message',
    },
    resources: {
      title: 'Ressources',
      subtitle: 'Toutes les informations pour vous accompagner',
      faqTitle: 'Questions Fréquentes',
      faqs: [
        {
          question: 'Quels documents sont nécessaires pour une demande de prêt ?',
          answer: 'Vous aurez besoin de vos états financiers récents, pièce d\'identité, justificatif de domicile, et documents relatifs à votre entreprise (Kbis, statuts, etc.).',
        },
        {
          question: 'Combien de temps prend le processus d\'approbation ?',
          answer: 'Notre équipe examine votre demande sous 24-48 heures. Une fois approuvée, les fonds peuvent être transférés en 2-5 jours ouvrables.',
        },
        {
          question: 'Quel est le montant minimum et maximum que je peux emprunter ?',
          answer: 'Le montant varie selon le type de prêt. Pour les prêts à terme, vous pouvez emprunter de €10,000 à €500,000. Pour les lignes de crédit, de €5,000 à €100,000.',
        },
        {
          question: 'Puis-je rembourser mon prêt par anticipation ?',
          answer: 'Oui, vous pouvez rembourser votre prêt par anticipation sans pénalité. Cela peut même réduire les intérêts totaux payés.',
        },
        {
          question: 'Quels sont les critères d\'éligibilité ?',
          answer: 'Votre entreprise doit être opérationnelle depuis au moins 6 mois, avoir un chiffre d\'affaires mensuel minimum, et un score de crédit acceptable.',
        },
        {
          question: 'Comment sont calculés les taux d\'intérêt ?',
          answer: 'Les taux sont calculés en fonction de plusieurs facteurs : profil de crédit, durée du prêt, montant emprunté, et santé financière de l\'entreprise.',
        },
      ],
    },
    legal: {
      termsTitle: 'Conditions d\'Utilisation',
      privacyTitle: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : Janvier 2025',
      terms: {
        section1Title: '1. Acceptation des Conditions',
        section1Content: 'En accédant et en utilisant les services de ProLoan, vous acceptez et acceptez d\'être lié par les termes et dispositions de cet accord.',
        section2Title: '2. Licence d\'Utilisation',
        section2Content: 'L\'autorisation est accordée pour accéder temporairement aux matériaux (informations ou logiciels) sur la plateforme de ProLoan pour une visualisation personnelle et non commerciale uniquement.',
        section3Title: '3. Contrat de Prêt',
        section3Content: 'Tous les prêts sont soumis à l\'approbation de crédit. Les termes et conditions seront fournis dans un contrat de prêt séparé lors de l\'approbation de votre demande.',
        section4Title: '4. Déclarations et Garanties',
        section4Content: 'Vous déclarez et garantissez que toutes les informations fournies dans votre demande de prêt sont exactes, complètes et à jour.',
        section5Title: '5. Limitation de Responsabilité',
        section5Content: 'En aucun cas ProLoan ou ses fournisseurs ne seront responsables de tout dommage découlant de l\'utilisation ou de l\'impossibilité d\'utiliser les matériaux sur la plateforme de ProLoan.',
        section6Title: '6. Modifications',
        section6Content: 'ProLoan peut réviser ces conditions d\'utilisation à tout moment sans préavis. En utilisant cette plateforme, vous acceptez d\'être lié par la version actuelle de ces conditions.',
      },
      privacy: {
        section1Title: '1. Informations que Nous Collectons',
        section1Content: 'Nous collectons les informations que vous nous fournissez directement lorsque vous créez un compte, demandez un prêt ou communiquez avec nous. Cela peut inclure votre nom, adresse e-mail, numéro de téléphone, informations commerciales et données financières.',
        section2Title: '2. Comment Nous Utilisons Vos Informations',
        section2Content: 'Nous utilisons les informations que nous collectons pour :',
        section2List: [
          'Traiter vos demandes de prêt',
          'Communiquer avec vous sur nos services',
          'Améliorer notre plateforme et nos services',
          'Se conformer aux exigences légales et réglementaires',
        ],
        section3Title: '3. Partage d\'Informations',
        section3Content: 'Nous ne vendons pas vos informations personnelles. Nous pouvons partager vos informations avec :',
        section3List: [
          'Les bureaux de crédit pour l\'évaluation du crédit',
          'Les prestataires de services qui nous assistent dans nos opérations',
          'Les régulateurs et les forces de l\'ordre lorsque requis par la loi',
        ],
        section4Title: '4. Sécurité des Données',
        section4Content: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l\'accès, l\'altération, la divulgation ou la destruction non autorisés.',
        section5Title: '5. Vos Droits',
        section5Content: 'Vous avez le droit d\'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez également vous opposer à certains traitements de vos données.',
        section6Title: '6. Cookies',
        section6Content: 'Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience sur notre plateforme. Vous pouvez contrôler les cookies via les paramètres de votre navigateur.',
        section7Title: '7. Nous Contacter',
        section7Content: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à privacy@proloan.com',
      },
    },
    individualLoans: {
      title: 'Prêts pour Particuliers',
      subtitle: 'Des solutions de financement adaptées à tous vos projets de vie',
      personalLoan: 'Prêt Personnel',
      personalLoanDesc: 'Financement flexible pour tous vos projets personnels sans justificatif',
      mortgageLoan: 'Prêt Immobilier',
      mortgageLoanDesc: 'Financez l\'achat de votre résidence principale ou secondaire',
      autoLoan: 'Crédit Auto',
      autoLoanDesc: 'Achetez votre véhicule neuf ou d\'occasion aux meilleurs taux',
      studentLoan: 'Prêt Étudiant',
      studentLoanDesc: 'Financez vos études supérieures avec des conditions avantageuses',
      greenLoan: 'Prêt Vert',
      greenLoanDesc: 'Financez vos projets de rénovation énergétique et transition écologique',
      renovationLoan: 'Prêt Travaux',
      renovationLoanDesc: 'Rénovez et améliorez votre logement',
      amount: 'Montant',
      rate: 'Taux TAEG',
      duration: 'Durée',
      rateDisclaimer: 'Taux indicatifs soumis à conditions. TAEG fixe.',
      compareLoans: 'Comparer tous les prêts',
    },
    features: {
      title: 'Pourquoi Choisir ProLoan ?',
      subtitle: 'Une plateforme de prêt moderne qui met vos besoins au centre',
      security: 'Sécurisé et Confidentiel',
      securityDesc: 'Vos données sont protégées avec les plus hauts standards de sécurité bancaire',
      fast: 'Réponse Rapide',
      fastDesc: 'Obtenez une réponse de principe en 24-48h et les fonds sous 5 jours',
      competitive: 'Taux Compétitifs',
      competitiveDesc: 'Bénéficiez de taux parmi les plus bas du marché grâce à notre réseau',
      flexible: 'Conditions Flexibles',
      flexibleDesc: 'Remboursement anticipé sans frais et modulation possible des mensualités',
    },
    stats: {
      clients: 'Clients Satisfaits',
      funded: 'Prêts Accordés',
      satisfaction: 'Taux de Satisfaction',
      years: 'Années d\'Expérience',
    },
  },
  en: {
    hero: {
      title: 'Make Your Projects a Reality with ProLoan',
      subtitle: 'Financing solutions for individuals and businesses - Competitive rates and transparent process',
      cta1: 'Request a Loan',
      cta2: 'My Account',
      trustIndicator: 'Trusted by 15,000+ satisfied clients',
    },
    nav: {
      home: 'Home',
      products: 'Our Loans',
      howItWorks: 'How It Works',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      dashboard: 'Dashboard',
      loans: 'Loans',
      transfers: 'Transfers',
      history: 'History',
      settings: 'Settings',
      logout: 'Logout',
    },
    dashboard: {
      welcome: 'Welcome',
      currentBalance: 'Current Balance',
      activeLoans: 'Active Loans',
      totalBorrowed: 'Total Borrowed',
      availableCredit: 'Available Credit',
      lastUpdated: 'Last Updated',
      borrowingCapacity: 'Borrowing Capacity',
      canBorrowUpTo: 'You can borrow up to',
      quickActions: 'Quick Actions',
      newLoan: 'New Loan',
      transferFunds: 'Transfer Funds',
      transactionHistory: 'Transaction History',
      fees: 'Fees',
      pendingTransfers: 'Pending Transfers',
      availableFunds: 'Available Funds',
      upcomingRepayments: 'Upcoming Repayments',
    },
    loan: {
      amount: 'Amount',
      interestRate: 'Interest Rate',
      nextPayment: 'Next Payment',
      viewAll: 'View All',
    },
    transfer: {
      requestSubmitted: 'Request Submitted',
      documentVerification: 'Document Verification',
      complianceCheck: 'Compliance Check',
      approvalPending: 'Approval Pending',
      transferComplete: 'Transfer Complete',
      pending: 'Pending',
      inProgress: 'In Progress',
      approved: 'Approved',
      rejected: 'Rejected',
    },
    fee: {
      type: 'Fee Type',
      reason: 'Reason',
      amount: 'Amount',
      date: 'Date',
      downloadStatement: 'Download Statement',
      loanFees: 'Loan Fees',
      transferFees: 'Transfer Fees',
      accountFees: 'Account Fees',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    about: {
      title: 'About ProLoan',
      subtitle: 'Your trusted partner for professional financing',
      mission: 'Our Mission',
      missionText: 'At ProLoan, we are committed to providing flexible and transparent financing solutions for businesses of all sizes. Our mission is to make professional credit access simple, fast, and fair.',
      stats: {
        clients: 'Active clients',
        loansProvided: 'Loans provided',
        successRate: 'Satisfaction rate',
        yearsExperience: 'Years of experience',
      },
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'A simple 4-step process',
      step1Title: 'Submit your application',
      step1Desc: 'Complete our simple and secure online form in just a few minutes',
      step2Title: 'Analysis and validation',
      step2Desc: 'Our team reviews your application and responds within 24-48 hours',
      step3Title: 'Receive your offer',
      step3Desc: 'Review your personalized offer with transparent terms',
      step4Title: 'Fund disbursement',
      step4Desc: 'Once accepted, funds are transferred quickly to your account',
    },
    products: {
      title: 'Our Loan Solutions',
      subtitle: 'Products tailored to your professional needs',
      termLoans: 'Term Loans',
      termLoansDesc: 'Medium and long-term financing for your strategic investments. Up to €500,000 over 1 to 7 years.',
      lineOfCredit: 'Line of Credit',
      lineOfCreditDesc: 'Flexible revolving credit to manage your cash flow. Amounts up to €100,000.',
      equipmentFinancing: 'Equipment Financing',
      equipmentFinancingDesc: 'Finance your professional equipment with advantageous terms. Up to €300,000.',
      invoiceFactoring: 'Invoice Factoring',
      invoiceFactoringDesc: 'Turn your invoices into immediate cash. Advance up to 90% of the amount.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Our team is here to help',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send',
      success: 'Message sent successfully',
      error: 'Error sending message',
    },
    resources: {
      title: 'Resources',
      subtitle: 'All the information to support you',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'What documents are required for a loan application?',
          answer: 'You will need your recent financial statements, ID, proof of address, and documents related to your business (company registration, articles of association, etc.).',
        },
        {
          question: 'How long does the approval process take?',
          answer: 'Our team reviews your application within 24-48 hours. Once approved, funds can be transferred in 2-5 business days.',
        },
        {
          question: 'What is the minimum and maximum amount I can borrow?',
          answer: 'The amount varies by loan type. For term loans, you can borrow from €10,000 to €500,000. For lines of credit, from €5,000 to €100,000.',
        },
        {
          question: 'Can I repay my loan early?',
          answer: 'Yes, you can repay your loan early without penalty. This may even reduce the total interest paid.',
        },
        {
          question: 'What are the eligibility criteria?',
          answer: 'Your business must have been operating for at least 6 months, have a minimum monthly revenue, and an acceptable credit score.',
        },
        {
          question: 'How are interest rates calculated?',
          answer: 'Rates are calculated based on several factors: credit profile, loan duration, amount borrowed, and business financial health.',
        },
      ],
    },
    legal: {
      termsTitle: 'Terms of Service',
      privacyTitle: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2025',
      terms: {
        section1Title: '1. Acceptance of Terms',
        section1Content: 'By accessing and using ProLoan\'s services, you accept and agree to be bound by the terms and provision of this agreement.',
        section2Title: '2. Use License',
        section2Content: 'Permission is granted to temporarily access the materials (information or software) on ProLoan\'s platform for personal, non-commercial transitory viewing only.',
        section3Title: '3. Loan Agreement',
        section3Content: 'All loans are subject to credit approval. Terms and conditions will be provided in a separate loan agreement upon approval of your application.',
        section4Title: '4. Representations and Warranties',
        section4Content: 'You represent and warrant that all information provided in your loan application is accurate, complete, and current.',
        section5Title: '5. Limitation of Liability',
        section5Content: 'In no event shall ProLoan or its suppliers be liable for any damages arising out of the use or inability to use the materials on ProLoan\'s platform.',
        section6Title: '6. Modifications',
        section6Content: 'ProLoan may revise these terms of service at any time without notice. By using this platform, you agree to be bound by the current version of these terms.',
      },
      privacy: {
        section1Title: '1. Information We Collect',
        section1Content: 'We collect information you provide directly to us when you create an account, apply for a loan, or communicate with us. This may include your name, email address, phone number, business information, and financial data.',
        section2Title: '2. How We Use Your Information',
        section2Content: 'We use the information we collect to:',
        section2List: [
          'Process your loan applications',
          'Communicate with you about our services',
          'Improve our platform and services',
          'Comply with legal and regulatory requirements',
        ],
        section3Title: '3. Information Sharing',
        section3Content: 'We do not sell your personal information. We may share your information with:',
        section3List: [
          'Credit bureaus for credit assessment',
          'Service providers who assist in our operations',
          'Regulators and law enforcement when required by law',
        ],
        section4Title: '4. Data Security',
        section4Content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        section5Title: '5. Your Rights',
        section5Content: 'You have the right to access, correct, or delete your personal information. You may also object to certain processing of your data.',
        section6Title: '6. Cookies',
        section6Content: 'We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookies through your browser settings.',
        section7Title: '7. Contact Us',
        section7Content: 'If you have questions about this Privacy Policy, please contact us at privacy@proloan.com',
      },
    },
    individualLoans: {
      title: 'Personal Loans',
      subtitle: 'Financing solutions tailored to all your life projects',
      personalLoan: 'Personal Loan',
      personalLoanDesc: 'Flexible financing for all your personal projects without proof of use',
      mortgageLoan: 'Mortgage Loan',
      mortgageLoanDesc: 'Finance the purchase of your primary or secondary residence',
      autoLoan: 'Auto Loan',
      autoLoanDesc: 'Buy your new or used vehicle at the best rates',
      studentLoan: 'Student Loan',
      studentLoanDesc: 'Finance your higher education with favorable conditions',
      greenLoan: 'Green Loan',
      greenLoanDesc: 'Finance your energy renovation and ecological transition projects',
      renovationLoan: 'Home Improvement Loan',
      renovationLoanDesc: 'Renovate and improve your home',
      amount: 'Amount',
      rate: 'APR Rate',
      duration: 'Duration',
      rateDisclaimer: 'Indicative rates subject to conditions. Fixed APR.',
      compareLoans: 'Compare all loans',
    },
    features: {
      title: 'Why Choose ProLoan?',
      subtitle: 'A modern lending platform that puts your needs first',
      security: 'Secure and Confidential',
      securityDesc: 'Your data is protected with the highest banking security standards',
      fast: 'Fast Response',
      fastDesc: 'Get an approval response within 24-48 hours and funds within 5 days',
      competitive: 'Competitive Rates',
      competitiveDesc: 'Benefit from some of the lowest rates on the market thanks to our network',
      flexible: 'Flexible Terms',
      flexibleDesc: 'Early repayment without fees and possible modulation of monthly payments',
    },
    stats: {
      clients: 'Satisfied Clients',
      funded: 'Loans Provided',
      satisfaction: 'Satisfaction Rate',
      years: 'Years of Experience',
    },
  },
  es: {
    hero: {
      title: 'Haga Realidad sus Proyectos con ProLoan',
      subtitle: 'Soluciones de financiamiento para particulares y empresas - Tasas competitivas y proceso transparente',
      cta1: 'Solicitar Préstamo',
      cta2: 'Mi Cuenta',
      trustIndicator: 'Más de 15,000 clientes satisfechos confían en nosotros',
    },
    nav: {
      home: 'Inicio',
      products: 'Nuestros Préstamos',
      howItWorks: 'Cómo Funciona',
      resources: 'Recursos',
      about: 'Acerca de',
      contact: 'Contacto',
      dashboard: 'Panel',
      loans: 'Préstamos',
      transfers: 'Transferencias',
      history: 'Historial',
      settings: 'Configuración',
      logout: 'Cerrar Sesión',
    },
    dashboard: {
      welcome: 'Bienvenido',
      currentBalance: 'Saldo Actual',
      activeLoans: 'Préstamos Activos',
      totalBorrowed: 'Total Prestado',
      availableCredit: 'Crédito Disponible',
      lastUpdated: 'Última Actualización',
      borrowingCapacity: 'Capacidad de Préstamo',
      canBorrowUpTo: 'Puede pedir prestado hasta',
      quickActions: 'Acciones Rápidas',
      newLoan: 'Nuevo Préstamo',
      transferFunds: 'Transferir Fondos',
      transactionHistory: 'Historial de Transacciones',
      fees: 'Tarifas',
      pendingTransfers: 'Transferencias Pendientes',
      availableFunds: 'Fondos Disponibles',
      upcomingRepayments: 'Próximos Reembolsos',
    },
    loan: {
      amount: 'Cantidad',
      interestRate: 'Tasa de Interés',
      nextPayment: 'Próximo Pago',
      viewAll: 'Ver Todo',
    },
    transfer: {
      requestSubmitted: 'Solicitud Enviada',
      documentVerification: 'Verificación de Documentos',
      complianceCheck: 'Control de Cumplimiento',
      approvalPending: 'Aprobación Pendiente',
      transferComplete: 'Transferencia Completa',
      pending: 'Pendiente',
      inProgress: 'En Progreso',
      approved: 'Aprobado',
      rejected: 'Rechazado',
    },
    fee: {
      type: 'Tipo de Tarifa',
      reason: 'Motivo',
      amount: 'Cantidad',
      date: 'Fecha',
      downloadStatement: 'Descargar Estado de Cuenta',
      loanFees: 'Tarifas de Préstamo',
      transferFees: 'Tarifas de Transferencia',
      accountFees: 'Tarifas de Cuenta',
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
    },
    about: {
      title: 'Acerca de ProLoan',
      subtitle: 'Su socio de confianza para financiamiento profesional',
      mission: 'Nuestra Misión',
      missionText: 'En ProLoan, nos comprometemos a proporcionar soluciones de financiamiento flexibles y transparentes para empresas de todos los tamaños. Nuestra misión es hacer que el acceso al crédito profesional sea simple, rápido y justo.',
      stats: {
        clients: 'Clientes activos',
        loansProvided: 'Préstamos otorgados',
        successRate: 'Tasa de satisfacción',
        yearsExperience: 'Años de experiencia',
      },
    },
    howItWorks: {
      title: 'Cómo Funciona',
      subtitle: 'Un proceso simple de 4 pasos',
      step1Title: 'Envíe su solicitud',
      step1Desc: 'Complete nuestro formulario en línea simple y seguro en solo unos minutos',
      step2Title: 'Análisis y validación',
      step2Desc: 'Nuestro equipo revisa su solicitud y responde en 24-48 horas',
      step3Title: 'Reciba su oferta',
      step3Desc: 'Revise su oferta personalizada con términos transparentes',
      step4Title: 'Desembolso de fondos',
      step4Desc: 'Una vez aceptada, los fondos se transfieren rápidamente a su cuenta',
    },
    products: {
      title: 'Nuestras Soluciones de Préstamos',
      subtitle: 'Productos adaptados a sus necesidades profesionales',
      termLoans: 'Préstamos a Plazo',
      termLoansDesc: 'Financiamiento a mediano y largo plazo para sus inversiones estratégicas. Hasta €500,000 de 1 a 7 años.',
      lineOfCredit: 'Línea de Crédito',
      lineOfCreditDesc: 'Crédito renovable flexible para gestionar su flujo de caja. Montos hasta €100,000.',
      equipmentFinancing: 'Financiamiento de Equipos',
      equipmentFinancingDesc: 'Financie sus equipos profesionales con términos ventajosos. Hasta €300,000.',
      invoiceFactoring: 'Factoraje de Facturas',
      invoiceFactoringDesc: 'Convierta sus facturas en efectivo inmediato. Anticipo hasta el 90% del monto.',
    },
    contact: {
      title: 'Contáctenos',
      subtitle: 'Nuestro equipo está aquí para ayudar',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      message: 'Mensaje',
      send: 'Enviar',
      success: 'Mensaje enviado correctamente',
      error: 'Error al enviar el mensaje',
    },
    resources: {
      title: 'Recursos',
      subtitle: 'Toda la información para apoyarlo',
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        {
          question: '¿Qué documentos se requieren para una solicitud de préstamo?',
          answer: 'Necesitará sus estados financieros recientes, identificación, comprobante de domicilio y documentos relacionados con su empresa (registro mercantil, estatutos, etc.).',
        },
        {
          question: '¿Cuánto tiempo toma el proceso de aprobación?',
          answer: 'Nuestro equipo revisa su solicitud en 24-48 horas. Una vez aprobada, los fondos pueden transferirse en 2-5 días hábiles.',
        },
        {
          question: '¿Cuál es el monto mínimo y máximo que puedo pedir prestado?',
          answer: 'El monto varía según el tipo de préstamo. Para préstamos a plazo, puede pedir prestado de €10,000 a €500,000. Para líneas de crédito, de €5,000 a €100,000.',
        },
        {
          question: '¿Puedo pagar mi préstamo anticipadamente?',
          answer: 'Sí, puede pagar su préstamo anticipadamente sin penalización. Esto incluso puede reducir el interés total pagado.',
        },
        {
          question: '¿Cuáles son los criterios de elegibilidad?',
          answer: 'Su empresa debe haber estado operando durante al menos 6 meses, tener ingresos mensuales mínimos y una puntuación de crédito aceptable.',
        },
        {
          question: '¿Cómo se calculan las tasas de interés?',
          answer: 'Las tasas se calculan en función de varios factores: perfil de crédito, duración del préstamo, monto prestado y salud financiera de la empresa.',
        },
      ],
    },
    legal: {
      termsTitle: 'Términos de Servicio',
      privacyTitle: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Enero 2025',
      terms: {
        section1Title: '1. Aceptación de Términos',
        section1Content: 'Al acceder y utilizar los servicios de ProLoan, acepta y está de acuerdo en estar sujeto a los términos y disposiciones de este acuerdo.',
        section2Title: '2. Licencia de Uso',
        section2Content: 'Se otorga permiso para acceder temporalmente a los materiales (información o software) en la plataforma de ProLoan solo para visualización personal y no comercial.',
        section3Title: '3. Contrato de Préstamo',
        section3Content: 'Todos los préstamos están sujetos a aprobación de crédito. Los términos y condiciones se proporcionarán en un contrato de préstamo separado al aprobar su solicitud.',
        section4Title: '4. Declaraciones y Garantías',
        section4Content: 'Usted declara y garantiza que toda la información proporcionada en su solicitud de préstamo es precisa, completa y actual.',
        section5Title: '5. Limitación de Responsabilidad',
        section5Content: 'En ningún caso ProLoan o sus proveedores serán responsables de cualquier daño que surja del uso o la imposibilidad de usar los materiales en la plataforma de ProLoan.',
        section6Title: '6. Modificaciones',
        section6Content: 'ProLoan puede revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar esta plataforma, acepta estar sujeto a la versión actual de estos términos.',
      },
      privacy: {
        section1Title: '1. Información que Recopilamos',
        section1Content: 'Recopilamos información que nos proporciona directamente cuando crea una cuenta, solicita un préstamo o se comunica con nosotros. Esto puede incluir su nombre, dirección de correo electrónico, número de teléfono, información comercial y datos financieros.',
        section2Title: '2. Cómo Usamos su Información',
        section2Content: 'Usamos la información que recopilamos para:',
        section2List: [
          'Procesar sus solicitudes de préstamo',
          'Comunicarnos con usted sobre nuestros servicios',
          'Mejorar nuestra plataforma y servicios',
          'Cumplir con los requisitos legales y regulatorios',
        ],
        section3Title: '3. Compartir Información',
        section3Content: 'No vendemos su información personal. Podemos compartir su información con:',
        section3List: [
          'Burós de crédito para evaluación crediticia',
          'Proveedores de servicios que nos ayudan en nuestras operaciones',
          'Reguladores y fuerzas del orden cuando lo requiera la ley',
        ],
        section4Title: '4. Seguridad de Datos',
        section4Content: 'Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal contra el acceso, alteración, divulgación o destrucción no autorizados.',
        section5Title: '5. Sus Derechos',
        section5Content: 'Tiene derecho a acceder, corregir o eliminar su información personal. También puede oponerse a cierto procesamiento de sus datos.',
        section6Title: '6. Cookies',
        section6Content: 'Utilizamos cookies y tecnologías de seguimiento similares para mejorar su experiencia en nuestra plataforma. Puede controlar las cookies a través de la configuración de su navegador.',
        section7Title: '7. Contáctenos',
        section7Content: 'Si tiene preguntas sobre esta Política de Privacidad, contáctenos en privacy@proloan.com',
      },
    },
    individualLoans: {
      title: 'Préstamos para Particulares',
      subtitle: 'Soluciones de financiamiento adaptadas a todos sus proyectos de vida',
      personalLoan: 'Préstamo Personal',
      personalLoanDesc: 'Financiamiento flexible para todos sus proyectos personales sin justificante',
      mortgageLoan: 'Préstamo Hipotecario',
      mortgageLoanDesc: 'Financie la compra de su residencia principal o secundaria',
      autoLoan: 'Crédito Automotriz',
      autoLoanDesc: 'Compre su vehículo nuevo o usado a las mejores tasas',
      studentLoan: 'Préstamo Estudiantil',
      studentLoanDesc: 'Financie sus estudios superiores con condiciones favorables',
      greenLoan: 'Préstamo Verde',
      greenLoanDesc: 'Financie sus proyectos de renovación energética y transición ecológica',
      renovationLoan: 'Préstamo para Reformas',
      renovationLoanDesc: 'Renueve y mejore su vivienda',
      amount: 'Monto',
      rate: 'Tasa TAE',
      duration: 'Duración',
      rateDisclaimer: 'Tasas indicativas sujetas a condiciones. TAE fija.',
      compareLoans: 'Comparar todos los préstamos',
    },
    features: {
      title: '¿Por Qué Elegir ProLoan?',
      subtitle: 'Una plataforma de préstamos moderna que prioriza sus necesidades',
      security: 'Seguro y Confidencial',
      securityDesc: 'Sus datos están protegidos con los más altos estándares de seguridad bancaria',
      fast: 'Respuesta Rápida',
      fastDesc: 'Obtenga una respuesta de aprobación en 24-48 horas y fondos en 5 días',
      competitive: 'Tasas Competitivas',
      competitiveDesc: 'Benefíciese de algunas de las tasas más bajas del mercado gracias a nuestra red',
      flexible: 'Condiciones Flexibles',
      flexibleDesc: 'Pago anticipado sin cargos y posible modulación de pagos mensuales',
    },
    stats: {
      clients: 'Clientes Satisfechos',
      funded: 'Préstamos Otorgados',
      satisfaction: 'Tasa de Satisfacción',
      years: 'Años de Experiencia',
    },
  },
};

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};
