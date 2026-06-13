import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLES = {
  "/": "Home — WAFA MANAN",
  "/about": "About — WAFA MANAN",
  "/services": "Services — WAFA MANAN",
  "/works": "Works — WAFA MANAN",
  "/contact": "Contact — WAFA MANAN",
};

export function usePageMeta() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("about-body", location.pathname === "/about");
    document.title = TITLES[location.pathname] || "WAFA MANAN";
    return () => {
      document.body.classList.remove("about-body");
    };
  }, [location.pathname]);
}
