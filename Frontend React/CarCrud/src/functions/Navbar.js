import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/car">Car</Link>
        </li>
        <li>
          <Link to="/driver">Driver</Link>
        </li>

        <li>
          <Link to="/CarDriver">Car & Driver</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;