import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import { i } from "framer-motion/client";

// const OFFERING_LIST = ["UX UI DESIGNING", "GRAPHIC DESIGNING", "VIDEO EDITING", "AI GENERATION"];
const OFFERING_LIST = [
  {
    title: "UX UI DESIGNING",
    image: "/images/services/uiuxdesign.png",
  },
  {
    title: "GRAPHIC DESIGNING",
    image: "/images/services/graphic.png",
  },
  {
    title: "VIDEO EDITING",
    image: "/images/services/Video-Editing.png",
  },
  {
    title: "AI GENERATION",
    image: "/images/services/Ai-Brain.png",
  },
];

const SERVICE_CARDS = [
  {
    
    title: "UI/UX DESIGN",
    subtitle: "(MAIN SERVICE)",
    body: "I design intuitive, user-focused digital experiences in Figma, Framer, and Adobe XD that combine clarity, functionality, and modern aesthetics. My focus is on creating seamless interfaces that deliver meaningful user journeys across web and mobile platforms.",
  },
  {
    title: "WEB DESIGN",
    subtitle: "(FRAMER & WORDPRESS)",
    body: "My focus is on creating clean, user-friendly layouts with strong visual structure and smooth user experience. I can turn UI designs into fully published websites using Framer and also work with WordPress for flexible website builds and content management.",
  },
  {
    title: "BRANDING & GRAPHIC DESIGN",
    subtitle: "",
    body: "I build strong visual identities that help brands stand out in competitive markets. From logos and brand systems to social media creatives and marketing materials, I design cohesive visuals that communicate your message clearly and professionally.",
  },
  {
    title: "VIDEO & AI CONTENT CREATION",
    subtitle: "",
    body: "I produce engaging video content and AI-enhanced visuals that elevate your brand storytelling. From social media reels to promotional videos and AI-generated designs, I create content that captures attention and increases audience engagement.",
  },
];

export default function ServicesPage() {
  return (
    <main className="grid-about services-page">
      <ScrollReveal as="header" className="services-heading">
        <span className="services-heading-star" aria-hidden="true">
          ✷
        </span>
        <h1 className="services-heading-title">MY OFFERINGS</h1>
        <span className="services-heading-star" aria-hidden="true">
          ✷
        </span>
      </ScrollReveal>

      <ScrollReveal as="section" className="card services-rail" delay={0.08}>
        <ul className="services-rail-list">
          {OFFERING_LIST.map((item) => (
            <li key={item.title} className="services-rail-item">
              <span className="services-rail-dot" aria-hidden="true">
                {/* ◌ */}
              <img
          src={item.image}
          alt={item.title}
          width="40"
        />
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal as="section" className="card services-cards-wrap" delay={0.12}>
        <div className="services-cards-grid">
          {SERVICE_CARDS.map((card) => (
            <ScrollReveal as="article" key={card.title} className="services-info-card" delay={0.18}>
              <h2 className="services-info-title">
                {card.title}{" "}
                {card.subtitle ? <span className="services-info-subtitle">{card.subtitle}</span> : null}
              </h2>
              <p className="services-info-body">{card.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="card square profiles card-hover services-bottom-profiles" delay={0.18}>
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
      </ScrollReveal>

      

      <ScrollReveal as="section" className="card card-hover services-bottom-cta cta" delay={0.22}>
        <p className="spark">✦</p>
        <h2 className="services-cta-headline">
          Let&apos;s
          <br />
          work <span>together.</span>
        </h2>
         <Link to="/contact">
            <button type="button" className="circle-arrow" aria-label="Open profiles">
              <img src="/icons/icon.svg" width="46" height="42" alt="" decoding="async" />
            </button>
          </Link>
      </ScrollReveal>

      <ScrollReveal as="section" className="card small credentials card-hover services-bottom-credentials" delay={0.26}>
        <div className="services-signature">
          {/* <span>wafa</span> */}
           <img src="/icons/Group 18.png" alt="" style={{ height: "110px", width: "180px" }} />
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
      </ScrollReveal>

      
    </main>
  );
}

