import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { onSiteReady } from "../utils/siteReady";

/**
 * Animates a number counting up from 0 to `to` on mount using GSAP.
 * Renders as a <strong> by default (matches the stat cards' markup).
 * Waits for the initial SiteLoader to lift before starting, so the count
 * doesn't finish invisibly underneath it.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  delay = 0,
  as: Component = "strong",
  className,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        el.textContent = `${prefix}${to}${suffix}`;
        return undefined;
      }

      const counter = { value: 0 };
      let tween = null;

      const stopWaiting = onSiteReady(() => {
        tween = gsap.to(counter, {
          value: to,
          duration,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          },
        });
      });

      return () => {
        stopWaiting();
        tween?.kill();
      };
    },
    { scope: ref, dependencies: [to, prefix, suffix, duration, delay] }
  );

  return (
    <Component ref={ref} className={className} data-count="true" {...rest}>
      {prefix}0{suffix}
    </Component>
  );
}
