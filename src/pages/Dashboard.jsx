import UserCard from "../components/UserCard";
import api from "../services/api";
function Dashboard() {

    const getUser = async () => {
        const response = await api.get("/users/me");

        console.log(response.data);
    };
    const user = {
        name: "Pawan",
        bio: "MERN Developer",
        skillsToTeach: ["React", "Node.js", "MongoDB"]
    };

    const handleEdit = () => {
        console.log("Edit profile clicked");
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <UserCard
                user={user}
                onEdit={handleEdit}
            />

            <button onClick={getUser}>
                Get My Profile
            </button>
        </div>
    );
}

export default Dashboard;