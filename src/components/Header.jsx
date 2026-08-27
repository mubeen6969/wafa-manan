import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "./Image";
import { onSiteReady } from "../utils/siteReady";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const headerRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setIsOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return undefined;

      gsap.set(headerRef.current, { opacity: 0, y: -18 });

      const stopWaiting = onSiteReady(() => {
        gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        gsap.fromTo(
          headerRef.current.querySelectorAll(".nav-link"),
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06, delay: 0.15 }
        );
      });

      return () => stopWaiting();
    },
    { scope: headerRef }
  );

  return (
    <header ref={headerRef} className={`topbar ${isOpen ? "menu-open" : ""}`}>
      <Link className="logo" to="/" aria-label="Home">
        <Image src="/icons/Group 15.png" alt="WAFA logo" priority />
      </Link>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="main-nav"
        aria-label="Toggle menu"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
      <nav id="main-nav" className={`nav ${isOpen ? "is-open" : ""}`}>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/about">
          About
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/works">
          Projects
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/services">
          Services
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/contact">
          Contact
        </NavLink>
      </nav>
      <button className="talk-btn relative flex gap-2 items-center whitespace-nowrap" type="button"
      onClick={()=>navigate("/contact")}>
        Let's talk
        <div><Image src="/icons/New-folder/button icon.svg" alt="" /></div>
      </button>
    </header>
  );
}
