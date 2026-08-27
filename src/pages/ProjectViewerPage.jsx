import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import Image from "../components/Image";

const ROW_HEIGHT = 8; // px — base grid unit; smaller = finer-grained sizing
const ROW_GAP = 12; // px

const CATEGORY_LABELS = {
  "web-design": "Web Design",
  "app-design": "App Design",
  "graphic-design": "Graphic Design",
  "logo-design": "Logo Design",
};

// Sizes each grid cell's row-span from the image's real aspect ratio, so
// tiles of different dimensions tile the container without cropping.
function GalleryItem({ item, index, title }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const ratio = item.width && item.height ? item.height / item.width : 1;

    const setSpan = () => {
      const width = el.getBoundingClientRect().width;
      const renderedHeight = width * ratio;
      const span = Math.ceil((renderedHeight + ROW_GAP) / (ROW_HEIGHT + ROW_GAP));
      el.style.gridRowEnd = `span ${Math.max(span, 1)}`;
    };

    setSpan();
    const observer = new ResizeObserver(setSpan);
    observer.observe(el);
    return () => observer.disconnect();
  }, [item]);

  return (
    <div ref={ref} className="viewer-gallery-item">
      <img src={item.url} alt={`${title} detail ${index + 1}`} loading="lazy" />
    </div>
  );
}

export default function ProjectViewerPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const title = params.get("title") || "Project";
  const type = params.get("type") || "image";
  const category = params.get("category") || "";
  const src = decodeURIComponent(params.get("src") || "");

  const galleryItems = useMemo(() => {
    if (type !== "gallery") return [];
    try {
      const parsed = JSON.parse(decodeURIComponent(params.get("gallery") || "[]"));
      return Array.isArray(parsed) ? parsed.filter((item) => item?.url) : [];
    } catch {
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    document.title = `${title} - Viewer`;
    return () => {
      document.title = "WAFA MANAN";
    };
  }, [title]);

  return (
    <main className="min-h-screen w-[70vw] m-auto! items-center  text-[#f1f4ff] 
    ">
      <header className="mt-[80px]! w-full ">
        <h4 className="uppercase text-center text-[#BCBCBC]">
          {CATEGORY_LABELS[category] || "Web design"}
        </h4>
        <h1 className="text-[28px] font-bold capitalize mb-[50px]! text-center italic">{title}</h1>
      </header>
      <section className="grid place-items-center p-[14px]">
        {type === "gallery" ? (
          galleryItems.length === 0 ? (
            <p>Project media not found.</p>
          ) : (
            <div
              className="w-full"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gridAutoRows: `${ROW_HEIGHT}px`,
                gap: `${ROW_GAP}px`,
              }}
            >
              {galleryItems.map((item, index) => (
                <GalleryItem key={`${item.url}-${index}`} item={item} index={index} title={title} />
              ))}
            </div>
          )
        ) : !src ? (
          <p>Project media not found.</p>
        ) : type === "video" ? (
          <video
            className="w-[min(1600px,100%)] max-h-[calc(100vh-100px)] rounded-[12px] bg-[#0f1117]"
            src={src}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <Image
            className="w-[min(1600px,100%)] h-auto block rounded-[12px] bg-[#0f1117]"
            src={src}
            alt={`${title} preview`}
            priority
          />
        )}
      </section>
    </main>
  );
}