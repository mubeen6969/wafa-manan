import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "wafa-site-loaded";
const MIN_VISIBLE_MS = 1600;

// Everything worth having warm before the curtain lifts - the logo itself
// plus the heaviest above-the-fold art across the site's pages.
const PRELOAD_IMAGES = [
  "/icons/Group 15.png",
  "/icons/hero-img.png",
  "/icons/New-folder/my-work.png",
  "/icons/New-folder/my-logo.png",
  "/icons/gfonts.png.png",
  "/images/bg.png",
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

function whenPageLoaded() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
}

export default function SiteLoader() {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) !== "true"
  );
  const overlayRef = useRef(null);
  const logoWrapRef = useRef(null);
  const logoRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    if (!visible) return undefined;

    document.body.classList.add("site-loading");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loopTween = { current: null };

    if (!reduceMotion) {
      gsap.set(logoWrapRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(logoRef.current, { scale: 1.15, opacity: 0, filter: "blur(14px)" });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

      const intro = gsap.timeline();
      intro
        .to(logoRef.current, { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, 0)
        .to(logoWrapRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut" }, 0)
        .to(logoRef.current, { scale: 1, duration: 1.2, ease: "power3.out" }, 0.05)
        .to(barRef.current, { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0.15);

      loopTween.current = gsap.to(logoRef.current, {
        y: -8,
        duration: 1.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.9,
      });
    }

    const start = Date.now();

    Promise.all([Promise.all(PRELOAD_IMAGES.map(preloadImage)), whenPageLoaded()]).then(() => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start));
      window.setTimeout(() => {
        loopTween.current?.kill();

        const outro = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem(SESSION_KEY, "true");
            document.body.classList.remove("site-loading");
            setVisible(false);
          },
        });

        if (reduceMotion) {
          outro.to(overlayRef.current, { opacity: 0, duration: 0.3 });
        } else {
          outro
            .to(logoRef.current, { scale: 1.08, opacity: 0, duration: 0.45, ease: "power2.in" })
            .to(trackRef.current, { opacity: 0, duration: 0.25, ease: "power1.in" }, "<")
            .to(overlayRef.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.15");
        }
      }, wait);
    });

    return () => {
      loopTween.current?.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="site-loader" ref={overlayRef} role="status" aria-live="polite" aria-label="Loading site">
      <div className="site-loader-inner">
        <div className="site-loader-logo-wrap" ref={logoWrapRef}>
          <img className="site-loader-logo" ref={logoRef} src="/icons/Group 15.png" alt="Wafa Manan" />
        </div>
        <div className="site-loader-track" ref={trackRef}>
          <span className="site-loader-bar" ref={barRef} />
        </div>
      </div>
    </div>
  );
}
