import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useTranslations } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function FinalCTASection() {
  const t = useTranslations();
  
  return (
    <section className="relative py-24 lg:py-32 bg-foreground">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-background mb-6 leading-tight">
            {t.premium.finalCTA.title}
          </h2>

          <p className="text-lg text-background/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.premium.finalCTA.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/loans/new">
              <Button 
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-full bg-background text-foreground hover:bg-background/90"
                data-testid="button-start-dossier"
              >
                {t.premium.finalCTA.primaryButton}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-full border-background/30 text-background hover:bg-background/10"
                data-testid="button-talk-adviser"
              >
                {t.premium.finalCTA.secondaryButton}
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/60">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{t.premium.finalCTA.trustBadges.noCommitment}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{t.premium.finalCTA.trustBadges.response24h}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{t.premium.finalCTA.trustBadges.secure100}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
