import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */

const ABOUT_STATS = [
  { value: '14', unit: 'suites', label: 'Private ocean suites' },
  { value: '8', unit: 'ha', label: 'Of beachfront grounds' },
  { value: '4.9', unit: '★', label: 'Average guest rating' },
  { value: '2018', unit: '', label: 'Year we opened' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-stat').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.12,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
        );
      });
      gsap.fromTo('.about-text-col',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-text-col', start: 'top 84%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.about-img-col',
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-img-col', start: 'top 84%', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section full-bleed-section" ref={sectionRef}>
      <div className="about-inner section-inner">
        <div className="about-text-col">
          <p className="section-kicker">Our Story</p>
          <h2 className="section-heading">
            Built by the sea,<br /><em>shaped by the islands.</em>
          </h2>
          <p className="about-body">
            The Azure was founded by the Reyes family in 2018 on a quiet stretch of
            El Nido coastline in Palawan. After years of growing up sailing these
            waters, they wanted to share that feeling with guests from around the
            world — not just the views, but the pace, the food, and the people.
          </p>
          <p className="about-body">
            Every suite was built to let the outside in. Locally sourced bamboo,
            coral-stone floors, and hand-woven capiz shell panels bring the island
            into each room. The resort employs over 60 people from Barangay Poblacion
            and sources over 80% of its produce from farms within 12 kilometres.
          </p>
          <div className="about-signature">
            <span className="about-sig-name">Marco &amp; Lea Reyes</span>
            <span className="about-sig-title">Founders, The Azure</span>
          </div>
        </div>

        <div className="about-img-col">
          <div className="about-img-stack">
            <div
              className="about-img about-img--main"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80')" }}
            />
            <div
              className="about-img about-img--secondary"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80')" }}
            />
            <div className="about-img-badge">
              <span className="about-img-badge__year">EST.</span>
              <span className="about-img-badge__value">2018</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="about-stats">
        {ABOUT_STATS.map((s) => (
          <div key={s.label} className="about-stat">
            <span className="about-stat__value">
              {s.value}<span className="about-stat__unit">{s.unit}</span>
            </span>
            <span className="about-stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCES SECTION
───────────────────────────────────────────── */

const EXPERIENCES = [
  {
    category: 'Water',
    title: 'Private Island Hopping',
    desc: 'Board our bancas at dawn and spend the day visiting Cadlao Lagoon, Big Lagoon, and secret limestone coves that most visitors never reach.',
    duration: 'Full day · From ₱4,800 / guest',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    tag: 'Most popular',
  },
  {
    category: 'Wellness',
    title: 'Sunrise Hilot Ritual',
    desc: 'Begin your morning with a traditional Filipino hilot massage performed by a local manghihilot beside the tidal pools as the sun comes up.',
    duration: '90 min · From ₱3,200 / guest',
    img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
    tag: 'Signature',
  },
  {
    category: 'Dining',
    title: 'Cliff Terrace Dinner',
    desc: 'A seven-course tasting menu of modernised Filipino dishes — kinilaw, inihaw na pusit, sinigang foam — served on the edge of the cliff above the sea.',
    duration: 'Nightly from 6 pm · From ₱6,500 / guest',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    tag: 'Award-winning',
  },
  {
    category: 'Sea',
    title: 'Coral Garden Dive',
    desc: 'Our resident PADI dive master leads certified guests through the coral gardens off Miniloc Island, home to sea turtles, napolean wrasse, and reef sharks.',
    duration: '2 dives · From ₱3,800 / guest',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    tag: null,
  },
  {
    category: 'Culture',
    title: 'Palawan Cooking Class',
    desc: 'Join our head chef at the local wet market before returning to the resort kitchen to cook pinakbet, bulalo, and halo-halo from scratch.',
    duration: 'Morning session · From ₱2,400 / guest',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
    tag: null,
  },
  {
    category: 'Adventure',
    title: 'Sunset Kayak & Bioluminescence',
    desc: 'Paddle sea kayaks through the mangroves at dusk, then glide through bioluminescent waters as the bay lights up beneath your kayak.',
    duration: '3 hours · From ₱2,800 / guest',
    img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
    tag: null,
  },
];

export function ExperiencesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, rotate: i % 2 === 0 ? -1.4 : 1.4 },
          { y: 0, opacity: 1, rotate: 0, duration: 1.0, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiences" className="exp-section full-bleed-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="exp-header">
          <p className="section-kicker">Curated experiences</p>
          <h2 className="section-heading">
            Days you will<br /><em>keep coming back to.</em>
          </h2>
          <p className="exp-subhead">
            Every experience is designed and led by people who grew up in Palawan.
            Prices shown are per guest and include all equipment and guides.
          </p>
        </div>

        <div className="exp-grid">
          {EXPERIENCES.map((e) => (
            <article key={e.title} className="exp-card">
              <div
                className="exp-card__img"
                style={{ backgroundImage: `url('${e.img}')` }}
              >
                <span className="exp-card__category">{e.category}</span>
                {e.tag && <span className="exp-card__tag">{e.tag}</span>}
              </div>
              <div className="exp-card__body">
                <h3 className="exp-card__title">{e.title}</h3>
                <p className="exp-card__desc">{e.desc}</p>
                <span className="exp-card__duration">{e.duration}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RATES SECTION
───────────────────────────────────────────── */

const SUITE_RATES = [
  {
    name: 'Beachfront Suite',
    size: '68 m²',
    guests: 'Up to 2',
    rate: '₱28,000',
    period: 'per night',
    features: ['Private terrace on the sand', 'Outdoor rain shower', 'King bed + day bed', 'Butler service', 'Minibar refreshed daily'],
    highlight: false,
  },
  {
    name: 'Overwater Villa',
    size: '94 m²',
    guests: 'Up to 2',
    rate: '₱44,000',
    period: 'per night',
    features: ['Glass floor panels over the lagoon', 'Private plunge pool', 'Direct ocean ladder access', 'Butler service', 'Daily sunset drinks'],
    highlight: true,
  },
  {
    name: 'Garden Pool Villa',
    size: '112 m²',
    guests: 'Up to 4',
    rate: '₱52,000',
    period: 'per night',
    features: ['Private 8m lap pool', 'Two king bedrooms', 'Outdoor sala', 'Butler service', 'Daily breakfast included'],
    highlight: false,
  },
  {
    name: 'Cliff-Edge Penthouse',
    size: '180 m²',
    guests: 'Up to 4',
    rate: '₱88,000',
    period: 'per night',
    features: ['130° panoramic sea view', 'Infinity plunge pool', 'Chef\'s dinner on arrival night', 'Personal concierge 24/7', 'Private speedboat transfers'],
    highlight: false,
  },
];

export function RatesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.rate-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: '.rates-grid', start: 'top 84%', toggleActions: 'play none none none' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="rates" className="rates-section full-bleed-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="rates-header">
          <p className="section-kicker">Accommodation</p>
          <h2 className="section-heading">
            Your suite<br /><em>awaits.</em>
          </h2>
          <p className="rates-note">
            All rates are in Philippine Peso and include daily breakfast, Wi-Fi, and use of all resort facilities.
            Taxes and service charge (22%) are additional. Rates are subject to availability.
          </p>
        </div>

        <div className="rates-grid">
          {SUITE_RATES.map((s) => (
            <div key={s.name} className={`rate-card${s.highlight ? ' rate-card--highlight' : ''}`}>
              {s.highlight && <span className="rate-card__badge">Most requested</span>}
              <h3 className="rate-card__name">{s.name}</h3>
              <div className="rate-card__meta">
                <span>{s.size}</span>
                <span className="rate-card__dot" />
                <span>{s.guests}</span>
              </div>
              <div className="rate-card__price">
                <span className="rate-card__amount">{s.rate}</span>
                <span className="rate-card__period">{s.period}</span>
              </div>
              <ul className="rate-card__features">
                {s.features.map((f) => (
                  <li key={f}>
                    <span className="rate-card__check">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="rate-card__cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Reserve this suite
              </a>
            </div>
          ))}
        </div>

        <p className="rates-fine">
          A deposit of 50% is required at time of booking. Full payment is due 30 days prior to arrival.
          Cancellations made 30+ days before arrival receive a full refund. Cancellations within 14 days are non-refundable.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────── */

const FAQS = [
  { q: 'How do I get to The Azure from Manila?', a: 'Fly from Ninoy Aquino or Clark International to Puerto Princesa (PPQ) or alternatively to El Nido Airport (ENI) if available. We recommend the 60-minute domestic flight to El Nido. From there, our resort shuttle picks you up for a 25-minute drive. We also arrange private speedboat transfers from Puerto Princesa for guests who prefer a scenic sea crossing.' },
  { q: 'What is the check-in and check-out time?', a: 'Standard check-in is from 2:00 pm and check-out is at 12:00 noon. Early check-in from 10:00 am and late check-out until 4:00 pm can be arranged on request and is subject to availability. Please let our concierge team know at least 48 hours in advance.' },
  { q: 'Is The Azure suitable for children?', a: 'The Azure is designed as an adults-only sanctuary. We warmly welcome guests aged 16 and above. For families with younger children, we are happy to recommend partner properties in El Nido that are well set up for families.' },
  { q: 'Is there Wi-Fi throughout the resort?', a: 'Yes, high-speed Wi-Fi is available in all suites and common areas. We have a dedicated fibre connection, though please note that speeds may occasionally vary during heavy rain or peak hours.' },
  { q: 'Can I hold a wedding or private event at The Azure?', a: 'We regularly host intimate weddings, honeymoons, and private celebrations. Our events team can arrange everything from a cliffside ceremony to a multi-day gathering for up to 60 guests. Contact our concierge to discuss.' },
  { q: 'What is the currency and can I pay by card?', a: 'The Philippines uses the Philippine Peso (₱). We accept Visa, Mastercard, and UnionPay. Cash in Pesos is also accepted. Currency exchange is available at the resort.' },
  { q: 'When is the best time to visit?', a: 'El Nido is best visited from November through April when skies are clear and seas are calm. December, January, and February are especially popular. The wet season runs from June to October, but rates are lower and the islands are quieter.' },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const toggle = (i: number) => setOpen(prev => prev === i ? null : i);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-inner',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-inner', start: 'top 85%', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" className="faq-section full-bleed-section" ref={sectionRef}>
      <div className="faq-inner section-inner">
        <div className="faq-header">
          <p className="section-kicker">Questions</p>
          <h2 className="section-heading">
            Everything you<br /><em>need to know.</em>
          </h2>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p className="faq-answer">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LOCATION / CONTACT SECTION
───────────────────────────────────────────── */

export function LocationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.loc-details',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-details', start: 'top 84%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.loc-map-wrap',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-map-wrap', start: 'top 84%', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="location" className="loc-section full-bleed-section" ref={sectionRef}>
      <div className="section-inner">
        <div className="loc-header">
          <p className="section-kicker">Find us</p>
          <h2 className="section-heading">
            El Nido, Palawan,<br /><em>Philippines.</em>
          </h2>
        </div>

        <div className="loc-body">
          <div className="loc-details">
            <div className="loc-detail-block">
              <h4>Address</h4>
              <p>The Azure Resort<br />Sitio Buena Vista, Barangay Poblacion<br />El Nido, Palawan 5313<br />Philippines</p>
            </div>
            <div className="loc-detail-block">
              <h4>Phone &amp; WhatsApp</h4>
              <p><a href="tel:+639178820042">+63 917 882 0042</a></p>
              <p className="loc-note">Available daily 7 am – 10 pm PHT</p>
            </div>
            <div className="loc-detail-block">
              <h4>Email</h4>
              <p><a href="mailto:reservations@theazureelnido.com">reservations@theazureelnido.com</a></p>
              <p><a href="mailto:concierge@theazureelnido.com">concierge@theazureelnido.com</a></p>
            </div>
            <div className="loc-detail-block">
              <h4>Getting Here</h4>
              <ul className="loc-how">
                <li>
                  <span className="loc-icon">✈</span>
                  <span>Fly to El Nido Airport (ENI) via AirSWIFT from Manila — 55 min. We arrange shuttle pickup (25 min).</span>
                </li>
                <li>
                  <span className="loc-icon">🛥</span>
                  <span>Ferry from Puerto Princesa via FastCat — 4 hr. Private speedboat transfers available on request.</span>
                </li>
                <li>
                  <span className="loc-icon">🚗</span>
                  <span>Van transfer from Puerto Princesa (PPQ) — approx. 5 hr through mountain road. Scenic but slow.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="loc-map-wrap">
            {/* El Nido, Palawan coordinates — a genuinely beautiful upcoming-resort-plausible location */}
            <iframe
              title="The Azure Resort location — El Nido, Palawan"
              className="loc-map"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31560.5!2d119.4072!3d11.1864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a01a5e0a8f3e77%3A0xd2800f8c7d7b9a5d!2sEl%20Nido%2C%20Palawan!5e0!3m2!1sen!2sph!4v1710000000000!5m2!1sen!2sph"
            />
            <div className="loc-map-overlay">
              <div className="loc-map-pin">
                <span className="loc-map-pin__dot" />
                <span className="loc-map-pin__label">The Azure · El Nido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
