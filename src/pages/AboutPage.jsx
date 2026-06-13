import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";

export default function AboutPage() {
  return (
    <main className="grid-about about-grid">
      <div as="section" className="card card-hover about-photo">
        <div className="about-photo-frame">
          <img src="/icons/hero-img.png" alt="Portrait of Wafa Manan" width="400" height="400" decoding="async" />
        </div>
      </div>
      <div as="section" className="about-bio" delay={0.08}>
        <div as="header" className="about-summary-head" delay={0.12}>
          <img className="about-summary-icon" src="/icons/sum-icon.png" alt="" aria-hidden="true" />
          <h2 className="about-summary-title">SELF-SUMMARY</h2>
          <img className="about-summary-icon" src="/icons/sum-icon.png" alt="" aria-hidden="true" />
        </div>
        <div as="section" className="card card-hover uiux " delay={0.16}>
          <p className="about-bio-spark" aria-hidden="true">
            ✦
          </p>
          <h3 className="about-bio-name">Wafa UI/UX Designer</h3>
          <p className="about-bio-text">
            I&apos;m a Senior UI/UX Designer with 3+ years of experience across web design, branding, video editing, and motion-with a focus on
            usability, prototyping, typography, grids, pacing, and polished delivery from concept through hand-off.
          </p>
        </div>
      </div>
      <div as="section" className="card card-hover about-exp" delay={0.12}>
        <h3 className="about-col-title">EXPERIENCE</h3>
        <ul className="about-list">
          <li>
            <span className="about-list-meta">August 2024 - PRESENT</span>
            <span className="about-list-strong">The Social Nexus</span>
            <span className="about-list-soft">Senior User Interface Designer</span>
          </li>
          <li>
            <span className="about-list-meta">Jan 2025 - May 2025</span>
            <span className="about-list-strong">Chromatic Code</span>
            <span className="about-list-soft">Senior UX / UI Designer</span>
          </li>
          <li>
            <span className="about-list-meta">Sep 2023 - May 2024</span>
            <span className="about-list-strong">Dream Softs</span>
            <span className="about-list-soft">Junior UX / UI Designer</span>
          </li>
        </ul>
      </div>
      <div as="section" className="card card-hover about-edu" delay={0.16}>
        <h3 className="about-col-title">EDUCATION</h3>
        <ul className="about-list">
          <li>
            <span className="about-list-meta">2022 - 2025</span>
            <span className="about-list-strong">Master in Statistics</span>
            <span className="about-list-soft">GC University Faisalabad</span>
          </li>
          <li>
            <span className="about-list-meta">2020 - 2022</span>
            <span className="about-list-strong">Master Degree in Designing</span>
            <span className="about-list-soft">University of Faisalabad</span>
          </li>
          <li>
            <span className="about-list-meta">2019 - 2020</span>
            <span className="about-list-strong">Degree in Designing</span>
            <span className="about-list-soft">University of Faisalabad</span>
          </li>
        </ul>
      </div>
      <div as="section" className="card square profiles card-hover" delay={0.2}>
        <div className="social-icons">
          <a href="https://www.behance.net/wafa29" target="_blank" rel="noopener noreferrer" className="social-dot" aria-label="Behance">
            Be
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-dot" aria-label="LinkedIn">
            in
          </a>
        </div>
        <div className="services-content card-text-band">
          <div>
            <p className="eyebrow">STAY WITH ME</p>
            <h3>Profiles</h3>
          </div>
          <Link to="/contact">
            <button type="button" className="circle-arrow" aria-label="Open profiles">
              <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
            </button>
          </Link>

        </div>
      </div>
      <div as="section" className="card card-hover about-cta cta" delay={0.24}>
        <p className="spark">✦</p>
        <h2 className="about-cta-headline">
          Let&apos;s&nbsp;<br />
          work&nbsp;<span>together.</span>
        </h2>
        <Link to="/contact">
          <button type="button" className="circle-arrow" aria-label="Start a project">
            <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
          </button>
        </Link>
      </div>
      <div as="section" className="card small credentials card-hover" delay={0.28}>
        <div className="signature">
          <img src="/icons/Group 18.png" alt="" style={{ height: "150px", width: "180px" }} />
        </div>
        <div className="services-content card-text-band">
          <div>
            <p className="eyebrow">MORE ABOUT ME</p>
            <h3>Credentials</h3>
          </div>
          <Link to="/more-about-me">
            <button type="button" className="circle-arrow" aria-label="Credentials">
              <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
