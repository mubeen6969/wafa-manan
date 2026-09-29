import { useCallback, useEffect, useRef, useState } from "react";
import Image from "../components/Image";
import { Reveal } from "../components/Reveal";
import { Lock } from "lucide-react";
import NdaUnlockModal from "../components/NdaUnlockModal";
import { getNdaToken } from "../utils/ndaAccess";

const API_URL = "https://wafa-manan-back-end.onrender.com/api/projects";
// const API_URL = "http://localhost:5000/api/projects";
const CACHE_KEY = "wafa-projects-cache";
const SLOW_LOAD_MS = 4000;
const SKELETON_COUNT = 6;

const mediaType = (src) => {
  if (!src) return "image";

  const extension = src.split(".").pop().toLowerCase();

  return ["mp4", "webm", "ogg"].includes(extension) ? "video" : "image";
};

const categoryLabel = (category) => {
  const labels = {
    "web-design": "Web Design",
    "app-design": "App Design",
    "graphic-design": "Graphic Design",
    "logo-design": "Logo Design",
  };

  return labels[category] || category;
};

function readCachedProjects() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function WorkCardSkeleton() {
  return (
    <div className="card work-card work-card-skeleton" aria-hidden="true">
      <div className="skeleton-block skeleton-thumb" />
      <div className="work-meta">
        <div>
          <div className="skeleton-block skeleton-line skeleton-line-short" />
          <div className="skeleton-block skeleton-line skeleton-line-long" />
        </div>
        <div className="skeleton-block skeleton-circle" />
      </div>
    </div>
  );
}

