import { useLocation } from 'wouter';
import { useTranslations } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroPremium() {
  const [, setLocation] = useLocation();
  const t = useTranslations();

  const trustBadges = [
    { icon: Shield, label: t.hero.trustBadges.swissSecurity },
    { icon: Clock, label: t.hero.trustBadges.response24h },
    { icon: CheckCircle, label: t.hero.trustBadges.fastApproval },
  ];

  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            {t.hero.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-full group btn-premium-primary btn-shimmer no-default-hover-elevate no-default-active-elevate"
              onClick={() => setLocation('/products')}
              data-testid="button-hero-cta-primary"
            >
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 ml-2 icon-arrow-right" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-full btn-premium-outline no-default-hover-elevate no-default-active-elevate"
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

        {/* Trust Statistics Section */}
        <div className="mt-20 lg:mt-28 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                Plus de 15 000 clients satisfaits nous font confiance
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Solutions de financement pour particuliers et professionnels – Taux compétitifs et processus transparent
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
