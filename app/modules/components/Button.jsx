const Button = ({
  children, onClick, iconName = 'check', isPrimary = false, isDisabled = false
}) => {
  const interception = (e) => {
    e.preventDefault();
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };
  return (
    <button
      className={classNames({primary: isPrimary})}
      disabled={isDisabled}
      onClick={interception}
    >
      <i className={`fa fa-${iconName}`}></i>
      <span>{children}</span>
    </button>
  );
};

MainApp.Views.Button = Button;
