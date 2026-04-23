const items = [
  'New Arrivals',
  'Bridal 2025',
  'Made to Order',
  'Occasion Wear',
  'Bespoke Couture',
  'Handcrafted in India',
  'Free Shipping Above ₹15K',
];

const Dot = () => (
  <span className="mx-6 text-brand/40 text-lg leading-none select-none">◆</span>
);

export default function MarqueeTicker() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-gold overflow-hidden py-3.5 border-y border-gold-dark/30">
      <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-sans font-medium text-[11px] tracking-luxury uppercase text-brand">
              {item}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
