import { useState, useEffect } from 'react';

const messages = [
  'Complimentary Shipping on Orders Above ₹15,000',
  'Use Code HEIRLOOM10 for 10% Off Your First Order',
  'New Bridal Collection 2025 — Now Available',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (closed) return null;

  return (
    <div className="relative z-50 bg-brand text-cream text-xs tracking-luxury py-2.5 px-6 text-center font-sans font-light">
      <span
        className="transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {messages[index]}
      </span>
      <button
        onClick={() => setClosed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
