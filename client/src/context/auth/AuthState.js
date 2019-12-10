import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  SET_ALERT,
  REMOVE_ALERT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await fetch("/api/auth/", {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });
        const res = await response.json();
        dispatch({
          type: USER_LOADED,
          payload: res
        });
      }
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const loginUser = async formData => {
    setLoading();
    const response = await fetch("/api/auth/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const res = await response.json();
    if (response.status !== 200) {
      dispatch({
        type: LOGIN_FAIL,
        payload: res
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res
      });
      loadUser();
    }
  };

  const logoutUser = () => dispatch({ type: LOGOUT });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const userRegister = async formData => {
    setLoading();
    const response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const res = await response.json();
    if (response.status !== 200) {
      dispatch({
        type: REGISTER_FAIL,
        payload: res
      });
    } else {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res
      });
      loadUser();
    }
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        userRegister,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
