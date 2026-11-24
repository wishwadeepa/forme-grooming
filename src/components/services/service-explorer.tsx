"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { services, formatPrice, type ServiceCategory } from "@/data/services";

const categories: ("All" | ServiceCategory)[] = ["All", "Haircuts", "Beard", "Treatments"];

export function ServiceExplorer() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = useMemo(() => active === "All" ? services : services.filter((item) => item.category === active), [active]);
  return <><div className="filter-row" role="group" aria-label="Filter services">{categories.map((category) => <button key={category} type="button" className={active === category ? "filter-button selected" : "filter-button"} onClick={() => setActive(category)} aria-pressed={active === category}>{category}<span>{category === "All" ? services.length : services.filter((x) => x.category === category).length}</span></button>)}</div>
    {(active === "All" ? categories.slice(1) : [active]).map((category) => {
      const list = filtered.filter((item) => category === "All" || item.category === category);
      if (!list.length) return null;
      return <section className="service-category" key={category}><div className="category-title"><span className="eyebrow">{category === "All" ? "THE COMPLETE MENU" : category.toUpperCase()}</span><span>{String(list.length).padStart(2, "0")} SERVICES</span></div><div className="catalog-list">{list.map((item, i) => <article className="catalog-row" key={item.name}><span className="catalog-number">{String(i + 1).padStart(2, "0")}</span><div className="catalog-info"><h2>{item.name}</h2><p>{item.description}</p></div><span className="catalog-duration">{item.duration} min</span><strong className="catalog-price">{formatPrice(item.price)}</strong><Link className="catalog-book" href={`/booking?service=${encodeURIComponent(item.name)}`} aria-label={`Book ${item.name}`}>↗︎</Link></article>)}</div></section>;
    })}</>;
}
