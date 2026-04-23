import { useState, useEffect } from 'react';
import { heroSlides } from '../data/content';

export default function HeroBanner() {
  const [current, setCurrent]   = useState(0);
  const [loaded,  setLoaded]    = useState({});
  const [animKey, setAnimKey]   = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % heroSlides.length);
      setAnimKey(k => k + 1);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i) => { setCurrent(i); setAnimKey(k => k + 1); };

  const slide = heroSlides[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover object-center scale-105 hero-bg"
            style={{ transform: i === current ? 'scale(1)' : 'scale(1.04)', transition: 'transform 6s ease' }}
            onLoad={() => setLoaded(l => ({ ...l, [i]: true }))}
            onError={e => { e.target.style.display = 'none'; }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div key={animKey} className="space-y-6 max-w-4xl">
          {/* Tag */}
          <p
            className="font-sans font-light text-gold text-xs tracking-ultra uppercase"
            style={{ animation: 'fadeInUp 0.7s ease both', animationDelay: '0.1s' }}
          >
            {slide.tag}
          </p>

          {/* Heading */}
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] text-shadow-luxury whitespace-pre-line"
            style={{ animation: 'fadeInUp 0.8s ease both', animationDelay: '0.25s' }}
          >
            {slide.heading}
          </h1>

          {/* Gold line */}
          <div
            className="mx-auto"
            style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,#c9a84c,transparent)', animation: 'fadeIn 0.8s ease both', animationDelay: '0.4s' }}
          />

          {/* Sub */}
          <p
            className="font-sans font-light text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed tracking-wide"
            style={{ animation: 'fadeInUp 0.8s ease both', animationDelay: '0.5s' }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            style={{ animation: 'fadeInUp 0.8s ease both', animationDelay: '0.65s' }}
          >
            <a href="#" className="btn-primary min-w-[180px] justify-center">
              Explore Collection
            </a>
            <a href="#" className="btn-outline text-white border-white/60 hover:border-gold hover:text-gold min-w-[180px] justify-center">
              Shop Bridal
            </a>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group flex items-center"
            aria-label={`Slide ${i + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-400 ${
                i === current
                  ? 'w-8 h-1 bg-gold'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="font-sans text-white/50 text-[9px] tracking-ultra uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-scroll-down" />
      </div>

      {/* Left slide counter */}
      <div className="absolute bottom-12 left-8 z-10 hidden md:block">
        <span className="font-display text-white/60 text-sm">
          0{current + 1} <span className="text-white/30">/ 0{heroSlides.length}</span>
        </span>
      </div>
    </section>
  );
}
