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
    const motionTargets = new Set<HTMLElement>();
    const pendingRevealFrames = new Map<HTMLElement, number>();
    let motionCheckFrame = 0;

    const cancelPendingReveal = (target: HTMLElement) => {
      const pendingFrame = pendingRevealFrames.get(target);
      if (pendingFrame !== undefined) {
        window.cancelAnimationFrame(pendingFrame);
        pendingRevealFrames.delete(target);
      }
    };

    const getViewportBounds = () => {
      const viewport = window.visualViewport;
      const left = viewport?.offsetLeft ?? 0;
      const top = viewport?.offsetTop ?? 0;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      return { left, top, right: left + width, bottom: top + height, width, height };
    };

    const getVisibilityThreshold = (target: HTMLElement, height: number, viewportHeight: number, viewportWidth: number) => {
      const isHome = Boolean(target.closest("main")?.classList.contains("home-redesign"));
      const isMobile = viewportWidth <= 760;
      if (isHome) return 0.06;
      if (height > viewportHeight) return isMobile ? 0.62 : 0.68;
      if (target.classList.contains("motion-image-reveal")) return isMobile ? 0.62 : 0.72;
      if (target.classList.contains("motion-heading") || target.classList.contains("motion-value-item")) return isMobile ? 0.78 : 0.88;
      if (target.classList.contains("motion-copy") || target.classList.contains("motion-quote")) return isMobile ? 0.84 : 0.96;
      return isMobile ? 0.84 : 0.96;
    };

    const scheduleMotionCheck = () => {
      if (reduceMotion || motionCheckFrame) return;
      motionCheckFrame = window.requestAnimationFrame(() => {
        motionCheckFrame = 0;
        const viewport = getViewportBounds();
        const viewportWidth = viewport.width;
        const viewportHeight = viewport.height;
        motionTargets.forEach((target) => {
          if (!target.isConnected) {
            motionTargets.delete(target);
            cancelPendingReveal(target);
            return;
          }
          const bounds = target.getBoundingClientRect();
          const fullyOutside = bounds.bottom <= viewport.top || bounds.top >= viewport.bottom || bounds.right <= viewport.left || bounds.left >= viewport.right;
          if (fullyOutside) {
            target.classList.remove("is-visible");
            cancelPendingReveal(target);
            return;
          }
          if (target.classList.contains("is-visible")) return;

          const visibleWidth = Math.max(0, Math.min(bounds.right, viewport.right) - Math.max(bounds.left, viewport.left));
          const visibleHeight = Math.max(0, Math.min(bounds.bottom, viewport.bottom) - Math.max(bounds.top, viewport.top));
          const visibleRatio = (visibleWidth * visibleHeight) / Math.max(bounds.width * bounds.height, 1);
          if (visibleRatio < getVisibilityThreshold(target, bounds.height, viewportHeight, viewportWidth)) return;

          if (target.classList.contains("motion-copy") || target.classList.contains("motion-wipe-group")) {
            if (pendingRevealFrames.has(target)) return;
            const firstFrame = window.requestAnimationFrame(() => {
              const secondFrame = window.requestAnimationFrame(() => {
                pendingRevealFrames.delete(target);
                if (!target.isConnected) return;
                const currentBounds = target.getBoundingClientRect();
                const currentViewport = getViewportBounds();
                const currentWidth = Math.max(0, Math.min(currentBounds.right, currentViewport.right) - Math.max(currentBounds.left, currentViewport.left));
                const currentHeight = Math.max(0, Math.min(currentBounds.bottom, currentViewport.bottom) - Math.max(currentBounds.top, currentViewport.top));
                const currentRatio = (currentWidth * currentHeight) / Math.max(currentBounds.width * currentBounds.height, 1);
                if (currentRatio >= getVisibilityThreshold(target, currentBounds.height, currentViewport.height, currentViewport.width)) target.classList.add("is-visible");
              });
              pendingRevealFrames.set(target, secondFrame);
            });
            pendingRevealFrames.set(target, firstFrame);
          } else {
            target.classList.add("is-visible");
          }
        });
      });
    };

    window.addEventListener("scroll", scheduleMotionCheck, { passive: true });
    window.addEventListener("resize", scheduleMotionCheck, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleMotionCheck, { passive: true });
    window.visualViewport?.addEventListener("scroll", scheduleMotionCheck, { passive: true });

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

      const targets: HTMLElement[] = Array.from(main.querySelectorAll<HTMLElement>(".motion-quote:not(.is-visible), .motion-wipe-group:not(.is-visible)"));
      const valueItems = Array.from(main.querySelectorAll<HTMLElement>(".values-list article:not(.motion-value-item)"));
      valueItems.forEach((item, index) => {
        item.classList.add("motion-value-item");
        item.style.setProperty("--motion-order", String(index));
        targets.push(item);
      });
      const imageTargets = Array.from(main.querySelectorAll<HTMLElement>(
        ".about-image-section:not(.motion-image-reveal), .team-photo:not(.motion-image-reveal), .gallery-item:not(.motion-image-reveal)",
      ));
      imageTargets.forEach((image) => {
        image.classList.add("motion-image-reveal");
        targets.push(image);
      });
      const copyGroups = new Map<HTMLElement, number>();
      const supportingCopy = isHome
        ? []
        : Array.from(main.querySelectorAll<HTMLElement>(".page-intro > p, .about-copy-block"));
      supportingCopy.forEach((copy) => {
        const group = copy.closest<HTMLElement>("section") ?? main;
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

      const headings = Array.from(main.querySelectorAll<HTMLElement>(isHome ? "h1:not(.motion-heading), h2:not(.motion-heading)" : "h1:not(.motion-heading), .motion-display-heading:not(.motion-heading):not(.motion-wipe-heading)"));
      headings.forEach((heading) => {
        if (heading.closest(".home-hero")) return;
        heading.classList.add("motion-heading");
        targets.push(heading);
      });

      targets.forEach((target) => {
        motionTargets.add(target);
        if (reduceMotion) target.classList.add("is-visible");
      });
      scheduleMotionCheck();
    };

    const prepareMain = () => {
      const main = document.querySelector<HTMLElement>("main");
      if (!main) return;
      const isNewMain = main !== activeMain;
      if (isNewMain) {
        motionTargets.clear();
        pendingRevealFrames.forEach((frame) => window.cancelAnimationFrame(frame));
        pendingRevealFrames.clear();
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
      window.removeEventListener("scroll", scheduleMotionCheck);
      window.removeEventListener("resize", scheduleMotionCheck);
      window.visualViewport?.removeEventListener("resize", scheduleMotionCheck);
      window.visualViewport?.removeEventListener("scroll", scheduleMotionCheck);
      if (motionCheckFrame) window.cancelAnimationFrame(motionCheckFrame);
      pendingRevealFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      pendingRevealFrames.clear();
      motionTargets.clear();
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
