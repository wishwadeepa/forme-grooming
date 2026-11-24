"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="FORME Grooming Studio home" onClick={() => setOpen(false)}>
          <span>FORME</span><small>GROOMING STUDIO · COLOMBO</small>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} className={pathname === link.href ? "nav-link active" : "nav-link"} href={link.href}>{link.label}</Link>)}
        </nav>
        <Link className="header-book" href="/booking">Book a visit <span aria-hidden="true">↗</span></Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <span></span><span></span>
        </button>
      </div>
      <nav className={open ? "mobile-nav open" : "mobile-nav"} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!open}>
        {links.map((link, i) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{link.label}<b aria-hidden="true">↗</b></Link>)}
        <Link className="mobile-book" href="/booking" onClick={() => setOpen(false)}>Book an appointment <span>↗</span></Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Link className="wordmark footer-wordmark" href="/"><span>FORME</span><small>GROOMING STUDIO · COLOMBO</small></Link><p>Defined by detail.</p></div>
        <div className="footer-col"><span className="eyebrow">Explore</span><Link href="/services">Services</Link><Link href="/gallery">Gallery</Link><Link href="/about">Our studio</Link><Link href="/booking">Book a visit</Link></div>
        <div className="footer-col"><span className="eyebrow">Find us</span><span>No. 42, Havelock Road</span><span>Colombo 05, Sri Lanka</span><a href="tel:+94112587642">+94 11 258 7642</a><a href="mailto:hello@forme.lk">hello@forme.lk</a></div>
        <div className="footer-col"><span className="eyebrow">Hours</span><span>Mon–Sat · 9:00–20:00</span><span>Sunday · 10:00–17:00</span><span className="footer-note">Walk-ins welcome, appointments preferred.</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} FORME GROOMING STUDIO</span><span>COLOMBO 05, SRI LANKA</span><Link href="/contact">Get in touch ↗</Link></div>
    </footer>
  );
}
