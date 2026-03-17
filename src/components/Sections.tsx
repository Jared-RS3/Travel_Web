import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GALLERY_TILES = [
  {
    label: 'Beachfront Suites',
    caption: 'Wake up to open ocean views from your private terrace',
    size: 'tall',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Infinity Pool',
    caption: 'Spend slow afternoons where the pool meets the horizon',
    size: 'wide',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Azure Spa',
    caption: 'Filipino hilot rituals and wellness sessions by the sea',
    size: 'square',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Horizon Restaurant',
    caption: 'Fresh Filipino flavors served on our cliffside terrace',
    size: 'square',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Island Hopping',
    caption: 'Discover nearby islands across the Philippine archipelago',
    size: 'tall',
    img: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Private Beach',
    caption: 'Unwind on your own quiet stretch of white sand',
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
  const galleryRef = useRef<HTMLElement | null>(null);
  const bookingRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const gallery = galleryRef.current;
    const booking = bookingRef.current;
    const footer = footerRef.current;
    if (!gallery || !booking || !footer) return;

    const ctx = gsap.context(() => {
      const header = gallery.querySelector<HTMLElement>('.gallery-header');
      const grid = gallery.querySelector<HTMLElement>('.gallery-grid');
      const tiles = gsap.utils.toArray<HTMLElement>('.gallery-tile');
      const marquee = gallery.querySelector<HTMLElement>('.amenity-marquee');

      if (header) {
        gsap.fromTo(
          header,
          { y: 120, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 84%',
              end: 'bottom 50%',
              scrub: 1.2,
            },
          }
        );
      }

      if (grid) {
        gsap.fromTo(
          grid,
          { y: 90 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: gallery,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      tiles.forEach((tile, i) => {
        const content = tile.querySelector<HTMLElement>('.gallery-tile__content');
        gsap.fromTo(
          tile,
          {
            y: 140,
            rotate: i % 2 === 0 ? -2.6 : 2.6,
            scale: 1.16,
            opacity: 0,
            filter: 'brightness(0.72) saturate(0.74) blur(4px)',
          },
          {
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: 'brightness(1) saturate(1) blur(0px)',
            ease: 'power4.out',
            scrollTrigger: {
              trigger: tile,
              start: 'top 88%',
              end: 'bottom 42%',
              scrub: 1.1,
            },
          }
        );

        if (content) {
          gsap.fromTo(
            content,
            { y: 45, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: tile,
                start: 'top 78%',
                end: 'top 44%',
                scrub: 0.9,
              },
            }
          );
        }
      });

      if (marquee) {
        gsap.fromTo(
          marquee,
          { xPercent: 0 },
          {
            xPercent: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: gallery,
              start: 'top 72%',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        );
      }

      const bookingIntro = booking.querySelector<HTMLElement>('.booking-intro');
      const bookingForm = booking.querySelector<HTMLElement>('.booking-form');
      const bookingFields = gsap.utils.toArray<HTMLElement>('.bf-field, .bf-submit');

      if (bookingIntro) {
        gsap.fromTo(
          bookingIntro,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: booking,
              start: 'top 80%',
              end: 'top 36%',
              scrub: 1,
            },
          }
        );
      }

      if (bookingForm) {
        gsap.fromTo(
          bookingForm,
          {
            y: 120,
            opacity: 0,
            rotateX: 8,
            transformPerspective: 1100,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: booking,
              start: 'top 76%',
              end: 'top 26%',
              scrub: 1,
            },
          }
        );
      }

      bookingFields.forEach((field, i) => {
        gsap.fromTo(
          field,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bookingForm || booking,
              start: `top ${82 - i * 2}%`,
              end: `top ${56 - i * 2}%`,
              scrub: 0.9,
            },
          }
        );
      });

      gsap.fromTo(
        footer,
        { y: 80, opacity: 0, filter: 'blur(3px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 96%',
            end: 'top 62%',
            scrub: 1,
          },
        }
      );
    }, gallery);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ── Gallery ──────────────────────────────────────────────────── */}
      <section id="gallery" className="gallery-section" ref={galleryRef}>
        <div className="gallery-header">
          <p className="section-kicker">The Azure · Philippines</p>
          <h2 className="gallery-title">
            Life at<br /><em>The Azure.</em>
          </h2>
          <p className="gallery-desc">
            Every corner of our resort is shaped by the meeting of land, sea, and sky.
            This is how each day feels when you stay with us.
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
      <section id="contact" className="booking-section" ref={bookingRef}>
        <div className="booking-inner">
          <div className="booking-intro">
            <p className="section-kicker">Reserve Your Stay</p>
            <h2 className="booking-title">
              Your escape<br /><em>begins here.</em>
            </h2>
            <p className="booking-desc">
              Share your travel dates and what you want from the trip.
              Our concierge team will help shape your stay and get back to you within 24 hours.
            </p>
            <ul className="booking-perks">
              <li>✦ Best rate guarantee</li>
              <li>✦ Complimentary airport transfer</li>
              <li>✦ Flexible cancellation</li>
            </ul>
          </div>

