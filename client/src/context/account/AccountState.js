import React, { useReducer } from "react";
import uuid from "uuid";
import AccountContext from "./accountContext";
import accountReducer from "./accountReducer";
import {
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ACCOUNT,
  FILTER_ACCOUNTS,
  CLEAR_ACCOUNTS,
  CLEAR_FILTER,
  ACCOUNT_ERROR
} from "../types";

const AccountState = props => {
  const initialState = {
    accounts: [
      {
        id: 1,
        title: "gmail",
        login: "dayz654@mail.ru",
        password: "hr34rhjkfw"
      },
      {
        id: 2,
        title: "Hotline",
        login: "dlol@mail.ru",
        password: "ewerhjkfw"
      },
      {
        id: 3,
        title: "Rozetka",
        login: "rozet@mail.ru",
        password: "543tgdsgd"
      },
    ],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(accountReducer, initialState);

  const addAccount = account => {
    account.id = uuid.v4()
    dispatch({ type: ADD_ACCOUNT, payload: account })
  }

  const deleteAccount = id => {
    dispatch({ type: DELETE_ACCOUNT, payload: id })
  }

  const setCurrent = account => {
    dispatch({ type: SET_CURRENT, payload: account })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const updateAccount = account => {
    dispatch({ type: UPDATE_ACCOUNT, payload: account })
  }

  const filterAccounts = value => {
    dispatch({ type: FILTER_ACCOUNTS, payload: value })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <AccountContext.Provider
      value={{
        accounts: state.accounts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addAccount,
        deleteAccount,
        setCurrent,
        clearCurrent,
        updateAccount,
        filterAccounts,
        clearFilter
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
