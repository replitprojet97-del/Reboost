import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import businessProfessionalsImg from '@assets/generated_images/business_professionals_planning_finance.png';
import familyPlanningImg from '@assets/generated_images/family_planning_financial_future.png';
import renewableEnergyImg from '@assets/generated_images/renewable_energy_infrastructure.png';
import realEstateImg from '@assets/generated_images/real_estate_development_project.png';

interface SectorSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  ctaText: string;
}

const sectors: SectorSection[] = [
  {
    title: 'Crédits entreprise',
    subtitle: 'votre fonds de roulement à portée de clic',
    description: 'Des financements pensés pour les structures de toutes tailles : création, développement et croissance externe.',
    image: businessProfessionalsImg,
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Prêts équipement',
        description: 'Financement adaptée pour l\'acquisition de matériel et équipements professionnels',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Crédit-bail',
        description: 'Solutions flexibles de location avec option d\'achat à la fin de la période',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Affacturage',
        description: 'Optimisez votre trésorerie en cédant vos créances clients',
      },
    ],
    ctaText: 'Demander un financement entreprise',
  },
  {
    title: 'Prêts aux particuliers',
    subtitle: 'réalisez vos projets de vie',
    description: 'Réalisez vos projets de vie grâce à des offres adaptées : acquisition immobilière, mobilité, aménagement.',
    image: familyPlanningImg,
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Prêts immobiliers',
        description: 'Concrétisez vos rêves immobiliers avec des conditions avantageuses et un accompagnement expert',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Crédits auto',
        description: 'Financement flexible pour votre véhicule neuf ou d\'occasion',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Prêts travaux',
        description: 'Rénovez votre habitat avec des solutions de financement sur mesure',
      },
    ],
    ctaText: 'Explorer les offres pour particuliers',
  },
  {
    title: 'Regroupement de crédits',
    subtitle: 'maîtrisez votre budget',
    description: 'Atténuez vos charges mensuelles en affinant vos emprunts. Sécurisez une gestion budgétaire sereine.',
    image: renewableEnergyImg,
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Audit de crédit',
        description: 'Analyse complète de votre situation financière et identification des opportunités',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Restructuration',
        description: 'Réorganisation intelligente de vos dettes pour réduire vos mensualités',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Optimisation',
        description: 'Amélioration de votre trésorerie et augmentation de votre pouvoir d\'achat',
      },
    ],
    ctaText: 'Consulter pour un regroupement',
  },
  {
    title: 'Offres alternatives',
    subtitle: 'adaptées aux évolutions du marché',
    description: 'Des produits financiers modernes qui s\'adaptent aux évolutions du marché et aux besoins émergents.',
    image: realEstateImg,
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Fintech',
        description: 'Accédez aux dernières innovations en technologies financières et digital banking',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Green finance',
        description: 'Investissez dans des projets durables et écologiques avec impact positif',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Inno finance',
        description: 'Découvrez des solutions financières innovantes adaptées à votre profil',
      },
    ],
    ctaText: 'Découvrir les offres alternatives',
  },
];

export default function SectorsInterventionCards() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nos secteurs d'intervention
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions de financement adaptées à tous vos besoins professionnels et personnels
          </p>
        </motion.div>

        {/* Sectors - Alternating Layout */}
        <div className="space-y-24">
          {sectors.map((sector, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Image Section */}
                <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                </div>

                {/* Content Section */}
                <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                  {/* Title */}
                  <h3 className="text-4xl font-bold text-foreground mb-2">
                    {sector.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xl text-foreground font-medium mb-4">
                    {sector.subtitle}
                  </p>

                  {/* Main Description */}
                  <p className="text-muted-foreground mb-8 leading-relaxed text-base">
                    {sector.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {sector.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="bg-emerald-500 hover:bg-emerald-600 text-white h-12 px-8 rounded-full font-semibold"
                    data-testid={`button-sector-cta-${index}`}
                  >
                    <a href="/contact" className="inline-flex items-center gap-2">
                      {sector.ctaText}
                    </a>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
