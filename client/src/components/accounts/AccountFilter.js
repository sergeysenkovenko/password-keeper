import React, { useRef, useContext, useEffect } from "react";
import AccountContext from "../../context/account/accountContext";

const AccountFilter = () => {
  const accountContext = useContext(AccountContext);

  const { filterAccounts, clearFilter, filtered } = accountContext;

  useEffect(() => {
    if(!filtered){
      search.current.value = ''
    }
  })

  const search = useRef("");

  const onChange = e => {
    if(search.current.value){
      filterAccounts(e.target.value)
    }else {
      clearFilter()
    }
  }
  
  return (
    <form>
      <input
        type="text"
        name="filter"
        placeholder="Enter to search..."
        ref={search}
        onChange={onChange}
        style={{marginTop: "1rem"}}
      />
    </form>
  );
};

export default AccountFilter;
