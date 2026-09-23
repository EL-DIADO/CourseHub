import {
  Plus,
  Search,
  Bell
} from "lucide-react";

function Topbar() {

  const user = JSON.parse(
    localStorage.getItem("coursehub_user")
  );

  return (
    <header className="topbar">

      <div className="greeting">

        <p className="welcome-label">
          WELCOME BACK
        </p>

        <h1>
          Hi, {user?.name || "Student"}!
        </h1>

      </div>


      <div className="top-actions">

        <button className="create-button">
          <Plus size={16} />
          Create
        </button>

        <button className="round-button">
          <Search size={19} />
        </button>

        <button className="round-button">
          <Bell size={19} />
        </button>

        <button className="profile-avatar">
          {user?.name
            ?.split(" ")
            .map(name => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "ST"}
        </button>

      </div>

    </header>
  );
}

export default Topbar;