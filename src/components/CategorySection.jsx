import { useInView } from '../hooks/useInView';
import { categories } from '../data/content';

function CategoryCard({ cat, index }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className="reveal group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
      }}
    >
      <div className="category-card aspect-[3/4] overflow-hidden">
        {/* Image */}
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
          onError={e => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background = 'linear-gradient(135deg,#5a2e3b,#3d1f28)';
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-400 group-hover:opacity-90" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
          <p className="font-sans text-gold text-[10px] tracking-ultra uppercase font-light mb-1.5">
            {cat.sub}
          </p>
          <h3 className="font-display text-white text-xl font-light leading-tight mb-3">
            {cat.name}
          </h3>
          <span className="inline-flex items-center gap-2 font-sans text-white/70 text-[10px] tracking-luxury uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* Gold corner accent */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>
    </div>
  );
}

export default function CategorySection() {
  const [titleRef, titleInView] = useInView();

  return (
    <section className="section-pad bg-cream">
      <div className="max-w-screen-xxl mx-auto px-3">

        {/* Title */}
        <div
          ref={titleRef}
          className="text-center mb-14"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-sans text-gold text-[10px] tracking-ultra uppercase font-light mb-3">
            Our World
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-brand leading-tight">
            Explore Our Collections
          </h2>
          <div className="gold-divider" />
          <p className="font-sans text-luxury-muted text-sm font-light max-w-md mx-auto leading-relaxed">
            From bridal masterpieces to everyday elegance — each collection tells a story of heritage and craft.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#" className="btn-ghost text-brand hover:text-gold">
            View All Collections
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
