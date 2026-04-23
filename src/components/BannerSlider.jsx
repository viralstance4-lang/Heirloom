import { useState, useEffect, useCallback, useRef } from 'react';

const ChevronLeft  = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function BannerSlider({
  slides    = [],
  autoPlay  = true,
  interval  = 4500,
}) {
  const [current,  setCurrent]  = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart  = useRef(null);
  const count      = slides.length;

  const prev = useCallback(() => setCurrent(i => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setCurrent(i => (i + 1)         % count), [count]);

  useEffect(() => {
    if (!autoPlay || paused || count <= 1) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, paused, count, interval, next]);

  /* touch / mouse drag support */
  const onDragStart = (clientX) => {
    dragStart.current = clientX;
    setDragging(false);
  };
  const onDragEnd = (clientX) => {
    if (dragStart.current === null) return;
    const delta = dragStart.current - clientX;
    if (Math.abs(delta) > 40) { delta > 0 ? next() : prev(); setDragging(true); }
    dragStart.current = null;
  };

  if (!count) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-cream select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseDown={e  => onDragStart(e.clientX)}
      onMouseUp={e    => onDragEnd(e.clientX)}
      onTouchStart={e => onDragStart(e.touches[0].clientX)}
      onTouchEnd={e   => onDragEnd(e.changedTouches[0].clientX)}
    >
      {/* ── Slide track ── */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <a
            key={slide.id ?? i}
            href={dragging ? undefined : slide.link || '#'}
            onClick={e => dragging && e.preventDefault()}
            className="min-w-full block cursor-pointer overflow-hidden group"
            tabIndex={i === current ? 0 : -1}
            aria-hidden={i !== current}
            draggable={false}
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={slide.mobileImage || slide.desktopImage}
              />
              <img
                src={slide.desktopImage}
                alt={`Banner ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
                className="w-full h-auto object-contain block transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.02]"
              />
            </picture>
          </a>
        ))}
      </div>

      {/* ── Prev / Next arrows ── */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous banner"
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 md:w-11 md:h-11
                       flex items-center justify-center
                       bg-white/80 hover:bg-white
                       shadow-luxury backdrop-blur-sm
                       transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-1/2"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            aria-label="Next banner"
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 md:w-11 md:h-11
                       flex items-center justify-center
                       bg-white/80 hover:bg-white
                       shadow-luxury backdrop-blur-sm
                       transition-all duration-300 hover:translate-x-0.5 hover:-translate-y-1/2"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* ── Dot indicators ── */}
      {count > 1 && (
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`rounded-full transition-all duration-400
                ${i === current
                  ? 'w-5 h-[6px] bg-gold'
                  : 'w-[6px] h-[6px] bg-white/70 hover:bg-white'
                }`}
            />
          ))}
        </div>
      )}

      {/* ── Progress bar ── */}
      {autoPlay && count > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10">
          <div
            key={`${current}-${paused}`}
            className={`h-full bg-gold origin-left ${!paused ? 'animate-banner-progress' : ''}`}
            style={{ animationDuration: `${interval}ms` }}
          />
        </div>
      )}
    </section>
  );
}
