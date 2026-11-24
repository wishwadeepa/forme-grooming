"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setError("");
    setSent(true);
  }

  return <main id="main-content" className="page-main contact-page"><section className="page-intro"><div className="page-intro-top"><span className="eyebrow">FORME / FIND US</span><span className="section-count">COLOMBO 05 · SRI LANKA</span></div><h1>Come on<br /><em>through.</em></h1><p>Questions, ideas, or just want to talk through a cut? We’re right here.</p><div className="page-rule"><span>01 / CONTACT</span><span>42 HAVELOCK ROAD</span></div></section><section className="contact-layout"><div className="contact-details"><span className="eyebrow">THE STUDIO</span><h2>FORME Grooming Studio</h2><p>No. 42, Havelock Road<br />Colombo 05, Sri Lanka</p><a className="contact-direct" href="tel:+94112587642">+94 11 258 7642 <span>↗</span></a><a className="contact-direct" href="https://wa.me/94772348610">WhatsApp · +94 77 234 8610 <span>↗</span></a><a className="contact-direct" href="mailto:hello@forme.lk">hello@forme.lk <span>↗</span></a><div className="hours-list"><span className="eyebrow">OPENING HOURS</span><div><span>Monday – Saturday</span><b>9:00 AM – 8:00 PM</b></div><div><span>Sunday</span><b>10:00 AM – 5:00 PM</b></div></div><Link className="button button-dark contact-book" href="/booking">Book an appointment <span>↗</span></Link></div><div className="contact-form-wrap"><span className="eyebrow">SEND A NOTE</span><h2>{sent ? "Thanks for reaching out." : "What’s on your mind?"}</h2>{sent ? <div className="form-success" role="status"><span>✓</span><p>Your message has been prepared in this demo. Nothing has been sent to the studio.</p><button type="button" className="text-link" onClick={() => setSent(false)}>Write another note ↗</button></div> : <form className="contact-form" onSubmit={submit}><label>Your name<input name="name" required autoComplete="name" placeholder="Name" /></label><label>Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>What can we help with?<textarea name="message" required rows={4} placeholder="Tell us a little about it..." /></label>{error && <p className="form-error" role="alert">{error}</p>}<p className="demo-note">This form is a frontend demonstration and does not send your message.</p><button className="button button-dark" type="submit">Prepare message <span>↗</span></button></form>}</div></section><section className="map-section"><div className="map-pattern"><div className="map-road road-a"></div><div className="map-road road-b"></div><div className="map-road road-c"></div><div className="map-block block-a"></div><div className="map-block block-b"></div><div className="map-block block-c"></div><div className="map-block block-d"></div><div className="map-pin"><span>F</span><small>FORME · HAVELOCK ROAD</small></div><span className="map-label map-label-a">HAVELOCK ROAD</span><span className="map-label map-label-b">COLOMBO 05</span></div><div className="map-caption"><span>NO. 42, HAVELOCK ROAD<br />COLOMBO 05, SRI LANKA</span><a href="https://maps.google.com/?q=42+Havelock+Road+Colombo+05" target="_blank" rel="noreferrer">Open directions ↗</a></div></section></main>;
}
