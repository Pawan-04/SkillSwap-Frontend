import { useNavigate } from "react-router-dom";

function AcceptedConnectionCard({ user }) {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/profile/${user._id}`);
    };

    return (
        <article className="connection-card">
            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <button
                type="button"
                onClick={handleViewProfile}
            >
                View Profile
            </button>
        </article>
    );
}

export default AcceptedConnectionCard;