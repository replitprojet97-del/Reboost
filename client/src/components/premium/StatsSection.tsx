import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getOfficialStats } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n";

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = false, inView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (startOnView && !inView) return;
    if (hasStarted) return;
    
    setHasStarted(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, startOnView, inView, hasStarted]);

  return count;
}

function parseStatValue(value: string): { number: number; suffix: string; prefix: string } {
  const match = value.match(/^([€$£]?)([0-9,.\s]+)([+%MK]*)$/);
  if (!match) return { number: 0, suffix: '', prefix: '' };
  
  const prefix = match[1] || '';
  let numStr = match[2].replace(/[,\s]/g, '');
  const suffix = match[3] || '';
  
  return {
    prefix,
    number: parseFloat(numStr) || 0,
    suffix
  };
}

function AnimatedStatValue({ value, inView }: { value: string; inView: boolean }) {
  const { prefix, number, suffix } = parseStatValue(value);
  const animatedNumber = useCountUp(number, 2000, true, inView);
  
  const formattedNumber = number >= 1000 
    ? animatedNumber.toLocaleString('fr-FR')
    : animatedNumber.toString();

  return (
    <span className="stat-value">
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const stats = getOfficialStats(t);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };
  
  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20 bg-stats-gradient">
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
          {stats.map((stat, index) => {
            const colors = [
              'from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40',
              'from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40',
              'from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40',
              'from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40',
            ];
            const iconColors = [
              'text-accent bg-accent/10',
              'text-foreground bg-primary/10',
              'text-green-500 bg-green-500/10',
              'text-blue-500 bg-blue-500/10',
            ];
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`text-center p-6 lg:p-8 rounded-2xl bg-gradient-to-br ${colors[index]} border transition-all duration-300 cursor-default`}
                data-testid={`stat-card-${index}`}
              >
                <motion.div 
                  className={`inline-flex p-3 rounded-xl ${iconColors[index]} mb-4`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <stat.icon className="h-6 w-6" />
                </motion.div>
                <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-2">
                  <AnimatedStatValue value={stat.value} inView={isInView} />
                </div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
