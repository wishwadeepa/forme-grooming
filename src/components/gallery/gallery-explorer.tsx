"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const items = [
  { src: "/images/gallery/haicut_3by4.png", alt: "Textured cut with natural movement", category: "Cuts", shape: "tall" },
  { src: "/images/details/tools_flatlay.png", alt: "Essential barber tools, arranged with care", category: "Studio", shape: "wide" },
  { src: "/images/gallery/fade_haicut_3by4.png", alt: "A close, seamless skin fade", category: "Fades", shape: "medium" },
  { src: "/images/gallery/haicut_3by4_2ndimage.png", alt: "A modern cut with a clean finish", category: "Cuts", shape: "medium" },
  { src: "/images/details/barber_tools_sideview.png", alt: "Clippers and combs ready for the next cut", category: "Studio", shape: "wide" },
  { src: "/images/team/kavindu_perera.png", alt: "FORME founder and head barber Kavindu Perera", category: "People", shape: "tall" },
  { src: "/images/studio/interior_horizontal.png", alt: "Warm light across the studio interior", category: "Studio", shape: "wide" },
  { src: "/images/team/dilan_fernando.png", alt: "FORME senior barber Dilan Fernando", category: "People", shape: "tall" },
];
const filters = ["All", "Cuts", "Fades", "Studio", "People"];

export function GalleryExplorer() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const visible = items.map((item, index) => ({ ...item, index })).filter((item) => filter === "All" || item.category === filter);
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (selected === null) return;
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowRight") setSelected((n) => n === null ? 0 : (n + 1) % items.length); if (event.key === "ArrowLeft") setSelected((n) => n === null ? 0 : (n + items.length - 1) % items.length); };
    window.addEventListener("keydown", key);
    document.body.classList.add("modal-open");
    return () => { window.removeEventListener("keydown", key); document.body.classList.remove("modal-open"); };
  }, [selected, close]);

  return <><div className="filter-row gallery-filters" role="group" aria-label="Filter gallery">{filters.map((name) => <button type="button" key={name} onClick={() => setFilter(name)} className={filter === name ? "filter-button selected" : "filter-button"} aria-pressed={filter === name}>{name}</button>)}</div><div className="gallery-grid">{visible.map((item) => <button className={`gallery-item ${item.shape}`} key={item.src} type="button" onClick={() => setSelected(item.index)} aria-label={`View image: ${item.alt}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 50vw, 33vw" /><span className="gallery-overlay"><span>{item.category}</span><b>↗</b></span></button>)}</div>{selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={close}><button type="button" className="lightbox-close" onClick={close} aria-label="Close image">×</button><button type="button" className="lightbox-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setSelected((selected + items.length - 1) % items.length); }}>←</button><figure onClick={(e) => e.stopPropagation()}><div className="lightbox-image"><Image src={items[selected].src} alt={items[selected].alt} fill sizes="90vw" priority /></div><figcaption><span>{items[selected].category}</span><span>{items[selected].alt}</span><span>{String(selected + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span></figcaption></figure><button type="button" className="lightbox-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % items.length); }}>→</button></div>}</>;
}
