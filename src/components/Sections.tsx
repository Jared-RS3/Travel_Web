const FEATURED_DESTINATIONS = [
  {
    place: 'Santorini',
    country: 'Greece',
    spot: 'Oia Clifftop',
    size: 'tall',
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    place: 'Maldives',
    country: 'Indian Ocean',
    spot: 'North Malé Atoll',
    size: 'wide',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    place: 'Positano',
    country: 'Italy',
    spot: 'Amalfi Coast Village',
    size: 'square',
    img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    place: 'Bora Bora',
    country: 'French Polynesia',
    spot: 'Lagoon Overwater Bungalows',
    size: 'square',
    img: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?auto=format&fit=crop&w=900&q=80',
  },
  {
    place: 'Ubud',
    country: 'Bali, Indonesia',
    spot: 'Tegalalang Rice Terraces',
    size: 'tall',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
  },
  {
    place: 'Patagonia',
    country: 'Chile',
    spot: 'Torres del Paine',
    size: 'wide',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
  },
];

const MARQUEE_DESTINATIONS = [
  {
    place: 'Chefchaouen',
    country: 'Morocco',
    spot: 'The Blue City',
    img: 'https://images.unsplash.com/photo-1553851919-5571c7fdf7e2?auto=format&fit=crop&w=700&q=80',
  },
  {
    place: 'Kyoto',
    country: 'Japan',
    spot: 'Arashiyama Bamboo Grove',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=700&q=80',
  },
  {
    place: 'Jökulsárlón',
    country: 'Iceland',
    spot: 'Glacier Lagoon',
    img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=700&q=80',
  },
  {
    place: 'Tulum',
    country: 'Mexico',
    spot: 'Ruinas del Mar',
    img: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=700&q=80',
  },
  {
    place: 'Phi Phi',
    country: 'Thailand',
    spot: 'Maya Bay',
    img: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=700&q=80',
  },
  {
    place: 'Sintra',
    country: 'Portugal',
    spot: 'Pena National Palace',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=700&q=80',
  },
  {
    place: 'Cappadocia',
    country: 'Turkey',
    spot: 'Göreme Valley',
    img: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=700&q=80',
  },
];

export function Sections() {
  return (
    <>
      {/* ── Destinations gallery ─────────────────────────────────────── */}
      <section id="destinations" className="destinations-section">
        {/* Header */}
        <div className="destinations-header">
          <div className="destinations-header__left">
            <p className="section-kicker">Our World / Destinations</p>
            <h2 className="destinations-title">
              Places that<br /><em>stay with you.</em>
            </h2>
          </div>
          <p className="destinations-header__desc">
            Handpicked destinations curated for those who value silence,
            architecture, and the unhurried beauty of the world.
          </p>
        </div>

        {/* Featured masonry grid */}
        <div className="dest-grid" aria-label="Featured destinations">
          {FEATURED_DESTINATIONS.map((d) => (
            <article
              key={d.place}
              className={`dest-tile dest-tile--${d.size}`}
              style={{ backgroundImage: `url('${d.img}')` }}
            >
              <div className="dest-tile__scrim" />
              <div className="dest-tile__content">
                <span className="dest-tile__country">{d.country}</span>
                <strong className="dest-tile__place">{d.place}</strong>
                <span className="dest-tile__spot">{d.spot}</span>
              </div>
              <div className="dest-tile__index-badge" aria-hidden="true">
                {d.place.slice(0, 2).toUpperCase()}
              </div>
            </article>
          ))}
        </div>

        {/* Horizontal marquee strip */}
        <div className="dest-marquee-wrap" aria-label="More destinations">
          <div className="dest-marquee">
            {[...MARQUEE_DESTINATIONS, ...MARQUEE_DESTINATIONS].map((d, i) => (
              <article key={`${d.place}-${i}`} className="dest-marquee__card">
                <div
                  className="dest-marquee__img"
                  style={{ backgroundImage: `url('${d.img}')` }}
                  aria-hidden="true"
                />
                <div className="dest-marquee__info">
                  <span className="dest-marquee__country">{d.country}</span>
                  <strong className="dest-marquee__place">{d.place}</strong>
                  <span className="dest-marquee__spot">{d.spot}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section id="contact" className="editorial-section cta-panel">
        <p className="section-kicker">Plan your escape</p>
        <h2 className="section-title">Begin with a note. We will shape the rest.</h2>
        <form className="cta-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input id="email" type="email" placeholder="you@example.com" required />
          <button type="submit">Start planning</button>
        </form>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <p>© 2026 DayBreak Travel</p>
        <nav aria-label="Footer links">
          <a href="#">Instagram</a>
          <a href="#">Journal</a>
          <a href="#">Terms</a>
        </nav>
      </footer>
    </>
  );
}
