import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
      });
  }

  return (
    <form className="card" style={formStyle}>
      <h2 className="text-primary">
        Account Login
      </h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="Login"
          className="btn btn-block btn-primary"
        />
      </div>
    </form>
  );
};

const formStyle = {
    maxWidth: "600px",
    margin:"1rem auto",
    padding:"2rem"
}

export default Login;
