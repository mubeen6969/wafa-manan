// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useIntroAnimation } from "./hooks/useIntroAnimation";
import { usePageMeta } from "./hooks/usePageMeta";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import MoreAboutMePage from "./pages/MoreAboutMePage";
import ProjectViewerPage from "./pages/ProjectViewerPage";
import ServicesPage from "./pages/ServicesPage";
import WorksPage from "./pages/WorksPage";

export default function App() {
  useIntroAnimation();
  usePageMeta();

  return (
    <Routes>
      <Route path="/project-viewer" element={<ProjectViewerPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/more-about-me"
        element={
          <Layout>
            <MoreAboutMePage />
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <ServicesPage />
          </Layout>
        }
      />
      <Route
        path="/works"
        element={
          <Layout>
            <WorksPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
