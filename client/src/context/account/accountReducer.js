import {
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ACCOUNT,
  FILTER_ACCOUNTS,
  CLEAR_FILTER,
  ACCOUNT_ERROR,
  CLEAR_ACCOUNTS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload]
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account.id !== action.payload
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.filter(account => account.id !== action.payload)
            : null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map(account =>
          account.id === action.payload.id ? action.payload : account
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.map(account =>
                account.id === action.payload.id ? action.payload : account
              )
            : null
      };
    case FILTER_ACCOUNTS:
      return {
        ...state,
        filtered: state.accounts.filter(account => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return account.title.match(regex) || account.login.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
