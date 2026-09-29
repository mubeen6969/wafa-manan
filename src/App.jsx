import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SiteLoader from "./components/SiteLoader";
import { usePageMeta } from "./hooks/usePageMeta";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import MoreAboutMePage from "./pages/MoreAboutMePage";
import ProjectViewerPage from "./pages/ProjectViewerPage";
import ServicesPage from "./pages/ServicesPage";
import WorksPage from "./pages/WorksPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  usePageMeta();

  return (
    <>
      <SiteLoader />
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
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminDashboard />
          </Layout>
        }
      />
      <Route
        path="/admin/login"
        element={
          <Layout>
            <AdminLogin />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
