import Image from "next/image";
import Link from "next/link";
import { barbers } from "@/data/barbers/barbers";
import { services, formatPrice } from "@/data/services";

export default function HomePage() {
  return <main id="main-content">
    <section className="home-hero">
      <Image src="/images/hero/hero_image.png" alt="A considered haircut in the FORME studio" fill priority sizes="100vw" className="hero-photo" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">FORME GROOMING STUDIO <i /> COLOMBO 05</p>
        <h1>Defined<br /><em>by detail.</em></h1>
        <p className="hero-intro">A more personal approach to grooming.<br className="desktop-break" /> Good work, done with intention.</p>
        <div className="hero-actions"><Link className="button button-light" href="/booking">Book an appointment <span>↗</span></Link><Link className="text-link light-link" href="/services">Explore services <span>↓</span></Link></div>
      </div>
      <div className="hero-index"><span>01 — 04</span><span>CRAFT, CONSIDERED</span></div>
      <div className="hero-side-note">PRECISION / PERSONALITY / PRESENCE</div>
    </section>

    <section className="intro-section section-wrap">
      <div className="intro-label"><span className="eyebrow">A different kind of chair</span><span className="section-count">01 / PHILOSOPHY</span></div>
      <div className="intro-grid">
        <h2>Good grooming<br />feels like <em>you.</em></h2>
        <div className="intro-body"><p>FORME is built around the person in the chair. Your features, your rhythm, your way of wearing a style. We listen first, then shape the details around you.</p><Link className="text-link" href="/about">More about our approach <span>↗</span></Link></div>
      </div>
    </section>

    <section className="craft-section">
      <div className="craft-image"><Image src="/images/gallery/fade_haicut_3by4.png" alt="Close detail of a precise fade and textured finish" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      <div className="craft-copy"><span className="eyebrow">02 — The craft</span><div><h2>Shape.<br />Balance.<br /><em>Intention.</em></h2><p>Every line has a reason. Every finish is considered. The result should feel just as right a few weeks from now as it does today.</p><Link className="button button-outline" href="/gallery">See the work <span>↗</span></Link></div><span className="craft-foot">PRECISION / INDIVIDUALITY / CRAFT</span></div>
    </section>

    <section className="services-section section-wrap">
      <div className="section-heading"><div><span className="eyebrow">03 — The menu</span><h2>Made for<br /><em>your everyday.</em></h2></div><Link className="text-link" href="/services">View all services <span>↗</span></Link></div>
      <div className="home-service-list">{services.slice(0, 4).map((service, i) => <Link href="/services" className="home-service" key={service.name}><span className="service-no">0{i + 1}</span><div><h3>{service.name}</h3><p>{service.duration} min <span>·</span> {service.category}</p></div><strong>{formatPrice(service.price)}</strong><span className="service-arrow">↗</span></Link>)}</div>
    </section>

    <section className="studio-section">
      <div className="studio-image"><Image src="/images/studio/interior_horizontal.png" alt="The warm, considered interior of FORME Grooming Studio" fill sizes="100vw" /></div>
      <div className="studio-caption"><span className="eyebrow">04 — The space</span><h2>A moment<br />to reset.</h2><p>Come in, settle down, and take the time to get the details right.</p><Link className="text-link light-link" href="/contact">Find the studio <span>↗</span></Link></div>
      <span className="studio-coordinates">HAVElOCK ROAD · COLOMBO 05</span>
    </section>

    <section className="team-section section-wrap">
      <div className="section-heading"><div><span className="eyebrow">05 — The people</span><h2>Good hands.<br /><em>Good company.</em></h2></div><p className="section-note">Different perspectives, one shared respect for the craft.</p></div>
      <div className="team-grid">{barbers.map((barber, i) => <article className="team-card" key={barber.id}><div className="team-photo"><Image src={barber.image} alt={`Barber ${barber.name}`} fill sizes="(max-width: 700px) 50vw, 25vw" /></div><div className="team-meta"><span>0{i + 1}</span><span>{barber.experience} experience</span></div><h3>{barber.name}</h3><p>{barber.specialty}</p></article>)}</div>
    </section>

    <section className="gallery-preview section-wrap">
      <div className="gallery-preview-head"><div><span className="eyebrow">06 — The work</span><h2>In the <em>details.</em></h2></div><Link className="text-link" href="/gallery">View the gallery <span>↗</span></Link></div>
      <div className="preview-grid"><Link href="/gallery" className="preview-tall"><Image src="/images/gallery/haicut_3by4.png" alt="Textured haircut finished with natural movement" fill sizes="(max-width: 760px) 65vw, 38vw" /></Link><Link href="/gallery" className="preview-short"><Image src="/images/details/tools_flatlay.png" alt="Barber tools laid out before a service" fill sizes="(max-width: 760px) 45vw, 28vw" /></Link><div className="preview-note"><span>FORME<br />GROOMING STUDIO</span><span>COLOMBO<br />SRI LANKA</span><Link href="/gallery">VIEW ALL WORK ↗</Link></div><Link href="/gallery" className="preview-bottom"><Image src="/images/gallery/haicut_3by4_2ndimage.png" alt="A clean, close haircut detail" fill sizes="(max-width: 760px) 80vw, 35vw" /></Link></div>
    </section>

    <section className="booking-cta"><span className="eyebrow">A good place to start</span><h2>Make room<br />for <em>yourself.</em></h2><p>Tell us what you have in mind. We’ll take it from there.</p><Link className="button button-light" href="/booking">Find a time <span>↗</span></Link><span className="cta-mark">F.</span></section>
  </main>;
}
