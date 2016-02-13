const MenuItem = ({icon, text, name}) => {
  const route = FlowRouter.path(name);
  const isCurrent = FlowRouter.current().route.name === name;
  return (
    <a href={route} className={classNames('MenuItem', {active: isCurrent})}>
      <i className={`fa fa-${icon}`}></i>
      <span>{text}</span>
    </a>
  );
};

const MainMenu = ({isMenuOpen, onMenuToggle, isSignedOn = false}) => {
  return (
    <nav className={classNames('MainMenu', {isOpen: isMenuOpen}, 'lisibility')} >
      <button onClick={onMenuToggle}>
        <i className='fa fa-times' />
      </button>
      {
        [ {icon: 'home', text: 'Accueil', name: 'home', needSignOn: false },
          {icon: 'user', text: 'Connexion', name: 'signon', needSignOn: false },
          {icon: 'edit', text: 'Créer votre compte', name: 'signup', needSignOn: false },
          // {icon: 'calendar', text: 'Evénements', name: 'events', needSignOn: false },
          // {icon: 'cog', text: 'Réglages', name: 'admin', needSignOn: true }
        ].filter(m => m.needSignOn === isSignedOn)
          .map(m => <MenuItem key={m.name} icon={m.icon} text={m.text} name={m.name} />)
      }
    </nav>
  );
};

MainApp.Views.MainMenu = MainMenu;
