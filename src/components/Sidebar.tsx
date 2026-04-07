import { NavLink } from "react-router-dom";
import {
  FaFilm,
  FaUser,
  FaUserTie,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navItems = [
    { name: "Movies", icon: <FaFilm /> },
    { name: "Actors", icon: <FaUser /> },
    { name: "Directors", icon: <FaUserTie /> },
    { name: "Comment", icon: <FaCommentDots /> },
    { name: "Setting", icon: <FaCog /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">🎬 MovieApp</h2>

      <ul>
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={`/${item.name.toLowerCase()}`}
              end   // ✅ FIX HERE
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};


export default Sidebar;
