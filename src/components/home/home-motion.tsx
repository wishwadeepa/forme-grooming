"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function HomeMotion({ children }: { children: ReactNode }) {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".home-redesign");
    if (!main) return;
    main.classList.add("motion-ready");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(main.querySelectorAll<HTMLElement>("[data-reveal]"));
    let observer: IntersectionObserver | null = null;
    if (!reduceMotion && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });
      observer = revealObserver;
    }

    revealItems.forEach((item) => observer ? observer.observe(item) : item.classList.add("is-visible"));

    const hero = main.querySelector<HTMLElement>(".hero-premium");
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (cursor) {
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
        cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
        cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
        cursor.textContent = target?.dataset.cursor ?? "";
        cursor.classList.toggle("is-active", Boolean(target));
      }
      if (!hero || !finePointer || reduceMotion) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        hero.style.setProperty("--hero-shift-x", `${x * -8}px`);
        hero.style.setProperty("--hero-shift-y", `${y * -6}px`);
      });
    };
    const clearCursor = () => cursor?.classList.remove("is-active");
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("blur", clearCursor);
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", clearCursor);
      main.classList.remove("motion-ready");
    };
  }, []);

  return <>
    {children}
    <span ref={cursorRef} className="studio-cursor" aria-hidden="true" />
  </>;
}
