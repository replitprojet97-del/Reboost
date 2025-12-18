import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { useTranslations } from "@/lib/i18n";

const avatarImages = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=13",
  "https://i.pravatar.cc/150?img=20",
  "https://i.pravatar.cc/150?img=33",
  "https://i.pravatar.cc/150?img=9",
  "https://i.pravatar.cc/150?img=51"
];

export default function TestimonialsSlider() {
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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.premium.testimonials.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.premium.testimonials.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {t.premium.testimonials.items.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 transition-all duration-200 hover:shadow-md hover:border-accent/40 hover-elevate" data-testid={`testimonial-${index}`}>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={avatarImages[index]}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover border-2 border-accent/20"
                    />
                    <div>
                      <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
