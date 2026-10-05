import { useEffect, useState } from "react";
import api from "../services/api";
import DiscoverUserCard from "../components/DiscoverUserCard";

function Discover() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await api.get("/users");

                setUsers(response.data.users);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load users"
                );
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
    const nameMatches =
        user.name
            .toLowerCase()
            .includes(search.toLowerCase());

    const skillMatches =
        user.skillsToTeach.some((skill) =>
            skill
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return nameMatches || skillMatches;
});

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main>
            <h1>Discover</h1>

            <div>
                <label htmlFor="userSearch">
                    Search Users
                </label>

                <input
                    id="userSearch"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name..."
                />
            </div>

            {filteredUsers.length === 0 ? (
                <p>No users found.</p>
            ) : (
                filteredUsers.map((user) => (
                    <DiscoverUserCard
                        key={user._id}
                        user={user}
                    />
                ))
            )}
        </main>
    );
}

export default Discover;