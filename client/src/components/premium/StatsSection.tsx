import { motion } from "framer-motion";
import { getOfficialStats } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

export default function StatsSection() {
  const t = useTranslations();
  
  return (
    <section className="relative py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.premium.stats.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.premium.stats.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {getOfficialStats(t).map((stat, index) => {
            const colors = [
              'from-accent/10 to-accent/5 border-accent/20',
              'from-primary/10 to-primary/5 border-primary/20',
              'from-green-500/10 to-green-500/5 border-green-500/20',
              'from-blue-500/10 to-blue-500/5 border-blue-500/20',
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
                className={`text-center p-6 rounded-2xl bg-gradient-to-br ${colors[index]} border`}
                data-testid={`stat-card-${index}`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colors[index]} mb-4`}>
                  <stat.icon className={`h-6 w-6 ${iconColors[index]}`} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
