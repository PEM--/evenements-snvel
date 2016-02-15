const signOff = (e) => {
  e.preventDefault();
  Meteor.logout();
  FlowRouter.go('/');
};

const MenuItem = ({icon, text, name}) => {
  if (name !== 'signoff') {
    const route = FlowRouter.path(name);
    const isCurrent = FlowRouter.current().route.name === name;
    return (
      <a href={route} className={classNames('MenuItem', {active: isCurrent})}>
        <i className={`fa fa-${icon}`}></i>
        <span>{text}</span>
      </a>
    );
  }
  return (
    <a href='/' className='MenuItem' onClick={signOff}>
      <i className={`fa fa-${icon}`}></i>
      <span>{text}</span>
    </a>
  );
};

const MainMenu = ({isMenuOpen, onMenuToggle, user}) => {
  const items = [ {needSignOn: 0, icon: 'home', text: 'Accueil', name: 'home'},
    {needSignOn: 1, admin: 0, icon: 'user', text: 'Connexion', name: 'signon'},
    {needSignOn: 1, admin: 0, icon: 'edit', text: 'Créer votre compte', name: 'signup'},
    {needSignOn: 0, admin: 0, icon: 'calendar', text: 'Programme', name: 'presentation'},
    {needSignOn: 2, admin: 0, icon: 'calendar-plus-o', text: 'Inscription', name: 'subscribe'},
    {needSignOn: 2, admin: 1, icon: 'cog', text: 'Administration', name: 'admin'},
    {needSignOn: 2, admin: 0, icon: 'unlock-alt', text: 'Déconnexion', name: 'signoff'}
  ].filter(m => {
    switch (m.needSignOn) {
    case 0: { return true; }
    case 1: { return user ? false : true; }
    default: { return user ? true : false; }
    }
  }).filter(m => {
    if (m.admin) {
      console.log('user', user, user.isAdmin());
      return user && user.isAdmin();
    }
    return true;
  });
  return (
    <nav className={classNames('MainMenu', {isOpen: isMenuOpen}, 'lisibility')} >
      <button onClick={onMenuToggle}>
        <i className='fa fa-times' />
      </button>
      {
        items.map(m => <MenuItem key={m.name} icon={m.icon} text={m.text} name={m.name} />)
      }
    </nav>
  );
};

MainApp.Views.MainMenu = MainMenu;
