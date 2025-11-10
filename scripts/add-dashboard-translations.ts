import * as fs from 'fs';

const newTranslations = {
  goodMorning: {
    es: 'Buenos días',
    pt: 'Bom dia',
    it: 'Buongiorno',
    de: 'Guten Morgen',
    nl: 'Goedemorgen',
  },
  goodAfternoon: {
    es: 'Buenas tardes',
    pt: 'Boa tarde',
    it: 'Buon pomeriggio',
    de: 'Guten Nachmittag',
    nl: 'Goedemiddag',
  },
  goodEvening: {
    es: 'Buenas noches',
    pt: 'Boa noite',
    it: 'Buonasera',
    de: 'Guten Abend',
    nl: 'Goedenavond',
  },
  totalBalance: {
    es: 'Saldo total',
    pt: 'Saldo total',
    it: 'Saldo totale',
    de: 'Gesamtsaldo',
    nl: 'Totaal saldo',
  },
  newTransfer: {
    es: 'Nueva transferencia',
    pt: 'Nova transferência',
    it: 'Nuovo bonifico',
    de: 'Neue Überweisung',
    nl: 'Nieuwe overboeking',
  },
  requestLoan: {
    es: 'Solicitar un préstamo',
    pt: 'Solicitar um empréstimo',
    it: 'Richiedere un prestito',
    de: 'Kredit beantragen',
    nl: 'Lening aanvragen',
  },
  manageAccounts: {
    es: 'Gestionar cuentas',
    pt: 'Gerenciar contas',
    it: 'Gestisci conti',
    de: 'Konten verwalten',
    nl: 'Rekeningen beheren',
  },
  cashflow: {
    es: 'Flujo de caja',
    pt: 'Fluxo de caixa',
    it: 'Flusso di cassa',
    de: 'Cashflow',
    nl: 'Cashflow',
  },
  incomeExpensesSixMonths: {
    es: 'Ingresos y gastos en 6 meses',
    pt: 'Receitas e despesas em 6 meses',
    it: 'Entrate e uscite in 6 mesi',
    de: 'Einnahmen und Ausgaben über 6 Monate',
    nl: 'Inkomsten en uitgaven over 6 maanden',
  },
  income: {
    es: 'Ingresos',
    pt: 'Receitas',
    it: 'Entrate',
    de: 'Einnahmen',
    nl: 'Inkomsten',
  },
  expenses: {
    es: 'Gastos',
    pt: 'Despesas',
    it: 'Uscite',
    de: 'Ausgaben',
    nl: 'Uitgaven',
  },
  creditUtilization: {
    es: 'Utilización del crédito',
    pt: 'Utilização de crédito',
    it: 'Utilizzo del credito',
    de: 'Kreditauslastung',
    nl: 'Kredietgebruik',
  },
  used: {
    es: 'utilizado',
    pt: 'utilizado',
    it: 'utilizzato',
    de: 'verwendet',
    nl: 'gebruikt',
  },
  recentActivity: {
    es: 'Actividad reciente',
    pt: 'Atividade recente',
    it: 'Attività recente',
    de: 'Neueste Aktivität',
    nl: 'Recente activiteit',
  },
  latestTransactions: {
    es: 'Últimas transacciones',
    pt: 'Últimas transações',
    it: 'Ultime transazioni',
    de: 'Neueste Transaktionen',
    nl: 'Laatste transacties',
  },
  viewAll: {
    es: 'Ver todo',
    pt: 'Ver tudo',
    it: 'Vedi tutto',
    de: 'Alle anzeigen',
    nl: 'Bekijk alles',
  },
  noRecentTransactions: {
    es: 'Sin transacciones recientes',
    pt: 'Sem transações recentes',
    it: 'Nessuna transazione recente',
    de: 'Keine aktuellen Transaktionen',
    nl: 'Geen recente transacties',
  },
  yourActiveLoans: {
    es: 'Sus préstamos activos',
    pt: 'Seus empréstimos ativos',
    it: 'I tuoi prestiti attivi',
    de: 'Ihre aktiven Darlehen',
    nl: 'Uw actieve leningen',
  },
  activeLoan: {
    es: 'Préstamo activo',
    pt: 'Empréstimo ativo',
    it: 'Prestito attivo',
    de: 'Aktives Darlehen',
    nl: 'Actieve lening',
  },
  repaid: {
    es: 'Reembolsado',
    pt: 'Reembolsado',
    it: 'Rimborsato',
    de: 'Zurückgezahlt',
    nl: 'Terugbetaald',
  },
  upcomingDueDates: {
    es: 'Próximos vencimientos',
    pt: 'Próximos vencimentos',
    it: 'Prossime scadenze',
    de: 'Bevorstehende Fälligkeiten',
    nl: 'Aankomende vervaldagen',
  },
  amount: {
    es: 'Cantidad',
    pt: 'Quantia',
    it: 'Importo',
    de: 'Betrag',
    nl: 'Bedrag',
  },
  monthJan: {
    es: 'Ene',
    pt: 'Jan',
    it: 'Gen',
    de: 'Jan',
    nl: 'Jan',
  },
  monthFeb: {
    es: 'Feb',
    pt: 'Fev',
    it: 'Feb',
    de: 'Feb',
    nl: 'Feb',
  },
  monthMar: {
    es: 'Mar',
    pt: 'Mar',
    it: 'Mar',
    de: 'Mär',
    nl: 'Mrt',
  },
  monthApr: {
    es: 'Abr',
    pt: 'Abr',
    it: 'Apr',
    de: 'Apr',
    nl: 'Apr',
  },
  monthMay: {
    es: 'May',
    pt: 'Mai',
    it: 'Mag',
    de: 'Mai',
    nl: 'Mei',
  },
  monthJun: {
    es: 'Jun',
    pt: 'Jun',
    it: 'Giu',
    de: 'Jun',
    nl: 'Jun',
  },
};

const filePath = 'client/src/lib/i18n.ts';
let content = fs.readFileSync(filePath, 'utf8');

const languages = ['es', 'pt', 'it', 'de', 'nl'];

for (const lang of languages) {
  // Find the dashboard section for this language
  const dashboardRegex = new RegExp(`(${lang}:.*?dashboard: \\{[^}]*?moreTransfers: [^,]*,)\\s*(\\})`, 's');
  
  const match = content.match(dashboardRegex);
  if (!match) {
    console.error(`Could not find dashboard section for ${lang}`);
    continue;
  }

  // Build the new keys string
  const newKeys = Object.keys(newTranslations).map(key => {
    return `      ${key}: '${newTranslations[key][lang]}',`;
  }).join('\n');

  // Replace the closing brace with new keys + closing brace
  content = content.replace(dashboardRegex, `$1\n${newKeys}\n    $2`);
  
  console.log(`✓ Added translations for ${lang}`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n✓ All translations added successfully!');
