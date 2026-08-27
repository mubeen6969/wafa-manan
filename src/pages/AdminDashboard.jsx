import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Pencil,
  Trash2,
  Plus,
  UploadCloud,
  Loader2,
  GripVertical,
  LayoutGrid,
  AlertTriangle,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useToast } from "../components/Toast";

const API_BASE = "https://wafa-manan-back-end.onrender.com/api";
// const API_BASE = "http://localhost:5000/api";

const CATEGORIES = [
  { value: "web-design", label: "Web Design", short: "Web" },
  { value: "app-design", label: "App Design", short: "App" },
  { value: "graphic-design", label: "Graphic Design", short: "Graphic" },
  { value: "logo-design", label: "Logo Design", short: "Logo" },
];

const FILTERS = [{ value: "all", label: "All", short: "All" }, ...CATEGORIES];

const GALLERY_CATEGORIES = new Set(["app-design"]); // extend later if other categories need collages

const categoryLabel = (value) => CATEGORIES.find((category) => category.value === value)?.label || value;

const EMPTY_FORM = {
  title: "",
  category: "web-design",
  media: "",
  thumb: "",
  gallery: [],
  restricted: false, // NEW
};

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const forSave = (project) => ({
  title: project.title,
  category: project.category,
  media: project.media,
  thumb: project.thumb,
  gallery: project.gallery,
  restricted: project.restricted, // NEW
  order: project.order,
});

function useObjectUrl(file) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
}

