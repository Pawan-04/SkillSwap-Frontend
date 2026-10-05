import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


    

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
    },
    {label:"Connections",
        path:"/connections"
    },
    {label:"Discover",
        path:"/discover"
    }
];

function Navbar() {
    const { user } = useAuth();
    console.log(user);
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