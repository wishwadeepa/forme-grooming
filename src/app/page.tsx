import Image from "next/image";
import Link from "next/link";
import { barbers } from "@/data/barbers/barbers";
import { HeroMedia } from "@/components/home/hero-media";
import { services, formatPrice } from "@/data/services";

function ArrowUpRight() {
  return <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M6 5h9v9" /></svg>;
}

function ArrowDown() {
  return <svg className="arrow-icon arrow-down" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v13m-5-5 5 5 5-5" /></svg>;
}

export default function HomePage() {
  return <main id="main-content" className="home-redesign">
      <section className="home-hero hero-premium">
        <HeroMedia />
        <div className="hero-shade" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-light-pass" aria-hidden="true" />
        <div className="hero-topline"><p className="eyebrow hero-eyebrow">FORME GROOMING STUDIO <i /> COLOMBO 05</p><span className="hero-edition">PERSONAL GROOMING · 2026</span></div>
        <div className="hero-copy">
          <span className="hero-kicker">A more personal approach to grooming</span>
          <h1><span>Defined</span><em>by detail.</em></h1>
          <p className="hero-intro">Good work, done with intention.<br className="desktop-break" /> Made around you.</p>
          <div className="hero-actions">
            <Link className="button button-light hero-book" href="/booking">Book an appointment <ArrowUpRight /></Link>
            <Link className="text-link light-link hero-explore" href="/services">Explore services <ArrowDown /></Link>
          </div>
        </div>
        <div className="hero-seal" aria-label="Craft, considered"><span>CRAFT</span><b>F.</b><span>CONSIDERED</span></div>
        <div className="hero-index"><span>01 <i /> 04</span><span>PRECISION / PERSONALITY / PRESENCE</span></div>
        <div className="hero-side-note">COLOMBO · SRI LANKA</div>
      </section>

      <div className="brand-ribbon" aria-label="The art of being well groomed"><div className="brand-ribbon-track"><div className="brand-ribbon-segment"><span>THE ART OF BEING WELL GROOMED</span><i aria-hidden="true" /><span>MADE PERSONAL</span><i aria-hidden="true" /><span>COLOMBO 05</span><i aria-hidden="true" /><span>THE ART OF BEING WELL GROOMED</span><i aria-hidden="true" /><span>MADE PERSONAL</span><i aria-hidden="true" /><span>COLOMBO 05</span><i aria-hidden="true" /></div><div className="brand-ribbon-segment" aria-hidden="true"><span>THE ART OF BEING WELL GROOMED</span><i /><span>MADE PERSONAL</span><i /><span>COLOMBO 05</span><i /><span>THE ART OF BEING WELL GROOMED</span><i /><span>MADE PERSONAL</span><i /><span>COLOMBO 05</span><i /></div></div></div>

      <section className="intro-section section-wrap" data-reveal>
        <div className="intro-label"><span className="eyebrow">A different kind of chair</span><span className="section-count">01 / PHILOSOPHY</span></div>
        <div className="intro-grid">
          <h2>Good grooming<br />feels like <em>you.</em></h2>
          <div className="intro-body"><p>FORME is built around the person in the chair. Your features, your rhythm, your way of wearing a style. We listen first, then shape the details around you.</p><Link className="text-link" href="/about">More about our approach <ArrowUpRight /></Link></div>
        </div>
      </section>

      <section className="craft-section" data-reveal>
        <div className="craft-image" data-cursor="DETAIL"><Image src="/images/gallery/fade_haicut_3by4.png" alt="Close detail of a precise fade and textured finish" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="craft-copy"><span className="eyebrow">02 — The craft</span><div><h2>Shape.<br />Balance.<br /><em>Intention.</em></h2><p>Every line has a reason. Every finish is considered. The result should feel just as right a few weeks from now as it does today.</p><Link className="button button-outline" href="/gallery">See the work <ArrowUpRight /></Link></div><span className="craft-foot">PRECISION / INDIVIDUALITY / CRAFT</span></div>
      </section>

      <section className="services-section section-wrap" data-reveal>
        <div className="section-heading"><div><span className="eyebrow">03 — The menu</span><h2>Made for<br /><em>your everyday.</em></h2></div><Link className="text-link" href="/services">View all services <ArrowUpRight /></Link></div>
        <div className="home-service-list">{services.slice(0, 4).map((service, i) => <Link href="/services" className="home-service" key={service.name}><span className="service-no">0{i + 1}</span><div><h3>{service.name}</h3><p>{service.duration} min <span>·</span> {service.category}</p></div><strong>{formatPrice(service.price)}</strong><span className="service-arrow"><ArrowUpRight /></span></Link>)}</div>
      </section>

      <section className="studio-section" data-reveal>
        <div className="studio-image" data-cursor="THE STUDIO"><Image src="/images/studio/interior_horizontal.png" alt="The warm, considered interior of FORME Grooming Studio" fill sizes="100vw" /></div>
        <div className="studio-caption"><span className="eyebrow">04 — The space</span><h2>A moment<br />to reset.</h2><p>Come in, settle down, and take the time to get the details right.</p><Link className="text-link light-link" href="/contact">Find the studio <ArrowUpRight /></Link></div>
        <span className="studio-coordinates">HAVELOCK ROAD · COLOMBO 05</span>
      </section>

      <section className="team-section section-wrap" data-reveal>
        <div className="section-heading"><div><span className="eyebrow">05 — The people</span><h2>Good hands.<br /><em>Good company.</em></h2></div><p className="section-note">Different perspectives, one shared respect for the craft.</p></div>
        <div className="team-grid">{barbers.map((barber, i) => <article className="team-card" key={barber.id}><div className="team-photo" data-cursor="MEET" data-home-photo-reveal><Image src={barber.image} alt={`Barber ${barber.name}`} fill sizes="(max-width: 700px) 50vw, 25vw" /></div><div className="team-meta"><span>0{i + 1}</span><span>{barber.experience} experience</span></div><h3>{barber.name}</h3><p>{barber.specialty}</p></article>)}</div>
      </section>

      <section className="gallery-preview section-wrap" data-reveal>
        <div className="gallery-preview-head"><div><span className="eyebrow">06 — The work</span><h2>In the <em>details.</em></h2></div><Link className="text-link" href="/gallery">View the gallery <ArrowUpRight /></Link></div>
        <div className="preview-grid"><Link href="/gallery" className="preview-tall" data-cursor="VIEW"><Image src="/images/gallery/haicut_3by4.png" alt="Textured haircut finished with natural movement" fill sizes="(max-width: 760px) 65vw, 38vw" /></Link><Link href="/gallery" className="preview-short" data-cursor="VIEW"><Image src="/images/details/tools_flatlay.png" alt="Barber tools laid out before a service" fill sizes="(max-width: 760px) 45vw, 28vw" /></Link><div className="preview-note"><span>FORME<br />GROOMING STUDIO</span><span>COLOMBO<br />SRI LANKA</span><Link href="/gallery">VIEW ALL WORK <ArrowUpRight /></Link></div><Link href="/gallery" className="preview-bottom" data-cursor="VIEW"><Image src="/images/gallery/haicut_3by4_2ndimage.png" alt="A clean, close haircut detail" fill sizes="(max-width: 760px) 80vw, 35vw" /></Link></div>
      </section>

      <section className="booking-cta" data-reveal><span className="eyebrow">A good place to start</span><h2>Make room<br />for <em>yourself.</em></h2><p>Tell us what you have in mind. We’ll take it from there.</p><Link className="button button-light" href="/booking">Find a time <ArrowUpRight /></Link><span className="cta-mark">F.</span></section>
    </main>;
}
