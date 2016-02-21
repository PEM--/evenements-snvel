const Button = ({
  children, onClick, isPrimary = false, isDisabled = false,
  iconName = 'check', className = null
}) => {
  let mergedClassNames = {primary: isPrimary};
  if (className) {
    const classes = className.split();
    classes.forEach(c => mergedClassNames[c] = true);
  }
  const interception = (e) => {
    e.preventDefault();
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };
  return (
    <button
      className={classNames(mergedClassNames)}
      disabled={isDisabled}
      onClick={interception}
    >
      <i className={`fa fa-${iconName}`}></i>
      <span>{children}</span>
    </button>
  );
};

MainApp.Views.Button = Button;
