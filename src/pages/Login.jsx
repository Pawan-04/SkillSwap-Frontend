import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setError('');
        setForm({ ...form, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
        setError("Email field is required");
        return;
    }

    if (!form.password) {
        setError("Password field is required");
        return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
        const response = await api.post("/users/login", form);

        localStorage.setItem("token", response.data.token);

        // Get logged-in user's data
        const userResponse = await api.get("/users/me");

        // Update AuthContext
        setUser(userResponse.data.user);

        setSuccess("Login successful");

        navigate("/dashboard");

    } catch (error) {
        setError(
            error.response?.data?.message || "Something went wrong"
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your SkillSwap account</p>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;