import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useIntroAnimation() {
  const location = useLocation();

  useEffect(() => {
    const ENTER_DELAY = 10;
    const HOLD_DELAY = 1000;
    const EXIT_DELAY = 182;
    let enterTimer;
    let holdTimer;
    let exitTimer;

    let overlay = document.getElementById("page-intro-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "page-intro-overlay";
      overlay.className = "page-intro-overlay";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      overlay.remove();
      document.body.classList.remove("intro-lock");
      return;
    }

    overlay.classList.remove("is-active", "is-exit");
    void overlay.offsetWidth;
    document.body.classList.add("intro-lock");

    // IMPORTANT:
    // - page load/reload ke time pe scroll-reveal animations page ko jump karwa sakti hain.
    // - is liye body ko lock karke + a temporary "data-intro" flag set karke
    //   ScrollReveal ko intro khatam hone tak disable kar dete hain.
    document.body.dataset.intro = "playing";

    enterTimer = window.setTimeout(() => overlay.classList.add("is-active"), ENTER_DELAY);
    holdTimer = window.setTimeout(() => overlay.classList.add("is-exit"), HOLD_DELAY);

    // overlay exit transition (0.75s in CSS) complete hone ke baad hi enable karna hai
    const EXIT_TRANSITION_MS = 750;
    exitTimer = window.setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("intro-lock");
      document.body.dataset.intro = "done";
    }, HOLD_DELAY + EXIT_TRANSITION_MS);



    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(holdTimer);
      window.clearTimeout(exitTimer);
    };
  }, [location.pathname]);
}
