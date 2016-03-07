const Button = ({
  children, onClick, primary = false, disabled = false,
  iconName = 'check', className = null
}) => {
  const interception = (e) => {
    e.preventDefault();
    if (!disabled && onClick) {
      onClick(e);
    }
  };
  return (
    <button
      className={classNames(className, {primary: primary})}
      disabled={disabled}
      onClick={interception}
    >
      <i className={`fa fa-${iconName}`}></i>
      <span>{children}</span>
    </button>
  );
};

MainApp.Views.Button = Button;
