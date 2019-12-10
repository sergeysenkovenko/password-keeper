import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Register = () => {
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
      });
  }

  const onSubmit = e => {
    e.preventDefault()
    if(!name || !email || !password){
      setAlert("Please fill all fields", "danger")
    }else if(password !== password2){
      setAlert("Password should match", "danger")
    }
  }

  return (
    <form className="card" style={formStyle} onSubmit={onSubmit}>
      <h2 className="text-primary">
        Account Registration
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
      />
      <input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        value={password2}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="Register"
          className="btn btn-block btn-primary"
        />
      </div>
    </form>
  );
};

const formStyle = {
    maxWidth: "650px",
    margin:"1rem auto",
    padding:"2rem"
}

export default Register;
