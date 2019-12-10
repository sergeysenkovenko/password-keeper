import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary">
      <div className="container navbar">
        <Link to="/">
          <h1>
            <i className="fa fa-unlock-alt" style={{ marginRight: "0.75rem" }}></i>
            Password Keeper
          </h1>
        </Link>
        <ul>
          <li style={{marginRight: "1rem"}}>
            <Link to="/register">Register</Link>
          </li>
          <li style={{marginLeft: "1rem"}}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
