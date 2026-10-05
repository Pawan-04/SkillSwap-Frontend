import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ConnectionCard from "../components/ConnectionCard";
import AcceptedConnectionCard from "../components/AcceptedConnectionCard";

function Connections() {
    const { user } = useAuth();

    const [requests, setRequests] = useState([]);
    const [connections, setConnections] = useState([]);

    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const getConnectionsData = async () => {
            try {
                const requestsResponse = await api.get(
                    "/connections/requests"
                );

                const connectionsResponse = await api.get(
                    "/connections/"
                );

                setRequests(
                    requestsResponse.data.requests
                );

                setConnections(
                    connectionsResponse.data.connections
                );
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load connections"
                );
            } finally {
                setLoading(false);
            }
        };

        getConnectionsData();
    }, []);

    const handleUpdateRequest = async (
        connectionId,
        status
    ) => {
        setUpdatingId(connectionId);
        setError("");

        try {
            const response = await api.patch(
                `/connections/${connectionId}`,
                {
                    status,
                }
            );

            setRequests((prevRequests) =>
                prevRequests.filter(
                    (request) =>
                        request._id !== connectionId
                )
            );

            if (status === "accepted") {
                setConnections((prevConnections) => [
                    ...prevConnections,
                    response.data.connection,
                ]);
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update connection request"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <main>
                <div className="loading">Loading connections...</div>
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
                <h1>Connections</h1>
                <p className="page-subtitle">Manage connection requests and view your network</p>
            </div>

            {/* Incoming Connection Requests */}
            <section className="section-block">
                <h2>Connection Requests</h2>

                {requests.length === 0 ? (
                    <div className="empty-state">No pending requests.</div>
                ) : (
                    <div className="connections-grid">
                        {requests.map((request) => (
                            <ConnectionCard
                                key={request._id}
                                request={request}
                                onUpdate={handleUpdateRequest}
                                updatingId={updatingId}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Accepted Connections */}
            <section className="section-block">
                <h2>My Connections</h2>

                {connections.length === 0 ? (
                    <div className="empty-state">No connections yet. Discover members to build your network!</div>
                ) : (
                    <div className="connections-grid">
                        {connections.map((connection) => {
                            const otherUser =
                                connection.sender._id === user._id
                                    ? connection.receiver
                                    : connection.sender;

                            return (
                                <AcceptedConnectionCard
                                    key={connection._id}
                                    user={otherUser}
                                />
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Connections;