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
      // SINGLE GSAP TIMELINE - plays all slides sequentially, then stops
      const timeline = gsap.timeline();

      heroSlides.forEach((_, index) => {
        // ═════════════════════════════════════════════════════════════
        // PHASE 0: MAKE SLIDE VISIBLE (Atomic Unit Concept)
        // ═════════════════════════════════════════════════════════════
        // This slide becomes the active scene - everything inside must be visible
        timeline.set(`.slide-${index}`, { opacity: 1 }, `slide-${index}-start`);

        // ═════════════════════════════════════════════════════════════
        // PHASE 1: IMAGE ENTRY - Both images animate in simultaneously
        // ═════════════════════════════════════════════════════════════
        // Left image enters from left (-100% → 0%)
        // Right image enters from right (+100% → 0%)
        timeline.fromTo(
          `.slide-${index} .left`,
          { x: '-100%' },
          { x: '0%', duration: 1, ease: 'power4.out' },
          `slide-${index}-start`
        );

        // Right image enters SIMULTANEOUSLY (not after left)
        timeline.fromTo(
          `.slide-${index} .right`,
          { x: '100%' },
          { x: '0%', duration: 1, ease: 'power4.out' },
          `slide-${index}-start` // Same label = same start time
        );

        // ═════════════════════════════════════════════════════════════
        // PHASE 2: TEXT FADE IN - After images meet in center
        // ═════════════════════════════════════════════════════════════
        // Text appears with slight upward motion after images settle
        timeline.fromTo(
          `.slide-${index} .text`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          `-=0.4`
        );

        // ═════════════════════════════════════════════════════════════
        // PHASE 3: TEXT HOLD - Text stays visible
        // ═════════════════════════════════════════════════════════════
        timeline.to(
          `.slide-${index} .text`,
          { opacity: 1, duration: 1.5 },
          '+=0'
        );

        // ═════════════════════════════════════════════════════════════
        // PHASE 4: TEXT FADE OUT - Prepare for image exit
        // ═════════════════════════════════════════════════════════════
        timeline.to(
          `.slide-${index} .text`,
          { opacity: 0, duration: 0.4 },
          '+=0'
        );

        // ═════════════════════════════════════════════════════════════
        // PHASE 5: IMAGE EXIT - Images split apart simultaneously
        // ═════════════════════════════════════════════════════════════
        // Left image: clip bottom half, move upward
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

        // Right image: clip top half, move downward (SIMULTANEOUSLY with left)
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

        // ═════════════════════════════════════════════════════════════
        // PHASE 6: RESET TRANSFORMS (but keep slide visible for next)
        // ═════════════════════════════════════════════════════════════
        // This allows next slide to start fresh, but doesn't hide the slide
        timeline.set(
          [`.slide-${index} .left`, `.slide-${index} .right`],
          { clearProps: 'all' },
          '+=0'
        );

        // Hide this slide ONLY if it's not the last slide
        if (index < heroSlides.length - 1) {
          timeline.set(`.slide-${index}`, { opacity: 0 }, '+=0');
        }
        // If it IS the last slide, keep it visible with final image state
      });

      // Timeline plays exactly once, then stops (no repeat)
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
