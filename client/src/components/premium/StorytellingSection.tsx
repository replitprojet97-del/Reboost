import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Link } from "wouter";
import VideoTemoignage from "@/components/VideoTemoignage";
import { useTranslations } from "@/lib/i18n";

export default function StorytellingSection() {
  const t = useTranslations();
  
  const features = [
    { icon: Check, text: "Processus transparent et sécurisé" },
    { icon: Check, text: "Approbation en 24-48 heures" },
    { icon: Check, text: "Taux compétitifs garantis" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Premium background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50 translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left content section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/30"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">{t.premium.storytelling.badge}</span>
            </motion.div>

            {/* Main title */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t.premium.storytelling.title}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-accent to-accent/50 rounded-full" />
            </motion.div>

            {/* Descriptions */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.premium.storytelling.paragraph1}
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                {t.premium.storytelling.paragraph2}
              </p>
            </motion.div>

            {/* Features list */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 py-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm lg:text-base">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link href="/about">
                <button 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:shadow-lg"
                  data-testid="button-discover-more"
                >
                  {t.premium.storytelling.ctaButton}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right visual section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Video container with enhanced styling */}
            <div className="relative group">
              {/* Glow effect behind video */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-accent/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Video wrapper */}
              <div className="relative bg-background rounded-3xl overflow-hidden shadow-2xl border border-accent/10 group-hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div style={{ minHeight: '500px', position: 'relative' }}>
                  <VideoTemoignage />
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent/20 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent/20 rounded-bl-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
