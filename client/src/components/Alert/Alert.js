import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext;
  return (
    alerts && <div style={alertStyle}>
      {alerts.length > 0 && alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fa fa-info-circle" style={{marginRight: "0.5rem"}}></i>{alert.msg}
      </div>
    ))}
    </div>
  );
};
const alertStyle = {
  position: "fixed",
  right: 0,
  bottom: 0,
  maxWidth: "400px",
  width: "100%"
}
export default Alert;
