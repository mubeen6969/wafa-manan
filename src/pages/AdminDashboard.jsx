import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/admin/login");
        }
    }, []);
    const [formData, setFormData] = useState({
        title: "",
        category: "web-design",
        media: "",
        thumb: "",
        order: 1,
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const uploadFile = async (file) => {
        if (!file) return null;

        const data = new FormData();

        data.append("image", file);

        const response = await fetch(
            "http://localhost:5000/api/upload",
            {
                method: "POST",
                body: data,
            }
        );

        const result = await response.json();

        return result.imageUrl;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = formData.media;
        const thumbUrl =
            thumbFile
                ? await uploadFile(thumbFile)
                : formData.thumb;

        const mediaUrl =
            mediaFile
                ? await uploadFile(mediaFile)
                : formData.media;

        if (image) {
            imageUrl = await uploadImage();
        }

        const projectData = {
            ...formData,
            media: mediaUrl,
            thumb: thumbUrl,
        };

        if (editingId) {
            await fetch(
                `http://localhost:5000/api/projects/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(projectData),
                }
            );

            alert("Project Updated");
        } else {
            await fetch(
                "http://localhost:5000/api/projects",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(projectData),
                }
            );

            alert("Project Added");
        }

        setEditingId(null);
        setImage(null);

        setFormData({
            title: "",
            category: "web-design",
            media: "",
            thumb: "",
            order: 1,
        });

        fetchProjects();
    };
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        await fetch(
            `http://localhost:5000/api/projects/${id}`,
            {
                method: "DELETE",
            }
        );

        fetchProjects();
    };
    const [editingId, setEditingId] = useState(null);
    const handleEdit = (project) => {
        setEditingId(project._id);

        setFormData({
            title: project.title,
            category: project.category,
            media: project.media,
            thumb: project.thumb,
            order: project.order,
        });
    };
    const [projects, setProjects] = useState([]);
    const fetchProjects = async () => {
        const response = await fetch(
            "http://localhost:5000/api/projects"
        );

        const data = await response.json();

        setProjects(data);
    };
    useEffect(() => {
        fetchProjects();
    }, []);
    const uploadImage = async () => {
        if (!image) return null;

        const data = new FormData();

        data.append("image", image);

        setUploading(true);

        const response = await fetch(
            "http://localhost:5000/api/upload",
            {
                method: "POST",
                body: data,
            }
        );

        const result = await response.json();

        setUploading(false);

        return result.imageUrl;
    };
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [thumbFile, setThumbFile] = useState(null);
    const [mediaFile, setMediaFile] = useState(null);


    return (

        <div className="max-w-2xl mx-auto p-10">
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/admin/login");
                }}
                className="bg-pink-600 text-white px-10! py-2! mt-3! rounded"
            >
                Logout
            </button>
            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4! "
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-3 w-full"
                />

             

             <div className="flex flex-col">
                   <label>Thumbnail</label>

                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setThumbFile(e.target.files[0])
                    }
                    className="border text-gray-400 mb-2.5"
                />
                <label>Media</label>

                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) =>
                        setMediaFile(e.target.files[0])
                    }
                    className="border text-gray-400 mb-2.5"
                />
             </div>

                <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="border p-3 w-full mb-2.5"
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-3 w-full mb-2.5"
                >
                    <option value="web-design">
                        Web Design
                    </option>

                    <option value="app-design">
                        App Design
                    </option>

                    <option value="graphic-design">
                        Graphic Design
                    </option>

                    <option value="logo-design">
                        Logo Design
                    </option>
                </select>

                <button
                    type="submit"
                    disabled={uploading}
                    className="bg-pink-600 text-white px-10! py-2! mt-3! rounded"
                >
                    {uploading
                        ? "Uploading..."
                        : editingId
                            ? "Update Project"
                            : "Add Project"}
                </button>
            </form>
            <div className="mt-10!">
                <h2 className="text-2xl font-bold mb-4">
                    Projects
                </h2>

                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Order</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id}>
                                <td className="border p-2">
                                    {project.title}
                                </td>

                                <td className="border p-2">
                                    {project.category}
                                </td>

                                <td className="border p-2">
                                    {project.order}
                                </td>
                                <td className="border p-2 flex justify-between">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="bg-blue-500 text-white px-3! py-1! rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="bg-red-500 text-white px-3! py-1! rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}