import { Shield, Clock, TrendingDown, Award } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

export default function FeaturesSection() {
  const t = useTranslations();

  const features = [
    {
      icon: Shield,
      title: t.features?.security || 'Sécurisé et Confidentiel',
      description:
        t.features?.securityDesc ||
        'Vos données sont protégées avec les plus hauts standards de sécurité bancaire',
    },
    {
      icon: Clock,
      title: t.features?.fast || 'Réponse Express',
      description:
        t.features?.fastDesc ||
        'Réponse en quelques minutes à 24h. Fonds immédiatement sur votre compte Altus sécurisé.',
    },
    {
      icon: TrendingDown,
      title: t.features?.competitive || 'Taux Compétitifs',
      description:
        t.features?.competitiveDesc ||
        'Bénéficiez de taux parmi les plus bas du marché grâce à notre réseau',
    },
    {
      icon: Award,
      title: t.features?.flexible || 'Conditions Flexibles',
      description:
        t.features?.flexibleDesc ||
        'Remboursement anticipé sans frais et modulation possible des mensualités',
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.features?.title || 'Pourquoi Choisir ALTUS ?'}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.features?.subtitle ||
              'Une plateforme de prêt moderne qui met vos besoins au centre'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
