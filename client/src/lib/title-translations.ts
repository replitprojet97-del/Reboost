// Title word translations for all languages
// Structure: Each language has 4 words that compose the title with different styling

export const titleTranslations = {
  en: [
    { text: "Financing", weight: "black" },
    { text: "excellence", weight: "gradient" },
    { text: "driving", weight: "semibold", separator: true },
    { text: "growth", weight: "bold" }
  ],
  fr: [
    { text: "Accompagner", weight: "black" },
    { text: "vos réussites", weight: "gradient" },
    { text: "soutenir", weight: "semibold", separator: true },
    { text: "vos initiatives", weight: "bold" }
  ],
  de: [
    { text: "Finanzierung", weight: "black" },
    { text: "Exzellenz", weight: "gradient" },
    { text: "Wachstum", weight: "semibold", separator: true },
    { text: "vorantreiben", weight: "bold" }
  ],
  es: [
    { text: "Financiar", weight: "black" },
    { text: "la excelencia", weight: "gradient" },
    { text: "impulsar", weight: "semibold", separator: true },
    { text: "el crecimiento", weight: "bold" }
  ],
  it: [
    { text: "Finanziamento", weight: "black" },
    { text: "eccellenza", weight: "gradient" },
    { text: "guidare", weight: "semibold", separator: true },
    { text: "la crescita", weight: "bold" }
  ]
};

export type LanguageCode = keyof typeof titleTranslations;

export function getTitleWords(language: LanguageCode) {
  return titleTranslations[language] || titleTranslations.en;
}
