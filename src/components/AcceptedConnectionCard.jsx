import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AcceptedConnectionCard({ user }) {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/profile/${user._id}`);
    };

    const removeFriend = async ()=>{
        try{
            await api.delete(`/connections/${user._id}`)
        }
        catch(err){
            console.log(err)
        }
    }

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

             <button
                type="button"
                className="btn-secondary"
                onClick={removeFriend}
            >
                Remove 
            </button>
        </article>
    );
}

export default AcceptedConnectionCard;