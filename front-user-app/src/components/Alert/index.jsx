import "./Alert.css";

const ICONS = {
  success: "bi-check-circle-fill",
  danger: "bi-x-circle-fill",
  warning: "bi-exclamation-triangle-fill",
  info: "bi-info-circle-fill",
};

const AlertItem = ({ alert, onDismiss }) => {
  const { id, message, type } = alert;

  return (
    <div className={`alert-toast alert-${type}`} role= 'alertdialog'>
      <div className="alert-body">
        <i className={`bi ${ICONS[type] ?? ICONS.info} alert-icon`}></i>
        <span className="alert-message">{message}</span>
        <button className="alert-close" onClick={() => onDismiss(id)}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="alert-progress-bar"></div>
    </div>
  );
};

const AlertContainer = ({ alerts, onDismiss }) => {
  if (!alerts.length) return null;

  return (
    <div className="alert-stack" role="alert">
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default AlertContainer;
