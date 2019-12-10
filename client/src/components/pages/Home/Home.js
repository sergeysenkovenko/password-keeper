import React from "react";
import { Accounts } from "../../accounts";
import { AccountForm } from "../../accounts";
import { AccountFilter } from "../../accounts";
const Home = () => {
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
