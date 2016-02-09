const MainMenu = ({isMenuOpen, onMenuToggle}) => {
  return (
    <nav className={classNames('MainMenu', {isOpen: isMenuOpen}, 'lisibility')} >
      <button className='clickable'>
        <i className='fa fa-times fa-2x' onClick={onMenuToggle}></i>
      </button>
      <p>Menu items</p>
    </nav>
  );
};

MainApp.Views.MainMenu = MainMenu;
