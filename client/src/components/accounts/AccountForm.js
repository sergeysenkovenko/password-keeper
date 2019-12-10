import React, { useState, useContext, useEffect } from "react";
import AccountContext from "../../context/account/accountContext";

const AccountForm = () => {
  const accountContext = useContext(AccountContext);

  const { addAccount, current, clearCurrent, updateAccount } = accountContext;

  const [account, setAccount] = useState({
    title: "",
    login: "",
    password: ""
  });
  const resetFields = () => {
    setAccount({
        title: "",
        login: "",
        password: ""
      });    
  }
  useEffect(() => {
      if(current){
          setAccount(current)
      } else {
        resetFields()
      }
  }, [accountContext, current])

  const { title, login, password } = account;

  const onChange = e =>
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if(current){
        updateAccount(account);
        clearCurrent();
    } else{
        addAccount(account);
    }
    resetFields()
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Account": "Add new account"}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={onChange}
      />
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={login}
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
          value={current ? "Update Account": "Add account"}
          className={`btn btn-block ${!current ? "btn-primary" : "btn-success"}`}
        />
        {current && <button className="btn-light btn btn-block" onClick={clearCurrent} style={{marginBottom: "1.2rem"}}>Cancel</button>}
      </div>
    </form>
  );
};

export default AccountForm;
