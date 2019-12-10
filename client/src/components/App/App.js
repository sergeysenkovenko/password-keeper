import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../Navbar";
import Home from "../pages/Home";
import { Register } from "../auth";
import { Login } from "../auth";
import Alert from "../Alert";

import AuthState from "../../context/auth/AuthState";
import AccountState from "../../context/account/AccountState";
import AlertState from "../../context/alert/AlertState";

import "./App.css";

const App = () => {
  return (
    <AuthState>
      <AccountState>
        <AlertState>
          <Router>
            <Navbar />
            <div className="container">
              <Alert/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </AccountState>
    </AuthState>
  );
};

export default App;
