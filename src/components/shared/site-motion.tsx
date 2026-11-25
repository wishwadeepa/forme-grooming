"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SiteMotion() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const documentRoot = document.documentElement;
    documentRoot.classList.add("route-navigation");
    window.scrollTo(0, 0);
    let releaseFrame = 0;
    const removeRouteScrollLock = () => {
      releaseFrame = window.requestAnimationFrame(() => {
        releaseFrame = window.requestAnimationFrame(() => documentRoot.classList.remove("route-navigation"));
      });
    };
    const onInternalNavigation = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin === window.location.origin && destination.pathname !== window.location.pathname) {
        documentRoot.classList.add("route-navigation");
      }
    };
    document.addEventListener("click", onInternalNavigation, true);
    removeRouteScrollLock();

    document.body.classList.add("motion-system-ready");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeMain: HTMLElement | null = null;
    let revealObserver: IntersectionObserver | null = null;

    const prepareTargets = (main: HTMLElement, isHome: boolean, reset = false) => {
      if (reset) {
        main.querySelectorAll<HTMLElement>(".motion-section, .motion-heading, .motion-intro-item").forEach((element) => {
          element.classList.remove("is-visible");
          element.classList.remove("motion-section", "motion-heading", "motion-intro-item");
          element.style.removeProperty("--motion-order");
          element.style.removeProperty("--intro-order");
        });
        main.querySelectorAll<HTMLElement>(".motion-quote").forEach((element) => {
          element.classList.remove("is-visible");
        });
        main.querySelectorAll<HTMLElement>(".motion-copy").forEach((element) => {
          element.classList.remove("motion-copy", "is-visible");
          element.style.removeProperty("--motion-copy-order");
        });
      }

      const targets: HTMLElement[] = Array.from(main.querySelectorAll<HTMLElement>(".motion-quote:not(.is-visible)"));
      const copyGroups = new Map<HTMLElement, number>();
      const supportingCopy = Array.from(main.querySelectorAll<HTMLElement>("p:not(.hero-intro):not(.form-error):not([role='alert'])"));
      supportingCopy.forEach((copy) => {
        const group = copy.closest<HTMLElement>("section, .catalog-list, .booking-panel, .contact-layout, .team-grid, .values-list") ?? main;
        const order = copyGroups.get(group) ?? 0;
        copyGroups.set(group, order + 1);
        if (!copy.classList.contains("motion-copy")) {
          copy.classList.add("motion-copy");
          copy.style.setProperty("--motion-copy-order", String(Math.min(order, 3)));
        }
        if (!copy.classList.contains("is-visible")) targets.push(copy);
      });
      if (isHome) {
        const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section:not(.home-hero):not(.motion-section)"));
        sections.forEach((section) => {
          section.classList.add("motion-section");
          Array.from(section.children).forEach((child, index) => {
            (child as HTMLElement).style.setProperty("--motion-order", String(Math.min(index, 5)));
          });
          targets.push(section);
        });
      }

      const headings = Array.from(main.querySelectorAll<HTMLElement>(isHome ? "h1:not(.motion-heading), h2:not(.motion-heading)" : "h1:not(.motion-heading), .motion-display-heading:not(.motion-heading)"));
      headings.forEach((heading) => {
        if (heading.closest(".home-hero")) return;
        heading.classList.add("motion-heading");
        targets.push(heading);
      });

      targets.forEach((target) => {
        if (revealObserver) revealObserver.observe(target);
        else target.classList.add("is-visible");
      });
    };

    const prepareMain = () => {
      const main = document.querySelector<HTMLElement>("main");
      if (!main) return;
      const isNewMain = main !== activeMain;
      if (isNewMain) {
        revealObserver?.disconnect();
        activeMain = main;
      }
      const isHome = main.classList.contains("home-redesign");

      if (!isHome) {
        main.querySelectorAll<HTMLElement>(".motion-section, .motion-intro-item").forEach((element) => {
          element.classList.remove("motion-section", "motion-intro-item", "is-visible");
          element.style.removeProperty("--motion-order");
          element.style.removeProperty("--intro-order");
        });

      }

      if (isNewMain) {
        if (!reduceMotion && "IntersectionObserver" in window) {
          revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              revealObserver?.unobserve(entry.target);
              if (entry.target.classList.contains("motion-copy")) {
                const target = entry.target as HTMLElement;
                window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
                  if (target.isConnected) target.classList.add("is-visible");
                }));
              } else {
                entry.target.classList.add("is-visible");
              }
            });
          }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
        } else {
          revealObserver = null;
        }
      }
      prepareTargets(main, isHome, isNewMain);

      if (isNewMain) {
        main.classList.remove("route-enter");
        if (isHome) {
          void main.offsetWidth;
          main.classList.add("route-enter");
          const clearRouteAnimation = (event: AnimationEvent) => {
            if (event.target === main && event.animationName === "site-route-enter") {
              main.classList.remove("route-enter");
              main.removeEventListener("animationend", clearRouteAnimation);
            }
          };
          main.addEventListener("animationend", clearRouteAnimation);
        }
      } else if (!isHome) {
        main.classList.remove("route-enter");
      }
    };

    const pageChanges = new MutationObserver(prepareMain);
    pageChanges.observe(document.body, { childList: true, subtree: true });
    prepareMain();

    return () => {
      window.cancelAnimationFrame(releaseFrame);
      documentRoot.classList.remove("route-navigation");
      document.removeEventListener("click", onInternalNavigation, true);
      pageChanges.disconnect();
      revealObserver?.disconnect();
      activeMain?.classList.remove("route-enter");
    };
  }, [pathname]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!cursor || !finePointer) return;

    document.body.classList.add("custom-pointer");
    let frame = 0;
    let idleTimer = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const target = (event.target as HTMLElement).closest<HTMLElement>("a, button, [role='button'], [data-cursor]");
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.classList.add("is-visible");
      cursor.classList.remove("is-idle");
      cursor.classList.toggle("is-active", Boolean(target));
      cursor.classList.toggle("is-image", Boolean(target?.hasAttribute("data-cursor")));

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => cursor.classList.add("is-idle"), 520);

      const hero = document.querySelector<HTMLElement>(".hero-premium");
      if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        hero.style.setProperty("--hero-shift-x", `${x * -8}px`);
        hero.style.setProperty("--hero-shift-y", `${y * -6}px`);
      });
    };
    const hideCursor = () => {
      window.clearTimeout(idleTimer);
      cursor.classList.remove("is-visible", "is-active", "is-image", "is-idle");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.documentElement.addEventListener("pointerleave", hideCursor);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", hideCursor);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
    };
  }, []);

  return (
    <span ref={cursorRef} className="studio-cursor" aria-hidden="true">
      <i />
      <svg className="studio-cursor-orbit" viewBox="0 0 48 48">
        <defs><path id="studio-cursor-path" d="M24 24 m-21.5 0 a21.5 21.5 0 1 1 43 0 a21.5 21.5 0 1 1 -43 0" /></defs>
        <text><textPath href="#studio-cursor-path" startOffset="0%" textLength="135" lengthAdjust="spacing">FORME · CRAFT · DETAIL · FORME · CRAFT · DETAIL ·</textPath></text>
      </svg>
    </span>
  );
}
