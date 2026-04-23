import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { featuredProducts } from '../data/content';

const tagColors = {
  Bestseller: 'bg-brand text-cream',
  New:        'bg-gold text-luxury',
  Sale:       'bg-luxury text-cream',
  Trending:   'bg-brand-light text-cream',
};

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#c9a84c' : 'none'} stroke={filled ? '#c9a84c' : 'currentColor'} strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ProductCard({ product, index }) {
  const [wished, setWished]   = useState(false);
  const [ref, inView]         = useInView();

  return (
    <div
      ref={ref}
      className="product-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/5] bg-cream-dark">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          onError={e => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background = 'linear-gradient(135deg,#f0ebe0,#e8e0d0)';
          }}
        />

        {/* Tag */}
        <span className={`absolute top-3 left-3 font-sans text-[9px] tracking-luxury uppercase font-medium px-2.5 py-1 ${tagColors[product.tag] || tagColors.New}`}>
          {product.tag}
        </span>

        {/* Wishlist */}
        <button
          onClick={() => setWished(w => !w)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
          aria-label="Wishlist"
        >
          <HeartIcon filled={wished} />
        </button>

        {/* Add to Bag — slides up on hover */}
        <div className="add-btn font-sans font-medium text-[10px] tracking-luxury uppercase">
          Add to Bag
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <h3 className="font-serif text-base font-normal text-luxury leading-snug mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-sans font-medium text-brand text-sm">{product.price}</span>
          {product.originalPrice && (
            <span className="font-sans text-luxury-muted text-xs line-through">{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [titleRef, titleInView] = useInView();

  return (
    <section className="section-pad bg-white">
      <div className="max-w-screen-xxl mx-auto px-6">

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
            Most Loved
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-brand">
            Bestsellers
          </h2>
          <div className="gold-divider" />
          <p className="font-sans text-luxury-muted text-sm font-light max-w-sm mx-auto">
            Timeless pieces that our brides return to, season after season.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#" className="btn-primary">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
