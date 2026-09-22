import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          EH
        </div>

        <div>
          <h2>Employee Hub</h2>
          <span>Management System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          📊
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees">
          👥
          <span>Employees</span>
        </NavLink>

        <NavLink to="/employees/add">
          ➕
          <span>Add Employee</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;