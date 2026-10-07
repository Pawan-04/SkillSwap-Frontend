import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, setUser } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="brand-logo">🤝</span>
                    <span className="brand-name">SkillSwap</span>
                </Link>

                <nav className="navbar-links">
                    {user ? (
                        <>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                                Dashboard
                            </NavLink>
                            <NavLink to="/discover" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                                Discover
                            </NavLink>
                            <NavLink to="/connections" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                                Connections
                            </NavLink>
                            <NavLink to="/resources" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                                Resources
                            </NavLink>
                            <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                                Profile
                            </NavLink>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={()=>{setUser(null); localStorage.clear('token')} }>
                            Logout</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                                Register
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;