export default function WorksPage() {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState(() => readCachedProjects());
  const [status, setStatus] = useState(() => (readCachedProjects() ? "ready" : "loading"));
  const [isSlowLoad, setIsSlowLoad] = useState(false);
  const [ndaTarget, setNdaTarget] = useState(null); // project pending unlock
  const slowLoadTimer = useRef(null);

  const loadProjects = useCallback(() => {
    setStatus((prev) => (prev === "ready" ? "ready" : "loading"));
    setIsSlowLoad(false);

    slowLoadTimer.current = window.setTimeout(() => setIsSlowLoad(true), SLOW_LOAD_MS);

    const token = getNdaToken();

    return fetch(API_URL, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setProjects(list);
        setStatus("ready");
        try {
          // Don't cache unlocked NDA content in sessionStorage — cache only what
          // would be shown to a locked-out visitor.
          const safeList = list.map((p) =>
            p.restricted ? { ...p, media: undefined, gallery: undefined } : p
          );
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(safeList));
        } catch {
          // sessionStorage unavailable (private mode, quota, etc.) - fine to skip caching.
        }
        return list;
      })
      .catch((error) => {
        console.error(error);
        // Keep showing already-cached projects if a background refresh fails.
        setStatus((prev) => (prev === "ready" ? "ready" : "error"));
        return null;
      })
      .finally(() => {
        window.clearTimeout(slowLoadTimer.current);
        setIsSlowLoad(false);
      });
  }, []);

  useEffect(() => {
    loadProjects();
    return () => window.clearTimeout(slowLoadTimer.current);
  }, [loadProjects]);

  const filteredProjects =
    filter === "all" ? projects ?? [] : (projects ?? []).filter((project) => project.category === filter);

  const openProjectMedia = (project) => {
    const hasGallery = Array.isArray(project.gallery) && project.gallery.length > 0;
    const base = `title=${encodeURIComponent(project.title)}&category=${encodeURIComponent(project.category)}`;

    // No media to show (e.g. a gallery-only project that never had images
    // uploaded) - route to the viewer's empty-gallery state instead of
    // building a broken `src=undefined` image URL.
    const url =
      hasGallery || project.media
        ? hasGallery
          ? `/project-viewer?${base}&type=gallery&gallery=${encodeURIComponent(JSON.stringify(project.gallery))}`
          : `/project-viewer?${base}&type=${encodeURIComponent(mediaType(project.media))}&src=${encodeURIComponent(
              encodeURI(project.media)
            )}`
        : `/project-viewer?${base}&type=gallery&gallery=${encodeURIComponent("[]")}`;

    window.open(url, "_blank", "noopener");
  };

  const openProject = (project) => {
    if (project.restricted) {
      setNdaTarget(project);
      return;
    }

    openProjectMedia(project);
  };

  const handleUnlocked = () => {
    const target = ndaTarget;
    setNdaTarget(null);
    // Refetch with the new token so unlocked media comes back, then open the
    // project the user actually unlocked instead of leaving them back at the grid.
    loadProjects().then((list) => {
      const unlocked = list?.find(
        (project) => project.title === target?.title && project.category === target?.category
      );
      openProjectMedia(unlocked && !unlocked.restricted ? unlocked : target);
    });
  };

  return (
    <main className={`works-gri ${filter !== "all" ? "is-filtered" : ""}`}>
      <Reveal as="header" className="works-head">
        <Image className="works-head-icon" src="/icons/sum-icon.png" alt="" aria-hidden="true" priority />

        <h1 className="works-title">MY PROJECTS</h1>

        <Image className="works-head-icon" src="/icons/sum-icon.png" alt="" aria-hidden="true" priority />
      </Reveal>

      <Reveal as="section" className="works-filter mb-5!" aria-label="Project categories" delay={0.08}>
        {[
          ["all", "All"],
          ["web-design", "Web Design"],
          ["app-design", "App Design"],
          ["graphic-design", "Graphic Design"],
          ["logo-design", "Logo Design"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={`filter-btn ${filter === value ? "is-active" : ""}`}
            type="button"
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </Reveal>

      {status === "loading" && (
        <>
          <section className="works-list" aria-busy="true" aria-live="polite">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <WorkCardSkeleton key={index} />
            ))}
          </section>
          {isSlowLoad && (
            <p className="works-status-note">
              Still loading&hellip; the project server is waking up, this can take up to 30 seconds.
            </p>
          )}
        </>
      )}

      {status === "error" && (
        <div className="works-empty">
          <p>Couldn&apos;t load projects right now. Please check your connection and try again.</p>
          <button type="button" className="contact-submit" onClick={loadProjects}>
            Try again
          </button>
        </div>
      )}

      {status === "ready" && filteredProjects.length === 0 && (
        <div className="works-empty">
          <p>
            {filter === "all"
              ? "No projects to show yet - check back soon."
              : `No ${categoryLabel(filter).toLowerCase()} projects yet.`}
          </p>
          {filter !== "all" && (
            <button type="button" className="filter-btn is-active" onClick={() => setFilter("all")}>
              View all projects
            </button>
          )}
        </div>
      )}

      {status === "ready" && filteredProjects.length > 0 && (
        <section key={filter} id="works-list" aria-live="polite" className="works-list">
          {filteredProjects.map((project, index) => {
            const type = mediaType(project.media);
            const thumb = encodeURI(project.thumb);

            return (
              <Reveal
                as="article"
                key={`${project.category}-${project.title}`}
                className="card card-hover work-card js-work-card"
                data-category={project.category}
                delay={Math.min(index * 0.05, 0.3)}
                onClick={() => openProject(project)}
              >
                {type === "video" ? (
                  <video
                    className={`work-thumb work-thumb-video ${project.restricted ? "work-thumb-restricted" : ""}`}
                    src={thumb}
                    muted
                    playsInline
                    preload="none"
                  />
                ) : (
                  <Image
                    className={`work-thumb ${project.restricted ? "work-thumb-restricted" : ""}`}
                    src={thumb}
                    alt={`${project.title} preview`}
                  />
                )}

                <div className="work-meta">
                  <div>
                    <p className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {categoryLabel(project.category)}
                      {project.restricted && (
                        <span className="admin-badge" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <Lock size={12} /> NDA
                        </span>
                      )}
                    </p>

                    <h3>{project.title}</h3>
                  </div>

                  <button
                    type="button"
                    className="circle-arrow js-open-project"
                    aria-label={`Open ${project.title}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      openProject(project);
                    }}
                  >
                    {project.restricted ? (
                      <Lock size={20} />
                    ) : (
                      <Image src="/icons/icon.svg" width="46" height="42" alt="" />
                    )}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </section>
      )}

      {ndaTarget && <NdaUnlockModal onClose={() => setNdaTarget(null)} onUnlocked={handleUnlocked} />}
    </main>
  );
}