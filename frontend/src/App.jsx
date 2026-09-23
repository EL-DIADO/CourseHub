import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";


function ProtectedLayout() {

    const token = localStorage.getItem("coursehub_token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="page">

            <div className="app-shell">

                <Sidebar />

                <main className="main">

                    <Topbar />

                    <Outlet />

                </main>

            </div>

        </div>
    );
}


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ALL PROTECTED PAGES */}

                <Route element={<ProtectedLayout />}>



                    <Route
                        path="/settings"
                        element={<Settings />}
                    />


                    <Route
                        path="/progress"
                        element={<Progress />}
                    />



                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/courses"
                        element={<Courses />}
                    />

                    <Route
                        path="/courses/:id"
                        element={<CourseDetails />}
                    />

                    <Route
                        path="/my-courses"
                        element={<MyCourses />}
                    />

                </Route>


                {/* DEFAULT */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* UNKNOWN ROUTE */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;