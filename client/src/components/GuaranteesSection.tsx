import { Card } from '@/components/ui/card';
import { Shield, FileCheck, Building, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function GuaranteesSection() {
  const guarantees = [
    {
      icon: Shield,
      title: 'Garanties Organismes',
      items: [
        'BPI France (40-70% du prêt)',
        'SIAGI (garantie artisans/commerçants)',
        'France Active (économie sociale)',
        'SOCAMA (agriculteurs)'
      ]
    },
    {
      icon: Building,
      title: 'Garanties Réelles',
      items: [
        'Hypothèque sur biens immobiliers',
        'Nantissement fonds de commerce',
        'Gage sur matériel/équipement',
        'Privilège du prêteur de deniers'
      ]
    },
    {
      icon: FileCheck,
      title: 'Garanties Personnelles',
      items: [
        'Caution solidaire du dirigeant',
        'Caution bancaire professionnelle',
        'Garantie à première demande',
        'Lettre de confort groupe'
      ]
    },
    {
      icon: Users,
      title: 'Assurance Emprunteur',
      items: [
        'Décès / PTIA (obligatoire)',
        'Invalidité permanente (IPT/IPP)',
        'Incapacité temporaire (ITT)',
        'Cotisations fiscalement déductibles'
      ]
    }
  ];

  const taxBenefits = [
    {
      title: 'Déductibilité des intérêts',
      description: 'Les intérêts d\'emprunt sont déductibles du résultat fiscal de votre entreprise, réduisant ainsi votre impôt sur les bénéfices.'
    },
    {
      title: 'Amortissement accéléré',
      description: 'Pour les équipements financés, possibilité d\'amortissement accéléré selon certaines conditions (matériel neuf, écologique, etc.).'
    },
    {
      title: 'Crédit d\'impôt',
      description: 'Certains investissements ouvrent droit à des crédits d\'impôt (transition énergétique, numérique, formation).'
    },
    {
      title: 'TVA récupérable',
      description: 'La TVA sur les intérêts et frais de dossier est récupérable pour les entreprises assujetties.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Garanties & Sécurisation
          </h2>
          <p className="text-xl text-muted-foreground">
            Plusieurs options pour sécuriser votre financement et optimiser votre fiscalité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <Card key={index} className="p-6" data-testid={`card-guarantee-${index}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{guarantee.title}</h3>
                </div>
                <ul className="space-y-2">
                  {guarantee.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold">Avantages Fiscaux du Prêt Professionnel</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {taxBenefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Conseil fiscal :</strong> Consultez votre expert-comptable pour optimiser la déductibilité de vos emprunts et maximiser vos avantages fiscaux.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-center">Apport Personnel Requis</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10-15%</div>
                <div className="text-sm font-semibold mb-1">Équipement</div>
                <div className="text-xs text-muted-foreground">Matériel, véhicules</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20-30%</div>
                <div className="text-sm font-semibold mb-1">Création / Reprise</div>
                <div className="text-xs text-muted-foreground">Fonds de commerce</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20-25%</div>
                <div className="text-sm font-semibold mb-1">Immobilier Pro</div>
                <div className="text-xs text-muted-foreground">Locaux, bureaux</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              * Pourcentages indicatifs pouvant varier selon votre projet et votre profil
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
