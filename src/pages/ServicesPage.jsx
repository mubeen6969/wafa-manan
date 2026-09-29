import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/Image";
import { Reveal } from "../components/Reveal";

const SERVICES = [
  {
    id: "uiux",
    label: "UX UI DESIGNING",
    badge: "MAIN SERVICE",
    body:
      "I design intuitive, user-focused digital experiences in Figma, Framer, and Adobe XD that combine clarity, functionality, and modern aesthetics — creating seamless interfaces that deliver meaningful user journeys across web and mobile. I also turn those designs into fully published websites in Framer, and build in WordPress where flexible content management is the priority.",
  },
  {
    id: "graphic",
    label: "GRAPHIC DESIGNING",
    badge: "BRANDING",
    body:
      "I build strong visual identities that help brands stand out in competitive markets — from logos and brand systems to social media creatives and marketing materials — designing cohesive visuals that communicate your message clearly and professionally.",
  },
  {
    id: "video",
    label: "VIDEO EDITING",
    badge: "CONTENT",
    body:
      "I produce engaging video content that elevates brand storytelling — from social media reels to promotional videos that capture attention and increase audience engagement.",
  },
  {
    id: "ai",
    label: "AI GENERATION",
    badge: "AI-ENHANCED",
    body:
      "I create AI-enhanced visuals and AI-generated designs that bring a fresh, modern edge to brand storytelling and help content stand out.",
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToPanel = (index) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    panelRefs.current[index]?.scrollIntoView({ behavior, block: "start" });
  };

  return (
    <main className="services-page-v2">
      <Reveal as="header" className="works-head">
        <Image className="works-head-icon" src="/icons/sum-icon.png" alt="" aria-hidden="true" priority />
        <h1 className="works-title">MY SERVICES</h1>
        <Image className="works-head-icon" src="/icons/sum-icon.png" alt="" aria-hidden="true" priority />
      </Reveal>

      <section className="dossier" aria-label="Services">
        <nav className="dossier-rail" aria-label="Jump to a service">
          <div className="dossier-rail-track">
            <div
              className="dossier-rail-track-fill"
              style={{ height: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
            />
          </div>
          <ul className="dossier-rail-list">
            {SERVICES.map((service, index) => (
              <li key={service.id}>
                <button
                  type="button"
                  className={`dossier-rail-item ${index === activeIndex ? "is-active" : ""}`}
                  onClick={() => scrollToPanel(index)}
                  aria-current={index === activeIndex}
                >
                  {service.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dossier-panels">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              ref={(el) => (panelRefs.current[index] = el)}
              data-index={index}
              className="dossier-panel card card-hover"
            >

              <div className="dossier-panel-content">
                <p className="dossier-panel-badge">{service.badge}</p>
                <h2 className="dossier-panel-title">{service.label}</h2>
                <p className="dossier-panel-body">{service.body}</p>
                <button type="button" className="dossier-panel-cta" onClick={() => navigate("/contact")}>
                  Let&apos;s talk
                  <Image src="/icons/icon.svg" width="34" height="30" alt="" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div as="footer" className="services-footer" delay={0.1}>

      <Reveal as="section" className="card square profiles card-hover services-bottom-profiles" delay={0.4}
       onClick={() => navigate("/contact")}>
        <div className="social-icons">
          <a href="https://www.behance.net/wafa29" target="_blank" rel="noopener noreferrer" className="social-dot" aria-label="Behance">
            Be
          </a>
          <a href="https://www.linkedin.com/in/wafa-manan-7b03b5326?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="social-dot" aria-label="LinkedIn">
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
              <Image src="/icons/icon.svg" width="46" height="42" alt="" />
            </button>
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="card card-hover services-bottom-cta cta" delay={0.46}
       onClick={() => navigate("/contact")}>
        <p className="spark">✦</p>
        <h2 className="services-cta-headline">
          Let&apos;s
          <br />
          work <span>together.</span>
        </h2>
         <Link to="/contact">
            <button type="button" className="circle-arrow" aria-label="Open profiles">
              <Image src="/icons/icon.svg" width="46" height="42" alt="" />
            </button>
          </Link>
      </Reveal>

      <Reveal as="section" className="card small credentials card-hover services-bottom-credentials" delay={0.52}
      onClick={()=>navigate("/more-about-me")}>
       
         <div className="signature">
              <Image src="/icons/New-folder/my-logo.png " alt="" style={{ height: "110px", width: "180px" }} />
            </div>
        <div className="services-content card-text-band">
          <div>
            <p className="eyebrow">MORE ABOUT ME</p>
            <h3>Credentials</h3>
          </div>
         <Link to="/more-about-me">
            <button type="button" className="circle-arrow" aria-label="Credentials">
              <Image src="/icons/icon.svg" width="46" height="42" alt="" />
            </button>
          </Link>
        </div>
      </Reveal>
      </div>

    </main>
  );
}