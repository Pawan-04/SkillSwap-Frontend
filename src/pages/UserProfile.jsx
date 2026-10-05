import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function UserProfile() {
    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await api.get(
                    `/users/${userId}`
                );

                setUser(response.data.user);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load profile"
                );
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, [userId]);

    if (loading) {
        return (
            <main>
                <div className="loading">Loading profile...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <div className="error-message">{error}</div>
            </main>
        );
    }

    return (
        <main className="profile-container">
            <div className="card profile-card">
                <div className="profile-header">
                    <div className="user-avatar-large">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1>{user.name}</h1>
                        <p className="user-email">{user.email}</p>
                    </div>
                </div>

                <div className="profile-bio-box">
                    <h3>About</h3>
                    <p>{user.bio || "No bio added yet."}</p>
                </div>

                <div className="skills-grid">
                    <div className="skill-list">
                        <h2>Skills to Teach</h2>
                        {user.skillsToTeach && user.skillsToTeach.length > 0 ? (
                            <div className="skill-tags">
                                {user.skillsToTeach.map((skill) => (
                                    <span key={skill} className="skill">{skill}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-state">No skills listed.</p>
                        )}
                    </div>

                    <div className="skill-list">
                        <h2>Skills to Learn</h2>
                        {user.skillsToLearn && user.skillsToLearn.length > 0 ? (
                            <div className="skill-tags">
                                {user.skillsToLearn.map((skill) => (
                                    <span key={skill} className="skill">{skill}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-state">No skills listed.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UserProfile;