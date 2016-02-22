const Button = ({
  children, onClick, isPrimary = false, isDisabled = false,
  iconName = 'check', className = null
}) => {
  const interception = (e) => {
    e.preventDefault();
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };
  return (
    <button
      className={classNames(className, {primary: isPrimary})}
      disabled={isDisabled}
      onClick={interception}
    >
      <i className={`fa fa-${iconName}`}></i>
      <span>{children}</span>
    </button>
  );
};

MainApp.Views.Button = Button;
