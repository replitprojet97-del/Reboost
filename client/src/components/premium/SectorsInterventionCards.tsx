import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    description: 'Obtenez jusqu\'à 50 000 € de crédit de trésorerie non affecté pour tous vos usages',
    image: '/generated_images/business_professionals_planning_finance.png',
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Mise à disposition express',
        description: 'recevez votre offre en 2h et les fonds en 24h!',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Modalités parmi les plus compétitives du marché',
        description: 'taux d\'intérêts mensuels fixes à partir de 0,8% sans caution personnelle du dirigeant',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Critères d\'acceptation accessibles',
        description: 'un apport de trésorerie conçu pour toutes les entreprises et situations',
      },
    ],
    ctaText: 'En savoir plus sur le prêt de trésorerie',
  },
  {
    title: 'Prêts aux particuliers',
    subtitle: 'réalisez vos projets de vie',
    description: 'Réalisez vos projets grâce à des offres adaptées : acquisition immobilière, mobilité, aménagement',
    image: '/generated_images/family_planning_financial_future.png',
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Solutions rapides et flexibles',
        description: 'obtenez une réponse en 48h avec des modalités adaptées à votre situation',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Taux compétitifs garantis',
        description: 'des taux parmi les plus avantageux du marché sans frais cachés',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Accompagnement personnalisé',
        description: 'nos experts vous conseillent à chaque étape de votre projet',
      },
    ],
    ctaText: 'Explorer les offres pour particuliers',
  },
  {
    title: 'Énergie renouvelable',
    subtitle: 'financez votre transition énergétique',
    description: 'Concrétisez vos projets d\'énergie verte et durable avec nos solutions de financement',
    image: '/generated_images/renewable_energy_infrastructure.png',
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Financement spécialisé',
        description: 'des solutions pensées pour les projets solaires, éoliens et énergies propres',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Expertise verte',
        description: 'une équipe dédiée qui comprend les spécificités des énergies renouvelables',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Contribuez à la durabilité',
        description: 'financez l\'avenir tout en bénéficiant d\'avantages fiscaux et des subventions',
      },
    ],
    ctaText: 'Financer mon projet vert',
  },
  {
    title: 'Immobilier & Construction',
    subtitle: 'concrétisez vos ambitions immobilières',
    description: 'Des solutions de financement flexibles et compétitives pour tous vos projets immobiliers',
    image: '/generated_images/real_estate_development_project.png',
    features: [
      {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: 'Expertise immobilière reconnue',
        description: 'plus de 15 ans d\'expérience dans le financement de projets d\'envergure',
      },
      {
        icon: <Lock className="h-5 w-5 text-emerald-500" />,
        title: 'Montages financiers sur-mesure',
        description: 'des structures adaptées à votre projet, de la conception à la réalisation',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        title: 'Accompagnement de bout en bout',
        description: 'suivi personnalisé de vos démarches administratives et financières',
      },
    ],
    ctaText: 'Demander un financement immobilier',
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
