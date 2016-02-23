const { Views, Utils } = MainApp;
const { AnimatedLink, Spinner, Table, Button } = Views;

class Admin extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('users.me');
    }
    return { user: Meteor.user() };
  }
  onUpdateMarkdown(slug) {
    return () => Meteor.call('basicPages.update', slug);
  }
  onUpdateMethod(methodName) {
    return () => Meteor.call(methodName);
  }
  render() {
    const items = Utils.BASIC_PAGES.map(p => (
      [
        p.title,
        <Button iconName='refresh' className='btn' onClick={this.onUpdateMarkdown(p.slug)}>Mettre à jour</Button>
      ]
    )).concat([
      { title: 'Programmes', method: 'programs.update' },
      { title: 'Typologie participants', method: 'userTypes.update' }
    ].map(m => [
      m.title, <Button iconName='refresh' className='btn' onClick={this.onUpdateMethod(m.method)}>Mettre à jour</Button>
    ]));
    return (
      <section className='maximized MainContent animated fadeIn'>
        {
          this.data.user ? (
            <div className='animated fadeIn lisibility'>
              <h1>Admin</h1>
              <Table
                header={['Description', 'Action']}
                items={items}
              />
              <AnimatedLink to='/'>Revenir à l'accueil</AnimatedLink>
            </div>
          ) : (
            <Spinner />
          )
        }
      </section>
    );
  }
}

Views.Admin = Admin;
