import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AccountContext from "../../context/account/accountContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser, user, clearErrors, loadUser } = authContext;
  const { clearAccounts } = useContext(AccountContext);

  useEffect(() => {
    loadUser()
    //eslint-disable-next-line
  }, [])

  const onLogout = e => {
    e.preventDefault();
    clearAccounts();
    logoutUser();
    clearErrors();
  };

  const authLinks = (
    <Fragment>
      <li style={{ marginRight: "1.2rem" }}>Hello, {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fa fa-sign-out" style={{ marginRight: "0.25rem" }} />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li style={{ marginRight: "1rem" }}>
        <Link to="/register">Register</Link>
      </li>
      <li style={{ marginLeft: "1rem" }}>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="bg-primary">
      <div className="container navbar">
        <Link to="/">
          <h1>
            <i
              className="fa fa-unlock-alt"
              style={{ marginRight: "0.75rem" }}
            ></i>
            Password Keeper
          </h1>
        </Link>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
