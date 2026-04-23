const footerLinks = {
  'Collections': ['Bridal Lehenga', 'Designer Sarees', 'Anarkali Suits', 'Sharara Sets', 'Occasion Wear', 'Accessories'],
  'Customer Care': ['Size Guide', 'Care Instructions', 'Shipping Policy', 'Returns & Exchange', 'Track My Order', 'FAQs'],
  'Company': ['Our Story', 'Lookbook', 'Press', 'Careers', 'Sustainability', 'Contact Us'],
};

function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round"/></svg>;
}
function FacebookIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function PinterestIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.140-.828 3.330-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.563 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.742 2.276a.3.3 0 0 1 .069.285c-.076.315-.244 1.004-.277 1.145-.044.186-.147.225-.339.136-1.249-.582-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.220-5.190 6.220-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>;
}
function YoutubeIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/></svg>;
}

export default function Footer() {
  return (
    <footer className="bg-luxury text-cream/70">

      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img src="/Asset1.png" alt="Heirloom" className="h-20 w-auto" />
            </div>

            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,#c9a84c,transparent)', marginBottom: 20 }} />

            <p className="font-sans font-light text-sm leading-relaxed text-cream/50 mb-8 max-w-xs">
              Luxury Indian fashion handcrafted for the modern woman. Each piece is a testament to India's unparalleled artistry and heritage.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[InstagramIcon, FacebookIcon, PinterestIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-cream/15 flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-sans text-[10px] tracking-luxury uppercase font-medium text-white mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans font-light text-xs text-cream/45 hover:text-gold transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-cream/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h4 className="font-display text-xl text-white font-light mb-1">
                Stay in the world of Heirloom
              </h4>
              <p className="font-sans font-light text-xs text-cream/40">
                New arrivals, exclusive offers and artisan stories — delivered to you.
              </p>
            </div>

            <form className="flex w-full md:w-auto gap-0" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-cream/5 border border-cream/15 text-white placeholder-cream/30 font-sans font-light text-xs px-5 py-3.5 w-full md:w-72 focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-gold text-luxury font-sans font-medium text-[10px] tracking-luxury uppercase px-6 py-3.5 hover:bg-gold-dark transition-colors duration-300 flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/8">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans font-light text-[11px] text-cream/30">
            © 2025 Heirloom Couture. All rights reserved. Developed by <a href="https://virallstance.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">Virall Stance</a>
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" className="font-sans font-light text-[11px] text-cream/30 hover:text-gold/70 transition-colors">
                {link}
              </a>
            ))}
          </div>
          {/* Payment icons (text placeholders) */}
          <div className="flex items-center gap-2">
            {['Visa', 'MC', 'UPI', 'RazorPay'].map(p => (
              <span key={p} className="font-sans text-[9px] text-cream/25 border border-cream/10 px-2 py-1">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
