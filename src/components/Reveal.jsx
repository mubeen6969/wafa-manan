import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { onSiteReady } from "../utils/siteReady";

gsap.registerPlugin(SplitText);

/**
 * Mount-triggered entrance animation (no scroll trigger): fades/lifts the
 * container in, and auto-splits any headings/paragraphs inside it for a
 * word-by-word / line-by-line text reveal in sync with the same timeline.
 * Use `delay` to stagger siblings so a group of cards/text animate in turn.
 * Waits for the initial SiteLoader to lift before starting, so the reveal
 * doesn't finish invisibly underneath it.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 32,
  scale = 0.97,
  duration = 0.8,
  splitText = true,
  ...rest
}) {
  const Component = as;
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return undefined;

      gsap.set(el, { opacity: 0, y, scale });

      const splits = [];
      let tl = null;

      const stopWaiting = onSiteReady(() => {
        // Nested <Reveal> instances own their own headings/paragraphs -
        // skip anything that belongs to a closer, nested reveal root so
        // it isn't split or animated twice.
        const ownedByThisReveal = (node) => node.closest("[data-reveal]") === el;

        tl = gsap.timeline({ delay });
        tl.to(el, { opacity: 1, y: 0, scale: 1, duration, ease: "power3.out" }, 0);

        if (splitText) {
          el.querySelectorAll("h3, h4, .eyebrow, strong:not([data-count])").forEach((heading) => {
            if (!ownedByThisReveal(heading)) return;
            const split = SplitText.create(heading, {
              type: "words,chars",
              mask: "words",
              wordsClass: "reveal-split-word",
            });
            splits.push(split);
            gsap.set(split.chars, { yPercent: 130, opacity: 0 });
            tl.to(
              split.chars,
              { yPercent: 0, opacity: 1, duration: 0.7, ease: "power4.out", stagger: 0.016 },
              duration * 0.3
            );
          });

          el.querySelectorAll("p:not(.eyebrow)").forEach((paragraph) => {
            if (!ownedByThisReveal(paragraph)) return;
            const split = SplitText.create(paragraph, { type: "lines", mask: "lines" });
            splits.push(split);
            gsap.set(split.lines, { yPercent: 110, opacity: 0 });
            tl.to(
              split.lines,
              { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 },
              duration * 0.35
            );
          });
        }
      });

      return () => {
        stopWaiting();
        tl?.kill();
        splits.forEach((split) => split.revert());
      };
    },
    { scope: ref, dependencies: [delay, y, scale, duration, splitText] }
  );

  return (
    <Component className={className} ref={ref} data-reveal="true" {...rest}>
      {children}
    </Component>
  );
}
