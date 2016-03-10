const { Views, Utils, Col } = MainApp;
const { AnimatedLink, Spinner, Table, Button } = Views;

class Admin extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.errorSuccess = this.errorSuccess.bind(this);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('users.me');
    }
    Meteor.subscribe('adminJobs');
    return { user: Meteor.user(), adminJobs: Col.adminJobs.find().fetch() };
  }
  errorSuccess(err, result) {
    this.setState({disabled: false});
    if (err) {
      console.warn('Update error', err);
      return sAlert.error(`Erreur lors de la mise à jour : ${err.reason}`);
    }
    sAlert.success('Mise à jour réussie');
  }
  onUpdateMarkdown(slug) {
    return () => {
      this.setState({disabled: true});
      Meteor.call('basicPages.update', slug, this.errorSuccess);
    };
  }
  onUpdateMethod(methodName) {
    return () => {
      this.setState({disabled: true});
      Meteor.call(methodName, this.errorSuccess);
    };
  }
  render() {
    const items = Utils.BASIC_PAGES.map(p => (
      [
        p.title,
        <Button
          iconName='refresh' className='btn'
          onClick={this.onUpdateMarkdown(p.slug)}
          disabled={this.state.disabled}
        >
          Mettre à jour
        </Button>
      ]
    )).concat([
      { title: 'Programmes', method: 'programs.update' },
      { title: 'Typologie participants', method: 'userTypes.update' },
      { title: 'Adhérents SNVEL', method: 'subscribers.update' }
    ].map(m => [
      m.title,
      <Button
        iconName='refresh' className='btn'
        onClick={this.onUpdateMethod(m.method)}
        disabled={this.state.disabled}
      >
        Mettre à jour
      </Button>
    ]));
    return (
      <section className='maximized MainContent animated fadeIn'>
        {
          this.data.user ? (
            <div className='animated fadeIn lisibility'>
              <h1>Administration</h1>
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