{submitted ? (
              <div className="bf-success" role="status">
                <div className="bf-success__icon" aria-hidden="true">✦</div>
                <h3 className="bf-success__heading">Request received.</h3>
                <p className="bf-success__body">
                  Thank you. Our concierge team will review your dates and
                  get back to you at the address provided within 24 hours.
                  Please check your spam folder if you do not hear from us.
                </p>
                <p className="bf-success__ref">Reference: <strong>AZR-{Math.floor(Math.random() * 90000) + 10000}</strong></p>
                <button className="bf-submit" style={{marginTop:'1.2rem'}} onClick={() => setSubmitted(false)}>
                  Submit another request
                </button>
              </div>
            ) : (
          <form
            className="booking-form"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            aria-label="Reservation enquiry"
          >
            <div className="bf-row">
              <div className="bf-field">
                <label htmlFor="bf-name">Full Name</label>
                <input id="bf-name" type="text" placeholder="Maria Santos" required />
              </div>
              <div className="bf-field">
                <label htmlFor="bf-email">Email Address</label>
                <input id="bf-email" type="email" placeholder="maria@example.com" required />
              </div>
            </div>
            <div className="bf-row">
              <div className="bf-field">
                <label htmlFor="bf-phone">Phone / WhatsApp</label>
                <input id="bf-phone" type="tel" placeholder="+63 917 000 0000" />
              </div>
              <div className="bf-field">
                <label htmlFor="bf-nationality">Nationality</label>
                <input id="bf-nationality" type="text" placeholder="Filipino" />
              </div>
            </div>
            <div className="bf-row">
              <div className="bf-field">
                <label htmlFor="bf-checkin">Check in</label>
                <input id="bf-checkin" type="date" required />
              </div>
              <div className="bf-field">
                <label htmlFor="bf-checkout">Check out</label>
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
                <label htmlFor="bf-suite">Suite Preference</label>
                <select id="bf-suite">
                  <option>Beachfront Suite</option>
                  <option>Overwater Villa</option>
                  <option>Garden Pool Villa</option>
                  <option>Cliff-Edge Penthouse</option>
                  <option>Flexible — advise me</option>
                </select>
              </div>
            </div>
            <div className="bf-field bf-field--full">
              <label htmlFor="bf-message">Special Requests (optional)</label>
              <textarea
                id="bf-message"
                rows={3}
                placeholder="Anniversary plans, dietary needs, early arrival requests, honeymoon setup"
              />
            </div>
            <p className="bf-disclaimer">
              By submitting this form you agree to our <a href="#">Privacy Policy</a>.
              We will never share your details with third parties.
            </p>
            <button type="submit" className="bf-submit">
              Request Your Stay
            </button>
          </form>
            )}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="site-footer" ref={footerRef}>
        <div className="footer-top">
          <div className="footer-col footer-col--brand">
            <span className="footer-logo">The Azure</span>
            <span className="footer-tagline">Sitio Buena Vista, El Nido, Palawan 5313</span>
            <span className="footer-tagline">Philippines</span>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
              <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor">TripAdvisor</a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-col__heading">The Resort</h4>
            <nav aria-label="Resort links">
              <a href="#about">Our Story</a>
              <a href="#gallery">Gallery</a>
              <a href="#experiences">Experiences</a>
              <a href="#rates">Accommodation</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4 className="footer-col__heading">Plan Your Stay</h4>
            <nav aria-label="Planning links">
              <a href="#contact">Reserve a Suite</a>
              <a href="#location">Getting Here</a>
              <a href="#rates">Rates &amp; Policies</a>
              <a href="#contact">Group &amp; Events</a>
              <a href="#contact">Honeymoon Package</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4 className="footer-col__heading">Contact</h4>
            <p className="footer-contact-line">
              <a href="tel:+639178820042">+63 917 882 0042</a>
            </p>
            <p className="footer-contact-line">
              <a href="mailto:reservations@theazureelnido.com">reservations@theazureelnido.com</a>
            </p>
            <p className="footer-contact-line footer-contact-hours">
              Concierge available daily<br />7:00 am – 10:00 pm PHT
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 The Azure Resort, El Nido. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
      </footer>
    </>
  );
}
