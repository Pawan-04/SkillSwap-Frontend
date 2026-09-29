import UserCard from "../components/UserCard";
import api from "../services/api";
import { useEffect, useState } from "react";
function Dashboard() {
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [user, setUser] = useState(null);

useEffect(() => {
    const getUser = async () => {
        try {
            const response = await api.get("/users/me");

            setUser(response.data.user);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    
    getUser();
}, []);


 if (loading) {
    return <p>Loading...</p>;
}

if (error) {
    return <p>{error}</p>;
}

return (
    <div>
        <h1>Welcome {user.name}</h1>
    </div>
);
}

export default Dashboard;