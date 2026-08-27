import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/Image";
import { Reveal } from "../components/Reveal";
import { CountUp } from "../components/CountUp";

export default function HomePage() {
  const navigate = useNavigate()
  const introVideoRef = useRef(null);

  const playIntroVideo = () => {
    const video = introVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    // Some browsers block unmuted playback outside a small set of gestures
    // (click/keydown) - hover isn't one of them, so this can be rejected.
    video.play().catch(() => {});
  };

  const stopIntroVideo = () => {
    const video = introVideoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <main className="home-grid  ">
      <Reveal
        as="div"
        className="card intro card-hover card-shine-effect "
        onClick={() => navigate("/about")}
      >
        <div
          className="intro-image"
          onMouseEnter={playIntroVideo}
          onMouseLeave={stopIntroVideo}
        >
          <video
            ref={introVideoRef}
            src="/assets/intro-vedio.mp4"
            playsInline
            preload="metadata"
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
            }}
          />
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
        <button type="button" className="circle-arrow intro-btn" aria-label="Read more">
          <Image src="/icons/icon.svg" width="46" height="42" alt="" priority />
        </button>
      </Reveal>

      <div className="latest-work">
        <Reveal as="section" className="card marquee card-hover" delay={0.05}>
          <marquee>
            LATEST WORK AND <span className="sb">FEATURED</span> * LATEST WORK AND <span className="sb">FEATURED</span> * LATEST WORK AND{" "}
            <span className="sb">FEATURED</span> * LATEST WORK AND <span className="sb">FEATURED</span> *
          </marquee>
        </Reveal>

        <Reveal
          as="div"
          className="more-about"
          delay={0.1}
          onClick={() => navigate("/more-about-me")}
        >
          <Link to="/more-about-me" className="card small credentials card-hover card-link-card">
            <div className="signature mx-auto">
              <Image src="/icons/New-folder/my-logo.png " alt="" style={{ height: "110px", width: "180px" }} />
            </div>
            <div className="services-content card-text-band">
              <div>
                <p className="eyebrow lt">MORE ABOUT ME</p>
                <h3 className="bt">Credentials</h3>
              </div>
              <span className="circle-arrow" aria-hidden="true">
                <Image src="/icons/icon.svg" width="46" height="42" alt="" />
              </span>
            </div>
          </Link>
        </Reveal>

        <Reveal
          as="section"
          className="card small projects card-hover"
          delay={0.15}
          onClick={() => navigate("/works")}
        >
          <div className="project-thumb">
            <Image src="/icons/New-folder/my-work.png" alt="" priority />
          </div>
          <div className="services-content card-text-band">
            <div>
              <p className="eyebrow">SHOWCASE</p>
              <h3>Projects</h3>
            </div>
            <Link to="works">
              <button type="button" className="circle-arrow" aria-label="Projects">
                <Image src="/icons/icon.svg" width="46" height="42" alt="" />
              </button>
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal
        as="section"
        className="card square gfonts card-hover"
        delay={0.2}
        onClick={() =>
          window.open(
            "/images/wafa-resume.pdf",
            "_blank"
          )
        }
      >
        <div className="gfonts">
          <Image src="/icons/gfonts.png.png" alt="" />
        </div>
        <div className="services-content">
          <div>
            <p className="eyebrow">CV</p>
            <h3>Resume</h3>
          </div>
          <button type="button" className="circle-arrow" aria-label="Resume">
            <Image src="/icons/icon.svg" width="46" height="42" alt="" />
          </button>
        </div>
      </Reveal>

      <Reveal
        as="section"
        className="card wide services card-hover"
        delay={0.25}
        onClick={() => navigate("/services")}
      >
        <div className="icons-row">
          <Image src="/icons/New-folder/service 1.svg" alt="" />
          <Image src="/icons/New-folder/service 2.svg" alt="" />
          <Image src="/icons/New-folder/service 3.svg" alt="" />
          <Image src="/icons/New-folder/service 4.svg" alt="" />
        </div>
        <div className="services-content">
          <div>
            <p className="eyebrow">SPECIALIZATION</p>
            <h3>Services Offering</h3>
          </div>
          <Link to="/services">
            <button type="button" className="circle-arrow" aria-label="Services">
              <Image src="/icons/icon.svg" width="46" height="42" alt="" />
            </button>
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="card square profiles card-hover" delay={0.3}>
        <div className="social-icons">
          <a href="https://www.behance.net/wafa29"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-dot">
              <Image src="/icons/New-folder/behance logo.svg" alt="" />
            </span>
          </a>
          <a href="https://www.linkedin.com/in/wafa-manan-7b03b5326?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-dot"><Image src="/icons/New-folder/linkdin logo.svg" alt="" /></span>
          </a>
        </div>
        <div className="services-content card-text-band"
          onClick={() => navigate("/contact")}>
          <div>
            <p className="eyebrow">STAY WITH ME</p>
            <h3>Profiles</h3>
          </div>
          <Link to="/contact">
            <button type="button" className="circle-arrow" aria-label="Profiles">
              <Image src="/icons/icon.svg" width="46" height="42" alt="" />
            </button>
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="card stats card-hover" delay={0.35}>
        <div className="stat">
          <CountUp to={3} prefix="+" delay={0.5} />
          <span>YEARS <br /> EXPERIENCE</span>
        </div>
        <div className="stat">
          <CountUp to={125} prefix="+" delay={0.6} />
          <span>CLIENTS <br /> WORLDWIDE</span>
        </div>
        <div className="stat">
          <CountUp to={210} prefix="+" delay={0.7} />
          <span>TOTAL <br /> PROJECTS</span>
        </div>
      </Reveal>

      <Reveal
        as="section"
        className="card cta card-hover relative"
        delay={0.4}
        onClick={() => navigate("/contact")}
      >
        <div className="spark absolute top-0"><Image src="/icons/New-folder/lets work.svg" alt="" /></div>
        <h2>
          Let&apos;s
          <br />
          work <span>together.</span>
        </h2>
        <Link to="/contact">
          <button type="button" className="circle-arrow" aria-label="Work together">
            <Image src="/icons/icon.svg" width="46" height="42" alt="" />
          </button>
        </Link>
      </Reveal>
    </main>
  );
}
