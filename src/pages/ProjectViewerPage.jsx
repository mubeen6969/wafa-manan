import { label } from "framer-motion/client";
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
    <main className="min-h-screen w-[70vw] m-auto! items-center  text-[#f1f4ff] 
    ">
      <header className="mt-[80px]! w-full ">
        <h4 className="uppercase text-center text-[#BCBCBC]" >Web design</h4>
        <h1 className="text-[28px] bold capitalize mb-[50px]! text-center italic">{title}</h1>
        {/* <a
          className="no-underline text-white border border-[#384362] rounded-[10px] py-2 px-3 text-[13px]"
          href={src || "#"}
          target="_blank"
          rel="noopener"
        >
          Open Direct File
        </a> */}
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
