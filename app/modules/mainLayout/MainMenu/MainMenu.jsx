const MenuItem = ({icon, text, link}) => (
  <a href={link} className='MenuItem'>
    <i className={`fa fa-${icon}`}></i>
    <span>{text}</span>
  </a>
);

const MainMenu = ({isMenuOpen, onMenuToggle, isSignedOn = false}) => {
  return (
    <nav className={classNames('MainMenu', {isOpen: isMenuOpen}, 'lisibility')} >
      <button onClick={onMenuToggle}>
        <i className='fa fa-times' />
      </button>
      {
        [ {icon: 'home', text: 'Accueil', link: '/', needSignOn: false },
          {icon: 'user', text: 'Connexion', link: '/signon', needSignOn: false },
          {icon: 'edit', text: 'Créer votre compte', link: '/signup', needSignOn: false },
          {icon: 'calendar', text: 'Evénements', link: '/events', needSignOn: false },
          {icon: 'cog', text: 'Réglages', link: '/admin', needSignOn: true }
        ].filter(m => m.needSignOn === isSignedOn)
          .map(m => <MenuItem key={m.link} icon={m.icon} text={m.text} link={m.link} />)
      }
    </nav>
  );
};

MainApp.Views.MainMenu = MainMenu;
