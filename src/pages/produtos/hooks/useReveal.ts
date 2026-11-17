import { useEffect, type DependencyList } from "react";

/**
 * Adds the "is-in" class to every [data-reveal] element once it enters the viewport.
 * Re-runs whenever the given dependencies change (e.g. the active catalog filter).
 */
export function useReveal(deps: DependencyList = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((el, index) => {
      el.style.setProperty("--i", String(index % 6));
      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}