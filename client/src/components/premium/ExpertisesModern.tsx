import { motion } from "framer-motion";
import { Building2, User, RefreshCw, Sparkles, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslations } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const expertiseIcons = [Building2, User, RefreshCw, Sparkles];

export default function ExpertisesModern() {
  const t = useTranslations();
  const [, setLocation] = useLocation();
  
  return (
    <section className="relative py-12 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.premium.expertises.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.premium.expertises.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.premium.expertises.items.map((expertise, index) => {
            const Icon = expertiseIcons[index];
            const colors = [
              'from-accent/15 to-accent/5 border-accent/30',
              'from-primary/15 to-primary/5 border-primary/30',
              'from-green-500/15 to-green-500/5 border-green-500/30',
              'from-blue-500/15 to-blue-500/5 border-blue-500/30',
            ];
            const iconColors = [
              'text-accent',
              'text-primary',
              'text-green-500',
              'text-blue-500',
            ];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
                data-testid={`expertise-card-${index}`}
              >
                <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${colors[index]} border card-hover-premium`}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colors[index]} mb-5`}>
                    <Icon className={`h-6 w-6 ${iconColors[index]}`} />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">{expertise.title}</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{expertise.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {expertise.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted/40 text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="px-8 rounded-full"
            onClick={() => setLocation('/products')}
            data-testid="button-learn-more-all-expertises"
          >
            {t.hero.learnMore}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
