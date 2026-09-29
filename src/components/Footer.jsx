import { Link, useLocation, useNavigate } from "react-router-dom";
import { Reveal } from "./Reveal";

const TIGHT_PATHS = new Set(["/services", "/contact", "/works"]);

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate()
  return (
    <Reveal
      as="footer"
      className={`footer ${TIGHT_PATHS.has(location.pathname) ? "footer-tight" : ""}`}
      delay={0.3}
      y={20}
    >
      <Link to="/" className="footer-logo" aria-label="Wafa Manan home">
        WAFA MANAN.
      </Link>
      <div className="footer-nav">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/works">WORKS</Link>
        <Link to="/contact">CONTACT</Link>
      </div>
      <p>
        &copy; All rights reserved by <span
        >MW.</span>
      </p>
      {/* <p>
        &copy; All rights reserved by <span
        onClick={()=>navigate("/admin")}>MW.</span>
      </p> */}
    </Reveal>
  );
}
