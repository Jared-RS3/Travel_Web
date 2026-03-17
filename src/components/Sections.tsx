const GALLERY_TILES = [
  {
    label: 'Beachfront Suites',
    caption: 'Wake to open ocean from your private terrace',
    size: 'tall',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Infinity Pool',
    caption: 'Merge with the horizon at the Azure Lagoon Pool',
    size: 'wide',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Azure Spa',
    caption: 'Traditional Filipino hilot & holistic wellness',
    size: 'square',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Horizon Restaurant',
    caption: 'Ocean-fresh Filipino cuisine on the cliff terrace',
    size: 'square',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Island Hopping',
    caption: 'Explore the surrounding Philippine archipelago',
    size: 'tall',
    img: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Private Beach',
    caption: 'Your own stretch of powdered white sand',
    size: 'wide',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
];

const AMENITY_STRIP = [
  { icon: '🌊', label: 'Overwater Bungalows' },
  { icon: '🌺', label: 'Filipino Spa' },
  { icon: '🍽️', label: 'Cliff Dining' },
  { icon: '🤿', label: 'Coral Diving' },
  { icon: '🛥️', label: 'Sunset Cruises' },
  { icon: '🌴', label: 'Private Beach' },
  { icon: '🌊', label: 'Overwater Bungalows' },
  { icon: '🌺', label: 'Filipino Spa' },
  { icon: '🍽️', label: 'Cliff Dining' },
  { icon: '🤿', label: 'Coral Diving' },
  { icon: '🛥️', label: 'Sunset Cruises' },
  { icon: '🌴', label: 'Private Beach' },
];

export function Sections() {
  return (
    <>
      {/* ── Gallery ──────────────────────────────────────────────────── */}
      <section id="gallery" className="gallery-section">
        <div className="gallery-header">
          <p className="section-kicker">The Azure · Philippines</p>
          <h2 className="gallery-title">
            Life at<br /><em>The Azure.</em>
          </h2>
          <p className="gallery-desc">
            Every corner of our resort was designed to dissolve the boundary
            between land, sea, and sky — captured here just as our guests live it.
          </p>
        </div>

        <div className="gallery-grid" aria-label="Resort gallery">
          {GALLERY_TILES.map((d) => (
            <article
              key={d.label}
              className={`gallery-tile gallery-tile--${d.size}`}
              style={{ backgroundImage: `url('${d.img}')` }}
            >
              <div className="gallery-tile__scrim" />
              <div className="gallery-tile__content">
                <strong className="gallery-tile__label">{d.label}</strong>
                <span className="gallery-tile__caption">{d.caption}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Amenity marquee */}
        <div className="amenity-marquee-wrap" aria-hidden="true">
          <div className="amenity-marquee">
            {AMENITY_STRIP.map((a, i) => (
              <span key={i} className="amenity-chip">
                <span className="amenity-chip__icon">{a.icon}</span>
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ─────────────────────────────────────────────── */}
      <section id="contact" className="booking-section">
        <div className="booking-inner">
          <div className="booking-intro">
            <p className="section-kicker">Reserve Your Stay</p>
            <h2 className="booking-title">
              Your escape<br /><em>begins here.</em>
            </h2>
            <p className="booking-desc">
              Tell us your dates and we will craft a bespoke stay at The Azure.
              Our concierge team responds within 24 hours.
            </p>
            <ul className="booking-perks">
              <li>✦ Best-rate guarantee</li>
              <li>✦ Complimentary airport transfer</li>
              <li>✦ Flexible cancellation</li>
            </ul>
          </div>

          <form
            className="booking-form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Reservation enquiry"
          >
            <div className="bf-row">
              <div className="bf-field">
                <label htmlFor="bf-name">Full Name</label>
                <input id="bf-name" type="text" placeholder="Jane Santos" required />
              </div>
              <div className="bf-field">
                <label htmlFor="bf-email">Email Address</label>
                <input id="bf-email" type="email" placeholder="jane@example.com" required />
              </div>
            </div>
            <div className="bf-row">
              <div className="bf-field">
                <label htmlFor="bf-checkin">Check-in</label>
                <input id="bf-checkin" type="date" required />
              </div>
              <div className="bf-field">
                <label htmlFor="bf-checkout">Check-out</label>
                <input id="bf-checkout" type="date" required />
              </div>
            </div>
            <div className="bf-row">
              <div className="bf-field">
                <label htmlFor="bf-guests">Guests</label>
                <select id="bf-guests">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
              <div className="bf-field">
                <label htmlFor="bf-suite">Suite Type</label>
                <select id="bf-suite">
                  <option>Beachfront Suite</option>
                  <option>Overwater Villa</option>
                  <option>Cliff-Edge Penthouse</option>
                  <option>Garden Pool Villa</option>
                </select>
              </div>
            </div>
            <div className="bf-field bf-field--full">
              <label htmlFor="bf-message">Special Requests (optional)</label>
              <textarea
                id="bf-message"
                rows={3}
                placeholder="Anniversary celebration, dietary requirements, early check-in…"
              />
            </div>
            <button type="submit" className="bf-submit">
              Send Reservation Enquiry
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="footer-logo">The Azure</span>
          <span className="footer-tagline">Palawan · Philippines</span>
        </div>
        <nav aria-label="Footer links">
          <a href="#">Instagram</a>
          <a href="#">Experiences</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </nav>
        <p className="footer-copy">© 2026 The Azure Resort. All rights reserved.</p>
      </footer>
    </>
  );
}
