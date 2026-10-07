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
                const response = await api.get("/users/discover/list");

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

    const [connectingId, setConnectingId] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState({});

 const handleConnect = async (receiverId) => {
    setConnectingId(receiverId);

    try {
        await api.post(`/connections/${receiverId}`);

        setConnectionStatus({
            ...connectionStatus,
            [receiverId]: "pending",
        });
    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Failed to send connection request"
        );
    } finally {
        setConnectingId(null);
    }
};

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
        return (
            <main>
                <div className="loading">Loading users...</div>
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
        <main>
            <div className="page-header">
                <h1>Discover Members</h1>
                <p className="page-subtitle">Find people to exchange skills with</p>
            </div>

            <div className="search-box">
                <label htmlFor="userSearch">Search Users by Name or Skill</label>
                <input
                    id="userSearch"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type a name or skill (e.g. React, Python, Design)..."
                />
            </div>

            {filteredUsers.length === 0 ? (
                <div className="empty-state">No users found matching "{search}".</div>
            ) : (
                <div className="discover-grid">
                    {filteredUsers.map((user) => (
                        <DiscoverUserCard
                            key={user._id}
                            user={user}
                            onConnect={handleConnect}
                            connectingId={connectingId}
                            connectionStatus={connectionStatus}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default Discover;