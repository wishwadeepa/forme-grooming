import type { Metadata } from "next";
import Link from "next/link";
import { ServiceExplorer } from "@/components/services/service-explorer";

export const metadata: Metadata = { title: "Services & pricing", description: "Explore haircuts, beard services and treatments at FORME Grooming Studio, Colombo 05." };

export default function ServicesPage() {
  return <main id="main-content" className="page-main"><section className="page-intro"><div className="page-intro-top"><span className="eyebrow">FORME / SERVICES</span><span className="section-count">COLOMBO 05 · SRI LANKA</span></div><h1>The menu.<br /><em>Made personal.</em></h1><p>Good work starts with a conversation. Find the service that feels right, and we’ll take care of the details.</p><div className="page-rule"><span>01 / SERVICES</span><span>ALL PRICES IN LKR</span></div></section><section className="catalog-wrap"><ServiceExplorer /></section><section className="page-bottom-cta"><div><span className="eyebrow">Not sure what to choose?</span><h2>We can figure it out <em>together.</em></h2></div><Link className="button button-dark" href="/booking">Book a consultation <span>↗</span></Link></section></main>;
}
