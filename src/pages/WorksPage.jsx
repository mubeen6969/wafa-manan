
import { useEffect, useState } from "react";

const mediaType = (src) => {
  if (!src) return "image";

  const extension = src.split(".").pop().toLowerCase();

  return ["mp4", "webm", "ogg"].includes(extension)
    ? "video"
    : "image";
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

export default function WorksPage() {
  const [filter, setFilter] = useState("all");
  // const [count, setCount] = useState(6);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetch("https://wafa-manan-back-end.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProjects(data);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);



  const showCards =
    filter === "all" || filter === "web-design";

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter(
        (project) => project.category === filter
      );


  const visibleProjects = filteredProjects;

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
            className={`filter-btn ${filter === value ? "is-active" : ""
              }`}
            type="button"
            onClick={() => {
              setFilter(value);
              // setCount();
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
        {loading ? (
          <div className="flex flex-col gap-2 justify-center items-center py-20 w-[80vw]">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-pink-600 rounded-full animate-spin"></div>
            <h1>Loading...</h1>
          </div>
        ) : (
          visibleProjects.map((project) => {
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
          }))}

      </section>


    </main>
  );
}