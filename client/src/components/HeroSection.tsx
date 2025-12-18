import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './hero.css';

interface HeroSlide {
  leftImage: string;
  rightImage: string;
  title: string;
  subtitle: string;
}

const heroSlides: HeroSlide[] = [
  {
    leftImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    title: 'Réalisez vos projets',
    subtitle: 'Financements innovants pour particuliers et professionnels'
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1460925895917-adf4e565db43?w=800&h=600&fit=crop',
    title: 'Solutions rapides',
    subtitle: 'Réponse en 24h avec processus transparent'
  }
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ repeat: -1 });

      heroSlides.forEach((_, index) => {
        // Enter animations
        timeline
          .fromTo(
            `.slide-${index} .left`,
            { x: '-100%' },
            { x: '0%', duration: 1, ease: 'power4.out' },
            0
          )
          .fromTo(
            `.slide-${index} .right`,
            { x: '100%' },
            { x: '0%', duration: 1, ease: 'power4.out' },
            '<'
          )
          .fromTo(
            `.slide-${index} .text`,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.4'
          )
          // Hold animations
          .to(
            `.slide-${index} .text`,
            { opacity: 0, duration: 0.4 },
            '+=1'
          )
          // Exit animations
          .to(
            `.slide-${index} .left`,
            {
              clipPath: 'inset(0 0 50% 0)',
              y: '-100%',
              duration: 1,
              ease: 'power4.in'
            },
            '<'
          )
          .to(
            `.slide-${index} .right`,
            {
              clipPath: 'inset(50% 0 0 0)',
              y: '100%',
              duration: 1,
              ease: 'power4.in'
            },
            '<'
          )
          .set(`.slide-${index} .left`, { clearProps: 'all' })
          .set(`.slide-${index} .right`, { clearProps: 'all' });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      {heroSlides.map((slide, index) => (
        <div className={`slide slide-${index}`} key={index} data-testid={`slide-hero-${index}`}>
          <div
            className="image left"
            style={{ backgroundImage: `url(${slide.leftImage})` }}
            data-testid={`image-left-${index}`}
          />
          <div
            className="image right"
            style={{ backgroundImage: `url(${slide.rightImage})` }}
            data-testid={`image-right-${index}`}
          />
          <div className="text" data-testid={`text-hero-${index}`}>
            <h1 data-testid={`title-${index}`}>{slide.title}</h1>
            <p data-testid={`subtitle-${index}`}>{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
