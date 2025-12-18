import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SectorCard {
  title: string;
  description: string;
  image: string;
  badges: string[];
  color: string;
}

const sectors: SectorCard[] = [
  {
    title: 'Crédits entreprise',
    description: 'Des financements pensés pour les structures de toutes tailles : création, développement et croissance externe.',
    image: '/generated_images/business_professionals_planning_finance.png',
    badges: ['Prêts équipement', 'Crédit-bail', 'Affacturage'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Prêts aux particuliers',
    description: 'Réalisez vos projets de vie grâce à des offres adaptées : acquisition immobilière, mobilité, aménagement.',
    image: '/generated_images/family_planning_financial_future.png',
    badges: ['Prêts immobiliers', 'Crédits auto', 'Prêts travaux'],
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Énergie renouvelable',
    description: 'Financer vos projets d\'énergie verte et durable. Solutions adaptées pour les investissements en énergies propres.',
    image: '/generated_images/renewable_energy_infrastructure.png',
    badges: ['Panneaux solaires', 'Éoliennes', 'Batteries'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Immobilier & Construction',
    description: 'Concrétisez vos projets immobiliers avec nos solutions de financement flexibles et compétitives.',
    image: '/generated_images/real_estate_development_project.png',
    badges: ['Promotion immobilière', 'Rénovation', 'Commercial'],
    color: 'from-amber-500 to-orange-600',
  },
];

export default function SectorsInterventionCards() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-background/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos secteurs d'intervention
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions de financement adaptées à tous vos besoins professionnels et personnels
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover-elevate transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-20 mix-blend-multiply`} />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {sector.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
                  {sector.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {sector.badges.map((badge, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs md:text-sm"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* CTA Link */}
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300 group/link"
                  data-testid={`button-sector-${index}`}
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
