import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Search:", search);
    // You can later call API with search query
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <i className="fas fa-video"></i> MovieBrowser
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by movie title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="nav-actions">
          <button className="btn-sign">SIGN IN</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
