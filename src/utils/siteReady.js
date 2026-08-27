// SiteLoader adds/removes body.classList("site-loading") while the initial
// loader covers the screen. Entrance animations (Reveal, CountUp, Header)
// call this so they start once the loader actually lifts, instead of
// finishing invisibly underneath it.
export function onSiteReady(callback) {
  if (typeof document === "undefined") {
    callback();
    return () => {};
  }

  if (!document.body.classList.contains("site-loading")) {
    callback();
    return () => {};
  }

  const observer = new MutationObserver(() => {
    if (!document.body.classList.contains("site-loading")) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
