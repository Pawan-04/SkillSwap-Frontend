import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Profile() {
    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        name: user.name,
        bio: user.bio,
        skillsToTeach: user.skillsToTeach.join(", "),
        skillsToLearn: user.skillsToLearn.join(", "),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        const payload = {
            name: formData.name,
            bio: formData.bio,

            skillsToTeach: [
                ...new Set(
                    formData.skillsToTeach
                        .split(",")
                        .map((skill) => skill.trim().toLowerCase())
                        .filter(Boolean)
                ),
            ],

            skillsToLearn: [
                ...new Set(
                    formData.skillsToLearn
                        .split(",")
                        .map((skill) => skill.trim().toLowerCase())
                        .filter(Boolean)
                ),
            ],
        };

        try {
            const response = await api.patch("/users/me", payload);

            setUser(response.data.user);

            setSuccess("Profile updated successfully.");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="profile-container">
            <div className="page-header">
                <h1>My Profile</h1>
                <p className="page-subtitle">Manage your personal info and skill preferences</p>
            </div>

            <div className="card profile-card">
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            disabled
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell the community about yourself and your expertise..."
                        />
                    </div>

                    {/* Skills to Teach */}
                    <div>
                        <label htmlFor="skillsToTeach">
                            Skills I Teach <span className="label-hint">(separated by comma)</span>
                        </label>

                        <input
                            id="skillsToTeach"
                            name="skillsToTeach"
                            type="text"
                            value={formData.skillsToTeach}
                            onChange={handleChange}
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>

                    {/* Skills to Learn */}
                    <div>
                        <label htmlFor="skillsToLearn">
                            Skills I Want to Learn <span className="label-hint">(separated by comma)</span>
                        </label>

                        <input
                            id="skillsToLearn"
                            name="skillsToLearn"
                            type="text"
                            value={formData.skillsToLearn}
                            onChange={handleChange}
                            placeholder="AWS, Docker, System Design"
                        />
                    </div>

                    {/* Messages */}
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Profile;