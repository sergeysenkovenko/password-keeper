import React, { useContext, useEffect } from "react";
import { Accounts } from "../../accounts";
import { AccountForm } from "../../accounts";
import { AccountFilter } from "../../accounts";
import AuthContext from "../../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if(localStorage.token){
      authContext.loadUser()
    }
    //eslint-disable-next-line
  }, [])

  return (
    <div className="grid-2">
      <AccountForm/>
      <div>
        <AccountFilter/>
        <Accounts />
      </div>
    </div>
  );
};

export default Home;
