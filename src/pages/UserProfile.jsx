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
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main>
            <h1>{user.name}</h1>

            <p>
                {user.bio || "No bio added yet."}
            </p>

            <section>
                <h2>Skills to Teach</h2>

                {user.skillsToTeach.length === 0 ? (
                    <p>No skills added yet.</p>
                ) : (
                    <ul>
                        {user.skillsToTeach.map((skill) => (
                            <li key={skill}>
                                {skill}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>Skills to Learn</h2>

                {user.skillsToLearn.length === 0 ? (
                    <p>No skills added yet.</p>
                ) : (
                    <ul>
                        {user.skillsToLearn.map((skill) => (
                            <li key={skill}>
                                {skill}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

export default UserProfile;