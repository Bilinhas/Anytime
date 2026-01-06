//header com navbar e searchbar animadas

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { setSearchQuery } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsHidden(scrollTop > 250);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInput.trim();

    if (query) {
      setSearchQuery(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav
      id="nav"
      className={`navbar navbar-expand-sm navbar-dark ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div className="container-fluid mx-5">
        <Link className="navbar-brand text-light p-1" to="/">
          Anytime
        </Link>
        <img
          style={{ width: "25px", height: "25px" }}
          src="/images/som.png"
          alt="Logo"
        />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mx-5 me-auto" id="mynavbar">
          <ul className="navbar-nav me-auto d-flex align-items-center gap-4">
            <li className="nav-item mx-5">
              <Link className="nav-link text-light" to="/bands">
                Bands
              </Link>
            </li>
            <li className="nav-item mx-5">
              <a className="nav-link text-light" href="#songs">
                Songs
              </a>
            </li>
            <li className="nav-item mx-5">
              <a className="nav-link text-light" href="#about">
                About
              </a>
            </li>
          </ul>

          <form
            className="d-flex align-items-center rounded"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2 text-light"
              type="text"
              id="searchInput"
              name="q"
              placeholder="Search for songs"
              style={{ background: "none" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-danger me-3 text-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
