import type { Metadata } from "next";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";

export const metadata: Metadata = { title: "The gallery", description: "A closer look at the cuts, people and studio behind FORME Grooming Studio in Colombo." };

export default function GalleryPage() {
  return <main id="main-content" className="page-main"><section className="page-intro"><div className="page-intro-top"><span className="eyebrow">FORME / THE WORK</span><span className="section-count">A STUDY IN DETAIL</span></div><h1>In the<br /><em>making.</em></h1><p>A few moments from the chair and around the studio. Each one starts with the person in front of us.</p><div className="page-rule"><span>01 / GALLERY</span><span>COLOMBO, SRI LANKA</span></div></section><section className="gallery-wrap"><GalleryExplorer /></section></main>;
}
