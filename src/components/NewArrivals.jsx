import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { newArrivals } from '../data/content';

function ChevronIcon({ dir = 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d={dir === 'right' ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} />
    </svg>
  );
}

export default function NewArrivals() {
  const scrollRef              = useRef(null);
  const [titleRef, titleInView] = useInView();

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <section className="section-pad bg-cream overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Header row */}
        <div
          ref={titleRef}
          className="flex items-end justify-between mb-10"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div>
            <p className="font-sans text-gold text-[10px] tracking-ultra uppercase font-light mb-2">
              Just In
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Arrow buttons */}
            <div className="hidden md:flex items-center gap-2">
              {['left', 'right'].map(dir => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  className="w-10 h-10 border border-gold/40 flex items-center justify-center text-brand hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                  aria-label={`Scroll ${dir}`}
                >
                  <ChevronIcon dir={dir} />
                </button>
              ))}
            </div>

            <a href="#" className="btn-ghost text-brand hover:text-gold hidden sm:flex">
              View All
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Track */}
        <div ref={scrollRef} className="scroll-track">
          {newArrivals.map((product, i) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-56 md:w-64 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] bg-cream-dark mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = `linear-gradient(135deg,hsl(${i * 40},30%,80%),hsl(${i * 40 + 20},20%,70%))`;
                  }}
                />
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-sans text-white text-[10px] tracking-luxury uppercase border border-white/60 px-4 py-2">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Info */}
              <p className="font-serif text-sm text-luxury leading-snug mb-1">{product.name}</p>
              <p className="font-sans text-brand text-sm font-medium">{product.price}</p>
            </div>
          ))}
        </div>

        {/* Mobile: View All */}
        <div className="text-center mt-8 sm:hidden">
          <a href="#" className="btn-ghost text-brand justify-center">
            View All New Arrivals
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </a>
        </div>
      </div>
    </section>
  );
}
