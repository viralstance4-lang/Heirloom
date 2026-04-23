const U = (id, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`;

export const bannerSlides = [
  {
    id: 1,
    desktopImage: '/Banner-1.jpeg',
    mobileImage:  '/Banner1MOB.jpeg',
    link:         '/collections',
  },
  {
    id: 2,
    desktopImage: '/Banner-2.jpeg',
    mobileImage:   '/Banner2MOB.jpeg',
    link:         '/bridal',
  },
  {
    id: 3,
    desktopImage: '/Banner-3.jpeg',
    mobileImage:  '/Banner3MOB.jpeg',
    link:         '/occasion-wear',
  },
];

export const promoVideo = {
  desktopVideo: '/desktop-v.mov',
  mobileVideo:  '/mobile-v.mov',
  link:         '/bridal',
};

export const heroSlides = [
  {
    id: 1,
    image: '/first-b.webp',
    tag: 'Bridal Collection 2025',
    heading: 'Crafted With\nHeritage',
    sub: 'Discover handcrafted bridal and occasion wear that honours centuries of Indian artistry.',
  },
  {
    id: 2,
    image: U('1490481651871-ab68de25d43d', 1920, 1080),
    tag: 'New Arrivals',
    heading: 'Where Tradition\nMeets Luxury',
    sub: 'Each piece is a love letter to the timeless elegance of Indian couture.',
  },
  {
    id: 3,
    image: U('1469334031218-e382a71b716b', 1920, 1080),
    tag: 'Occasion Wear',
    heading: 'Dressed for\nEvery Moment',
    sub: 'From sangeet to reception — wear the story of your celebration.',
  },
];

export const categories = [
  { id: 1, name: 'Bridal Lehenga',  sub: '48 Styles',  image: '/catfour.webp' },
  { id: 2, name: 'Designer Sarees', sub: '62 Styles',  image: '/cattwo.webp' },
  { id: 3, name: 'Anarkali Suits',  sub: '35 Styles',  image: '/catthree.webp' },
  { id: 4, name: 'Sharara Sets',    sub: '29 Styles',  image: '/catone.webp' },
  // { id: 5, name: 'Occasion Wear',   sub: '54 Styles',  image: U('1496747611176-843222e1e57c', 600, 800) },
  // { id: 6, name: 'Accessories',     sub: '40 Pieces',  image: U('1523381210434-271e8be1f52b', 600, 800) },
];

export const featuredProducts = [
  { id: 1, name: 'Crimson Bridal Lehenga',   price: '₹85,000', originalPrice: '₹1,10,000', tag: 'Bestseller', image: '/bs1.webp' },
  { id: 2, name: 'Ivory Silk Saree',          price: '₹28,500', originalPrice: null,         tag: 'New',        image: '/bs2.webp' },
  { id: 3, name: 'Royal Blue Anarkali',        price: '₹42,000', originalPrice: '₹55,000',   tag: 'Sale',       image: '/bs3.webp' },
  { id: 4, name: 'Blush Pink Sharara Set',     price: '₹36,000', originalPrice: null,         tag: 'Trending',   image: '/bs4.webp' },
];

export const newArrivals = [
  { id: 1, name: 'Emerald Tissue Saree',       price: '₹22,000', image: '/na1.webp' },
  { id: 2, name: 'Marigold Lehenga Set',        price: '₹65,000', image: '/na2.webp' },
  { id: 3, name: 'Midnight Velvet Anarkali',    price: '₹48,500', image: '/na3.webp' },
  { id: 4, name: 'Champagne Tissue Lehenga',    price: '₹78,000', image: '/na4.webp' },
  { id: 5, name: 'Dusty Rose Georgette Saree',  price: '₹18,500', image: '/na5.webp' },
  { id: 6, name: 'Ivory Organza Kurta Set',     price: '₹31,000', image: '/na6.webp' },
];

export const instagramImages = [
  '/in1.png',
  '/in2.png',
  '/in3.png',
  '/in4.jpeg',
  '/in5.png',
  '/in5.jpeg',
];

export const stats = [
  { value: '500+', label: 'Unique Designs' },
  { value: '15+',  label: 'Years of Craft' },
  { value: '12K+', label: 'Happy Brides' },
  { value: '100%', label: 'Handcrafted' },
];
