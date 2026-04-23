import { useState, useEffect } from 'react';
// import AnnouncementBar  from './components/AnnouncementBar';
import Navbar           from './components/Navbar';
// import HeroBanner       from './components/HeroBanner';
import BannerSlider     from './components/BannerSlider';
import MarqueeTicker    from './components/MarqueeTicker';
import CategorySection  from './components/CategorySection';
import FeaturedProducts from './components/FeaturedProducts';
import PromoVideoBanner from './components/PromoVideoBanner';
import NewArrivals      from './components/NewArrivals';
import BrandStory       from './components/BrandStory';
import InstagramGallery from './components/InstagramGallery';
import Footer           from './components/Footer';
import { bannerSlides, promoVideo } from './data/content';

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-6 z-50 w-11 h-11 bg-brand text-cream flex items-center justify-center shadow-luxury transition-all duration-300 hover:bg-gold hover:shadow-gold ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

/* Scroll progress bar */
function ScrollProgress() {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setProg(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gold transition-[width] duration-100"
        style={{ width: `${prog}%` }}
      />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      {/* <AnnouncementBar /> */}
      <Navbar />

      <main>
        {/* <HeroBanner /> */}
        <BannerSlider slides={bannerSlides} />
        <MarqueeTicker />
        <CategorySection />
        <FeaturedProducts />
        <PromoVideoBanner {...promoVideo} />
        <NewArrivals />
        <BrandStory />
        <InstagramGallery />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
