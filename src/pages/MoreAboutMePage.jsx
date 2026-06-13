import { ScrollReveal } from "../components/ScrollReveal";

export default function MoreAboutMePage() {
  return (
    <main className="about-me-page">
      <ScrollReveal as="aside" className="card about-me-profile">
        <div className="about-me-photo-wrap">
          <img src="/icons/hero-img.png" alt="Wafa Manan" width="320" height="320" decoding="async" />
        </div>
        <h1 className="about-me-name">Wafa Manan</h1>
        <p className="about-me-role">@ux.uidesigner</p>
        <div className="about-me-socials">
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="about-me-social-dot" aria-label="Behance">
            bē
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="about-me-social-dot" aria-label="LinkedIn">
            in
          </a>
          <a href="https://wa.me/923227780622" target="_blank" rel="noopener noreferrer" className="about-me-social-dot" aria-label="WhatsApp">
            wa
          </a>
        </div>
        <button type="button" className="about-me-contact-btn">
          Contact Me
        </button>
      </ScrollReveal>

      <section className="about-me-content">
        <ScrollReveal as="section" className="about-me-block" delay={0.08}>
          <h2 className="about-me-block-title">ABOUT ME</h2>
          <p className="about-me-body">
            Hey, I&apos;m Wafa Manan, a passionate designer with 3+ years of experience creating digital experiences and visual content. I
            specialize in designing intuitive, user-friendly interfaces and love working on everything from UI/UX projects to graphics, videos, and
            AI-generated content. My goal is simple: turn ideas into visuals that grab attention and leave an impact.
          </p>
          <p className="about-me-body">My expertise:</p>
          <ul className="about-me-points">
            <li>UI/UX Design</li>
            <li>Graphic Design</li>
            <li>Video Editing</li>
            <li>AI-Generated Content</li>
          </ul>
          <p className="about-me-body">Tools I use: Figma, Framer, Webflow, Adobe XD, Illustrator, Photoshop, Premiere Pro, Canva, CapCut, WordPress.</p>
        </ScrollReveal>

        <ScrollReveal as="section" className="about-me-block" delay={0.12}>
          <h2 className="about-me-block-title">SKILLS</h2>
          <div className="about-me-skills-grid">
            <div className="about-me-skill">
              <span>85%</span>FIGMA
            </div>
            <div className="about-me-skill">
              <span>85%</span>FRAMER
            </div>
            <div className="about-me-skill">
              <span>70%</span>WEBFLOW
            </div>
            <div className="about-me-skill">
              <span>90%</span>Adobe XD
            </div>
            <div className="about-me-skill">
              <span>80%</span>WordPress
            </div>
            <div className="about-me-skill">
              <span>80%</span>Canva
            </div>
            <div className="about-me-skill">
              <span>75%</span>Adobe Illustrator
            </div>
            <div className="about-me-skill">
              <span>87%</span>Adobe Photoshop
            </div>
            <div className="about-me-skill">
              <span>90%</span>Premier PRO
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="about-me-block" delay={0.16}>
          <h2 className="about-me-block-title">EXPERIENCE</h2>
          <div className="about-me-timeline-item">
            <p className="about-me-time">August 2024 - Present</p>
            <h3>The Social Nexus</h3>
            <p className="about-me-subtitle">Senior UI/UX Designer & Creative Lead</p>
            <p className="about-me-body">
              Leading UI/UX design and managing the full creative department, handling UX research, product design, branding, and graphic content
              including logos, social media, and marketing materials.
            </p>
          </div>
          <div className="about-me-timeline-item">
            <p className="about-me-time">January 2025 - May 2025</p>
            <h3>Chromatic Code</h3>
            <p className="about-me-subtitle">Senior UI/UX Designer</p>
            <p className="about-me-body">Worked on user experience strategy, wireframing, and interface design for multiple client projects.</p>
          </div>
          <div className="about-me-timeline-item">
            <p className="about-me-time">September 2023 - May 2024</p>
            <h3>Dream Softs</h3>
            <p className="about-me-subtitle">Junior UI/UX Designer</p>
            <p className="about-me-body">
              Started professional journey by assisting in UI design, prototyping, and visual content creation. Built strong foundations in UX
              principles, layout design, and solutions.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="about-me-block" delay={0.2}>
          <h2 className="about-me-block-title">EDUCATION</h2>
          <div className="about-me-timeline-item">
            <p className="about-me-time">2022 - 2025</p>
            <h3>Masters in Statistics</h3>
            <p className="about-me-subtitle">GC University Faisalabad</p>
            <p className="about-me-body">
              Developed strong analytical and problem-solving skills, enhancing data-driven decisions and statistics research understanding.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
