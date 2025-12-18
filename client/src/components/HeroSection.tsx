import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './hero.css';

interface HeroSlide {
  leftImage: string;
  rightImage: string;
  title: string;
  subtitle: string;
}

// Exactly 3 professional financial/banking themed slides
const heroSlides: HeroSlide[] = [
  {
    leftImage: 'https://images.unsplash.com/photo-1460925895917-adf4e565db43?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1579621970563-fbf46d27c313?w=800&h=600&fit=crop',
    title: 'Réalisez vos projets',
    subtitle: 'Financement personnalisé pour particuliers et professionnels'
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1556740742-a3247c3433b5?w=800&h=600&fit=crop',
    title: 'Solutions rapides et transparentes',
    subtitle: 'Réponse en 24h avec un processus clair et de confiance'
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&h=600&fit=crop',
    title: 'Sécurité bancaire suisse',
    subtitle: 'Approuvé rapidement avec protection maximale de vos données'
  }
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Single timeline: NO repeat, plays all slides sequentially, then stops
      const timeline = gsap.timeline();

      heroSlides.forEach((_, index) => {
        // ===== SLIDE ENTER PHASE =====
        // Images enter from left and right simultaneously
        timeline
          .fromTo(
            `.slide-${index} .left`,
            { x: '-100%' },
            { x: '0%', duration: 1, ease: 'power4.out' },
            index === 0 ? 0 : undefined
          )
          .fromTo(
            `.slide-${index} .right`,
            { x: '100%' },
            { x: '0%', duration: 1, ease: 'power4.out' },
            '<'
          );

        // ===== TEXT DISPLAY PHASE =====
        // Text fades in once images have met in center
        timeline.fromTo(
          `.slide-${index} .text`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );

        // ===== TEXT HOLD PHASE =====
        // Text stays visible for 1.5 seconds
        timeline.to(
          `.slide-${index} .text`,
          { opacity: 1, duration: 1.5 },
          '+=0'
        );

        // ===== TEXT FADE OUT PHASE =====
        // Text fades before images exit
        timeline.to(
          `.slide-${index} .text`,
          { opacity: 0, duration: 0.4 },
          '+=0'
        );

        // ===== SLIDE EXIT PHASE =====
        // Images split apart: left exits upward (clipped), right exits downward (clipped)
        timeline.to(
          `.slide-${index} .left`,
          {
            clipPath: 'inset(0 0 50% 0)',
            y: '-100%',
            duration: 1,
            ease: 'power4.in'
          },
          '<'
        );

        timeline.to(
          `.slide-${index} .right`,
          {
            clipPath: 'inset(50% 0 0 0)',
            y: '100%',
            duration: 1,
            ease: 'power4.in'
          },
          '<'
        );

        // ===== RESET FOR NEXT SLIDE =====
        // Clear properties so next slide renders fresh
        timeline.set(`.slide-${index} .left`, { clearProps: 'all' });
        timeline.set(`.slide-${index} .right`, { clearProps: 'all' });
      });

      // Timeline plays once and stops (no repeat)
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
