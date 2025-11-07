import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'fr' | 'en' | 'es';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('es')) return 'es';
  
  return 'en';
}

function getInitialLanguage(): Language {
  const stored = localStorage.getItem('language-storage');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.state?.language) {
        return parsed.state.language;
      }
    } catch (e) {
      console.error('Failed to parse stored language:', e);
    }
  }
  return detectBrowserLanguage();
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: getInitialLanguage(),
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
    slides: Array<{
      title: string;
      subtitle: string;
    }>;
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
    yourGlobalBalance: string;
    noActiveLoans: string;
    noTransfers: string;
    dataLoadError: string;
    available: string;
    notifications: string;
    noNotifications: string;
    viewDetails: string;
    availableOffers: string;
  };
  loan: {
    amount: string;
    interestRate: string;
    nextPayment: string;
    viewAll: string;
    status: string;
    downloadContract: string;
    uploadSignedContract: string;
    downloading: string;
    uploading: string;
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
    completed: string;
    suspended: string;
    noAccount: string;
    validation: string;
    validating: string;
    onHold: string;
    processing: string;
    processingComplete: string;
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
    active: string;
    pending: string;
    completed: string;
    suspended: string;
    saving: string;
    cancel: string;
    save: string;
    close: string;
    noData: string;
  };
  settings: {
    title: string;
    profile: string;
    notifications: string;
    security: string;
    appearance: string;
    personalInfo: string;
    updateInfo: string;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    saveChanges: string;
    accountType: string;
    yourAccountType: string;
    individualAccount: string;
    businessAccount: string;
    individualAccess: string;
    businessAccess: string;
    verified: string;
    notificationPreferences: string;
    chooseNotifications: string;
    emailAlerts: string;
    emailAlertsDesc: string;
    transferUpdates: string;
    transferUpdatesDesc: string;
    loanReminders: string;
    loanRemindersDesc: string;
    marketingEmails: string;
    marketingEmailsDesc: string;
    savePreferences: string;
    changePassword: string;
    updatePassword: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    themeSettings: string;
    chooseTheme: string;
    lightMode: string;
    darkMode: string;
    systemMode: string;
    languageSettings: string;
    chooseLanguage: string;
  };
  messages: {
    profileUpdated: string;
    profileUpdatedDesc: string;
    preferencesUpdated: string;
    preferencesUpdatedDesc: string;
    passwordChanged: string;
    passwordChangedDesc: string;
    passwordMismatch: string;
    errorUpdatingProfile: string;
    errorUpdatingPreferences: string;
    errorChangingPassword: string;
    avatarUpdated: string;
    avatarUpdatedDesc: string;
    errorUploadingAvatar: string;
    invalidFileType: string;
    fileTooLarge: string;
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
    businessTitle: string;
    businessSubtitle: string;
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
  testimonials: {
    title: string;
    subtitle: string;
    reviews: Array<{
      name: string;
      role: string;
      company: string;
      text: string;
      rating: number;
    }>;
  };
  auth: {
    title: string;
    subtitle: string;
    loginTab: string;
    signupTab: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    companyName: string;
    siret: string;
    accountType: string;
    personal: string;
    personalLoan: string;
    business: string;
    businessLoan: string;
    login: string;
    loggingIn: string;
    signup: string;
    signingUp: string;
    backToHome: string;
    loginSuccess: string;
    loginSuccessDesc: string;
    signupSuccess: string;
    signupSuccessDesc: string;
    loginError: string;
    loginErrorDesc: string;
    signupError: string;
    signupErrorDesc: string;
    emailNotVerified: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    fullNamePlaceholder: string;
    phonePlaceholder: string;
    companyNamePlaceholder: string;
    siretPlaceholder: string;
    required: string;
    companyRequired: string;
    emailInvalid: string;
    passwordMinLength: string;
    passwordUppercase: string;
    passwordLowercase: string;
    passwordNumber: string;
    passwordSpecial: string;
    passwordMatch: string;
  };
  bankCard: {
    title: string;
    subtitle: string;
    learnMore: string;
    orderNow: string;
    orderCard: string;
    modalTitle: string;
    modalSubtitle: string;
    advantagesTitle: string;
    advantages: {
      cashback: string;
      cashbackDesc: string;
      noFees: string;
      noFeesDesc: string;
      protection: string;
      protectionDesc: string;
      rewards: string;
      rewardsDesc: string;
      global: string;
      globalDesc: string;
      support: string;
      supportDesc: string;
    };
    usageZonesTitle: string;
    usageZones: {
      worldwide: string;
      worldwideDesc: string;
      online: string;
      onlineDesc: string;
      stores: string;
      storesDesc: string;
      atm: string;
      atmDesc: string;
    };
    feesTitle: string;
    fees: {
      annualFee: string;
      annualFeeAmount: string;
      transactionFee: string;
      transactionFeeAmount: string;
      withdrawalFee: string;
      withdrawalFeeAmount: string;
      foreignFee: string;
      foreignFeeAmount: string;
    };
    specificationsTitle: string;
    specifications: {
      cardType: string;
      cardTypeValue: string;
      creditLimit: string;
      creditLimitValue: string;
      validity: string;
      validityValue: string;
      delivery: string;
      deliveryValue: string;
    };
    orderProcess: string;
    orderProcessDesc: string;
    termsConditions: string;
    close: string;
  };
  notifications: {
    loan_request: { title: string; message: string };
    loan_under_review: { title: string; message: string };
    loan_approved: { title: string; message: string };
    loan_rejected: { title: string; message: string };
    loan_contract_generated: { title: string; message: string };
    loan_contract_signed: { title: string; message: string };
    loan_disbursed: { title: string; message: string };
    transfer_initiated: { title: string; message: string };
    transfer_completed: { title: string; message: string };
    transfer_approved: { title: string; message: string };
    transfer_suspended: { title: string; message: string };
    code_issued: { title: string; message: string };
    kyc_approved: { title: string; message: string };
    kyc_rejected: { title: string; message: string };
    fee_added: { title: string; message: string };
    account_status_changed: { title: string; message: string };
    admin_message_sent: { title: string; message: string };
    general: { title: string; message: string };
    twoFactorSuggestion: { title: string; message: string };
    markAllRead: string;
    markAsRead: string;
    deleteNotification: string;
  };
  dialogs: {
    newLoan: {
      title: string;
      subtitle: string;
      loanType: string;
      selectLoanType: string;
      amount: string;
      enterAmount: string;
      duration: string;
      selectDuration: string;
      months: string;
      estimatedRate: string;
      monthlyPayment: string;
      totalRepayment: string;
      firstRequestAlert: string;
      firstRequestAlertDesc: string;
      addBankAccount: string;
      selectAccount: string;
      bankName: string;
      bankNamePlaceholder: string;
      accountLabel: string;
      accountLabelPlaceholder: string;
      iban: string;
      ibanPlaceholder: string;
      bic: string;
      bicPlaceholder: string;
      uploadDocuments: string;
      kycDocumentsTab: string;
      additionalDocumentsTab: string;
      identity: string;
      proof_of_address: string;
      income_proof: string;
      business_registration: string;
      financial_statements: string;
      tax_returns: string;
      submit: string;
      submitting: string;
      cancel: string;
      loanTypes: {
        personal: string;
        auto: string;
        mortgage: string;
        green: string;
        renovation: string;
        student: string;
        business: string;
        cashFlow: string;
        equipment: string;
        commercialProperty: string;
        lineOfCredit: string;
        vehicleFleet: string;
      };
    };
    transfer: {
      title: string;
      subtitle: string;
      selectAccount: string;
      noAccountsAvailable: string;
      amount: string;
      enterAmount: string;
      availableFunds: string;
      feesAndProcessing: string;
      submit: string;
      submitting: string;
      cancel: string;
    };
    cardTerms: {
      title: string;
      acceptTerms: string;
      declineTerms: string;
    };
    welcome: {
      title: string;
      description: string;
      accountTypeTitle: string;
      individualAccount: string;
      businessAccount: string;
      individualAccess: string;
      businessAccess: string;
      availableOffers: string;
      getStarted: string;
    };
    transactionHistory: {
      title: string;
      type: string;
      amount: string;
      date: string;
      status: string;
      noTransactions: string;
      close: string;
    };
  };
  verify: {
    verifying: string;
    success: string;
    successMessage: string;
    goToDashboard: string;
    error: string;
    errorMessage: string;
    tryAgain: string;
    backToSignup: string;
    backToHome: string;
  };
  forgotPassword: {
    title: string;
    description: string;
    instructions: string;
    emailLabel: string;
    emailPlaceholder: string;
    sendResetLink: string;
    sending: string;
    backToLogin: string;
    emailSent: string;
    emailSentDesc: string;
    error: string;
    errorDesc: string;
  };
  resetPassword: {
    title: string;
    description: string;
    newPassword: string;
    newPasswordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    requirements: string;
    minLength: string;
    uppercase: string;
    lowercase: string;
    number: string;
    specialChar: string;
    passwordStrength: string;
    weak: string;
    medium: string;
    strong: string;
    veryStrong: string;
    resetPassword: string;
    resetting: string;
    success: string;
    successMessage: string;
    error: string;
    invalidToken: string;
    passwordMismatch: string;
  };
  twoFactorAuth: {
    setup: {
      title: string;
      description: string;
      step1: string;
      step1Description: string;
      step2: string;
      step2Description: string;
      step3: string;
      step3Description: string;
      qrCodeInstructions: string;
      cantScanQR: string;
      secretKey: string;
      enterCode: string;
      codePlaceholder: string;
      verify: string;
      verifying: string;
      cancel: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
    disable: {
      title: string;
      description: string;
      enterPassword: string;
      passwordPlaceholder: string;
      disable: string;
      disabling: string;
      cancel: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
    login: {
      title: string;
      description: string;
      enterCode: string;
      codePlaceholder: string;
      verify: string;
      verifying: string;
      cancel: string;
      errorTitle: string;
      errorMessage: string;
    };
  };
  bankAccounts: {
    title: string;
    description: string;
    addAccount: string;
    noAccountsTitle: string;
    noAccountsDescription: string;
    accountLabel: string;
    bankName: string;
    iban: string;
    bic: string;
    createdAt: string;
    actions: string;
    delete: string;
    deleteConfirm: string;
    deleteSuccess: string;
    addAccountTitle: string;
    addAccountDescription: string;
    accountLabelLabel: string;
    accountLabelPlaceholder: string;
    accountLabelRequired: string;
    bankNameLabel: string;
    bankNamePlaceholder: string;
    bankNameRequired: string;
    ibanLabel: string;
    ibanPlaceholder: string;
    ibanRequired: string;
    bicLabel: string;
    bicPlaceholder: string;
    submit: string;
    submitting: string;
    cancel: string;
    addSuccess: string;
    addSuccessDesc: string;
    addError: string;
  };
  welcomeModal: {
    title: string;
    description: string;
    accountType: string;
    individualAccount: string;
    businessAccount: string;
    individualAccess: string;
    businessAccess: string;
    availableOffers: string;
    getStarted: string;
  };
  calculator: {
    title: string;
    description: string;
    loanAmount: string;
    interestRate: string;
    loanDuration: string;
    months: string;
    calculate: string;
    results: string;
    monthlyPayment: string;
    totalInterest: string;
    totalAmount: string;
    amortizationSchedule: string;
    month: string;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
    downloadSchedule: string;
  };
  kycDocuments: {
    title: string;
    description: string;
    uploadDocuments: string;
    documentType: string;
    selectDocumentType: string;
    identity: string;
    proof_of_address: string;
    income_proof: string;
    business_registration: string;
    financial_statements: string;
    tax_returns: string;
    chooseFile: string;
    upload: string;
    uploading: string;
    uploadSuccess: string;
    uploadSuccessDesc: string;
    uploadError: string;
    status: string;
    pending: string;
    approved: string;
    rejected: string;
    uploadedAt: string;
    noDocuments: string;
  };
};

export const translations: Record<Language, TranslationKeys> = {
  fr: {
    hero: {
      title: 'Réalisez vos projets avec Altus Finance Group',
      subtitle: 'Solutions de financement pour particuliers et professionnels - Taux compétitifs et processus transparent',
      cta1: 'Demander un prêt',
      cta2: 'Mon espace',
      trustIndicator: 'Plus de 15 000 clients satisfaits nous font confiance',
      slides: [
        {
          title: 'Réalisez vos projets avec Altus Finance Group',
          subtitle: 'Solutions de financement pour particuliers et professionnels - Taux compétitifs et processus transparent',
        },
        {
          title: 'Des solutions financières sur mesure',
          subtitle: 'Accompagnement personnalisé pour concrétiser tous vos projets professionnels et personnels',
        },
        {
          title: 'Votre partenaire de confiance',
          subtitle: 'Plus de 15 000 clients satisfaits nous font confiance pour leurs besoins de financement',
        },
        {
          title: 'Financez vos ambitions',
          subtitle: 'Des taux avantageux et un processus simple pour donner vie à vos projets',
        },
        {
          title: 'Expertise et accompagnement',
          subtitle: 'Une équipe dédiée pour vous guider à chaque étape de votre projet',
        },
      ],
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
      yourGlobalBalance: 'Votre solde global',
      noActiveLoans: 'Aucun prêt actif',
      noTransfers: 'Aucun transfert trouvé',
      dataLoadError: 'Erreur lors du chargement des données',
      available: 'disponible',
      notifications: 'Notifications',
      noNotifications: 'Aucune notification',
      viewDetails: 'Voir les détails',
      availableOffers: 'Offres disponibles pour vous',
    },
    loan: {
      amount: 'Montant',
      interestRate: 'Taux d\'intérêt',
      nextPayment: 'Prochain paiement',
      viewAll: 'Voir tout',
      status: 'Statut',
      downloadContract: 'Télécharger le contrat',
      uploadSignedContract: 'Télécharger le contrat signé',
      downloading: 'Téléchargement...',
      uploading: 'Téléchargement...',
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
      completed: 'Complété',
      suspended: 'Suspendu',
      noAccount: 'Aucun compte enregistré',
      validation: 'Validation',
      validating: 'Validation...',
      onHold: 'Transfert en pause',
      processing: 'Transfert en cours',
      processingComplete: 'Transfert complété',
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
      active: 'Actif',
      pending: 'En attente',
      completed: 'Complété',
      suspended: 'Suspendu',
      saving: 'Enregistrement...',
      cancel: 'Annuler',
      save: 'Enregistrer',
      close: 'Fermer',
      noData: 'Aucune donnée disponible',
    },
    settings: {
      title: 'Paramètres',
      profile: 'Profil',
      notifications: 'Notifications',
      security: 'Sécurité',
      appearance: 'Apparence',
      personalInfo: 'Informations personnelles',
      updateInfo: 'Mettez à jour vos informations de profil',
      fullName: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      company: 'Entreprise',
      saveChanges: 'Enregistrer les modifications',
      accountType: 'Type de compte',
      yourAccountType: 'Votre compte',
      individualAccount: 'Compte Particulier',
      businessAccount: 'Compte Professionnel',
      individualAccess: 'Accès aux services de financement personnel',
      businessAccess: 'Accès complet aux services de financement d\'entreprise',
      verified: 'Vérifié',
      notificationPreferences: 'Préférences de notification',
      chooseNotifications: 'Choisissez comment vous souhaitez être notifié',
      emailAlerts: 'Alertes par email',
      emailAlertsDesc: 'Recevez des alertes importantes par email',
      transferUpdates: 'Mises à jour de transfert',
      transferUpdatesDesc: 'Notifications sur l\'état de vos transferts',
      loanReminders: 'Rappels de paiement',
      loanRemindersDesc: 'Rappels pour vos échéances de prêt',
      marketingEmails: 'Emails marketing',
      marketingEmailsDesc: 'Recevez des nouvelles et des offres spéciales',
      savePreferences: 'Enregistrer les préférences',
      changePassword: 'Modifier le mot de passe',
      updatePassword: 'Mise à jour de votre mot de passe',
      currentPassword: 'Mot de passe actuel',
      newPassword: 'Nouveau mot de passe',
      confirmNewPassword: 'Confirmer le nouveau mot de passe',
      themeSettings: 'Paramètres de thème',
      chooseTheme: 'Sélectionnez votre thème préféré',
      lightMode: 'Mode clair',
      darkMode: 'Mode sombre',
      systemMode: 'Système',
      languageSettings: 'Paramètres de langue',
      chooseLanguage: 'Sélectionnez votre langue',
    },
    messages: {
      profileUpdated: 'Profil mis à jour',
      profileUpdatedDesc: 'Vos informations ont été enregistrées avec succès.',
      preferencesUpdated: 'Préférences enregistrées',
      preferencesUpdatedDesc: 'Vos préférences de notification ont été mises à jour.',
      passwordChanged: 'Mot de passe modifié',
      passwordChangedDesc: 'Votre mot de passe a été modifié avec succès.',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      errorUpdatingProfile: 'Erreur lors de la mise à jour du profil',
      errorUpdatingPreferences: 'Erreur lors de la mise à jour des préférences',
      errorChangingPassword: 'Erreur lors du changement de mot de passe',
      avatarUpdated: 'Photo de profil mise à jour',
      avatarUpdatedDesc: 'Votre photo de profil a été mise à jour avec succès.',
      errorUploadingAvatar: 'Erreur lors du téléchargement de la photo',
      invalidFileType: 'Type de fichier non autorisé. Seules les images JPEG, PNG et WebP sont acceptées.',
      fileTooLarge: 'Le fichier est trop volumineux (max 5MB).',
    },
    about: {
      title: 'À propos d\'Altus Finance Group',
      subtitle: 'Votre partenaire de confiance pour le financement des particuliers et professionnels',
      mission: 'Notre Mission',
      missionText: 'Chez Altus Finance Group, nous démocratisons l\'accès au financement pour tous. Que vous soyez un particulier avec un projet personnel ou une entreprise en développement, nous proposons des solutions de crédit modernes, transparentes et adaptées à vos besoins. Notre technologie de pointe nous permet d\'analyser rapidement votre situation et de vous proposer des offres personnalisées avec des taux compétitifs. Nous croyons en la transparence totale : pas de frais cachés, des conditions claires et un accompagnement à chaque étape.',
      stats: {
        clients: 'Clients actifs',
        loansProvided: 'Prêts accordés',
        successRate: 'Taux de satisfaction',
        yearsExperience: 'Années d\'expérience',
      },
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Un processus 100% digital ultra-rapide en 4 étapes simples',
      step1Title: 'Demande en ligne - 4 minutes',
      step1Desc: 'Remplissez notre formulaire sécurisé avec vos informations personnelles ou professionnelles. Pas besoin de déplacement, tout se fait en ligne avec vérification d\'identité instantanée (KYC) et téléchargement de documents simplifié.',
      step2Title: 'Réponse ultra-rapide - Quelques minutes à 24h',
      step2Desc: 'Notre technologie d\'évaluation de crédit analyse votre profil financier, vos revenus et votre historique en temps réel. Grâce à nos algorithmes avancés et l\'intégration aux bureaux de crédit, nous vous donnons une réponse de principe en quelques minutes à 24h maximum.',
      step3Title: 'Déblocage des fonds - Immédiat',
      step3Desc: 'Une fois votre demande approuvée, les fonds sont immédiatement débloqués sur votre compte sécurisé Altus Finance Group. Vous gardez le contrôle total de vos fonds avec accès 24/7 depuis votre espace client.',
      step4Title: 'Transfert vers votre compte - À votre rythme',
      step4Desc: 'Transférez vos fonds quand vous le souhaitez vers votre compte bancaire personnel ou professionnel directement depuis votre espace Altus Finance Group. Transferts instantanés ou programmés selon vos besoins, sans frais supplémentaires.',
    },
    products: {
      title: 'Nos Solutions de Prêts',
      subtitle: 'Des produits adaptés à vos besoins - Particuliers et Professionnels',
      businessTitle: 'Prêts Professionnels',
      businessSubtitle: 'Des produits adaptés à vos besoins professionnels',
      termLoans: 'Prêts à Terme Professionnels',
      termLoansDesc: 'Financement à moyen et long terme pour vos investissements stratégiques : développement, acquisition, expansion. De 10 000€ à 500 000€ sur 1 à 7 ans. Taux fixes de 3,5% à 8,5% APR selon profil. Remboursement anticipé sans pénalité.',
      lineOfCredit: 'Ligne de Crédit Renouvelable',
      lineOfCreditDesc: 'Crédit flexible pour gérer votre trésorerie et faire face aux imprévus. De 5 000€ à 100 000€. Taux de 4,0% à 9,0% APR. Ne payez des intérêts que sur les sommes utilisées. Reconstitution automatique du capital disponible.',
      equipmentFinancing: 'Financement d\'Équipement',
      equipmentFinancingDesc: 'Financez vos équipements professionnels, véhicules utilitaires, machines, outils. De 20 000€ à 300 000€ sur 2 à 5 ans. Taux de 3,9% à 7,5% APR. L\'équipement peut servir de garantie, facilitant l\'obtention du prêt.',
      invoiceFactoring: 'Affacturage / Cession de Créances',
      invoiceFactoringDesc: 'Transformez vos factures clients en liquidités immédiates pour améliorer votre cash-flow. Avance jusqu\'à 90% du montant des factures sous 24-48h. Frais de 1% à 3% selon volume et délai. Idéal pour les entreprises B2B.',
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
      subtitle: 'Toutes les informations pour vous accompagner dans votre projet',
      faqTitle: 'Questions Fréquentes',
      faqs: [
        {
          question: 'Quels documents sont nécessaires pour une demande de prêt ?',
          answer: 'Pour les particuliers : pièce d\'identité, justificatif de domicile, derniers bulletins de salaire (3 mois), avis d\'imposition. Pour les professionnels : Kbis de moins de 3 mois, bilans et comptes de résultat (2 derniers exercices), relevés bancaires professionnels (3-6 mois), pièce d\'identité du dirigeant. Tous les documents sont téléchargeables directement en ligne de manière sécurisée.',
        },
        {
          question: 'Combien de temps prend le processus d\'approbation ?',
          answer: 'Grâce à notre technologie d\'analyse en temps réel, vous recevez une réponse de principe en quelques minutes à 24 heures maximum. Une fois approuvé, les fonds sont immédiatement débloqués sur votre compte sécurisé Altus Finance Group. Vous pouvez ensuite les transférer vers votre compte bancaire personnel ou professionnel quand vous le souhaitez, instantanément et sans frais supplémentaires.',
        },
        {
          question: 'Quel est le montant minimum et maximum que je peux emprunter ?',
          answer: 'Prêts personnels : de 1 000€ à 75 000€. Prêts immobiliers : de 50 000€ à 500 000€. Prêts professionnels à terme : de 10 000€ à 500 000€. Lignes de crédit : de 5 000€ à 100 000€. Le montant exact dépend de votre capacité de remboursement calculée selon vos revenus, charges et historique de crédit.',
        },
        {
          question: 'Puis-je rembourser mon prêt par anticipation ?',
          answer: 'Oui, tous nos prêts permettent le remboursement anticipé sans pénalité ni frais cachés. Vous pouvez rembourser partiellement ou totalement votre crédit à tout moment depuis votre espace client. Cela réduit automatiquement le coût total des intérêts. Vous gardez ainsi le contrôle total sur votre crédit.',
        },
        {
          question: 'Quels sont les critères d\'éligibilité pour un prêt ?',
          answer: 'Particuliers : être majeur, résider en France, avoir des revenus réguliers et un taux d\'endettement <40%. Professionnels : entreprise active depuis 6+ mois, chiffre d\'affaires mensuel minimum de 15 000€, pas de défaut de paiement récent. Le score de crédit est vérifié automatiquement via les bureaux de crédit (Experian, Equifax). Les dossiers sont étudiés au cas par cas.',
        },
        {
          question: 'Comment sont calculés les taux d\'intérêt ?',
          answer: 'Nos taux sont calculés par un algorithme qui analyse plusieurs facteurs : votre score de crédit, la durée du prêt, le montant emprunté, vos revenus et charges, votre historique de remboursement et la santé financière (pour les entreprises). Les taux varient de 3,5% à 9,0% APR selon le profil. Nos taux sont parmi les plus compétitifs du marché grâce à notre réseau de partenaires financiers.',
        },
        {
          question: 'Y a-t-il des frais de dossier ou frais cachés ?',
          answer: 'Transparence totale : nous affichons tous les frais dès la simulation. Frais de dossier : 0€ à 150€ selon le type de prêt. Pas de frais de remboursement anticipé. Pas de frais mensuels de gestion. Le TAEG (Taux Annuel Effectif Global) inclut tous les coûts pour une comparaison facile avec d\'autres offres.',
        },
        {
          question: 'Comment calculer ma capacité d\'emprunt ?',
          answer: 'Votre capacité d\'emprunt dépend de votre taux d\'endettement qui ne doit pas dépasser 40% de vos revenus nets. Formule : (Revenus mensuels × 0,40) - Charges de crédit existantes = Mensualité maximale disponible. Notre simulateur en ligne calcule automatiquement votre capacité d\'emprunt et vous propose des montants adaptés. Vous pouvez ajuster la durée pour moduler les mensualités.',
        },
        {
          question: 'Puis-je obtenir un prêt avec un score de crédit faible ?',
          answer: 'Oui, nous acceptons des profils variés. Notre technologie d\'évaluation analyse aussi des données alternatives au-delà du simple score de crédit : stabilité professionnelle, revenus récurrents, épargne, historique bancaire. Scores acceptés dès 500-560 pour certains produits. Même avec un historique imparfait, vous pouvez obtenir un prêt, mais les taux seront ajustés au risque.',
        },
        {
          question: 'Que se passe-t-il si je ne peux pas rembourser une mensualité ?',
          answer: 'Contactez-nous immédiatement. Nous proposons plusieurs solutions : report de mensualité (franchise temporaire), modulation à la baisse des échéances, rééchelonnement du prêt. Des pénalités de retard peuvent s\'appliquer mais nous privilégions toujours le dialogue pour trouver une solution adaptée à votre situation. Un accompagnement personnalisé est disponible en cas de difficultés.',
        },
      ],
    },
    legal: {
      termsTitle: 'Conditions d\'Utilisation',
      privacyTitle: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : Janvier 2025',
      terms: {
        section1Title: '1. Acceptation des Conditions',
        section1Content: 'En accédant et en utilisant les services de Altus Finance Group, vous acceptez et acceptez d\'être lié par les termes et dispositions de cet accord.',
        section2Title: '2. Licence d\'Utilisation',
        section2Content: 'L\'autorisation est accordée pour accéder temporairement aux matériaux (informations ou logiciels) sur la plateforme de Altus Finance Group pour une visualisation personnelle et non commerciale uniquement.',
        section3Title: '3. Contrat de Prêt',
        section3Content: 'Tous les prêts sont soumis à l\'approbation de crédit. Les termes et conditions seront fournis dans un contrat de prêt séparé lors de l\'approbation de votre demande.',
        section4Title: '4. Déclarations et Garanties',
        section4Content: 'Vous déclarez et garantissez que toutes les informations fournies dans votre demande de prêt sont exactes, complètes et à jour.',
        section5Title: '5. Limitation de Responsabilité',
        section5Content: 'En aucun cas Altus Finance Group ou ses fournisseurs ne seront responsables de tout dommage découlant de l\'utilisation ou de l\'impossibilité d\'utiliser les matériaux sur la plateforme de Altus Finance Group.',
        section6Title: '6. Modifications',
        section6Content: 'Altus Finance Group peut réviser ces conditions d\'utilisation à tout moment sans préavis. En utilisant cette plateforme, vous acceptez d\'être lié par la version actuelle de ces conditions.',
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
        section7Content: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à privacy@altus-group.com',
      },
    },
    individualLoans: {
      title: 'Prêts pour Particuliers',
      subtitle: 'Des solutions de financement adaptées à tous vos projets de vie',
      personalLoan: 'Prêt Personnel',
      personalLoanDesc: 'Financement flexible pour tous vos projets sans justificatif d\'utilisation : voyage, mariage, achat équipement. De 1 000€ à 75 000€ sur 12 à 84 mois. Taux TAEG de 2,9% à 7,9% selon profil. Réponse en 48h, fonds sous 5 jours.',
      mortgageLoan: 'Prêt Immobilier',
      mortgageLoanDesc: 'Financez votre résidence principale, secondaire ou investissement locatif. De 50 000€ à 500 000€ sur 10 à 25 ans. Taux fixes ou variables à partir de 1,5% TAEG. Jusqu\'à 110% d\'apport incluant frais de notaire. Simulation personnalisée gratuite.',
      autoLoan: 'Crédit Auto / Moto',
      autoLoanDesc: 'Financez votre véhicule neuf ou d\'occasion, auto ou moto. De 3 000€ à 75 000€ sur 12 à 84 mois. Taux TAEG de 1,9% à 5,9%. Possibilité d\'inclure l\'assurance et les accessoires. Réponse immédiate chez votre concessionnaire partenaire.',
      studentLoan: 'Prêt Étudiant',
      studentLoanDesc: 'Financez vos études supérieures, frais de scolarité, logement étudiant. De 1 000€ à 50 000€. Différé de remboursement total jusqu\'à la fin des études. Taux préférentiels dès 1,5% TAEG. Sans caution parentale sous conditions.',
      greenLoan: 'Prêt Vert / Éco-PTZ',
      greenLoanDesc: 'Financez travaux de rénovation énergétique : isolation, pompe à chaleur, panneaux solaires. De 7 000€ à 50 000€. Taux bonifiés dès 0,5% TAEG. Éligible aux aides d\'État MaPrimeRénov. Jusqu\'à 30 000€ sans apport.',
      renovationLoan: 'Prêt Travaux',
      renovationLoanDesc: 'Rénovez, agrandissez, embellissez votre logement. De 1 500€ à 75 000€ sur 12 à 120 mois. Taux TAEG de 2,5% à 6,9%. Sans garantie hypothécaire jusqu\'à 50 000€. Déblocage progressif selon avancement des travaux possible.',
      amount: 'Montant',
      rate: 'Taux TAEG',
      duration: 'Durée',
      rateDisclaimer: 'Taux indicatifs soumis à conditions d\'éligibilité. TAEG fixe. Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.',
      compareLoans: 'Comparer tous les prêts',
    },
    features: {
      title: 'Pourquoi Choisir Altus Finance Group ?',
      subtitle: 'Une plateforme de prêt moderne et transparente qui met vos besoins au centre',
      security: 'Sécurité Bancaire de Niveau Entreprise',
      securityDesc: 'Cryptage AES-256, conformité RGPD, certification SOC 2 Type II et ISO 27001. Vos données financières sont protégées avec les mêmes standards que les grandes banques. Authentification multi-facteurs et surveillance 24/7 contre la fraude.',
      fast: 'Réponse Express - Quelques Minutes à 24h',
      fastDesc: 'Notre technologie d\'IA analyse votre dossier en temps réel. Réponse de principe en quelques minutes à 24h maximum. Fonds immédiatement débloqués sur votre compte Altus sécurisé. Transférez ensuite vers votre compte bancaire quand vous le souhaitez. 100% digital, zéro paperasse.',
      competitive: 'Taux Parmi Les Plus Bas du Marché',
      competitiveDesc: 'Grâce à notre réseau de 50+ partenaires financiers et notre technologie d\'évaluation optimisée, nous négocions pour vous les meilleurs taux : de 1,5% à 9,0% selon profil. Comparaison automatique pour vous garantir la meilleure offre.',
      flexible: 'Flexibilité Maximale Sans Pénalité',
      flexibleDesc: 'Remboursement anticipé gratuit à tout moment. Modulation des mensualités possible selon votre situation. Report de mensualités en cas de difficultés. Choix de la date de prélèvement. Vous gardez le contrôle total de votre crédit.',
    },
    stats: {
      clients: 'Clients Satisfaits',
      funded: 'Prêts Accordés',
      satisfaction: 'Taux de Satisfaction',
      years: 'Années d\'Expérience',
    },
    testimonials: {
      title: 'Ce que disent nos clients',
      subtitle: 'Plus de 15 000 particuliers et professionnels nous font confiance',
      reviews: [
        { name: 'Sophie Martin', role: 'Chef d\'entreprise', company: 'Boutique Bio Paris', text: 'Altus Finance Group m\'a permis d\'obtenir un financement rapide pour développer mon commerce. Le processus était simple et transparent, j\'ai reçu les fonds en moins d\'une semaine.', rating: 5 },
        { name: 'Thomas Dubois', role: 'Particulier', company: 'Propriétaire', text: 'Excellent service pour mon prêt immobilier. Les conseillers sont à l\'écoute et m\'ont trouvé le meilleur taux. Je recommande vivement leurs services.', rating: 5 },
        { name: 'Marie Laurent', role: 'Directrice Financière', company: 'Tech Solutions SARL', text: 'Grâce à Altus Finance Group, nous avons pu financer l\'achat de nouveaux équipements. La flexibilité de remboursement et le taux compétitif ont fait la différence.', rating: 5 },
        { name: 'Pierre Moreau', role: 'Artisan', company: 'Boulangerie Traditionnelle', text: 'Un service professionnel et efficace. J\'ai obtenu mon prêt travaux sans complications. L\'équipe m\'a accompagné à chaque étape.', rating: 5 },
        { name: 'Isabelle Rousseau', role: 'Commerçante', company: 'Mode & Accessoires', text: 'Je suis très satisfaite du financement obtenu pour l\'expansion de ma boutique. Altus Finance Group comprend vraiment les besoins des entrepreneurs.', rating: 5 },
        { name: 'Jean Petit', role: 'Particulier', company: 'Père de famille', text: 'Mon crédit auto a été approuvé rapidement avec un excellent taux. Le simulateur en ligne m\'a permis de comparer facilement les offres.', rating: 5 },
        { name: 'Caroline Durand', role: 'Infirmière', company: 'Hôpital Saint-Louis', text: 'J\'ai pu financer mes travaux de rénovation énergétique grâce à leur prêt vert. Les taux bonifiés et les conseils sur les aides d\'État m\'ont beaucoup aidée.', rating: 5 },
        { name: 'Marc Lefebvre', role: 'Gérant', company: 'Restaurant Le Gourmet', text: 'La ligne de crédit renouvelable a sauvé ma trésorerie pendant la période difficile. Flexibilité maximale et remboursement anticipé sans frais.', rating: 5 },
        { name: 'Nathalie Bernard', role: 'Architecte', company: 'Bernard & Associés', text: 'Processus 100% digital et rapide. J\'ai obtenu mon prêt professionnel en 3 jours. L\'interface est intuitive et claire.', rating: 5 },
        { name: 'François Garnier', role: 'Étudiant', company: 'École de Commerce', text: 'Le prêt étudiant avec différé de remboursement m\'a permis de financer mes études sans stress. Taux préférentiels et sans caution parentale.', rating: 5 },
        { name: 'Amélie Roussel', role: 'Pharmacienne', company: 'Pharmacie Centrale', text: 'Financement d\'équipement médical approuvé en 48h. Le service client est réactif et professionnel. Très satisfaite de l\'accompagnement.', rating: 5 },
        { name: 'Laurent Mercier', role: 'Développeur', company: 'Tech Startup', text: 'Prêt personnel pour mon projet de formation professionnelle. Pas de justificatif d\'utilisation requis, processus transparent et rapide.', rating: 5 },
        { name: 'Sylvie Blanc', role: 'Professeure', company: 'Lycée Voltaire', text: 'Mon prêt immobilier a été approuvé avec un taux très compétitif. La simulation en ligne m\'a aidée à comparer et choisir la meilleure offre.', rating: 5 },
        { name: 'David Roux', role: 'Entrepreneur', company: 'Startup Innovante', text: 'Le financement d\'équipement m\'a permis d\'acheter les machines nécessaires pour lancer ma production. Remboursement adapté à mon cash-flow.', rating: 5 },
        { name: 'Émilie Girard', role: 'Avocate', company: 'Cabinet Girard', text: 'Processus d\'approbation ultra-rapide grâce à la technologie d\'IA. J\'ai reçu une réponse de principe en moins de 24 heures. Impressionnant !', rating: 5 },
        { name: 'Philippe Simon', role: 'Plombier', company: 'Simon Plomberie', text: 'Prêt travaux pour rénover mon local professionnel. Déblocage progressif selon l\'avancement, c\'est exactement ce qu\'il me fallait.', rating: 5 },
        { name: 'Véronique Martin', role: 'Designer', company: 'Studio Créatif', text: 'La ligne de crédit m\'a donné la flexibilité nécessaire pour gérer les variations de trésorerie de mon activité. Je ne paie que sur ce que j\'utilise.', rating: 5 },
        { name: 'Alexandre Dupont', role: 'Médecin', company: 'Cabinet Médical', text: 'Financement de mon installation en cabinet privé. Montant important approuvé rapidement avec un taux fixe avantageux. Très professionnel.', rating: 5 },
        { name: 'Céline Bonnet', role: 'Fleuriste', company: 'Fleurs & Nature', text: 'Prêt professionnel pour développer ma boutique en ligne. Le processus était simple et l\'équipe m\'a accompagnée à chaque étape. Merci !', rating: 5 },
        { name: 'Olivier Chevalier', role: 'Ingénieur', company: 'Consultant Indépendant', text: 'Crédit auto pour mon véhicule professionnel. Réponse immédiate et fonds transférés en 3 jours. Service impeccable et taux compétitif.', rating: 5 },
        { name: 'Patricia Moreau', role: 'Esthéticienne', company: 'Institut Beauté', text: 'Financement pour l\'achat de nouveaux équipements esthétiques. Pas de frais cachés, tout est transparent dès le début. Je recommande vivement.', rating: 5 },
        { name: 'Julien Fontaine', role: 'Chef cuisinier', company: 'Bistrot Moderne', text: 'Affacturage pour améliorer mon cash-flow. Transformation de mes factures en liquidités en 24h. Solution parfaite pour mon activité B2B.', rating: 5 },
      ],
    },
    auth: {
      title: 'ALTUS',
      subtitle: 'Votre partenaire de confiance pour le financement',
      loginTab: 'Connexion',
      signupTab: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      fullName: 'Nom complet',
      phone: 'Téléphone',
      companyName: 'Nom de l\'entreprise',
      siret: 'SIRET',
      accountType: 'Type de compte',
      personal: 'Particulier',
      personalLoan: 'Prêt personnel',
      business: 'Professionnel',
      businessLoan: 'Prêt entreprise',
      login: 'Se connecter',
      loggingIn: 'Connexion en cours...',
      signup: 'Créer mon compte',
      signingUp: 'Inscription en cours...',
      backToHome: 'Retour à l\'accueil',
      loginSuccess: 'Connexion réussie !',
      loginSuccessDesc: 'Bienvenue sur ALTUS',
      signupSuccess: 'Inscription réussie !',
      signupSuccessDesc: 'Un email de vérification a été envoyé à votre adresse.',
      loginError: 'Erreur de connexion',
      loginErrorDesc: 'Email ou mot de passe incorrect',
      signupError: 'Erreur',
      signupErrorDesc: 'Une erreur est survenue lors de l\'inscription',
      emailNotVerified: 'Email non vérifié',
      emailPlaceholder: 'jean.dupont@example.com',
      passwordPlaceholder: '••••••••',
      fullNamePlaceholder: 'Jean Dupont',
      phonePlaceholder: '+33 6 12 34 56 78',
      companyNamePlaceholder: 'SARL ALTUS',
      siretPlaceholder: '123 456 789 00010',
      required: 'requis',
      companyRequired: 'Le nom de l\'entreprise est requis pour un compte professionnel',
      emailInvalid: 'Email invalide',
      passwordMinLength: 'Le mot de passe doit contenir au moins 12 caractères',
      passwordUppercase: 'Le mot de passe doit contenir au moins une majuscule',
      passwordLowercase: 'Le mot de passe doit contenir au moins une minuscule',
      passwordNumber: 'Le mot de passe doit contenir au moins un chiffre',
      passwordSpecial: 'Le mot de passe doit contenir au moins un caractère spécial',
      passwordMatch: 'Les mots de passe ne correspondent pas',
    },
    bankCard: {
      title: 'Carte Bancaire Professionnelle',
      subtitle: 'Profitez d\'une carte bancaire dédiée à vos transactions professionnelles',
      learnMore: 'En savoir plus',
      orderNow: 'Commander maintenant',
      orderCard: 'Commander ma carte',
      modalTitle: 'Carte Bancaire Professionnelle Altus',
      modalSubtitle: 'Une carte bancaire complète pour tous vos besoins professionnels',
      advantagesTitle: 'Avantages de la carte',
      advantages: {
        cashback: 'Cashback 2%',
        cashbackDesc: 'Profitez de 2% de cashback sur tous vos achats professionnels',
        noFees: 'Sans frais cachés',
        noFeesDesc: 'Transparence totale sur tous les frais et commissions',
        protection: 'Protection maximale',
        protectionDesc: 'Assurance achats et protection contre la fraude incluses',
        rewards: 'Programme de récompenses',
        rewardsDesc: 'Cumulez des points sur chaque transaction',
        global: 'Acceptée mondialement',
        globalDesc: 'Utilisable dans plus de 200 pays et territoires',
        support: 'Support 24/7',
        supportDesc: 'Service client disponible à tout moment',
      },
      usageZonesTitle: 'Zones d\'utilisation',
      usageZones: {
        worldwide: 'Paiements internationaux',
        worldwideDesc: 'Acceptée dans tous les commerces et sites web du monde entier',
        online: 'Achats en ligne',
        onlineDesc: 'Sécurisée pour tous vos achats sur internet',
        stores: 'En magasin',
        storesDesc: 'Paiement sans contact et avec code PIN',
        atm: 'Retraits d\'espèces',
        atmDesc: 'Retraits gratuits dans notre réseau de distributeurs partenaires',
      },
      feesTitle: 'Frais et tarification',
      fees: {
        annualFee: 'Cotisation annuelle',
        annualFeeAmount: 'Gratuit la première année, puis 49€/an',
        transactionFee: 'Frais de transaction',
        transactionFeeAmount: '0% en zone euro',
        withdrawalFee: 'Retrait d\'espèces',
        withdrawalFeeAmount: 'Gratuit dans le réseau partenaire',
        foreignFee: 'Paiement en devise étrangère',
        foreignFeeAmount: '1,5% hors zone euro',
      },
      specificationsTitle: 'Caractéristiques techniques',
      specifications: {
        cardType: 'Type de carte',
        cardTypeValue: 'Visa Business Premium',
        creditLimit: 'Plafond',
        creditLimitValue: 'Jusqu\'à 50 000€ par mois',
        validity: 'Validité',
        validityValue: '5 ans',
        delivery: 'Délai de livraison',
        deliveryValue: '5-7 jours ouvrés',
      },
      orderProcess: 'Comment commander',
      orderProcessDesc: 'Commandez votre carte en quelques clics. Après validation de votre demande, vous recevrez votre carte sous 5-7 jours ouvrés.',
      termsConditions: 'Voir les conditions générales',
      close: 'Fermer',
    },
    notifications: {
      loan_request: { title: 'Demande de prêt soumise', message: 'Votre demande de prêt {loanType} de {amount} € a été soumise avec succès. Nous examinerons votre dossier dans les plus brefs délais.' },
      loan_under_review: { title: 'Demande en cours d\'examen', message: 'Votre demande de prêt de {amount} € est actuellement en cours d\'examen par notre équipe.' },
      loan_approved: { title: 'Prêt approuvé', message: 'Votre demande de prêt de {amount} € a été approuvée. Vous pouvez maintenant procéder à la signature du contrat.' },
      loan_rejected: { title: 'Prêt refusé', message: 'Votre demande de prêt a été refusée. Raison : {reason}' },
      loan_contract_generated: { title: 'Contrat de prêt disponible', message: 'Votre contrat de prêt de {amount} € est maintenant disponible. Veuillez le télécharger, le signer et le renvoyer.' },
      loan_contract_signed: { title: 'Contrat signé reçu', message: 'Nous avons bien reçu votre contrat signé pour le prêt de {amount} €. Votre prêt sera traité dans les plus brefs délais.' },
      loan_disbursed: { title: 'Fonds déboursés', message: 'Les fonds de votre prêt de {amount} € ont été déboursés avec succès sur votre compte.' },
      transfer_initiated: { title: 'Transfert initié', message: 'Votre transfert de {amount} € vers {recipientName} a été initié et est en cours de traitement.' },
      transfer_completed: { title: 'Transfert terminé', message: 'Votre transfert de {amount} € a été complété avec succès.' },
      transfer_approved: { title: 'Transfert approuvé', message: 'Votre demande de transfert a été approuvée par l\'administration.' },
      transfer_suspended: { title: 'Transfert suspendu', message: 'Votre transfert a été suspendu. Raison : {reason}' },
      code_issued: { title: 'Code de validation émis', message: 'Un nouveau code de validation (#{sequence}) a été émis pour votre transfert. Vérifiez vos emails.' },
      kyc_approved: { title: 'Documents KYC approuvés', message: 'Vos documents ont été vérifiés et approuvés. Votre compte est maintenant actif.' },
      kyc_rejected: { title: 'Documents KYC refusés', message: 'Vos documents ont été refusés. Raison : {reason}. Veuillez soumettre de nouveaux documents.' },
      fee_added: { title: 'Nouveaux frais', message: 'Des frais de {amount} € ont été ajoutés à votre compte. Raison : {reason}' },
      account_status_changed: { title: 'Statut du compte modifié', message: 'Le statut de votre compte a été modifié : {newStatus}. {reason}' },
      admin_message_sent: { title: 'Nouveau message de l\'administration', message: '{subject}' },
      general: { title: 'Notification', message: 'Vous avez une nouvelle notification.' },
      twoFactorSuggestion: { title: 'Sécurisez votre compte', message: 'Activez l\'authentification à deux facteurs pour renforcer la sécurité de votre compte.' },
      markAllRead: 'Tout marquer comme lu',
      markAsRead: 'Marquer comme lu',
      deleteNotification: 'Supprimer',
    },
    dialogs: {
      newLoan: {
        title: 'Nouvelle demande de prêt',
        subtitle: 'Complétez les informations pour votre demande',
        loanType: 'Type de prêt',
        selectLoanType: 'Sélectionnez le type de prêt',
        amount: 'Montant',
        enterAmount: 'Entrez le montant souhaité',
        duration: 'Durée',
        selectDuration: 'Sélectionnez la durée',
        months: 'mois',
        estimatedRate: 'Taux estimé',
        monthlyPayment: 'Mensualité estimée',
        totalRepayment: 'Montant total à rembourser',
        firstRequestAlert: 'Première demande :',
        firstRequestAlertDesc: 'Vos documents seront vérifiés une seule fois. Les demandes suivantes ne nécessiteront plus de documents.',
        addBankAccount: 'Ajouter un compte bancaire',
        selectAccount: 'Sélectionnez un compte',
        bankName: 'Nom de la banque',
        bankNamePlaceholder: 'Ex: BNP Paribas',
        accountLabel: 'Libellé du compte',
        accountLabelPlaceholder: 'Ex: Compte courant principal',
        iban: 'IBAN',
        ibanPlaceholder: 'FR76 1234 5678 9012 3456 7890 123',
        bic: 'BIC/SWIFT',
        bicPlaceholder: 'BNPAFRPP',
        uploadDocuments: 'Télécharger vos documents',
        kycDocumentsTab: 'Documents KYC',
        additionalDocumentsTab: 'Documents supplémentaires',
        identity: 'Pièce d\'identité',
        proof_of_address: 'Justificatif de domicile',
        income_proof: 'Justificatif de revenus',
        business_registration: 'Extrait Kbis',
        financial_statements: 'Bilans financiers',
        tax_returns: 'Déclaration d\'impôts',
        submit: 'Soumettre la demande',
        submitting: 'Soumission...',
        cancel: 'Annuler',
        loanTypes: {
          personal: 'Prêt personnel',
          auto: 'Prêt auto',
          mortgage: 'Prêt immobilier',
          green: 'Prêt vert',
          renovation: 'Prêt rénovation',
          student: 'Prêt étudiant',
          business: 'Prêt professionnel',
          cashFlow: 'Crédit de trésorerie',
          equipment: 'Financement équipement',
          commercialProperty: 'Prêt immobilier pro',
          lineOfCredit: 'Ligne de crédit',
          vehicleFleet: 'Crédit véhicule pro',
        },
      },
      transfer: {
        title: 'Transférer des fonds',
        subtitle: 'Initiez un transfert sécurisé vers un compte externe',
        selectAccount: 'Sélectionnez un compte',
        noAccountsAvailable: 'Aucun compte bancaire disponible',
        amount: 'Montant',
        enterAmount: 'Entrez le montant',
        availableFunds: 'Fonds disponibles',
        feesAndProcessing: 'Frais de 2% • Traitement sous 24-48h',
        submit: 'Initier le transfert',
        submitting: 'Traitement...',
        cancel: 'Annuler',
      },
      cardTerms: {
        title: 'Conditions générales de la carte bancaire',
        acceptTerms: 'Accepter les conditions',
        declineTerms: 'Refuser',
      },
      welcome: {
        title: 'Bienvenue sur ALTUS',
        description: 'Votre compte a été créé avec succès',
        accountTypeTitle: 'Votre type de compte',
        individualAccount: 'Compte Particulier',
        businessAccount: 'Compte Professionnel',
        individualAccess: 'Accès aux services de financement personnel',
        businessAccess: 'Accès complet aux services de financement d\'entreprise',
        availableOffers: 'Offres disponibles pour vous',
        getStarted: 'Commencer',
      },
      transactionHistory: {
        title: 'Historique des transactions',
        type: 'Type',
        amount: 'Montant',
        date: 'Date',
        status: 'Statut',
        noTransactions: 'Aucune transaction trouvée',
        close: 'Fermer',
      },
    },
    verify: {
      verifying: 'Vérification en cours...',
      success: 'Email vérifié !',
      successMessage: 'Votre email a été vérifié avec succès. Vous allez être redirigé vers le tableau de bord.',
      goToDashboard: 'Aller au tableau de bord',
      error: 'Erreur de vérification',
      errorMessage: 'Le lien de vérification est invalide ou a expiré.',
      tryAgain: 'Réessayer',
      backToSignup: 'Retour à l\'inscription',
      backToHome: 'Retour à l\'accueil',
    },
    forgotPassword: {
      title: 'Mot de passe oublié',
      description: 'Réinitialisez votre mot de passe',
      instructions: 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
      emailLabel: 'Adresse email',
      emailPlaceholder: 'votre.email@exemple.com',
      sendResetLink: 'Envoyer le lien',
      sending: 'Envoi...',
      backToLogin: 'Retour à la connexion',
      emailSent: 'Email envoyé',
      emailSentDesc: 'Un lien de réinitialisation a été envoyé à votre adresse email.',
      error: 'Erreur',
      errorDesc: 'Une erreur s\'est produite. Veuillez réessayer.',
    },
    resetPassword: {
      title: 'Réinitialiser le mot de passe',
      description: 'Créez un nouveau mot de passe',
      newPassword: 'Nouveau mot de passe',
      newPasswordPlaceholder: 'Entrez votre nouveau mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      confirmPasswordPlaceholder: 'Confirmez votre nouveau mot de passe',
      requirements: 'Exigences du mot de passe :',
      minLength: 'Au moins 12 caractères',
      uppercase: 'Une lettre majuscule',
      lowercase: 'Une lettre minuscule',
      number: 'Un chiffre',
      specialChar: 'Un caractère spécial',
      passwordStrength: 'Force du mot de passe',
      weak: 'Faible',
      medium: 'Moyen',
      strong: 'Fort',
      veryStrong: 'Très fort',
      resetPassword: 'Réinitialiser',
      resetting: 'Réinitialisation...',
      success: 'Succès',
      successMessage: 'Votre mot de passe a été réinitialisé avec succès.',
      error: 'Erreur',
      invalidToken: 'Le lien de réinitialisation est invalide ou a expiré.',
      passwordMismatch: 'Les mots de passe ne correspondent pas.',
    },
    twoFactorAuth: {
      setup: {
        title: 'Configurer l\'authentification à deux facteurs',
        description: 'Renforcez la sécurité de votre compte',
        step1: 'Étape 1: Télécharger l\'application',
        step1Description: 'Téléchargez Google Authenticator ou Authy sur votre téléphone',
        step2: 'Étape 2: Scanner le QR code',
        step2Description: 'Scannez ce QR code avec votre application d\'authentification',
        step3: 'Étape 3: Vérifier le code',
        step3Description: 'Entrez le code à 6 chiffres généré par l\'application',
        qrCodeInstructions: 'Scannez ce QR code avec votre application d\'authentification',
        cantScanQR: 'Impossible de scanner ? Entrez ce code manuellement :',
        secretKey: 'Clé secrète',
        enterCode: 'Entrez le code à 6 chiffres',
        codePlaceholder: '000000',
        verify: 'Activer 2FA',
        verifying: 'Vérification...',
        cancel: 'Annuler',
        successTitle: '2FA activé',
        successMessage: 'L\'authentification à deux facteurs a été activée avec succès.',
        errorTitle: 'Erreur',
        errorMessage: 'Le code est invalide. Veuillez réessayer.',
      },
      disable: {
        title: 'Désactiver l\'authentification à deux facteurs',
        description: 'Entrez votre mot de passe pour confirmer',
        enterPassword: 'Mot de passe',
        passwordPlaceholder: 'Entrez votre mot de passe',
        disable: 'Désactiver 2FA',
        disabling: 'Désactivation...',
        cancel: 'Annuler',
        successTitle: '2FA désactivé',
        successMessage: 'L\'authentification à deux facteurs a été désactivée.',
        errorTitle: 'Erreur',
        errorMessage: 'Mot de passe incorrect.',
      },
      login: {
        title: 'Authentification à deux facteurs',
        description: 'Entrez le code de votre application d\'authentification',
        enterCode: 'Code à 6 chiffres',
        codePlaceholder: '000000',
        verify: 'Vérifier',
        verifying: 'Vérification...',
        cancel: 'Annuler',
        errorTitle: 'Erreur',
        errorMessage: 'Code invalide. Veuillez réessayer.',
      },
    },
    bankAccounts: {
      title: 'Comptes bancaires',
      description: 'Gérez vos comptes bancaires externes',
      addAccount: 'Ajouter un compte',
      noAccountsTitle: 'Aucun compte bancaire',
      noAccountsDescription: 'Ajoutez un compte bancaire pour pouvoir effectuer des transferts.',
      accountLabel: 'Libellé',
      bankName: 'Banque',
      iban: 'IBAN',
      bic: 'BIC',
      createdAt: 'Ajouté le',
      actions: 'Actions',
      delete: 'Supprimer',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce compte ?',
      deleteSuccess: 'Compte supprimé avec succès',
      addAccountTitle: 'Ajouter un compte bancaire',
      addAccountDescription: 'Ajoutez un compte bancaire externe pour les transferts',
      accountLabelLabel: 'Libellé du compte',
      accountLabelPlaceholder: 'Ex: Compte courant principal',
      accountLabelRequired: 'Le libellé est requis',
      bankNameLabel: 'Nom de la banque',
      bankNamePlaceholder: 'Ex: BNP Paribas',
      bankNameRequired: 'Le nom de la banque est requis',
      ibanLabel: 'IBAN',
      ibanPlaceholder: 'FR76 1234 5678 9012 3456 7890 123',
      ibanRequired: 'L\'IBAN est requis',
      bicLabel: 'BIC/SWIFT',
      bicPlaceholder: 'BNPAFRPP',
      submit: 'Ajouter le compte',
      submitting: 'Ajout...',
      cancel: 'Annuler',
      addSuccess: 'Compte ajouté',
      addSuccessDesc: 'Le compte bancaire a été ajouté avec succès.',
      addError: 'Erreur lors de l\'ajout du compte',
    },
    welcomeModal: {
      title: 'Bienvenue sur ALTUS',
      description: 'Votre compte a été créé avec succès',
      accountType: 'Votre type de compte',
      individualAccount: 'Compte Particulier',
      businessAccount: 'Compte Professionnel',
      individualAccess: 'Accès aux services de financement personnel',
      businessAccess: 'Accès complet aux services de financement d\'entreprise',
      availableOffers: 'Offres disponibles pour vous',
      getStarted: 'Commencer',
    },
    calculator: {
      title: 'Calculateur d\'amortissement',
      description: 'Simulez votre plan de remboursement',
      loanAmount: 'Montant du prêt',
      interestRate: 'Taux d\'intérêt annuel (%)',
      loanDuration: 'Durée du prêt',
      months: 'mois',
      calculate: 'Calculer',
      results: 'Résultats',
      monthlyPayment: 'Mensualité',
      totalInterest: 'Intérêts totaux',
      totalAmount: 'Montant total',
      amortizationSchedule: 'Tableau d\'amortissement',
      month: 'Mois',
      payment: 'Paiement',
      principal: 'Capital',
      interest: 'Intérêts',
      balance: 'Solde restant',
      downloadSchedule: 'Télécharger le tableau',
    },
    kycDocuments: {
      title: 'Documents KYC',
      description: 'Téléchargez vos documents d\'identification',
      uploadDocuments: 'Télécharger vos documents',
      documentType: 'Type de document',
      selectDocumentType: 'Sélectionnez le type',
      identity: 'Pièce d\'identité',
      proof_of_address: 'Justificatif de domicile',
      income_proof: 'Justificatif de revenus',
      business_registration: 'Extrait Kbis',
      financial_statements: 'Bilans financiers',
      tax_returns: 'Déclaration d\'impôts',
      chooseFile: 'Choisir un fichier',
      upload: 'Télécharger',
      uploading: 'Téléchargement...',
      uploadSuccess: 'Document téléchargé',
      uploadSuccessDesc: 'Votre document a été téléchargé avec succès.',
      uploadError: 'Erreur lors du téléchargement',
      status: 'Statut',
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Refusé',
      uploadedAt: 'Téléchargé le',
      noDocuments: 'Aucun document téléchargé',
    },
  },
  en: {
    hero: {
      title: 'Make Your Projects a Reality with Altus Finance Group',
      subtitle: 'Financing solutions for individuals and businesses - Competitive rates and transparent process',
      cta1: 'Request a Loan',
      cta2: 'My Account',
      trustIndicator: 'Trusted by 15,000+ satisfied clients',
      slides: [
        {
          title: 'Make Your Projects a Reality with Altus Finance Group',
          subtitle: 'Financing solutions for individuals and businesses - Competitive rates and transparent process',
        },
        {
          title: 'Tailored Financial Solutions',
          subtitle: 'Personalized support to bring all your professional and personal projects to life',
        },
        {
          title: 'Your Trusted Partner',
          subtitle: 'Over 15,000 satisfied clients trust us for their financing needs',
        },
        {
          title: 'Finance Your Ambitions',
          subtitle: 'Competitive rates and a simple process to make your projects come true',
        },
        {
          title: 'Expertise and Support',
          subtitle: 'A dedicated team to guide you every step of the way',
        },
      ],
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
      yourGlobalBalance: 'Your Global Balance',
      noActiveLoans: 'No Active Loans',
      noTransfers: 'No Transfers Found',
      dataLoadError: 'Error loading data',
      available: 'available',
      notifications: 'Notifications',
      noNotifications: 'No notifications',
      viewDetails: 'View Details',
      availableOffers: 'Available offers for you',
    },
    loan: {
      amount: 'Amount',
      interestRate: 'Interest Rate',
      nextPayment: 'Next Payment',
      viewAll: 'View All',
      status: 'Status',
      downloadContract: 'Download Contract',
      uploadSignedContract: 'Upload Signed Contract',
      downloading: 'Downloading...',
      uploading: 'Uploading...',
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
      completed: 'Completed',
      suspended: 'Suspended',
      noAccount: 'No registered account',
      validation: 'Validation',
      validating: 'Validating...',
      onHold: 'Transfer on hold',
      processing: 'Transfer in progress',
      processingComplete: 'Transfer completed',
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
      active: 'Active',
      pending: 'Pending',
      completed: 'Completed',
      suspended: 'Suspended',
      saving: 'Saving...',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
      noData: 'No data available',
    },
    about: {
      title: 'About Altus Finance Group',
      subtitle: 'Your trusted partner for financing individuals and businesses',
      mission: 'Our Mission',
      missionText: 'At Altus Finance Group, we democratize access to financing for everyone. Whether you\'re an individual with a personal project or a growing business, we offer modern, transparent credit solutions tailored to your needs. Our cutting-edge technology enables us to quickly analyze your situation and offer personalized deals with competitive rates. We believe in total transparency: no hidden fees, clear terms, and support at every step.',
      stats: {
        clients: 'Active clients',
        loansProvided: 'Loans provided',
        successRate: 'Satisfaction rate',
        yearsExperience: 'Years of experience',
      },
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'An ultra-fast 100% digital process in 4 simple steps',
      step1Title: 'Online Application - 4 Minutes',
      step1Desc: 'Complete our secure form with your personal or business information. No need to travel, everything is done online with instant identity verification (KYC) and simplified document upload.',
      step2Title: 'Ultra-Fast Response - Minutes to 24h',
      step2Desc: 'Our credit assessment technology analyzes your financial profile, income, and history in real-time. Thanks to our advanced algorithms and credit bureau integration, we give you an approval response in minutes to 24 hours maximum.',
      step3Title: 'Immediate Fund Disbursement',
      step3Desc: 'Once your application is approved, funds are immediately released to your secure Altus Finance Group account. You maintain full control of your funds with 24/7 access from your client dashboard.',
      step4Title: 'Transfer to Your Account - At Your Pace',
      step4Desc: 'Transfer your funds whenever you want to your personal or business bank account directly from your Altus dashboard. Instant or scheduled transfers according to your needs, with no additional fees.',
    },
    products: {
      title: 'Our Loan Solutions',
      subtitle: 'Products tailored to your needs - Individuals and Businesses',
      businessTitle: 'Business Loans',
      businessSubtitle: 'Products tailored to your business needs',
      termLoans: 'Professional Term Loans',
      termLoansDesc: 'Medium and long-term financing for your strategic investments: development, acquisition, expansion. From €10,000 to €500,000 over 1 to 7 years. Fixed rates from 3.5% to 8.5% APR depending on profile. Early repayment without penalty.',
      lineOfCredit: 'Revolving Line of Credit',
      lineOfCreditDesc: 'Flexible credit to manage your cash flow and handle unexpected expenses. From €5,000 to €100,000. Rates from 4.0% to 9.0% APR. Pay interest only on amounts used. Automatic reconstitution of available capital.',
      equipmentFinancing: 'Equipment Financing',
      equipmentFinancingDesc: 'Finance your professional equipment, utility vehicles, machines, tools. From €20,000 to €300,000 over 2 to 5 years. Rates from 3.9% to 7.5% APR. Equipment can serve as collateral, facilitating loan approval.',
      invoiceFactoring: 'Invoice Factoring / Receivables',
      invoiceFactoringDesc: 'Turn your customer invoices into immediate cash to improve cash flow. Advance up to 90% of invoice amounts within 24-48h. Fees from 1% to 3% depending on volume and delay. Ideal for B2B companies.',
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
      subtitle: 'All the information to support you in your project',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'What documents are required for a loan application?',
          answer: 'For individuals: ID, proof of address, recent pay slips (3 months), tax notice. For businesses: company registration (<3 months), balance sheets and income statements (last 2 years), business bank statements (3-6 months), director\'s ID. All documents can be uploaded directly online securely.',
        },
        {
          question: 'How long does the approval process take?',
          answer: 'Thanks to our real-time analysis technology, you receive an approval response in minutes to 24 hours maximum. Once approved, funds are immediately released to your secure Altus Finance Group account. You can then transfer them to your personal or business bank account whenever you want, instantly and at no extra cost.',
        },
        {
          question: 'What is the minimum and maximum amount I can borrow?',
          answer: 'Personal loans: €1,000 to €75,000. Mortgage loans: €50,000 to €500,000. Business term loans: €10,000 to €500,000. Lines of credit: €5,000 to €100,000. The exact amount depends on your repayment capacity calculated based on income, expenses, and credit history.',
        },
        {
          question: 'Can I repay my loan early?',
          answer: 'Yes, all our loans allow early repayment without penalty or hidden fees. You can partially or fully repay your credit anytime from your customer area. This automatically reduces the total interest cost. You maintain full control over your credit.',
        },
        {
          question: 'What are the eligibility criteria for a loan?',
          answer: 'Individuals: be of legal age, reside in France, have regular income, and debt ratio <40%. Businesses: active for 6+ months, minimum monthly revenue of €15,000, no recent payment defaults. Credit score is automatically verified via credit bureaus (Experian, Equifax). Cases are reviewed individually.',
        },
        {
          question: 'How are interest rates calculated?',
          answer: 'Our rates are calculated by an algorithm that analyzes several factors: your credit score, loan duration, amount borrowed, income and expenses, repayment history, and financial health (for businesses). Rates range from 3.5% to 9.0% APR depending on profile. Our rates are among the most competitive on the market thanks to our network of financial partners.',
        },
        {
          question: 'Are there application fees or hidden charges?',
          answer: 'Total transparency: we display all fees from the simulation. Application fees: €0 to €150 depending on loan type. No early repayment fees. No monthly management fees. The APR (Annual Percentage Rate) includes all costs for easy comparison with other offers.',
        },
        {
          question: 'How to calculate my borrowing capacity?',
          answer: 'Your borrowing capacity depends on your debt ratio which must not exceed 40% of your net income. Formula: (Monthly income × 0.40) - Existing credit charges = Maximum available monthly payment. Our online simulator automatically calculates your borrowing capacity and suggests appropriate amounts. You can adjust the duration to modulate payments.',
        },
        {
          question: 'Can I get a loan with a low credit score?',
          answer: 'Yes, we accept various profiles. Our assessment technology also analyzes alternative data beyond the simple credit score: professional stability, recurring income, savings, banking history. Scores accepted from 500-560 for certain products. Even with imperfect history, you can get a loan, but rates will be adjusted to risk.',
        },
        {
          question: 'What happens if I cannot pay a monthly payment?',
          answer: 'Contact us immediately. We offer several solutions: payment deferral (temporary grace period), downward payment modulation, loan rescheduling. Late penalties may apply but we always favor dialogue to find a solution adapted to your situation. Personalized support is available in case of difficulties.',
        },
      ],
    },
    legal: {
      termsTitle: 'Terms of Service',
      privacyTitle: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2025',
      terms: {
        section1Title: '1. Acceptance of Terms',
        section1Content: 'By accessing and using Altus Finance Group\'s services, you accept and agree to be bound by the terms and provision of this agreement.',
        section2Title: '2. Use License',
        section2Content: 'Permission is granted to temporarily access the materials (information or software) on Altus Finance Group\'s platform for personal, non-commercial transitory viewing only.',
        section3Title: '3. Loan Agreement',
        section3Content: 'All loans are subject to credit approval. Terms and conditions will be provided in a separate loan agreement upon approval of your application.',
        section4Title: '4. Representations and Warranties',
        section4Content: 'You represent and warrant that all information provided in your loan application is accurate, complete, and current.',
        section5Title: '5. Limitation of Liability',
        section5Content: 'In no event shall Altus Finance Group or its suppliers be liable for any damages arising out of the use or inability to use the materials on Altus Finance Group\'s platform.',
        section6Title: '6. Modifications',
        section6Content: 'Altus Finance Group may revise these terms of service at any time without notice. By using this platform, you agree to be bound by the current version of these terms.',
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
        section7Content: 'If you have questions about this Privacy Policy, please contact us at privacy@altus-group.com',
      },
    },
    individualLoans: {
      title: 'Personal Loans',
      subtitle: 'Financing solutions tailored to all your life projects',
      personalLoan: 'Personal Loan',
      personalLoanDesc: 'Flexible financing for all your projects without proof of use: travel, wedding, equipment purchase. From €1,000 to €75,000 over 12 to 84 months. APR rates from 2.9% to 7.9% depending on profile. Response in 48h, funds within 5 days.',
      mortgageLoan: 'Mortgage Loan',
      mortgageLoanDesc: 'Finance your primary, secondary residence or rental investment. From €50,000 to €500,000 over 10 to 25 years. Fixed or variable rates from 1.5% APR. Up to 110% contribution including notary fees. Free personalized simulation.',
      autoLoan: 'Auto / Motorcycle Loan',
      autoLoanDesc: 'Finance your new or used vehicle, car or motorcycle. From €3,000 to €75,000 over 12 to 84 months. APR rates from 1.9% to 5.9%. Possibility to include insurance and accessories. Instant response at your partner dealership.',
      studentLoan: 'Student Loan',
      studentLoanDesc: 'Finance your higher education, tuition fees, student housing. From €1,000 to €50,000. Total repayment deferral until end of studies. Preferential rates from 1.5% APR. Without parental guarantee under conditions.',
      greenLoan: 'Green Loan / Eco-PTZ',
      greenLoanDesc: 'Finance energy renovation work: insulation, heat pump, solar panels. From €7,000 to €50,000. Subsidized rates from 0.5% APR. Eligible for state aid MaPrimeRénov. Up to €30,000 without contribution.',
      renovationLoan: 'Home Improvement Loan',
      renovationLoanDesc: 'Renovate, expand, beautify your home. From €1,500 to €75,000 over 12 to 120 months. APR rates from 2.5% to 6.9%. Without mortgage guarantee up to €50,000. Progressive release according to work progress possible.',
      amount: 'Amount',
      rate: 'APR Rate',
      duration: 'Duration',
      rateDisclaimer: 'Indicative rates subject to eligibility conditions. Fixed APR. Credit commits you and must be repaid. Check your repayment capacity before committing.',
      compareLoans: 'Compare all loans',
    },
    features: {
      title: 'Why Choose Altus Finance Group?',
      subtitle: 'A modern and transparent lending platform that puts your needs first',
      security: 'Enterprise-Grade Banking Security',
      securityDesc: 'AES-256 encryption, GDPR compliance, SOC 2 Type II and ISO 27001 certification. Your financial data is protected with the same standards as major banks. Multi-factor authentication and 24/7 fraud monitoring.',
      fast: 'Express Response - Minutes to 24h',
      fastDesc: 'Our AI technology analyzes your file in real-time. Approval response in minutes to 24 hours maximum. Funds immediately released to your secure Altus account. Then transfer to your bank account whenever you want. 100% digital, zero paperwork.',
      competitive: 'Among The Lowest Rates on the Market',
      competitiveDesc: 'Thanks to our network of 50+ financial partners and optimized assessment technology, we negotiate the best rates for you: from 1.5% to 9.0% depending on profile. Automatic comparison to guarantee you the best offer.',
      flexible: 'Maximum Flexibility Without Penalty',
      flexibleDesc: 'Free early repayment anytime. Possible payment modulation according to your situation. Payment deferral in case of difficulties. Choice of debit date. You maintain total control of your credit.',
    },
    stats: {
      clients: 'Satisfied Clients',
      funded: 'Loans Provided',
      satisfaction: 'Satisfaction Rate',
      years: 'Years of Experience',
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Trusted by 15,000+ individuals and businesses',
      reviews: [
        { name: 'Sophie Martin', role: 'Business Owner', company: 'Organic Store Paris', text: 'Altus Finance Group enabled me to obtain quick financing to develop my business. The process was simple and transparent, I received the funds in less than a week.', rating: 5 },
        { name: 'Thomas Dubois', role: 'Individual', company: 'Homeowner', text: 'Excellent service for my mortgage. The advisors are attentive and found me the best rate. I highly recommend their services.', rating: 5 },
        { name: 'Marie Laurent', role: 'CFO', company: 'Tech Solutions Ltd', text: 'Thanks to Altus Finance Group, we were able to finance the purchase of new equipment. The repayment flexibility and competitive rate made all the difference.', rating: 5 },
        { name: 'Pierre Moreau', role: 'Craftsman', company: 'Traditional Bakery', text: 'A professional and efficient service. I got my home improvement loan without complications. The team supported me every step of the way.', rating: 5 },
        { name: 'Isabelle Rousseau', role: 'Retailer', company: 'Fashion & Accessories', text: 'I am very satisfied with the financing obtained for the expansion of my shop. Altus Finance Group truly understands the needs of entrepreneurs.', rating: 5 },
        { name: 'Jean Petit', role: 'Individual', company: 'Family Man', text: 'My car loan was approved quickly with an excellent rate. The online simulator allowed me to easily compare offers.', rating: 5 },
        { name: 'Caroline Durand', role: 'Nurse', company: 'Saint-Louis Hospital', text: 'I was able to finance my energy renovation work thanks to their green loan. The subsidized rates and advice on state aid helped me a lot.', rating: 5 },
        { name: 'Marc Lefebvre', role: 'Manager', company: 'Le Gourmet Restaurant', text: 'The revolving credit line saved my cash flow during the difficult period. Maximum flexibility and free early repayment.', rating: 5 },
        { name: 'Nathalie Bernard', role: 'Architect', company: 'Bernard & Associates', text: '100% digital and fast process. I got my business loan in 3 days. The interface is intuitive and clear.', rating: 5 },
        { name: 'François Garnier', role: 'Student', company: 'Business School', text: 'The student loan with deferred repayment allowed me to finance my studies stress-free. Preferential rates and without parental guarantee.', rating: 5 },
      ],
    },
    auth: {
      title: 'ALTUS',
      subtitle: 'Your trusted partner for financing',
      loginTab: 'Login',
      signupTab: 'Sign up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      fullName: 'Full name',
      phone: 'Phone',
      companyName: 'Company name',
      siret: 'SIRET',
      accountType: 'Account type',
      personal: 'Personal',
      personalLoan: 'Personal loan',
      business: 'Business/Professional',
      businessLoan: 'Business loan',
      login: 'Log in',
      loggingIn: 'Logging in...',
      signup: 'Create my account',
      signingUp: 'Signing up...',
      backToHome: 'Back to home',
      loginSuccess: 'Login successful!',
      loginSuccessDesc: 'Welcome to ALTUS',
      signupSuccess: 'Sign up successful!',
      signupSuccessDesc: 'A verification email has been sent to your address.',
      loginError: 'Login error',
      loginErrorDesc: 'Incorrect email or password',
      signupError: 'Error',
      signupErrorDesc: 'An error occurred during sign up',
      emailNotVerified: 'Email not verified',
      emailPlaceholder: 'john.doe@example.com',
      passwordPlaceholder: '••••••••',
      fullNamePlaceholder: 'John Doe',
      phonePlaceholder: '+44 20 1234 5678',
      companyNamePlaceholder: 'Company Ltd',
      siretPlaceholder: '123 456 789 00010',
      required: 'required',
      companyRequired: 'Company name is required for business accounts',
      emailInvalid: 'Invalid email',
      passwordMinLength: 'Password must contain at least 12 characters',
      passwordUppercase: 'Password must contain at least one uppercase letter',
      passwordLowercase: 'Password must contain at least one lowercase letter',
      passwordNumber: 'Password must contain at least one number',
      passwordSpecial: 'Password must contain at least one special character',
      passwordMatch: 'Passwords do not match',
    },
    settings: {
      title: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
      security: 'Security',
      appearance: 'Appearance',
      personalInfo: 'Personal information',
      updateInfo: 'Update your profile information',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      saveChanges: 'Save changes',
      accountType: 'Account type',
      yourAccountType: 'Your account',
      individualAccount: 'Personal Account',
      businessAccount: 'Business Account',
      individualAccess: 'Access to personal financing services',
      businessAccess: 'Full access to business financing services',
      verified: 'Verified',
      notificationPreferences: 'Notification preferences',
      chooseNotifications: 'Choose how you want to be notified',
      emailAlerts: 'Email alerts',
      emailAlertsDesc: 'Receive important alerts by email',
      transferUpdates: 'Transfer updates',
      transferUpdatesDesc: 'Notifications about your transfer status',
      loanReminders: 'Payment reminders',
      loanRemindersDesc: 'Reminders for your loan payment dates',
      marketingEmails: 'Marketing emails',
      marketingEmailsDesc: 'Receive news and special offers',
      savePreferences: 'Save preferences',
      changePassword: 'Change password',
      updatePassword: 'Update your password',
      currentPassword: 'Current password',
      newPassword: 'New password',
      confirmNewPassword: 'Confirm new password',
      themeSettings: 'Theme settings',
      chooseTheme: 'Select your preferred theme',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      systemMode: 'System',
      languageSettings: 'Language settings',
      chooseLanguage: 'Select your language',
    },
    messages: {
      profileUpdated: 'Profile updated',
      profileUpdatedDesc: 'Your information has been successfully saved.',
      preferencesUpdated: 'Preferences saved',
      preferencesUpdatedDesc: 'Your notification preferences have been updated.',
      passwordChanged: 'Password changed',
      passwordChangedDesc: 'Your password has been successfully changed.',
      passwordMismatch: 'Passwords do not match',
      errorUpdatingProfile: 'Error updating profile',
      errorUpdatingPreferences: 'Error updating preferences',
      errorChangingPassword: 'Error changing password',
      avatarUpdated: 'Profile photo updated',
      avatarUpdatedDesc: 'Your profile photo has been successfully updated.',
      errorUploadingAvatar: 'Error uploading photo',
      invalidFileType: 'Unauthorized file type. Only JPEG, PNG and WebP images are accepted.',
      fileTooLarge: 'File is too large (max 5MB).',
    },
    bankCard: {
      title: 'Professional Bank Card',
      subtitle: 'Enjoy a bank card dedicated to your professional transactions',
      learnMore: 'Learn more',
      orderNow: 'Order now',
      orderCard: 'Order my card',
      modalTitle: 'Altus Professional Bank Card',
      modalSubtitle: 'A complete bank card for all your professional needs',
      advantagesTitle: 'Card Benefits',
      advantages: {
        cashback: '2% Cashback',
        cashbackDesc: 'Enjoy 2% cashback on all your professional purchases',
        noFees: 'No Hidden Fees',
        noFeesDesc: 'Complete transparency on all fees and commissions',
        protection: 'Maximum Protection',
        protectionDesc: 'Purchase insurance and fraud protection included',
        rewards: 'Rewards Program',
        rewardsDesc: 'Earn points on every transaction',
        global: 'Accepted Worldwide',
        globalDesc: 'Usable in over 200 countries and territories',
        support: '24/7 Support',
        supportDesc: 'Customer service available at all times',
      },
      usageZonesTitle: 'Usage Zones',
      usageZones: {
        worldwide: 'International Payments',
        worldwideDesc: 'Accepted at all stores and websites worldwide',
        online: 'Online Shopping',
        onlineDesc: 'Secure for all your internet purchases',
        stores: 'In Store',
        storesDesc: 'Contactless payment and PIN code',
        atm: 'Cash Withdrawals',
        atmDesc: 'Free withdrawals at our partner ATM network',
      },
      feesTitle: 'Fees and Pricing',
      fees: {
        annualFee: 'Annual Fee',
        annualFeeAmount: 'Free first year, then £49/year',
        transactionFee: 'Transaction Fee',
        transactionFeeAmount: '0% in Eurozone',
        withdrawalFee: 'Cash Withdrawal',
        withdrawalFeeAmount: 'Free at partner network',
        foreignFee: 'Foreign Currency Payment',
        foreignFeeAmount: '1.5% outside Eurozone',
      },
      specificationsTitle: 'Technical Specifications',
      specifications: {
        cardType: 'Card Type',
        cardTypeValue: 'Visa Business Premium',
        creditLimit: 'Limit',
        creditLimitValue: 'Up to £50,000 per month',
        validity: 'Validity',
        validityValue: '5 years',
        delivery: 'Delivery Time',
        deliveryValue: '5-7 business days',
      },
      orderProcess: 'How to Order',
      orderProcessDesc: 'Order your card in a few clicks. After validation of your request, you will receive your card within 5-7 business days.',
      termsConditions: 'View terms and conditions',
      close: 'Close',
    },
    notifications: {
      loan_request: { title: 'Loan Request Submitted', message: 'Your {loanType} loan request for £{amount} has been successfully submitted. We will review your application shortly.' },
      loan_under_review: { title: 'Application Under Review', message: 'Your loan application for £{amount} is currently being reviewed by our team.' },
      loan_approved: { title: 'Loan Approved', message: 'Your loan application for £{amount} has been approved. You can now proceed to contract signing.' },
      loan_rejected: { title: 'Loan Rejected', message: 'Your loan application has been rejected. Reason: {reason}' },
      loan_contract_generated: { title: 'Loan Contract Available', message: 'Your loan contract for £{amount} is now available. Please download it, sign it, and return it.' },
      loan_contract_signed: { title: 'Signed Contract Received', message: 'We have received your signed contract for the £{amount} loan. Your loan will be processed shortly.' },
      loan_disbursed: { title: 'Funds Disbursed', message: 'Your loan funds of £{amount} have been successfully disbursed to your account.' },
      transfer_initiated: { title: 'Transfer Initiated', message: 'Your transfer of £{amount} to {recipientName} has been initiated and is being processed.' },
      transfer_completed: { title: 'Transfer Completed', message: 'Your transfer of £{amount} has been completed successfully.' },
      transfer_approved: { title: 'Transfer Approved', message: 'Your transfer request has been approved by the administration.' },
      transfer_suspended: { title: 'Transfer Suspended', message: 'Your transfer has been suspended. Reason: {reason}' },
      code_issued: { title: 'Validation Code Issued', message: 'A new validation code (#{sequence}) has been issued for your transfer. Check your emails.' },
      kyc_approved: { title: 'KYC Documents Approved', message: 'Your documents have been verified and approved. Your account is now active.' },
      kyc_rejected: { title: 'KYC Documents Rejected', message: 'Your documents have been rejected. Reason: {reason}. Please submit new documents.' },
      fee_added: { title: 'New Fee', message: 'Fees of £{amount} have been added to your account. Reason: {reason}' },
      account_status_changed: { title: 'Account Status Changed', message: 'Your account status has been updated to: {newStatus}. {reason}' },
      admin_message_sent: { title: 'New Admin Message', message: '{subject}' },
      general: { title: 'Notification', message: 'You have a new notification.' },
      twoFactorSuggestion: { title: 'Secure Your Account', message: 'Enable two-factor authentication to strengthen your account security.' },
      markAllRead: 'Mark all as read',
      markAsRead: 'Mark as read',
      deleteNotification: 'Delete',
    },
    dialogs: {
      newLoan: {
        title: 'New Loan Request',
        subtitle: 'Complete the information for your request',
        loanType: 'Loan Type',
        selectLoanType: 'Select loan type',
        amount: 'Amount',
        enterAmount: 'Enter desired amount',
        duration: 'Duration',
        selectDuration: 'Select duration',
        months: 'months',
        estimatedRate: 'Estimated Rate',
        monthlyPayment: 'Estimated Monthly Payment',
        totalRepayment: 'Total Amount to Repay',
        firstRequestAlert: 'First Request:',
        firstRequestAlertDesc: 'Your documents will be verified once. Subsequent requests will no longer require documents.',
        addBankAccount: 'Add Bank Account',
        selectAccount: 'Select an account',
        bankName: 'Bank Name',
        bankNamePlaceholder: 'E.g.: HSBC',
        accountLabel: 'Account Label',
        accountLabelPlaceholder: 'E.g.: Main checking account',
        iban: 'IBAN',
        ibanPlaceholder: 'GB29 NWBK 6016 1331 9268 19',
        bic: 'BIC/SWIFT',
        bicPlaceholder: 'NWBKGB2L',
        uploadDocuments: 'Upload Your Documents',
        kycDocumentsTab: 'KYC Documents',
        additionalDocumentsTab: 'Additional Documents',
        identity: 'Identity Document',
        proof_of_address: 'Proof of Address',
        income_proof: 'Proof of Income',
        business_registration: 'Business Registration',
        financial_statements: 'Financial Statements',
        tax_returns: 'Tax Returns',
        submit: 'Submit Request',
        submitting: 'Submitting...',
        cancel: 'Cancel',
        loanTypes: {
          personal: 'Personal Loan',
          auto: 'Auto Loan',
          mortgage: 'Mortgage Loan',
          green: 'Green Loan',
          renovation: 'Home Improvement Loan',
          student: 'Student Loan',
          business: 'Business Loan',
          cashFlow: 'Cash Flow Credit',
          equipment: 'Equipment Financing',
          commercialProperty: 'Commercial Property Loan',
          lineOfCredit: 'Line of Credit',
          vehicleFleet: 'Fleet Vehicle Credit',
        },
      },
      transfer: {
        title: 'Transfer Funds',
        subtitle: 'Initiate a secure transfer to an external account',
        selectAccount: 'Select an account',
        noAccountsAvailable: 'No bank accounts available',
        amount: 'Amount',
        enterAmount: 'Enter amount',
        availableFunds: 'Available Funds',
        feesAndProcessing: '2% fee • Processing within 24-48h',
        submit: 'Initiate Transfer',
        submitting: 'Processing...',
        cancel: 'Cancel',
      },
      cardTerms: {
        title: 'Bank Card Terms and Conditions',
        acceptTerms: 'Accept Terms',
        declineTerms: 'Decline',
      },
      welcome: {
        title: 'Welcome to ALTUS',
        description: 'Your account has been successfully created',
        accountTypeTitle: 'Your Account Type',
        individualAccount: 'Personal Account',
        businessAccount: 'Business Account',
        individualAccess: 'Access to personal financing services',
        businessAccess: 'Full access to business financing services',
        availableOffers: 'Available offers for you',
        getStarted: 'Get Started',
      },
      transactionHistory: {
        title: 'Transaction History',
        type: 'Type',
        amount: 'Amount',
        date: 'Date',
        status: 'Status',
        noTransactions: 'No transactions found',
        close: 'Close',
      },
    },
    verify: {
      verifying: 'Verifying...',
      success: 'Email Verified!',
      successMessage: 'Your email has been successfully verified. You will be redirected to the dashboard.',
      goToDashboard: 'Go to Dashboard',
      error: 'Verification Error',
      errorMessage: 'The verification link is invalid or has expired.',
      tryAgain: 'Try Again',
      backToSignup: 'Back to Signup',
      backToHome: 'Back to Home',
    },
    forgotPassword: {
      title: 'Forgot Password',
      description: 'Reset your password',
      instructions: 'Enter your email address and we will send you a link to reset your password.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      sendResetLink: 'Send Reset Link',
      sending: 'Sending...',
      backToLogin: 'Back to Login',
      emailSent: 'Email Sent',
      emailSentDesc: 'A reset link has been sent to your email address.',
      error: 'Error',
      errorDesc: 'An error occurred. Please try again.',
    },
    resetPassword: {
      title: 'Reset Password',
      description: 'Create a new password',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'Enter your new password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your new password',
      requirements: 'Password Requirements:',
      minLength: 'At least 12 characters',
      uppercase: 'One uppercase letter',
      lowercase: 'One lowercase letter',
      number: 'One number',
      specialChar: 'One special character',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      veryStrong: 'Very Strong',
      resetPassword: 'Reset',
      resetting: 'Resetting...',
      success: 'Success',
      successMessage: 'Your password has been successfully reset.',
      error: 'Error',
      invalidToken: 'The reset link is invalid or has expired.',
      passwordMismatch: 'Passwords do not match.',
    },
    twoFactorAuth: {
      setup: {
        title: 'Set Up Two-Factor Authentication',
        description: 'Strengthen your account security',
        step1: 'Step 1: Download the App',
        step1Description: 'Download Google Authenticator or Authy on your phone',
        step2: 'Step 2: Scan the QR Code',
        step2Description: 'Scan this QR code with your authenticator app',
        step3: 'Step 3: Verify the Code',
        step3Description: 'Enter the 6-digit code generated by the app',
        qrCodeInstructions: 'Scan this QR code with your authenticator app',
        cantScanQR: 'Can\'t scan? Enter this code manually:',
        secretKey: 'Secret Key',
        enterCode: 'Enter 6-digit code',
        codePlaceholder: '000000',
        verify: 'Enable 2FA',
        verifying: 'Verifying...',
        cancel: 'Cancel',
        successTitle: '2FA Enabled',
        successMessage: 'Two-factor authentication has been successfully enabled.',
        errorTitle: 'Error',
        errorMessage: 'The code is invalid. Please try again.',
      },
      disable: {
        title: 'Disable Two-Factor Authentication',
        description: 'Enter your password to confirm',
        enterPassword: 'Password',
        passwordPlaceholder: 'Enter your password',
        disable: 'Disable 2FA',
        disabling: 'Disabling...',
        cancel: 'Cancel',
        successTitle: '2FA Disabled',
        successMessage: 'Two-factor authentication has been disabled.',
        errorTitle: 'Error',
        errorMessage: 'Incorrect password.',
      },
      login: {
        title: 'Two-Factor Authentication',
        description: 'Enter the code from your authenticator app',
        enterCode: '6-digit code',
        codePlaceholder: '000000',
        verify: 'Verify',
        verifying: 'Verifying...',
        cancel: 'Cancel',
        errorTitle: 'Error',
        errorMessage: 'Invalid code. Please try again.',
      },
    },
    bankAccounts: {
      title: 'Bank Accounts',
      description: 'Manage your external bank accounts',
      addAccount: 'Add Account',
      noAccountsTitle: 'No Bank Accounts',
      noAccountsDescription: 'Add a bank account to make transfers.',
      accountLabel: 'Label',
      bankName: 'Bank',
      iban: 'IBAN',
      bic: 'BIC',
      createdAt: 'Added on',
      actions: 'Actions',
      delete: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this account?',
      deleteSuccess: 'Account deleted successfully',
      addAccountTitle: 'Add Bank Account',
      addAccountDescription: 'Add an external bank account for transfers',
      accountLabelLabel: 'Account Label',
      accountLabelPlaceholder: 'E.g.: Main checking account',
      accountLabelRequired: 'Label is required',
      bankNameLabel: 'Bank Name',
      bankNamePlaceholder: 'E.g.: HSBC',
      bankNameRequired: 'Bank name is required',
      ibanLabel: 'IBAN',
      ibanPlaceholder: 'GB29 NWBK 6016 1331 9268 19',
      ibanRequired: 'IBAN is required',
      bicLabel: 'BIC/SWIFT',
      bicPlaceholder: 'NWBKGB2L',
      submit: 'Add Account',
      submitting: 'Adding...',
      cancel: 'Cancel',
      addSuccess: 'Account Added',
      addSuccessDesc: 'The bank account has been successfully added.',
      addError: 'Error adding account',
    },
    welcomeModal: {
      title: 'Welcome to ALTUS',
      description: 'Your account has been successfully created',
      accountType: 'Your Account Type',
      individualAccount: 'Personal Account',
      businessAccount: 'Business Account',
      individualAccess: 'Access to personal financing services',
      businessAccess: 'Full access to business financing services',
      availableOffers: 'Available offers for you',
      getStarted: 'Get Started',
    },
    calculator: {
      title: 'Amortization Calculator',
      description: 'Simulate your repayment plan',
      loanAmount: 'Loan Amount',
      interestRate: 'Annual Interest Rate (%)',
      loanDuration: 'Loan Duration',
      months: 'months',
      calculate: 'Calculate',
      results: 'Results',
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      totalAmount: 'Total Amount',
      amortizationSchedule: 'Amortization Schedule',
      month: 'Month',
      payment: 'Payment',
      principal: 'Principal',
      interest: 'Interest',
      balance: 'Remaining Balance',
      downloadSchedule: 'Download Schedule',
    },
    kycDocuments: {
      title: 'KYC Documents',
      description: 'Upload your identification documents',
      uploadDocuments: 'Upload Your Documents',
      documentType: 'Document Type',
      selectDocumentType: 'Select type',
      identity: 'Identity Document',
      proof_of_address: 'Proof of Address',
      income_proof: 'Proof of Income',
      business_registration: 'Business Registration',
      financial_statements: 'Financial Statements',
      tax_returns: 'Tax Returns',
      chooseFile: 'Choose File',
      upload: 'Upload',
      uploading: 'Uploading...',
      uploadSuccess: 'Document Uploaded',
      uploadSuccessDesc: 'Your document has been successfully uploaded.',
      uploadError: 'Upload Error',
      status: 'Status',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      uploadedAt: 'Uploaded on',
      noDocuments: 'No documents uploaded',
    },
  },
  es: {
    hero: {
      title: 'Haga Realidad sus Proyectos con Altus Finance Group',
      subtitle: 'Soluciones de financiamiento para particulares y empresas - Tasas competitivas y proceso transparente',
      cta1: 'Solicitar Préstamo',
      cta2: 'Mi Cuenta',
      trustIndicator: 'Más de 15,000 clientes satisfechos confían en nosotros',
      slides: [
        {
          title: 'Haga Realidad sus Proyectos con Altus Finance Group',
          subtitle: 'Soluciones de financiamiento para particulares y empresas - Tasas competitivas y proceso transparente',
        },
        {
          title: 'Soluciones Financieras a Medida',
          subtitle: 'Acompañamiento personalizado para concretar todos sus proyectos profesionales y personales',
        },
        {
          title: 'Su Socio de Confianza',
          subtitle: 'Más de 15,000 clientes satisfechos confían en nosotros para sus necesidades de financiamiento',
        },
        {
          title: 'Financie sus Ambiciones',
          subtitle: 'Tasas ventajosas y un proceso simple para dar vida a sus proyectos',
        },
        {
          title: 'Experiencia y Acompañamiento',
          subtitle: 'Un equipo dedicado para guiarle en cada etapa de su proyecto',
        },
      ],
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
      yourGlobalBalance: 'Su Saldo Global',
      noActiveLoans: 'Sin Préstamos Activos',
      noTransfers: 'No se encontraron transferencias',
      dataLoadError: 'Error al cargar datos',
      available: 'disponible',
      notifications: 'Notificaciones',
      noNotifications: 'Sin notificaciones',
      viewDetails: 'Ver Detalles',
      availableOffers: 'Ofertas disponibles para usted',
    },
    loan: {
      amount: 'Cantidad',
      interestRate: 'Tasa de Interés',
      nextPayment: 'Próximo Pago',
      viewAll: 'Ver Todo',
      status: 'Estado',
      downloadContract: 'Descargar Contrato',
      uploadSignedContract: 'Subir Contrato Firmado',
      downloading: 'Descargando...',
      uploading: 'Subiendo...',
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
      completed: 'Completado',
      suspended: 'Suspendido',
      noAccount: 'Sin cuenta registrada',
      validation: 'Validación',
      validating: 'Validando...',
      onHold: 'Transferencia en pausa',
      processing: 'Transferencia en progreso',
      processingComplete: 'Transferencia completada',
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
      active: 'Activo',
      pending: 'Pendiente',
      completed: 'Completado',
      suspended: 'Suspendido',
      saving: 'Guardando...',
      cancel: 'Cancelar',
      save: 'Guardar',
      close: 'Cerrar',
      noData: 'Sin datos disponibles',
    },
    about: {
      title: 'Acerca de Altus Finance Group',
      subtitle: 'Su socio de confianza para financiar particulares y empresas',
      mission: 'Nuestra Misión',
      missionText: 'En Altus Finance Group, democratizamos el acceso al financiamiento para todos. Ya sea que sea un particular con un proyecto personal o una empresa en desarrollo, ofrecemos soluciones de crédito modernas, transparentes y adaptadas a sus necesidades. Nuestra tecnología de vanguardia nos permite analizar rápidamente su situación y ofrecerle ofertas personalizadas con tasas competitivas. Creemos en la transparencia total: sin cargos ocultos, condiciones claras y acompañamiento en cada paso.',
      stats: {
        clients: 'Clientes activos',
        loansProvided: 'Préstamos otorgados',
        successRate: 'Tasa de satisfacción',
        yearsExperience: 'Años de experiencia',
      },
    },
    howItWorks: {
      title: 'Cómo Funciona',
      subtitle: 'Un proceso 100% digital ultra-rápido en 4 pasos simples',
      step1Title: 'Solicitud en línea - 4 Minutos',
      step1Desc: 'Complete nuestro formulario seguro con su información personal o empresarial. No necesita desplazarse, todo se hace en línea con verificación de identidad instantánea (KYC) y carga de documentos simplificada.',
      step2Title: 'Respuesta ultra-rápida - Minutos a 24h',
      step2Desc: 'Nuestra tecnología de evaluación crediticia analiza su perfil financiero, ingresos e historial en tiempo real. Gracias a nuestros algoritmos avanzados y la integración con burós de crédito, le damos una respuesta de principio en minutos a 24 horas máximo.',
      step3Title: 'Desembolso de fondos - Inmediato',
      step3Desc: 'Una vez aprobada su solicitud, los fondos se desbloquean inmediatamente en su cuenta segura de Altus Finance Group. Mantiene el control total de sus fondos con acceso 24/7 desde su panel de cliente.',
      step4Title: 'Transferencia a su cuenta - A su ritmo',
      step4Desc: 'Transfiera sus fondos cuando lo desee a su cuenta bancaria personal o empresarial directamente desde su panel de Altus. Transferencias instantáneas o programadas según sus necesidades, sin cargos adicionales.',
    },
    products: {
      title: 'Nuestras Soluciones de Préstamos',
      subtitle: 'Productos adaptados a sus necesidades - Particulares y Empresas',
      businessTitle: 'Préstamos Empresariales',
      businessSubtitle: 'Productos adaptados a sus necesidades empresariales',
      termLoans: 'Préstamos a Plazo Profesionales',
      termLoansDesc: 'Financiamiento a mediano y largo plazo para sus inversiones estratégicas: desarrollo, adquisición, expansión. De €10,000 a €500,000 de 1 a 7 años. Tasas fijas de 3.5% a 8.5% TAE según perfil. Pago anticipado sin penalización.',
      lineOfCredit: 'Línea de Crédito Renovable',
      lineOfCreditDesc: 'Crédito flexible para gestionar su flujo de caja y enfrentar gastos imprevistos. De €5,000 a €100,000. Tasas de 4.0% a 9.0% TAE. Pague intereses solo sobre las cantidades utilizadas. Reconstitución automática del capital disponible.',
      equipmentFinancing: 'Financiamiento de Equipos',
      equipmentFinancingDesc: 'Financie sus equipos profesionales, vehículos utilitarios, maquinaria, herramientas. De €20,000 a €300,000 de 2 a 5 años. Tasas de 3.9% a 7.5% TAE. El equipo puede servir como garantía, facilitando la aprobación del préstamo.',
      invoiceFactoring: 'Factoraje / Cesión de Créditos',
      invoiceFactoringDesc: 'Convierta sus facturas de clientes en efectivo inmediato para mejorar su flujo de caja. Anticipo hasta el 90% del monto de facturas en 24-48h. Tarifas del 1% al 3% según volumen y plazo. Ideal para empresas B2B.',
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
      subtitle: 'Toda la información para apoyarlo en su proyecto',
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        {
          question: '¿Qué documentos se requieren para una solicitud de préstamo?',
          answer: 'Para particulares: identificación, comprobante de domicilio, recibos de nómina recientes (3 meses), aviso de impuestos. Para empresas: registro mercantil (<3 meses), balances y estados de resultados (últimos 2 años), estados de cuenta bancarios comerciales (3-6 meses), identificación del director. Todos los documentos pueden cargarse directamente en línea de forma segura.',
        },
        {
          question: '¿Cuánto tiempo toma el proceso de aprobación?',
          answer: 'Gracias a nuestra tecnología de análisis en tiempo real, recibe una respuesta de aprobación en minutos a 24 horas máximo. Una vez aprobado, los fondos se liberan inmediatamente en su cuenta segura Altus Finance Group. Luego puede transferirlos a su cuenta bancaria personal o profesional cuando lo desee, instantáneamente y sin cargos adicionales.',
        },
        {
          question: '¿Cuál es el monto mínimo y máximo que puedo pedir prestado?',
          answer: 'Préstamos personales: €1,000 a €75,000. Préstamos hipotecarios: €50,000 a €500,000. Préstamos a plazo empresariales: €10,000 a €500,000. Líneas de crédito: €5,000 a €100,000. El monto exacto depende de su capacidad de pago calculada según ingresos, gastos e historial crediticio.',
        },
        {
          question: '¿Puedo pagar mi préstamo anticipadamente?',
          answer: 'Sí, todos nuestros préstamos permiten el pago anticipado sin penalización ni cargos ocultos. Puede reembolsar parcial o totalmente su crédito en cualquier momento desde su área de cliente. Esto reduce automáticamente el costo total de intereses. Mantiene control total de su crédito.',
        },
        {
          question: '¿Cuáles son los criterios de elegibilidad para un préstamo?',
          answer: 'Particulares: ser mayor de edad, residir en Francia, tener ingresos regulares y tasa de endeudamiento <40%. Empresas: activas por 6+ meses, ingresos mensuales mínimos de €15,000, sin incumplimientos de pago recientes. El puntaje crediticio se verifica automáticamente vía burós de crédito (Experian, Equifax). Los casos se estudian individualmente.',
        },
        {
          question: '¿Cómo se calculan las tasas de interés?',
          answer: 'Nuestras tasas se calculan mediante un algoritmo que analiza varios factores: su puntaje crediticio, duración del préstamo, monto prestado, ingresos y gastos, historial de pagos y salud financiera (para empresas). Las tasas varían de 3.5% a 9.0% TAE según perfil. Nuestras tasas están entre las más competitivas del mercado gracias a nuestra red de socios financieros.',
        },
        {
          question: '¿Hay cargos de solicitud o cargos ocultos?',
          answer: 'Transparencia total: mostramos todos los cargos desde la simulación. Cargos de solicitud: €0 a €150 según tipo de préstamo. Sin cargos por pago anticipado. Sin cargos mensuales de gestión. La TAE (Tasa Anual Equivalente) incluye todos los costos para comparación fácil con otras ofertas.',
        },
        {
          question: '¿Cómo calcular mi capacidad de préstamo?',
          answer: 'Su capacidad de préstamo depende de su tasa de endeudamiento que no debe superar el 40% de sus ingresos netos. Fórmula: (Ingresos mensuales × 0.40) - Cargos de crédito existentes = Pago mensual máximo disponible. Nuestro simulador en línea calcula automáticamente su capacidad de préstamo y sugiere montos apropiados. Puede ajustar la duración para modular los pagos.',
        },
        {
          question: '¿Puedo obtener un préstamo con un puntaje crediticio bajo?',
          answer: 'Sí, aceptamos varios perfiles. Nuestra tecnología de evaluación también analiza datos alternativos más allá del simple puntaje crediticio: estabilidad profesional, ingresos recurrentes, ahorros, historial bancario. Puntajes aceptados desde 500-560 para ciertos productos. Incluso con historial imperfecto, puede obtener un préstamo, pero las tasas se ajustarán al riesgo.',
        },
        {
          question: '¿Qué sucede si no puedo pagar una mensualidad?',
          answer: 'Contáctenos inmediatamente. Ofrecemos varias soluciones: aplazamiento de mensualidad (gracia temporal), modulación a la baja de cuotas, re-escalamiento del préstamo. Pueden aplicarse penalidades por retraso pero siempre privilegiamos el diálogo para encontrar una solución adaptada a su situación. Acompañamiento personalizado disponible en caso de dificultades.',
        },
      ],
    },
    legal: {
      termsTitle: 'Términos de Servicio',
      privacyTitle: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Enero 2025',
      terms: {
        section1Title: '1. Aceptación de Términos',
        section1Content: 'Al acceder y utilizar los servicios de Altus Finance Group, acepta y está de acuerdo en estar sujeto a los términos y disposiciones de este acuerdo.',
        section2Title: '2. Licencia de Uso',
        section2Content: 'Se otorga permiso para acceder temporalmente a los materiales (información o software) en la plataforma de Altus Finance Group solo para visualización personal y no comercial.',
        section3Title: '3. Contrato de Préstamo',
        section3Content: 'Todos los préstamos están sujetos a aprobación de crédito. Los términos y condiciones se proporcionarán en un contrato de préstamo separado al aprobar su solicitud.',
        section4Title: '4. Declaraciones y Garantías',
        section4Content: 'Usted declara y garantiza que toda la información proporcionada en su solicitud de préstamo es precisa, completa y actual.',
        section5Title: '5. Limitación de Responsabilidad',
        section5Content: 'En ningún caso Altus Finance Group o sus proveedores serán responsables de cualquier daño que surja del uso o la imposibilidad de usar los materiales en la plataforma de Altus Finance Group.',
        section6Title: '6. Modificaciones',
        section6Content: 'Altus Finance Group puede revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar esta plataforma, acepta estar sujeto a la versión actual de estos términos.',
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
        section7Content: 'Si tiene preguntas sobre esta Política de Privacidad, contáctenos en privacy@altus-group.com',
      },
    },
    individualLoans: {
      title: 'Préstamos para Particulares',
      subtitle: 'Soluciones de financiamiento adaptadas a todos sus proyectos de vida',
      personalLoan: 'Préstamo Personal',
      personalLoanDesc: 'Financiamiento flexible para todos sus proyectos sin justificante de uso: viaje, boda, compra de equipo. De €1,000 a €75,000 de 12 a 84 meses. Tasas TAE de 2.9% a 7.9% según perfil. Respuesta en 48h, fondos en 5 días.',
      mortgageLoan: 'Préstamo Hipotecario',
      mortgageLoanDesc: 'Financie su residencia principal, secundaria o inversión de alquiler. De €50,000 a €500,000 de 10 a 25 años. Tasas fijas o variables desde 1.5% TAE. Hasta 110% de aporte incluyendo gastos notariales. Simulación personalizada gratuita.',
      autoLoan: 'Crédito Auto / Moto',
      autoLoanDesc: 'Financie su vehículo nuevo o usado, auto o moto. De €3,000 a €75,000 de 12 a 84 meses. Tasas TAE de 1.9% a 5.9%. Posibilidad de incluir seguro y accesorios. Respuesta inmediata en su concesionario asociado.',
      studentLoan: 'Préstamo Estudiantil',
      studentLoanDesc: 'Financie sus estudios superiores, matrícula, alojamiento estudiantil. De €1,000 a €50,000. Diferimiento de pago total hasta fin de estudios. Tasas preferenciales desde 1.5% TAE. Sin garantía parental bajo condiciones.',
      greenLoan: 'Préstamo Verde / Eco-PTZ',
      greenLoanDesc: 'Financie trabajos de renovación energética: aislamiento, bomba de calor, paneles solares. De €7,000 a €50,000. Tasas bonificadas desde 0.5% TAE. Elegible para ayudas estatales MaPrimeRénov. Hasta €30,000 sin aporte.',
      renovationLoan: 'Préstamo para Reformas',
      renovationLoanDesc: 'Renueve, amplíe, embellezca su vivienda. De €1,500 a €75,000 de 12 a 120 meses. Tasas TAE de 2.5% a 6.9%. Sin garantía hipotecaria hasta €50,000. Desembolso progresivo según avance de obras posible.',
      amount: 'Monto',
      rate: 'Tasa TAE',
      duration: 'Duración',
      rateDisclaimer: 'Tasas indicativas sujetas a condiciones de elegibilidad. TAE fija. Un crédito le compromete y debe ser reembolsado. Verifique sus capacidades de pago antes de comprometerse.',
      compareLoans: 'Comparar todos los préstamos',
    },
    features: {
      title: '¿Por Qué Elegir Altus Finance Group?',
      subtitle: 'Una plataforma de préstamos moderna y transparente que prioriza sus necesidades',
      security: 'Seguridad Bancaria de Nivel Empresarial',
      securityDesc: 'Cifrado AES-256, cumplimiento RGPD, certificación SOC 2 Type II e ISO 27001. Sus datos financieros están protegidos con los mismos estándares que los grandes bancos. Autenticación multifactor y monitoreo 24/7 contra fraude.',
      fast: 'Respuesta Express - Minutos a 24h',
      fastDesc: 'Nuestra tecnología de IA analiza su expediente en tiempo real. Respuesta de aprobación en minutos a 24 horas máximo. Fondos inmediatamente desbloqueados en su cuenta segura Altus. Luego transfiera a su cuenta bancaria cuando desee. 100% digital, cero papeleo.',
      competitive: 'Entre Las Tasas Más Bajas del Mercado',
      competitiveDesc: 'Gracias a nuestra red de 50+ socios financieros y tecnología de evaluación optimizada, negociamos para usted las mejores tasas: de 1.5% a 9.0% según perfil. Comparación automática para garantizarle la mejor oferta.',
      flexible: 'Flexibilidad Máxima Sin Penalización',
      flexibleDesc: 'Pago anticipado gratuito en cualquier momento. Posible modulación de mensualidades según su situación. Aplazamiento de mensualidades en caso de dificultades. Elección de fecha de débito. Mantiene control total de su crédito.',
    },
    stats: {
      clients: 'Clientes Satisfechos',
      funded: 'Préstamos Otorgados',
      satisfaction: 'Tasa de Satisfacción',
      years: 'Años de Experiencia',
    },
    testimonials: {
      title: 'Lo que dicen nuestros clientes',
      subtitle: 'Más de 15,000 particulares y profesionales confían en nosotros',
      reviews: [
        { name: 'Carlos García', role: 'Empresario', company: 'Restaurante El Sabor', text: 'Altus Finance Group me permitió obtener financiamiento rápido para expandir mi negocio. El proceso fue simple y transparente.', rating: 5 },
        { name: 'María Rodríguez', role: 'Arquitecta', company: 'Estudio Creativo', text: 'Excelente servicio para mi préstamo inmobiliario. Los asesores encontraron la mejor tasa para mí.', rating: 5 },
        { name: 'José Martínez', role: 'Ingeniero', company: 'Tech Solutions', text: 'Gracias a Altus Finance Group financiamos nuevos equipos. La flexibilidad de pago fue perfecta.', rating: 5 },
        { name: 'Ana López', role: 'Comerciante', company: 'Moda Boutique', text: 'Proceso 100% digital y rápido. Obtuve mi préstamo profesional en 3 días.', rating: 5 },
        { name: 'Miguel Sánchez', role: 'Estudiante', company: 'Universidad', text: 'El préstamo estudiantil con pago diferido me permitió financiar mis estudios sin estrés.', rating: 5 },
      ],
    },
    auth: {
      title: 'ALTUS',
      subtitle: 'Su socio de confianza para financiamiento',
      loginTab: 'Iniciar sesión',
      signupTab: 'Registrarse',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      fullName: 'Nombre completo',
      phone: 'Teléfono',
      companyName: 'Nombre de la empresa',
      siret: 'SIRET',
      accountType: 'Tipo de cuenta',
      personal: 'Personal',
      personalLoan: 'Préstamo personal',
      business: 'Empresa/Profesional',
      businessLoan: 'Préstamo empresarial',
      login: 'Iniciar sesión',
      loggingIn: 'Iniciando sesión...',
      signup: 'Crear mi cuenta',
      signingUp: 'Registrándose...',
      backToHome: 'Volver al inicio',
      loginSuccess: '¡Inicio de sesión exitoso!',
      loginSuccessDesc: 'Bienvenido a ALTUS',
      signupSuccess: '¡Registro exitoso!',
      signupSuccessDesc: 'Se ha enviado un correo de verificación a su dirección.',
      loginError: 'Error de inicio de sesión',
      loginErrorDesc: 'Correo electrónico o contraseña incorrectos',
      signupError: 'Error',
      signupErrorDesc: 'Ocurrió un error durante el registro',
      emailNotVerified: 'Correo electrónico no verificado',
      emailPlaceholder: 'juan.perez@example.com',
      passwordPlaceholder: '••••••••',
      fullNamePlaceholder: 'Juan Pérez',
      phonePlaceholder: '+34 912 34 56 78',
      companyNamePlaceholder: 'Empresa SL',
      siretPlaceholder: '123 456 789 00010',
      required: 'requerido',
      companyRequired: 'El nombre de la empresa es requerido para cuentas empresariales',
      emailInvalid: 'Correo electrónico inválido',
      passwordMinLength: 'La contraseña debe contener al menos 12 caracteres',
      passwordUppercase: 'La contraseña debe contener al menos una letra mayúscula',
      passwordLowercase: 'La contraseña debe contener al menos una letra minúscula',
      passwordNumber: 'La contraseña debe contener al menos un número',
      passwordSpecial: 'La contraseña debe contener al menos un carácter especial',
      passwordMatch: 'Las contraseñas no coinciden',
    },
    settings: {
      title: 'Configuración',
      profile: 'Perfil',
      notifications: 'Notificaciones',
      security: 'Seguridad',
      appearance: 'Apariencia',
      personalInfo: 'Información personal',
      updateInfo: 'Actualice su información de perfil',
      fullName: 'Nombre completo',
      email: 'Email',
      phone: 'Teléfono',
      company: 'Empresa',
      saveChanges: 'Guardar cambios',
      accountType: 'Tipo de cuenta',
      yourAccountType: 'Su cuenta',
      individualAccount: 'Cuenta Personal',
      businessAccount: 'Cuenta Empresarial',
      individualAccess: 'Acceso a servicios de financiamiento personal',
      businessAccess: 'Acceso completo a servicios de financiamiento empresarial',
      verified: 'Verificado',
      notificationPreferences: 'Preferencias de notificación',
      chooseNotifications: 'Elija cómo desea ser notificado',
      emailAlerts: 'Alertas por email',
      emailAlertsDesc: 'Reciba alertas importantes por email',
      transferUpdates: 'Actualizaciones de transferencia',
      transferUpdatesDesc: 'Notificaciones sobre el estado de sus transferencias',
      loanReminders: 'Recordatorios de pago',
      loanRemindersDesc: 'Recordatorios para sus vencimientos de préstamo',
      marketingEmails: 'Emails de marketing',
      marketingEmailsDesc: 'Reciba noticias y ofertas especiales',
      savePreferences: 'Guardar preferencias',
      changePassword: 'Cambiar contraseña',
      updatePassword: 'Actualización de su contraseña',
      currentPassword: 'Contraseña actual',
      newPassword: 'Nueva contraseña',
      confirmNewPassword: 'Confirmar nueva contraseña',
      themeSettings: 'Configuración de tema',
      chooseTheme: 'Seleccione su tema preferido',
      lightMode: 'Modo claro',
      darkMode: 'Modo oscuro',
      systemMode: 'Sistema',
      languageSettings: 'Configuración de idioma',
      chooseLanguage: 'Seleccione su idioma',
    },
    messages: {
      profileUpdated: 'Perfil actualizado',
      profileUpdatedDesc: 'Su información se ha guardado exitosamente.',
      preferencesUpdated: 'Preferencias guardadas',
      preferencesUpdatedDesc: 'Sus preferencias de notificación se han actualizado.',
      passwordChanged: 'Contraseña modificada',
      passwordChangedDesc: 'Su contraseña se ha modificado exitosamente.',
      passwordMismatch: 'Las contraseñas no coinciden',
      errorUpdatingProfile: 'Error al actualizar el perfil',
      errorUpdatingPreferences: 'Error al actualizar las preferencias',
      errorChangingPassword: 'Error al cambiar la contraseña',
      avatarUpdated: 'Foto de perfil actualizada',
      avatarUpdatedDesc: 'Su foto de perfil se ha actualizado exitosamente.',
      errorUploadingAvatar: 'Error al cargar la foto',
      invalidFileType: 'Tipo de archivo no autorizado. Solo se aceptan imágenes JPEG, PNG y WebP.',
      fileTooLarge: 'El archivo es demasiado grande (máx 5MB).',
    },
    bankCard: {
      title: 'Tarjeta Bancaria Profesional',
      subtitle: 'Disfrute de una tarjeta bancaria dedicada a sus transacciones profesionales',
      learnMore: 'Más información',
      orderNow: 'Ordenar ahora',
      orderCard: 'Ordenar mi tarjeta',
      modalTitle: 'Tarjeta Bancaria Profesional Altus',
      modalSubtitle: 'Una tarjeta bancaria completa para todas sus necesidades profesionales',
      advantagesTitle: 'Ventajas de la tarjeta',
      advantages: {
        cashback: 'Cashback 2%',
        cashbackDesc: 'Disfrute del 2% de cashback en todas sus compras profesionales',
        noFees: 'Sin comisiones ocultas',
        noFeesDesc: 'Transparencia total en todas las comisiones',
        protection: 'Protección máxima',
        protectionDesc: 'Seguro de compras y protección contra fraude incluidos',
        rewards: 'Programa de recompensas',
        rewardsDesc: 'Acumule puntos en cada transacción',
        global: 'Aceptada mundialmente',
        globalDesc: 'Utilizable en más de 200 países y territorios',
        support: 'Soporte 24/7',
        supportDesc: 'Servicio al cliente disponible en todo momento',
      },
      usageZonesTitle: 'Zonas de uso',
      usageZones: {
        worldwide: 'Pagos internacionales',
        worldwideDesc: 'Aceptada en todos los comercios y sitios web del mundo',
        online: 'Compras en línea',
        onlineDesc: 'Segura para todas sus compras en internet',
        stores: 'En tienda',
        storesDesc: 'Pago sin contacto y con código PIN',
        atm: 'Retiros de efectivo',
        atmDesc: 'Retiros gratuitos en nuestra red de cajeros asociados',
      },
      feesTitle: 'Tarifas y precios',
      fees: {
        annualFee: 'Cuota anual',
        annualFeeAmount: 'Gratis el primer año, luego 49€/año',
        transactionFee: 'Comisión de transacción',
        transactionFeeAmount: '0% en zona euro',
        withdrawalFee: 'Retiro de efectivo',
        withdrawalFeeAmount: 'Gratis en la red asociada',
        foreignFee: 'Pago en moneda extranjera',
        foreignFeeAmount: '1,5% fuera de la zona euro',
      },
      specificationsTitle: 'Características técnicas',
      specifications: {
        cardType: 'Tipo de tarjeta',
        cardTypeValue: 'Visa Business Premium',
        creditLimit: 'Límite',
        creditLimitValue: 'Hasta 50.000€ por mes',
        validity: 'Validez',
        validityValue: '5 años',
        delivery: 'Plazo de entrega',
        deliveryValue: '5-7 días hábiles',
      },
      orderProcess: 'Cómo ordenar',
      orderProcessDesc: 'Ordene su tarjeta en unos pocos clics. Después de la validación de su solicitud, recibirá su tarjeta en 5-7 días hábiles.',
      termsConditions: 'Ver términos y condiciones',
      close: 'Cerrar',
    },
    notifications: {
      loan_request: { title: 'Solicitud de Préstamo Enviada', message: 'Su solicitud de préstamo {loanType} por {amount} € ha sido enviada con éxito. Revisaremos su solicitud próximamente.' },
      loan_under_review: { title: 'Solicitud en Revisión', message: 'Su solicitud de préstamo por {amount} € está siendo revisada por nuestro equipo.' },
      loan_approved: { title: 'Préstamo Aprobado', message: 'Su solicitud de préstamo por {amount} € ha sido aprobada. Ahora puede proceder a la firma del contrato.' },
      loan_rejected: { title: 'Préstamo Rechazado', message: 'Su solicitud de préstamo ha sido rechazada. Razón: {reason}' },
      loan_contract_generated: { title: 'Contrato de Préstamo Disponible', message: 'Su contrato de préstamo por {amount} € está disponible. Por favor descárguelo, fírmelo y devuélvalo.' },
      loan_contract_signed: { title: 'Contrato Firmado Recibido', message: 'Hemos recibido su contrato firmado para el préstamo de {amount} €. Su préstamo será procesado próximamente.' },
      loan_disbursed: { title: 'Fondos Desembolsados', message: 'Los fondos de su préstamo por {amount} € han sido desembolsados exitosamente en su cuenta.' },
      transfer_initiated: { title: 'Transferencia Iniciada', message: 'Su transferencia de {amount} € a {recipientName} ha sido iniciada y está siendo procesada.' },
      transfer_completed: { title: 'Transferencia Completada', message: 'Su transferencia de {amount} € ha sido completada exitosamente.' },
      transfer_approved: { title: 'Transferencia Aprobada', message: 'Su solicitud de transferencia ha sido aprobada por la administración.' },
      transfer_suspended: { title: 'Transferencia Suspendida', message: 'Su transferencia ha sido suspendida. Razón: {reason}' },
      code_issued: { title: 'Código de Validación Emitido', message: 'Se ha emitido un nuevo código de validación (#{sequence}) para su transferencia. Verifique sus correos.' },
      kyc_approved: { title: 'Documentos KYC Aprobados', message: 'Sus documentos han sido verificados y aprobados. Su cuenta está ahora activa.' },
      kyc_rejected: { title: 'Documentos KYC Rechazados', message: 'Sus documentos han sido rechazados. Razón: {reason}. Por favor envíe nuevos documentos.' },
      fee_added: { title: 'Nueva Tarifa', message: 'Se han agregado tarifas de {amount} € a su cuenta. Razón: {reason}' },
      account_status_changed: { title: 'Estado de Cuenta Modificado', message: 'El estado de su cuenta ha sido actualizado a: {newStatus}. {reason}' },
      admin_message_sent: { title: 'Nuevo Mensaje de Administración', message: '{subject}' },
      general: { title: 'Notificación', message: 'Tiene una nueva notificación.' },
      twoFactorSuggestion: { title: 'Asegure Su Cuenta', message: 'Active la autenticación de dos factores para fortalecer la seguridad de su cuenta.' },
      markAllRead: 'Marcar todo como leído',
      markAsRead: 'Marcar como leído',
      deleteNotification: 'Eliminar',
    },
    dialogs: {
      newLoan: {
        title: 'Nueva Solicitud de Préstamo',
        subtitle: 'Complete la información para su solicitud',
        loanType: 'Tipo de Préstamo',
        selectLoanType: 'Seleccione el tipo de préstamo',
        amount: 'Monto',
        enterAmount: 'Ingrese el monto deseado',
        duration: 'Duración',
        selectDuration: 'Seleccione la duración',
        months: 'meses',
        estimatedRate: 'Tasa Estimada',
        monthlyPayment: 'Pago Mensual Estimado',
        totalRepayment: 'Monto Total a Pagar',
        firstRequestAlert: 'Primera solicitud:',
        firstRequestAlertDesc: 'Sus documentos serán verificados una vez. Las solicitudes siguientes ya no requerirán documentos.',
        addBankAccount: 'Agregar Cuenta Bancaria',
        selectAccount: 'Seleccione una cuenta',
        bankName: 'Nombre del Banco',
        bankNamePlaceholder: 'Ej: Santander',
        accountLabel: 'Etiqueta de la Cuenta',
        accountLabelPlaceholder: 'Ej: Cuenta corriente principal',
        iban: 'IBAN',
        ibanPlaceholder: 'ES91 2100 0418 4502 0005 1332',
        bic: 'BIC/SWIFT',
        bicPlaceholder: 'CAIXESBBXXX',
        uploadDocuments: 'Subir Sus Documentos',
        kycDocumentsTab: 'Documentos KYC',
        additionalDocumentsTab: 'Documentos Adicionales',
        identity: 'Documento de Identidad',
        proof_of_address: 'Comprobante de Domicilio',
        income_proof: 'Comprobante de Ingresos',
        business_registration: 'Registro Mercantil',
        financial_statements: 'Estados Financieros',
        tax_returns: 'Declaración de Impuestos',
        submit: 'Enviar Solicitud',
        submitting: 'Enviando...',
        cancel: 'Cancelar',
        loanTypes: {
          personal: 'Préstamo Personal',
          auto: 'Préstamo Auto',
          mortgage: 'Préstamo Hipotecario',
          green: 'Préstamo Verde',
          renovation: 'Préstamo para Reformas',
          student: 'Préstamo Estudiantil',
          business: 'Préstamo Empresarial',
          cashFlow: 'Crédito de Flujo de Caja',
          equipment: 'Financiamiento de Equipos',
          commercialProperty: 'Préstamo Inmobiliario Comercial',
          lineOfCredit: 'Línea de Crédito',
          vehicleFleet: 'Crédito Flota de Vehículos',
        },
      },
      transfer: {
        title: 'Transferir Fondos',
        subtitle: 'Inicie una transferencia segura a una cuenta externa',
        selectAccount: 'Seleccione una cuenta',
        noAccountsAvailable: 'No hay cuentas bancarias disponibles',
        amount: 'Monto',
        enterAmount: 'Ingrese el monto',
        availableFunds: 'Fondos Disponibles',
        feesAndProcessing: 'Tarifa del 2% • Procesamiento en 24-48h',
        submit: 'Iniciar Transferencia',
        submitting: 'Procesando...',
        cancel: 'Cancelar',
      },
      cardTerms: {
        title: 'Términos y Condiciones de la Tarjeta Bancaria',
        acceptTerms: 'Aceptar Términos',
        declineTerms: 'Rechazar',
      },
      welcome: {
        title: 'Bienvenido a ALTUS',
        description: 'Su cuenta ha sido creada exitosamente',
        accountTypeTitle: 'Su Tipo de Cuenta',
        individualAccount: 'Cuenta Personal',
        businessAccount: 'Cuenta Empresarial',
        individualAccess: 'Acceso a servicios de financiamiento personal',
        businessAccess: 'Acceso completo a servicios de financiamiento empresarial',
        availableOffers: 'Ofertas disponibles para usted',
        getStarted: 'Comenzar',
      },
      transactionHistory: {
        title: 'Historial de Transacciones',
        type: 'Tipo',
        amount: 'Monto',
        date: 'Fecha',
        status: 'Estado',
        noTransactions: 'No se encontraron transacciones',
        close: 'Cerrar',
      },
    },
    verify: {
      verifying: 'Verificando...',
      success: '¡Correo Verificado!',
      successMessage: 'Su correo ha sido verificado exitosamente. Será redirigido al panel de control.',
      goToDashboard: 'Ir al Panel',
      error: 'Error de Verificación',
      errorMessage: 'El enlace de verificación es inválido o ha expirado.',
      tryAgain: 'Intentar de Nuevo',
      backToSignup: 'Volver al Registro',
      backToHome: 'Volver al Inicio',
    },
    forgotPassword: {
      title: 'Contraseña Olvidada',
      description: 'Reinicie su contraseña',
      instructions: 'Ingrese su dirección de correo electrónico y le enviaremos un enlace para reiniciar su contraseña.',
      emailLabel: 'Dirección de Correo Electrónico',
      emailPlaceholder: 'su.correo@ejemplo.com',
      sendResetLink: 'Enviar Enlace',
      sending: 'Enviando...',
      backToLogin: 'Volver al Inicio de Sesión',
      emailSent: 'Correo Enviado',
      emailSentDesc: 'Se ha enviado un enlace de reinicio a su dirección de correo electrónico.',
      error: 'Error',
      errorDesc: 'Ocurrió un error. Por favor intente de nuevo.',
    },
    resetPassword: {
      title: 'Reiniciar Contraseña',
      description: 'Cree una nueva contraseña',
      newPassword: 'Nueva Contraseña',
      newPasswordPlaceholder: 'Ingrese su nueva contraseña',
      confirmPassword: 'Confirmar Contraseña',
      confirmPasswordPlaceholder: 'Confirme su nueva contraseña',
      requirements: 'Requisitos de Contraseña:',
      minLength: 'Al menos 12 caracteres',
      uppercase: 'Una letra mayúscula',
      lowercase: 'Una letra minúscula',
      number: 'Un número',
      specialChar: 'Un carácter especial',
      passwordStrength: 'Fuerza de la Contraseña',
      weak: 'Débil',
      medium: 'Media',
      strong: 'Fuerte',
      veryStrong: 'Muy Fuerte',
      resetPassword: 'Reiniciar',
      resetting: 'Reiniciando...',
      success: 'Éxito',
      successMessage: 'Su contraseña ha sido reiniciada exitosamente.',
      error: 'Error',
      invalidToken: 'El enlace de reinicio es inválido o ha expirado.',
      passwordMismatch: 'Las contraseñas no coinciden.',
    },
    twoFactorAuth: {
      setup: {
        title: 'Configurar Autenticación de Dos Factores',
        description: 'Fortalezca la seguridad de su cuenta',
        step1: 'Paso 1: Descargar la Aplicación',
        step1Description: 'Descargue Google Authenticator o Authy en su teléfono',
        step2: 'Paso 2: Escanear el Código QR',
        step2Description: 'Escanee este código QR con su aplicación de autenticación',
        step3: 'Paso 3: Verificar el Código',
        step3Description: 'Ingrese el código de 6 dígitos generado por la aplicación',
        qrCodeInstructions: 'Escanee este código QR con su aplicación de autenticación',
        cantScanQR: '¿No puede escanear? Ingrese este código manualmente:',
        secretKey: 'Clave Secreta',
        enterCode: 'Ingrese el código de 6 dígitos',
        codePlaceholder: '000000',
        verify: 'Activar 2FA',
        verifying: 'Verificando...',
        cancel: 'Cancelar',
        successTitle: '2FA Activado',
        successMessage: 'La autenticación de dos factores ha sido activada exitosamente.',
        errorTitle: 'Error',
        errorMessage: 'El código es inválido. Por favor intente de nuevo.',
      },
      disable: {
        title: 'Desactivar Autenticación de Dos Factores',
        description: 'Ingrese su contraseña para confirmar',
        enterPassword: 'Contraseña',
        passwordPlaceholder: 'Ingrese su contraseña',
        disable: 'Desactivar 2FA',
        disabling: 'Desactivando...',
        cancel: 'Cancelar',
        successTitle: '2FA Desactivado',
        successMessage: 'La autenticación de dos factores ha sido desactivada.',
        errorTitle: 'Error',
        errorMessage: 'Contraseña incorrecta.',
      },
      login: {
        title: 'Autenticación de Dos Factores',
        description: 'Ingrese el código de su aplicación de autenticación',
        enterCode: 'Código de 6 dígitos',
        codePlaceholder: '000000',
        verify: 'Verificar',
        verifying: 'Verificando...',
        cancel: 'Cancelar',
        errorTitle: 'Error',
        errorMessage: 'Código inválido. Por favor intente de nuevo.',
      },
    },
    bankAccounts: {
      title: 'Cuentas Bancarias',
      description: 'Administre sus cuentas bancarias externas',
      addAccount: 'Agregar Cuenta',
      noAccountsTitle: 'Sin Cuentas Bancarias',
      noAccountsDescription: 'Agregue una cuenta bancaria para realizar transferencias.',
      accountLabel: 'Etiqueta',
      bankName: 'Banco',
      iban: 'IBAN',
      bic: 'BIC',
      createdAt: 'Agregado el',
      actions: 'Acciones',
      delete: 'Eliminar',
      deleteConfirm: '¿Está seguro que desea eliminar esta cuenta?',
      deleteSuccess: 'Cuenta eliminada exitosamente',
      addAccountTitle: 'Agregar Cuenta Bancaria',
      addAccountDescription: 'Agregue una cuenta bancaria externa para transferencias',
      accountLabelLabel: 'Etiqueta de la Cuenta',
      accountLabelPlaceholder: 'Ej: Cuenta corriente principal',
      accountLabelRequired: 'La etiqueta es requerida',
      bankNameLabel: 'Nombre del Banco',
      bankNamePlaceholder: 'Ej: Santander',
      bankNameRequired: 'El nombre del banco es requerido',
      ibanLabel: 'IBAN',
      ibanPlaceholder: 'ES91 2100 0418 4502 0005 1332',
      ibanRequired: 'El IBAN es requerido',
      bicLabel: 'BIC/SWIFT',
      bicPlaceholder: 'CAIXESBBXXX',
      submit: 'Agregar Cuenta',
      submitting: 'Agregando...',
      cancel: 'Cancelar',
      addSuccess: 'Cuenta Agregada',
      addSuccessDesc: 'La cuenta bancaria ha sido agregada exitosamente.',
      addError: 'Error al agregar cuenta',
    },
    welcomeModal: {
      title: 'Bienvenido a ALTUS',
      description: 'Su cuenta ha sido creada exitosamente',
      accountType: 'Su Tipo de Cuenta',
      individualAccount: 'Cuenta Personal',
      businessAccount: 'Cuenta Empresarial',
      individualAccess: 'Acceso a servicios de financiamiento personal',
      businessAccess: 'Acceso completo a servicios de financiamiento empresarial',
      availableOffers: 'Ofertas disponibles para usted',
      getStarted: 'Comenzar',
    },
    calculator: {
      title: 'Calculadora de Amortización',
      description: 'Simule su plan de pago',
      loanAmount: 'Monto del Préstamo',
      interestRate: 'Tasa de Interés Anual (%)',
      loanDuration: 'Duración del Préstamo',
      months: 'meses',
      calculate: 'Calcular',
      results: 'Resultados',
      monthlyPayment: 'Pago Mensual',
      totalInterest: 'Intereses Totales',
      totalAmount: 'Monto Total',
      amortizationSchedule: 'Tabla de Amortización',
      month: 'Mes',
      payment: 'Pago',
      principal: 'Capital',
      interest: 'Intereses',
      balance: 'Saldo Restante',
      downloadSchedule: 'Descargar Tabla',
    },
    kycDocuments: {
      title: 'Documentos KYC',
      description: 'Suba sus documentos de identificación',
      uploadDocuments: 'Suba Sus Documentos',
      documentType: 'Tipo de Documento',
      selectDocumentType: 'Seleccione el tipo',
      identity: 'Documento de Identidad',
      proof_of_address: 'Comprobante de Domicilio',
      income_proof: 'Comprobante de Ingresos',
      business_registration: 'Registro Mercantil',
      financial_statements: 'Estados Financieros',
      tax_returns: 'Declaración de Impuestos',
      chooseFile: 'Elegir Archivo',
      upload: 'Subir',
      uploading: 'Subiendo...',
      uploadSuccess: 'Documento Subido',
      uploadSuccessDesc: 'Su documento ha sido subido exitosamente.',
      uploadError: 'Error al subir',
      status: 'Estado',
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      uploadedAt: 'Subido el',
      noDocuments: 'No se subieron documentos',
    },
  },
};

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};
