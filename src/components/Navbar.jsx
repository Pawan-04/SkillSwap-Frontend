import { Link, NavLink } from "react-router-dom";

const navItems = [
    {
        label: "Dashboard",
        path: "/dashboard"
    },
    {
        label: "Login",
        path: "/login"
    },
    {
        label: "Register",
        path: "/register"
    }
];

function Navbar() {
    return (
        <nav>
            <Link to="/">SkillSwap</Link>

            <div>
                {navItems.map((item) => (
                    <NavLink key={item.path} to={item.path}>
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;