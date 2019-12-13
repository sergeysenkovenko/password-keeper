import React, { useContext, useEffect } from "react";
import AccountItem from "./AccountItem";
import AccountContext from "../../context/account/accountContext";

const Accounts = () => {
  const accountContext = useContext(AccountContext);

  const { accounts, filtered, getAccounts, loading } = accountContext;

  useEffect(() => {
    getAccounts()
    //eslint-disable-next-line
  }, [])

  if(accounts && !loading && accounts.length === 0){
    return <h3>No accounts yet</h3>
  }

  if(filtered !== null && filtered.length === 0){
    return <h3>No such account</h3>
  }
  
  return (
    accounts && !loading ? ( <div style={accountStyle}>
      {filtered !== null
        ? filtered.map(account => (
            <AccountItem key={account._id} account={account} />
          ))
        : accounts.map(account => (
            <AccountItem key={account._id} account={account} />
          ))}
    </div>) : <div>Loading...</div>
   
  );
};

const accountStyle = {
  marginTop: "0.7rem"
};

export default Accounts;
