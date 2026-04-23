import { useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';

export default function PromoVideoBanner({
  desktopVideo = '',
  mobileVideo  = '',
  link         = '#',
}) {
  const [ref, inView]    = useInView();
  const desktopRef       = useRef(null);
  const mobileRef        = useRef(null);

  /* play/pause based on visibility — saves resources when off-screen */
  useEffect(() => {
    [desktopRef, mobileRef].forEach(r => {
      if (!r.current) return;
      inView ? r.current.play().catch(() => {}) : r.current.pause();
    });
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: 520 }}>

      {/* ── Desktop video (≥ 768 px) ── */}
      <video
        ref={desktopRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        aria-hidden="true"
      >
        <source src={desktopVideo} type="video/quicktime" />
        <source src={desktopVideo} type="video/mp4" />
      </video>

      {/* ── Mobile video (< 768 px) ── */}
      <video
        ref={mobileRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center block md:hidden"
        aria-hidden="true"
      >
        <source src={mobileVideo || desktopVideo} type="video/quicktime" />
        <source src={mobileVideo || desktopVideo} type="video/mp4" />
      </video>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand/70 to-transparent" />
      <div className="absolute inset-0 bg-black/30" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex items-center" style={{ minHeight: 520 }}>
        <div
          className="max-w-screen-xl mx-auto px-6 py-24 md:py-32"
          style={{
            // opacity:    inView ? 1 : 0,
            // transform:  inView ? 'translateX(0)' : 'translateX(-32px)',
            // transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <p className="font-sans text-gold text-[10px] tracking-ultra uppercase font-light mb-4">
            Exclusive Collection
          </p>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 max-w-lg text-shadow-luxury">
            The Bridal<br />
            <em>Edit 2025</em>
          </h2>

          {/* Decorative line */}
          <div className="flex items-center gap-4 mb-6">
            <div style={{ width: 50, height: 1, background: '#c9a84c' }} />
            <div style={{ width: 6,  height: 6, background: '#c9a84c', transform: 'rotate(45deg)' }} />
            <div style={{ width: 50, height: 1, background: '#c9a84c' }} />
          </div>

          <p className="font-sans font-light text-white/80 text-sm md:text-base max-w-sm leading-relaxed mb-10">
            Celebrate your most treasured moments in couture crafted to become the heirloom of tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={link} className="btn-primary">
              Discover The Edit
            </a>
            <a href={link} className="btn-outline text-white border-white/50 hover:border-gold hover:text-gold">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* ── Gold accent bottom ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#c9a84c,transparent)' }} />
    </section>
  );
}
