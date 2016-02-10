const AnimatedLink = ({children, to, isCream = false}) => {
  return (
    <a href={to}
      className={classNames('AnimatedLink', 'lisibility',
        {basic: !isCream},
        {cream: isCream},
      )}
    >
      {children}
    </a>
  );
};

MainApp.Views.AnimatedLink = AnimatedLink;
