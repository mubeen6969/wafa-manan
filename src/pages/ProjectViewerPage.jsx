import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ProjectViewerPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const title = params.get("title") || "Project";
  const type = params.get("type") || "image";
  const src = decodeURIComponent(params.get("src") || "");

  useEffect(() => {
    document.title = `${title} - Viewer`;
    return () => {
      document.title = "WAFA MANAN";
    };
  }, [title]);

  return (
    <main className="min-h-screen w-[80vw] m-auto! items-center bg-[#0a0c12] text-[#f1f4ff] font-[Inter,Arial,sans-serif] grid grid-rows-[auto_1fr]">
      <header className="flex justify-between items-center gap-3 py-[14px] px-[18px] border-b border-[#1c2234] sticky top-0 bg-[rgba(10,12,18,0.94)] backdrop-blur-xs">
        <h1 className="text-[18px] tracking-[-0.3px]">{title}</h1>
        <a
          className="no-underline text-white border border-[#384362] rounded-[10px] py-2 px-3 text-[13px]"
          href={src || "#"}
          target="_blank"
          rel="noopener"
        >
          Open Direct File
        </a>
      </header>
      <section className="grid place-items-center p-[14px]">
        {!src ? (
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
          <img
            className="w-[min(1600px,100%)] h-auto block rounded-[12px] bg-[#0f1117]"
            src={src}
            alt={`${title} preview`}
          />
        )}
      </section>
    </main>
  );
}
