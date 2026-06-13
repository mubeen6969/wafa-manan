import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
// import ScrollTrigger from "gsap-trial/ScrollTrigger";
// import { ScrollReveal } from "../components/ScrollReveal";
import { useRef } from "react";

export default function HomePage() {
  // gsap.registerPlugin(ScrollTrigger)


const intro = useRef(null)

  useGSAP(() => {
  gsap.fromTo(
    intro.current,
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, delay: 1 }
  );
}, []);


  return (
    <main className="home-grid">
      <div ref={intro}  className="card intro card-hover card-shine-effect ">
        <div className="intro-image">
          <img src="/icons/hero-img.png" alt="" />
        </div>
        <div className="intro-text">
          <p className="eyebrow">UX / UI DESIGNER</p>
          <h2>
            WAFA <br />
            MANAN.
          </h2>
          <p>
            I&apos;m a Senior UI/UX <br /> Designer with 3 years of <br /> expertise.
          </p>
        </div>
        <Link to="/about">
          <button type="button" className="circle-arrow intro-btn" aria-label="Read more">
            <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
          </button>
        </Link>
      </div>

      <div as="section" className="latest-work" >
        <div as="section" className="card marquee card-hover" >
          <marquee>
            LATEST WORK AND <span className="sb">FEATURED</span> * LATEST WORK AND <span className="sb">FEATURED</span> * LATEST WORK AND{" "}
            <span className="sb">FEATURED</span> * LATEST WORK AND <span className="sb">FEATURED</span> *
          </marquee>
        </div>

        <div as="div" >
          <Link to="/more-about-me" className="card small credentials card-hover card-link-card">
            <div className="signature">
              <img src="/icons/Group 18.png" alt="" style={{ height: "110px", width: "180px" }} />
            </div>
            <div className="services-content card-text-band">
              <div>
                <p className="eyebrow">MORE ABOUT ME</p>
                <h3>Credentials</h3>
              </div>
              <span className="circle-arrow" aria-hidden="true">
                <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
              </span>
            </div>
          </Link>
        </div>

        <div as="section" className="card small projects card-hover" >
          <div className="project-thumb">
            <img src="/icons/Rectangle 1000001790.png" alt="" />
          </div>
          <div className="services-content card-text-band">
            <div>
              <p className="eyebrow">SHOWCASE</p>
              <h3>Projects</h3>
            </div>
            <Link to="works">
              <button type="button" className="circle-arrow" aria-label="Projects">
                <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div as="section" className="card square gfonts card-hover" >
        <div className="gfonts">
          <img src="/icons/gfonts.png.png" alt="" />
        </div>
        <div className="services-content">
          <div>
            <p className="eyebrow">CV</p>
            <h3>Resume</h3>
          </div>
          <a href="/images/wafa-resume.pdf" target="_blank" rel="noopener noreferrer">
            <button type="button" className="circle-arrow" aria-label="Resume">
              <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
            </button>
          </a>
        </div>
      </div>

      <div as="section" className="card wide services card-hover" >
        <div className="icons-row">
          <img src="/icons/Frame 2147226926.png" alt="" />
        </div>
        <div className="services-content">
          <div>
            <p className="eyebrow">SPECIALIZATION</p>
            <h3>Services Offering</h3>
          </div>
          <Link to="/services">
            <button type="button" className="circle-arrow" aria-label="Services">
              <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
            </button>
          </Link>
        </div>
      </div>

      <div as="section" className="card square profiles card-hover">
        <div className="social-icons">
          <a href="https://www.behance.net/wafa29"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-dot">Be</span>
          </a>
          <span className="social-dot">in</span>
        </div>
        <div className="services-content card-text-band">
          <div>
            <p className="eyebrow">STAY WITH ME</p>
            <h3>Profiles</h3>
          </div>
          <Link to="/contact">
            <button type="button" className="circle-arrow" aria-label="Profiles">
              <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
            </button>
          </Link>
        </div>
      </div>

      <div as="section" className="card stats card-hover" 
      >
        <div className="stat">
          <strong>07</strong>
          <span>YEARS EXPERIENCE</span>
        </div>
        <div className="stat">
          <strong>+125</strong>
          <span>CLIENTS WORLDWIDE</span>
        </div>
        <div className="stat">
          <strong>+210</strong>
          <span>TOTAL PROJECTS</span>
        </div>
      </div>

      <div as="section" className="card cta card-hover" >
        <p className="spark">✦</p>
        <h2>
          Let&apos;s
          <br />
          work <span>together.</span>
        </h2>
        <Link to="/contact">
          <button type="button" className="circle-arrow" aria-label="Work together">
            <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
          </button>
        </Link>
      </div>
    </main>
  );
}
