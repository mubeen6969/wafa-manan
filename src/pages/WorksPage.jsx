
import { useState } from "react";
import { categoryLabel, mediaType, projects } from "../utils/projects";

export default function WorksPage() {
  const [filter, setFilter] = useState("all");
  const [count, setCount] = useState(6);

  
const showCards =
  filter === "all" || filter === "web-design";

const filteredProjects =
  filter === "all"
    ? projects
    : projects.filter(
        (project) => project.category === filter
      );

const visibleProjects = showCards
  ? filteredProjects.slice(0, count)
  : filteredProjects;

  const openProject = (project) => {
    const type = mediaType(project.media);

    const url = `/project-viewer?title=${encodeURIComponent(
      project.title
    )}&type=${encodeURIComponent(type)}&src=${encodeURIComponent(
      encodeURI(project.media)
    )}`;

    window.open(url, "_blank", "noopener");
  };

  return (
    <main className={`works-gri ${filter !== "all" ? "is-filtered" : ""}`}>

      {/* Heading */}
      <div as="header" className="works-head">
        <img
          className="works-head-icon"
          src="/icons/sum-icon.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <h1 className="works-title">MY PROJECTS</h1>

        <img
          className="works-head-icon"
          src="/icons/sum-icon.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      {/* Filters */}
      <div
        as="section"
        className="works-filter mb-5!"
        aria-label="Project categories"
        delay={0.06}
      >
        {[
          ["all", "All"],
          ["web-design", "Web Design"],
          ["app-design", "App Design"],
          ["graphic-design", "Graphic Design"],
          ["logo-design", "Logo Design"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={`filter-btn ${
              filter === value ? "is-active" : ""
            }`}
            type="button"
            onClick={() => {
              setFilter(value);
              setCount(6);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Projects */}
      <section
      key={filter}
        id="works-list"
        aria-live="polite"
        className={
          showCards
            ? "works-list"
            : "columns-1 sm:columns-2 md:columns-3 [column-gap:20px]"
        }
      >
        {visibleProjects.map((project) => {
          const type = mediaType(project.media);
          const thumb = encodeURI(project.thumb);

          // CARD LAYOUT
          if (showCards) {
            return (
              <article
                key={`${project.category}-${project.title}`}
                className="card card-hover work-card js-work-card"
                data-category={project.category}
                onClick={() => openProject(project)}
              >
                {type === "video" ? (
                  <video
                    className="work-thumb work-thumb-video"
                    src={thumb}
                    muted
                    playsInline
                    preload="none"
                  />
                ) : (
                  <img
                    className="work-thumb"
                    src={thumb}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <div className="work-meta">
                  <div>
                    <p className="eyebrow">
                      {categoryLabel(project.category)}
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
                    <img
                      src="/icons/icon.svg"
                      width="46"
                      height="42"
                      alt=""
                      decoding="async"
                      loading="lazy"
                    />
                  </button>
                </div>
              </article>
            );
          }

          // BENTO GALLERY
          return (
            <div
              key={`${project.category}-${project.title}`}
              className="overflow-hidden rounded-3xl mb-5!  break-inside-avoid cursor-pointer"
              onClick={() => openProject(project)}
            >
              <img
                src={project.media}
                alt={project.title}
                loading="lazy"
                className="w-full object-cover rounded-3xl hover:scale-105 transition duration-500"
              />
            </div>
          );
        })}
      </section>

      {/* Load More */}
      {/* {count < filteredProjects.length && ( */}
      {showCards && count < filteredProjects.length && (
        <div className="load-more-wrap flex items-center justify-center  mt-15! ">
          <button
            className="load-more-btn bg-[#DB3186]! p-4! rounded-2xl text-white "
            // onClick={() => setCount(filteredProjects.length)}
            onClick={() => setCount((prev) => prev + 6)}
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}