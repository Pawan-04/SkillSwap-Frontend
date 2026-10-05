import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import Discover from "./pages/Discover";
import Connections from "./pages/Connections";
import UserProfile from "./pages/UserProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

    <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route
        path="/profile/:userId"
        element={<UserProfile />}
    />
    <Route path="/resources" element={<Resources />} />
    <Route path="/discover" element={<Discover />} />
    <Route path="/connections" element={<Connections />} />
</Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;