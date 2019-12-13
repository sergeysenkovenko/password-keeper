import React, { useReducer } from "react";
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
  ACCOUNT_ERROR,
  SET_LOADING
} from "../types";

const AccountState = props => {
  const initialState = {
    accounts: null,
    current: null,
    filtered: null,
    error: null,
    loading: null
  };

  const [state, dispatch] = useReducer(accountReducer, initialState);

  const getAccounts = async accounts => {
    setLoading();
    try {
      const response = await fetch("/api/accounts", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(accounts)
      });
      const res = await response.json();

      dispatch({ type: GET_ACCOUNTS, payload: res });
    } catch (error) {}
  };

  const addAccount = async account => {
    try {
      const response = await fetch("/api/accounts/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(account)
      });

      const res = await response.json();

      dispatch({ type: ADD_ACCOUNT, payload: res });
    } catch (error) {
      dispatch({ type: ACCOUNT_ERROR, payload: error });
    }
  };

  const deleteAccount = async id => {
    try {
      await fetch(`/api/accounts/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      dispatch({ type: DELETE_ACCOUNT, payload: id });
    } catch (error) {
      dispatch({ type: ACCOUNT_ERROR, payload: error });
    }
  };

  const updateAccount = async account => {
    try {
      const response = await fetch(`/api/accounts/${account._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(account)
      });

      const res = await response.json();
      dispatch({ type: UPDATE_ACCOUNT, payload: res });
  } catch (error) {
    dispatch({ type: ACCOUNT_ERROR, payload: error });
  }
  };

  const clearAccounts = () => {
    dispatch({ type: CLEAR_ACCOUNTS })
  }

  const setCurrent = account => {
    dispatch({ type: SET_CURRENT, payload: account });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterAccounts = value => {
    dispatch({ type: FILTER_ACCOUNTS, payload: value });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AccountContext.Provider
      value={{
        accounts: state.accounts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addAccount,
        deleteAccount,
        setCurrent,
        clearCurrent,
        updateAccount,
        filterAccounts,
        clearFilter,
        getAccounts,
        clearAccounts
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
