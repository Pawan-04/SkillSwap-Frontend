import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
    {/* <Route path="/profile" element={<Profile />} />
    <Route path="/resources" element={<Resources />} /> */}
</Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;