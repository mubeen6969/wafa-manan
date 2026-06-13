import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const TIGHT_PATHS = new Set(["/services", "/contact", "/works"]);

export default function Footer() {
  const location = useLocation();
  return (
    <motion.footer
      className={`footer ${TIGHT_PATHS.has(location.pathname) ? "footer-tight" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="logo">WAFA MANAN.</h2>
      <div className="footer-nav">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/works">WORKS</Link>
        <Link to="/contact">CONTACT</Link>
      </div>
      <p>
        &copy; All rights reserved by <span>MW.</span>
      </p>
    </motion.footer>
  );
}
