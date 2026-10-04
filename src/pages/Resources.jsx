import { useEffect, useState } from "react";
import api from "../services/api";
import ResourceCard from "../components/ResourceCard";

function Resources() {
    const [resources, setResources] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        url: "",
    });

    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // GET all resources
    useEffect(() => {
        const getResources = async () => {
            try {
                const response = await api.get("/resources");

                setResources(response.data.resources);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load resources"
                );
            } finally {
                setLoading(false);
            }
        };

        getResources();
    }, []);

    // Handle form inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // CREATE resource
    const handleSubmit = async (e) => {
        e.preventDefault();

        setCreating(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.post(
                "/resources",
                formData
            );

            setResources([
                response.data.resource,
                ...resources,
            ]);

            setFormData({
                title: "",
                description: "",
                category: "",
                url: "",
            });

            setSuccess("Resource created successfully.");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create resource"
            );
        } finally {
            setCreating(false);
        }
    };

    // DELETE resource
    const deleteResource = async (resourceId) => {
        setDeletingId(resourceId);
        setError("");
        setSuccess("");

        try {
            await api.delete(`/resources/${resourceId}`);

            setResources(
                resources.filter(
                    (resource) => resource._id !== resourceId
                )
            );

            setSuccess("Resource deleted successfully.");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete resource"
            );
        } finally {
            setDeletingId(null);
        }
    };

    // FILTER resources by category
    // const filteredResources = resources.filter((resource) => {
    //     if (category === "") {
    //         return true;
    //     }

    //     return resource.category === category;
    // });

    const filteredResources = resources.filter((resource) => {
    const categoryMatches =
        category === "" ||
        resource.category === category;

   const searchMatches =
    resource.title.toLowerCase().includes(search.toLowerCase()) ||
    resource.description.toLowerCase().includes(search.toLowerCase());

    return categoryMatches && searchMatches;
});

    if (loading) {
        return <p>Loading resources...</p>;
    }

    return (
        <main>
            <h1>Resources</h1>

            {/* Create Resource */}
            <section>
                <h2>Create Resource</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">
                            Title
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="React Hooks Guide"
                        />
                    </div>

                    <div>
                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="A useful guide for React Hooks"
                        />
                    </div>

                    <div>
                        <label htmlFor="url">
                            Resource URL
                        </label>

                        <input
                            id="url"
                            name="url"
                            type="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="category">
                            Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select category
                            </option>

                            <option value="Frontend">
                                Frontend
                            </option>

                            <option value="Backend">
                                Backend
                            </option>

                            <option value="Database">
                                Database
                            </option>

                            <option value="AI/ML">
                                AI/ML
                            </option>

                            <option value="DevOps">
                                DevOps
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={creating}
                    >
                        {creating
                            ? "Creating..."
                            : "Create Resource"}
                    </button>
                </form>
            </section>

            {/* Messages */}
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            {/* Filter */}
            <section>
                <h2>Filter Resources</h2>

                <label htmlFor="categoryFilter">
                    Filter by Category
                </label>

                <div>
    <label htmlFor="resourceSearch">
        Search Resources
    </label>

    <input
        id="resourceSearch"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search resources..."
    />
</div>

                <select
                    id="categoryFilter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">
                        All Categories
                    </option>

                    <option value="Frontend">
                        Frontend
                    </option>

                    <option value="Backend">
                        Backend
                    </option>

                    <option value="Database">
                        Database
                    </option>

                    <option value="AI/ML">
                        AI/ML
                    </option>

                    <option value="DevOps">
                        DevOps
                    </option>

                    <option value="Other">
                        Other
                    </option>
                </select>

                <button
    type="button"
    onClick={() => {
        setCategory("");
        setSearch("");
    }}
>
    Clear Filters
</button>
            </section>

            {/* Resource List */}
            <section>
                <h2>All Resources</h2>

                {filteredResources.length === 0 ? (
                    <p>No resources found.</p>
                ) : (
                    filteredResources.map((resource) => (
                        <ResourceCard
                            key={resource._id}
                            resource={resource}
                            onDelete={deleteResource}
                            deletingId={deletingId}
                        />
                    ))
                )}
            </section>
        </main>
    );
}

export default Resources;