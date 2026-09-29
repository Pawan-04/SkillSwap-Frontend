import { useState } from "react";
import api from '../services/api'

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!formData.name) {
            setError("Name is required");
            return;
        }

        if (!formData.email) {
            setError("Email is required");
            return;
        }

        if (!formData.password) {
            setError("Password is required");
            return;
        }

        setError("");
setSuccess("");
setLoading(true);
        try {
            const response = await api.post("/users", formData);
            setSuccess("Registration successful")
        } catch (error) {
        setError(error.response?.data?.message || "Something went wrong")
        }
        finally {
    setLoading(false);
}

        
        console.log(formData);
    };

    // console.log(formData);

    return (<>
        {error && <p>{error}</p>}
{success && <p>{success}</p>}
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
                {loading?"Registering....":"Register"}
            </button>
        </form>

    </>)


}

export default Register;