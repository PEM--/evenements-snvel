const MenuItem = ({icon, text, link}) => (
  <a href={link} className='MenuItem'>
    <i className={`fa fa-${icon}`}></i>
    <span>{text}</span>
  </a>
);

const MainMenu = ({isMenuOpen, onMenuToggle}) => {
  return (
    <nav className={classNames('MainMenu', {isOpen: isMenuOpen}, 'lisibility')} >
      <button onClick={onMenuToggle}>
        <i className='fa fa-times' />
      </button>
      {
        [
          {icon: 'user', text: 'Connexion', link: '/signon' },
          {icon: 'calendar', text: 'Evénements', link: '/events' },
          {icon: 'cog', text: 'Réglages', link: '/admin' }
        ].map(m => <MenuItem key={m.link} icon={m.icon} text={m.text} link={m.link} />)
      }
    </nav>
  );
};

MainApp.Views.MainMenu = MainMenu;
