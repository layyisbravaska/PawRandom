import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <a href="#home" className="brand" onClick={closeMenu}>
        <svg
          className="paw-icon"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="32" cy="43" rx="15" ry="12" fill="currentColor" />
          <ellipse
            cx="15"
            cy="27"
            rx="6"
            ry="8"
            fill="currentColor"
            transform="rotate(-25 15 27)"
          />
          <ellipse
            cx="27"
            cy="17"
            rx="6"
            ry="8"
            fill="currentColor"
            transform="rotate(-8 27 17)"
          />
          <ellipse
            cx="40"
            cy="17"
            rx="6"
            ry="8"
            fill="currentColor"
            transform="rotate(8 40 17)"
          />
          <ellipse
            cx="51"
            cy="27"
            rx="6"
            ry="8"
            fill="currentColor"
            transform="rotate(25 51 27)"
          />
        </svg>

        <span className="brand-name">PawRandom</span>
      </a>

      <button
        type="button"
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`nav-links ${menuOpen ? "open" : ""}`}
        id="primary-navigation"
      >
        <a href="#home" onClick={closeMenu}>
          Home
        </a>
        <a href="#breeds" onClick={closeMenu}>
          Breeds
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
