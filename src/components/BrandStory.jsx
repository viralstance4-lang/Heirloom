import { useInView } from '../hooks/useInView';
import { stats } from '../data/content';

const STORY_VIDEO = '/about.mp4';

export default function BrandStory() {
  const [leftRef,  leftInView]  = useInView();
  const [rightRef, rightInView] = useInView();
  const [statsRef, statsInView] = useInView();

  return (
    <>
      {/* Story Section */}
      <section className="section-pad bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Text */}
            <div
              ref={leftRef}
              style={{
                opacity: leftInView ? 1 : 0,
                transform: leftInView ? 'translateX(0)' : 'translateX(-32px)',
                transition: 'opacity 0.9s ease, transform 0.9s ease',
              }}
            >
              <p className="font-sans text-gold text-[10px] tracking-ultra uppercase font-light mb-4">
                Our Heritage
              </p>

              {/* Big quote */}
              <p className="brand-quote mb-8">
                "Where tradition meets modern luxury."
              </p>

              {/* Gold ornament */}
              <div className="flex items-center gap-4 mb-8">
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
                <div style={{ width: 8, height: 8, background: '#c9a84c', transform: 'rotate(45deg)' }} />
              </div>

              <p className="font-sans font-light text-luxury-muted text-sm leading-loose mb-4">
                Heirloom was born from a deep love for India's unparalleled textile heritage. Each ensemble is a labour of love — woven, embroidered, and hand-finished by master artisans who carry centuries of skill in their hands.
              </p>
              <p className="font-sans font-light text-luxury-muted text-sm leading-loose mb-10">
                From the bustling ateliers of Jaipur to the silk looms of Varanasi, we source only the finest fabrics and trims to create pieces worthy of being passed down through generations.
              </p>

              <a href="#" className="btn-primary">
                Discover Our Story
              </a>
            </div>

            {/* Right: Image */}
            <div
              ref={rightRef}
              className="relative"
              style={{
                opacity: rightInView ? 1 : 0,
                transform: rightInView ? 'translateX(0)' : 'translateX(32px)',
                transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
              }}
            >
              {/* Gold frame offset */}
              <div
                className="absolute -top-4 -left-4 right-8 bottom-8 border border-gold/30 pointer-events-none"
                style={{ zIndex: 0 }}
              />
              <div className="relative overflow-hidden aspect-[4/5]" style={{ zIndex: 1 }}>
                <video
                  src={STORY_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-gold text-luxury p-6 text-center shadow-gold" style={{ zIndex: 2 }}>
                <div className="font-display text-3xl font-semibold leading-none">15+</div>
                <div className="font-sans text-[9px] tracking-luxury uppercase font-medium mt-1">Years of Craft</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand py-14">
        <div
          ref={statsRef}
          className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{
            opacity: statsInView ? 1 : 0,
            transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="font-display text-4xl md:text-5xl font-light text-gold mb-2 group-hover:animate-float">
                {s.value}
              </div>
              <div className="font-sans text-cream/60 text-[10px] tracking-luxury uppercase font-light">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
