import React, { useContext } from "react";
import AccountContext from "../../context/account/accountContext";
import PropTypes from "prop-types";

const AccountItem = ({ account }) => {
  const accountContext = useContext(AccountContext);
  const { deleteAccount, setCurrent, clearCurrent } = accountContext;
  const { id, title, login, password } = account;

  const onDelete = () => {
    deleteAccount(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <div style={titleStyle}>
        <h3 className="text-primary">{title}</h3>
        <span className={"badge badge-success"}>5 days ago</span>
      </div>
      <ul className="list">
        {login && (
          <li>
            <i className="fa fa-user" style={icoStyle} /> {login}
          </li>
        )}
        {password && (
          <li>
            <i className="fa fa-lock" style={icoStyle} /> {password}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(account)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

const titleStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const icoStyle = {
  width: "16px"
};

AccountItem.propTypes = {
  account: PropTypes.object.isRequired
};

export default AccountItem;
