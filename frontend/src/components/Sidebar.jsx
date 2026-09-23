import { logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";


import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  UserRound,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

function Sidebar() {

  const navigate = useNavigate();


  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="brand">
        <div className="brand-logo">
          <img
            src="/coursehub-logo.png"
            alt="CourseHub"
          />
        </div>

        <span>CourseHub</span>
      </div>


      {/* MAIN NAVIGATION */}
      <nav className="sidebar-nav">

        <p className="nav-label">MAIN</p>

        <button
          className="nav-item"
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button
          className="nav-item"
          onClick={() => navigate("/courses")}
        >
          <BookOpen size={18} />
          <span>Courses</span>
        </button>

        <button
          className="nav-item"
          onClick={() => window.location.href = "/my-courses"}
        >
          <GraduationCap size={18} />
          <span>My Courses</span>
        </button>

        <button
          className="nav-item"
          onClick={() => window.location.href = "/profile"}
        >
          <UserRound size={18} />
          <span>Profile</span>
        </button>


        <p className="nav-label section-label">
          LEARNING
        </p>

        <button
          className="nav-item"
          onClick={() => navigate("/progress")}
        >
          <BarChart3 size={18} />
          <span>Progress</span>
        </button>


        <p className="nav-label section-label">
          SYSTEM
        </p>

        <button
          className="nav-item"
          onClick={() => navigate("/settings")}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>

      </nav>


      {/* LOGOUT */}
      <button
        className="logout-button"
        onClick={() => {
          logoutUser();
          window.location.href = "/login";
        }}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;