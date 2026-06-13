import { projects } from "../projects";

export { projects };

export function categoryLabel(category) {
  if (category === "web-design") return "WEB DESIGN";
  if (category === "app-design") return "APP DESIGN";
  if (category === "graphic-design") return "GRAPHIC DESIGN";
  if (category === "logo-design") return "LOGO DESIGN";
  return "VIDEO";
}

export function mediaType(path) {
  return /\.mp4$/i.test(path) ? "video" : "image";
}