// Reads natural width/height from a File before it's uploaded, so we can
// store dimensions alongside the URL for size-aware collage layout later.
function readImageDimensions(file) {
  return new Promise((resolve) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(objectUrl);
    };
    img.onerror = () => {
      resolve({ width: null, height: null });
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  });
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]); // { id, url, width, height, file, isNew }
  const [uploading, setUploading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [listFilter, setListFilter] = useState("all");
  const dragIndex = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const thumbPreview = useObjectUrl(thumbFile) || formData.thumb;
  const mediaPreview = useObjectUrl(mediaFile) || formData.media;
  const mediaIsImage = /\.(png|jpe?g|webp|gif|avif)$/i.test(mediaFile?.name || formData.media || "");
  const isGalleryCategory = GALLERY_CATEGORIES.has(formData.category);

  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((c) => {
      counts[c.value] = 0;
    });
    projects.forEach((p) => {
      if (counts[p.category] !== undefined) counts[p.category] += 1;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(
    () => (listFilter === "all" ? projects : projects.filter((p) => p.category === listFilter)),
    [projects, listFilter]
  );

  const canReorder = listFilter === "all";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadFile = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append("image", file);

    const response = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      headers: authHeaders(),
      body: data,
    });

    if (!response.ok) throw new Error("Upload failed");

    const result = await response.json();
    return result.imageUrl;
  };

  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/projects`);
      const data = await response.json();
      setProjects(Array.isArray(data) ? [...data].sort(byOrder) : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects.");
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const revokeNewGalleryUrls = (items) => {
    items.forEach((item) => {
      if (item.isNew && item.url) URL.revokeObjectURL(item.url);
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setThumbFile(null);
    setMediaFile(null);
    setGalleryItems((prev) => {
      revokeNewGalleryUrls(prev);
      return [];
    });
  };

  const handleGalleryFilesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // allow re-selecting the same file later
    if (!files.length) return;

    const newItems = await Promise.all(
      files.map(async (file) => {
        const { width, height } = await readImageDimensions(file);
        return {
          id: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          url: URL.createObjectURL(file),
          width,
          height,
          file,
          isNew: true,
        };
      })
    );

    setGalleryItems((prev) => [...prev, ...newItems]);
  };

  const removeGalleryItem = (id) => {
    setGalleryItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.isNew && target.url) URL.revokeObjectURL(target.url);
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const [thumbUrl, mediaUrl, galleryPayload] = await Promise.all([
        thumbFile ? uploadFile(thumbFile) : formData.thumb,
        isGalleryCategory ? Promise.resolve("") : mediaFile ? uploadFile(mediaFile) : formData.media,
        isGalleryCategory
          ? Promise.all(
            galleryItems.map(async (item) =>
              item.isNew
                ? { url: await uploadFile(item.file), width: item.width, height: item.height }
                : { url: item.url, width: item.width, height: item.height }
            )
          )
          : Promise.resolve([]),
      ]);

      const projectData = {
        ...formData,
        thumb: thumbUrl,
        media: mediaUrl,
        gallery: galleryPayload,
        order: editingId
          ? projects.find((p) => p._id === editingId)?.order ?? projects.length
          : projects.length + 1,
      };

      if (editingId) {
        const response = await fetch(`${API_BASE}/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(projectData),
        });
        if (!response.ok) throw new Error("Update failed");
        toast.success("Project updated.");
      } else {
        const response = await fetch(`${API_BASE}/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(projectData),
        });
        if (!response.ok) throw new Error("Create failed");
        toast.success("Project added.");
      }

      resetForm();
      await fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving the project.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setThumbFile(null);
    setMediaFile(null);
    setFormData({
      title: project.title,
      category: project.category,
      media: project.media,
      thumb: project.thumb,
      gallery: project.gallery || [],
      restricted: !!project.restricted, // NEW
    });

    // Migrate legacy single-media app-design projects into the gallery on first edit.
    const initialGallery =
      project.gallery && project.gallery.length
        ? project.gallery
        : project.media && GALLERY_CATEGORIES.has(project.category)
          ? [{ url: project.media, width: null, height: null }]
          : [];

    setGalleryItems((prev) => {
      revokeNewGalleryUrls(prev);
      return initialGallery.map((item, i) => ({
        id: `existing-${project._id}-${i}`,
        url: item.url,
        width: item.width,
        height: item.height,
        file: null,
        isNew: false,
      }));
    });
  };

  const requestDelete = (project) => {
    setDeleteTarget(project);
  };

  const cancelDelete = () => {
    if (deleting) return;
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await fetch(`${API_BASE}/projects/${deleteTarget._id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Delete failed");
      if (editingId === deleteTarget._id) resetForm();
      toast.success("Project deleted.");
      setDeleteTarget(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the project.");
    } finally {
      setDeleting(false);
    }
  };

  // Escape-to-close + scroll lock while the delete modal is open.
  useEffect(() => {
    if (!deleteTarget) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") cancelDelete();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTarget]);

  const persistOrder = async (list) => {
    setSavingOrder(true);
    try {
      const responses = await Promise.all(
        list.map((project) =>
          fetch(`${API_BASE}/projects/${project._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify(forSave(project)),
          })
        )
      );
      if (responses.some((r) => !r.ok)) throw new Error("Reorder failed");
      toast.success("Order updated.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save the new order.");
      fetchProjects();
    } finally {
      setSavingOrder(false);
    }
  };

  const handleDrop = (targetIndex) => {
    const sourceIndex = dragIndex.current;
    dragIndex.current = null;
    setDraggingIndex(null);
    setDragOverIndex(null);

    if (!canReorder || sourceIndex === null || sourceIndex === targetIndex) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    const renumbered = reordered.map((project, index) => ({ ...project, order: index + 1 }));

    setProjects(renumbered);
    persistOrder(renumbered);
  };

  return (
    <div>
      <Reveal as="div" className="admin-topbar">
        <h1 className="admin-title">
          <LayoutDashboard size={26} />
          Admin Dashboard
        </h1>
        <button
          type="button"
          className="admin-logout"
          onClick={() => {
            localStorage.removeItem("token");
            toast.info("Logged out.");
            navigate("/admin/login");
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </Reveal>

      <Reveal as="div" className="admin-stats" delay={0.02}>
        <div className="admin-stat-card admin-stat-card-primary">
          <span className="admin-stat-value">{projects.length}</span>
          <span className="admin-stat-label">Total Projects</span>
        </div>
        {CATEGORIES.map((category) => (
          <div className="admin-stat-card" key={category.value}>
            <span className="admin-stat-value">{categoryCounts[category.value] || 0}</span>
            <span className="admin-stat-label">{category.label}</span>
          </div>
        ))}
      </Reveal>

      <div className="admin-layout">
        <Reveal as="div" className="card admin-card" delay={0.06} splitText={false}>
          <h2 className="admin-card-title">
            {editingId ? <Pencil size={18} /> : <Plus size={18} />}
            {editingId ? "Edit Project" : "Add Project"}
          </h2>

          <form onSubmit={handleSubmit} className="admin-form">
            <div>
              <label className="admin-label" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Project title"
                value={formData.title}
                onChange={handleChange}
                className="contact-input"
                required
              />
            </div>

            <div>
              <span className="admin-label">Category</span>
              <div className="admin-category-row">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    className={`filter-btn ${formData.category === category.value ? "is-active" : ""}`}
                    onClick={() => setFormData((prev) => ({ ...prev, category: category.value }))}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="admin-label" style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.restricted}
                  onChange={(e) => setFormData((prev) => ({ ...prev, restricted: e.target.checked }))}
                />
                NDA-protected (requires password to view)
              </label>
            </div>

            <div>
              <span className="admin-label">Thumbnail</span>
              <label className="admin-dropzone">
                {thumbPreview ? (
                  <img src={thumbPreview} alt="" className="admin-dropzone-preview" />
                ) : (
                  <span className="admin-dropzone-icon">
                    <UploadCloud size={20} />
                  </span>
                )}
                <span className="admin-dropzone-text">
                  <strong>{thumbFile?.name || (formData.thumb ? "Current thumbnail" : "Choose an image")}</strong>
                  Click to {formData.thumb || thumbFile ? "replace" : "upload"}
                </span>
                <input type="file" accept="image/*" onChange={(e) => setThumbFile(e.target.files[0] || null)} />
              </label>
            </div>

            {isGalleryCategory ? (
              <div>
                <span className="admin-label">Gallery Images (collage)</span>
                <div className="admin-gallery-grid">
                  {galleryItems.map((item) => (
                    <div className="admin-gallery-thumb" key={item.id}>
                      <img src={item.url} alt="" />
                      <button
                        type="button"
                        className="admin-gallery-remove"
                        aria-label="Remove image"
                        onClick={() => removeGalleryItem(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <label className="admin-dropzone admin-gallery-add">
                    <span className="admin-dropzone-icon">
                      <UploadCloud size={20} />
                    </span>
                    <span className="admin-dropzone-text">
                      <strong>Add images</strong>
                      Select one or more
                    </span>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryFilesChange} />
                  </label>
                </div>
                <p className="admin-hint">
                  Add as many images as you like — they'll tile into a collage sized to each image on the
                  project page.
                </p>
              </div>
            ) : (
              <div>
                <span className="admin-label">Media (image or video)</span>
                <label className="admin-dropzone">
                  {mediaPreview && mediaIsImage ? (
                    <img src={mediaPreview} alt="" className="admin-dropzone-preview" />
                  ) : (
                    <span className="admin-dropzone-icon">
                      <UploadCloud size={20} />
                    </span>
                  )}
                  <span className="admin-dropzone-text">
                    <strong>{mediaFile?.name || (formData.media ? "Current media" : "Choose media")}</strong>
                    Click to {formData.media || mediaFile ? "replace" : "upload"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setMediaFile(e.target.files[0] || null)}
                  />
                </label>
              </div>
            )}

            <div className="admin-form-actions">
              <button type="submit" className="contact-submit admin-submit" disabled={uploading}>
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving&hellip;
                  </>
                ) : editingId ? (
                  "Update Project"
                ) : (
                  "Add Project"
                )}
              </button>
              {editingId && (
                <button type="button" className="admin-cancel" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal as="div" className="card admin-card" delay={0.12} splitText={false}>
          <div className="admin-projects-header">
            <h2 className="admin-card-title">
              <LayoutGrid size={18} />
              Projects
              {savingOrder && <Loader2 size={16} className="animate-spin admin-saving-icon" />}
            </h2>

            <div className="admin-filter-row" role="tablist" aria-label="Filter projects by category">
              {FILTERS.map((f) => {
                const count = f.value === "all" ? projects.length : categoryCounts[f.value] || 0;
                return (
                  <button
                    key={f.value}
                    type="button"
                    role="tab"
                    aria-selected={listFilter === f.value}
                    className={`admin-filter-btn ${listFilter === f.value ? "is-active" : ""}`}
                    onClick={() => setListFilter(f.value)}
                  >
                    {f.short}
                    <span className="admin-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {projectsLoading ? (
            <div className="admin-list">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="admin-skeleton-row" key={index}>
                  <div className="skeleton-block admin-skeleton-thumb" />
                  <div className="admin-skeleton-lines">
                    <div className="skeleton-block skeleton-line skeleton-line-short" />
                    <div className="skeleton-block skeleton-line skeleton-line-long" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <p className="admin-empty">
              {listFilter === "all"
                ? "No projects yet - add your first one using the form."
                : `No ${categoryLabel(listFilter)} projects yet.`}
            </p>
          ) : (
            <div className="admin-list">
              <p className="admin-reorder-hint">
                {canReorder
                  ? "Drag the handle to reorder projects."
                  : "Switch to \u201cAll\u201d to drag-reorder projects."}
              </p>
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  draggable={canReorder}
                  onDragStart={() => {
                    if (!canReorder) return;
                    dragIndex.current = index;
                    setDraggingIndex(index);
                  }}
                  onDragEnter={() => canReorder && setDragOverIndex(index)}
                  onDragOver={(e) => canReorder && e.preventDefault()}
                  onDrop={() => canReorder && handleDrop(index)}
                  onDragEnd={() => {
                    dragIndex.current = null;
                    setDraggingIndex(null);
                    setDragOverIndex(null);
                  }}
                  className={`admin-project-row ${editingId === project._id ? "is-editing" : ""} ${dragOverIndex === index ? "is-drag-over" : ""
                    } ${draggingIndex === index ? "is-dragging" : ""}`}
                >
                  <span className={`admin-drag-handle ${!canReorder ? "is-disabled" : ""}`} aria-hidden="true">
                    <GripVertical size={16} />
                  </span>
                  <span className="admin-project-number">{index + 1}</span>
                  <img src={project.thumb} alt="" className="admin-project-thumb" />
                  <div className="admin-project-info">
                    <p className="admin-project-title">{project.title}</p>
                    <div className="admin-project-meta">
                      <span className="admin-badge">{categoryLabel(project.category)}</span>
                      {project.restricted && <span className="admin-badge">NDA</span>}
                      {project.gallery?.length > 0 && (
                        <span className="admin-badge">{project.gallery.length} images</span>
                      )}
                    </div>
                  </div>
                  <div className="admin-project-actions">
                    <button
                      type="button"
                      className="admin-icon-btn"
                      aria-label={`Edit ${project.title}`}
                      onClick={() => handleEdit(project)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="admin-icon-btn is-danger"
                      aria-label={`Delete ${project.title}`}
                      onClick={() => requestDelete(project)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>

      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={cancelDelete}>
          <div
            className="admin-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-icon">
              <AlertTriangle size={22} />
            </div>
            <h3 className="admin-modal-title" id="delete-modal-title">
              Delete project?
            </h3>
            <p className="admin-modal-desc" id="delete-modal-desc">
              This will permanently remove <strong>&ldquo;{deleteTarget.title}&rdquo;</strong> and can&apos;t be
              undone.
            </p>
            <div className="admin-modal-actions">
              <button type="button" className="admin-cancel" onClick={cancelDelete} disabled={deleting}>
                Cancel
              </button>
              <button type="button" className="admin-modal-delete" onClick={confirmDelete} disabled={deleting}>
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting&hellip;
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}