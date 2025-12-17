import { useLocation } from 'wouter';
import { useTranslations } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';

export default function HeroPremium() {
  const [, setLocation] = useLocation();
  const t = useTranslations();

  const trustBadges = [
    { icon: Shield, label: t.hero.trustBadges.swissSecurity },
    { icon: Clock, label: t.hero.trustBadges.response24h },
    { icon: CheckCircle, label: t.hero.trustBadges.fastApproval },
  ];

  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            {t.hero.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-full group shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setLocation('/products')}
              data-testid="button-hero-cta-primary"
            >
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-full hover:shadow-md transition-shadow"
              onClick={() => setLocation('/login')}
              data-testid="button-hero-cta-secondary"
            >
              {t.hero.cta2}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
                data-testid={`trust-badge-${index}`}
              >
                <badge.icon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Dashboard Preview Image */}
        <div className="mt-20 lg:mt-28 relative">
          <div className="relative mx-auto max-w-5xl">
            {/* Shadow/glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 blur-3xl rounded-3xl" />
            
            {/* Dashboard preview placeholder */}
            <div className="relative bg-card border border-border rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
              <div className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg font-medium text-foreground">{t.hero.trustIndicator}</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    {t.hero.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
