import { useInView } from '../hooks/useInView';
import { instagramImages } from '../data/content';

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function InstagramGallery() {
  const [titleRef, titleInView] = useInView();

  return (
    <section className="section-pad bg-cream-dark">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Title */}
        <div
          ref={titleRef}
          className="text-center mb-10"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-sans text-gold text-[10px] tracking-ultra uppercase font-light mb-3">
            Follow Our Journey
          </p>
          <a
            href="#"
            className="font-display text-3xl md:text-4xl font-light text-brand hover:text-gold transition-colors duration-300"
          >
            @heirloombysk
          </a>
          <div className="gold-divider" />
          <p className="font-sans text-luxury-muted text-sm font-light">
            Share your look with <span className="text-brand">#WornWithHeirloom</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramImages.map((src, i) => (
            <a
              key={i}
              href="#"
              className="relative overflow-hidden aspect-square group block"
            >
              <img
                src={src}
                alt={`Instagram ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.background = `hsl(${i * 30 + 10},25%,75%)`;
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-10">
          <a href="#" className="btn-outline text-brand border-brand/40 hover:bg-brand hover:text-white hover:border-brand">
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
