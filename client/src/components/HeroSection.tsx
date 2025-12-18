import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './hero.css';

interface HeroSlide {
  leftImage: string;
  rightImage: string;
  title: string;
  subtitle: string;
  cta?: string;
}

// 6 professional financial/banking themed slides - coherent premium imagery
const heroSlides: HeroSlide[] = [
  // === FIRST CYCLE ===
  {
    leftImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1460925895917-adf4e565db43?w=800&h=600&fit=crop',
    title: 'Réalisez vos projets',
    subtitle: 'Financement personnalisé pour particuliers et professionnels',
    cta: 'Demander un financement'
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    title: 'Solutions rapides et transparentes',
    subtitle: 'Réponse en 24h avec un processus clair et de confiance',
    cta: 'Obtenir ma réponse'
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    title: 'Sécurité bancaire suisse',
    subtitle: 'Approuvé rapidement avec protection maximale de vos données',
    cta: 'Commencer maintenant'
  },
  // === SECOND CYCLE ===
  {
    leftImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
    title: 'Croissance garantie',
    subtitle: 'Investissements intelligents pour vos ambitions futures',
    cta: 'Explorer les options'
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    title: 'Conseil expert à votre service',
    subtitle: 'Nos spécialistes vous accompagnent à chaque étape',
    cta: 'Consulter un expert'
  },
  {
    leftImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    title: 'Partenariat durable',
    subtitle: 'Bâtissons ensemble une relation de confiance long terme',
    cta: 'Devenir partenaire'
  }
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // SINGLE GSAP TIMELINE - plays all slides sequentially, repeats infinitely
      const timeline = gsap.timeline({ repeat: -1 });
      timelineRef.current = timeline;

      heroSlides.forEach((_, index) => {
        const isLastSlide = index === heroSlides.length - 1;

        // ═════════════════════════════════════════════════════════════
        // ATOMIC SCENE PRINCIPLE: Each slide is a complete isolated unit
        // Inactive slides are FULLY invisible (visibility: hidden + opacity: 0)
        // All animations stay within slide container
        // ═════════════════════════════════════════════════════════════

        // PHASE 0: ACTIVATE SLIDE - Make it the visible scene
        timeline.set(`.slide-${index}`, { visibility: 'visible', opacity: 1 }, `slide-${index}-start`);

        // Update indicator dots
        timeline.call(() => setCurrentSlide(index), [], `slide-${index}-start`);

        // PHASE 1: IMAGE ENTRY - Both images animate in simultaneously (SMOOTHER)
        timeline.fromTo(
          `.slide-${index} .left`,
          { x: '-100%' },
          { x: '0%', duration: 1, ease: 'power2.inOut' },
          `slide-${index}-start`
        );

        timeline.fromTo(
          `.slide-${index} .right`,
          { x: '100%' },
          { x: '0%', duration: 1, ease: 'power2.inOut' },
          `slide-${index}-start`
        );

        // PHASE 2: TEXT & CTA FADE IN - After images settle
        timeline.fromTo(
          `.slide-${index} .text`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

        // PHASE 3: TEXT HOLD - Visible for 2 SECONDS (more time to read!)
        timeline.to(`.slide-${index} .text`, { opacity: 1, duration: 2 }, '+=0');

        if (!isLastSlide) {
          // INTERMEDIATE SLIDES: Fade out text and split images away

          // PHASE 4: TEXT FADE OUT
          timeline.to(`.slide-${index} .text`, { opacity: 0, duration: 0.4 }, '+=0');

          // PHASE 5: IMAGES SPLIT - Left up, right down (SMOOTHER)
          timeline.to(
            `.slide-${index} .left`,
            { clipPath: 'inset(0 0 50% 0)', y: '-100%', duration: 1, ease: 'power2.inOut' },
            '<'
          );

          timeline.to(
            `.slide-${index} .right`,
            { clipPath: 'inset(50% 0 0 0)', y: '100%', duration: 1, ease: 'power2.inOut' },
            '<'
          );

          // PHASE 6: HIDE THIS SLIDE - Make way for next
          timeline.set(`.slide-${index}`, { visibility: 'hidden', opacity: 0 }, '+=0');
        } else {
          // LAST SLIDE: Fade out and hide to prepare for loop restart

          // PHASE 4 (last): TEXT FADE OUT
          timeline.to(`.slide-${index} .text`, { opacity: 0, duration: 0.4 }, '+=0');

          // PHASE 5 (last): IMAGES SPLIT - Left up, right down
          timeline.to(
            `.slide-${index} .left`,
            { clipPath: 'inset(0 0 50% 0)', y: '-100%', duration: 1, ease: 'power2.inOut' },
            '<'
          );

          timeline.to(
            `.slide-${index} .right`,
            { clipPath: 'inset(50% 0 0 0)', y: '100%', duration: 1, ease: 'power2.inOut' },
            '<'
          );

          // PHASE 6 (last): HIDE THIS SLIDE - Loop will restart from slide 0
          timeline.set(`.slide-${index}`, { visibility: 'hidden', opacity: 0 }, '+=0');
        }
      });

      // Timeline plays exactly once, then stops (no repeat)
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // IMPROVEMENT #6: Pause animation on hover
  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering);
    if (timelineRef.current) {
      if (hovering) {
        timelineRef.current.pause();
      } else {
        timelineRef.current.play();
      }
    }
  };

  return (
    <section 
      className="hero" 
      ref={containerRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      data-testid="hero-section"
    >
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
            {/* IMPROVEMENT #2: CTA Button */}
            <button className="cta-button" data-testid={`cta-${index}`}>
              {slide.cta || 'En savoir plus'}
            </button>
          </div>
        </div>
      ))}

      {/* IMPROVEMENT #1: Slide Indicators (Dots) */}
      <div className="slide-indicators" data-testid="slide-indicators">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            data-testid={`dot-${index}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
