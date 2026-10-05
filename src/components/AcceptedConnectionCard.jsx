import { useNavigate } from "react-router-dom";

function AcceptedConnectionCard({ user }) {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/profile/${user._id}`);
    };

    return (
        <article className="connection-card accepted-card">
            <div className="user-card-header">
                <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="user-info">
                    <h3>{user.name}</h3>
                    <p className="user-email">{user.email}</p>
                </div>
            </div>

            <button
                type="button"
                className="btn-secondary"
                onClick={handleViewProfile}
            >
                View Profile
            </button>
        </article>
    );
}

export default AcceptedConnectionCard;