import { useTranslations } from '@/lib/i18n';

export default function StatsSection() {
  const t = useTranslations();

  const stats = [
    {
      value: '15 000+',
      label: t.stats?.clients || 'Clients Satisfaits',
    },
    {
      value: '€500M+',
      label: t.stats?.funded || 'Prêts Accordés',
    },
    {
      value: '98%',
      label: t.stats?.satisfaction || 'Taux de Satisfaction',
    },
    {
      value: '15+',
      label: t.stats?.years || 'Années d\'Expérience',
    },
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
