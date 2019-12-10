import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { loading, loginUser, error, clearErrors, isAuthenticated } = authContext;

  const { setAlert } = alertContext;

  useEffect(() => {
    if(isAuthenticated){
      props.history.push("/")
    }
    if(error){
      setAlert(error, "danger");
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])


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

  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setAlert("Please fill all fields", "danger");
    } else {
      loginUser({
        email,
        password
      })
    }
  };
  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <form className="card" style={formStyle} onSubmit={onSubmit}>
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
