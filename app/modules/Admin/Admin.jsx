const { Views, Utils, Col } = MainApp;
const { AnimatedLink, Spinner, Table, Button } = Views;

class Admin extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
    ['errorSuccess', 'onRowClick'].forEach(f => this[f] = this[f].bind(this));
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('users.me');
    }
    Meteor.subscribe('adminJobs');
    return {
      user: Meteor.user(), nbJobs: Col.adminJobs.find().count()
    };
  }
  errorSuccess(err, result) {
    if (err) {
      console.warn('Update error', err);
      Meteor.call('cleanJobs');
      return sAlert.error(`Erreur lors de la mise à jour : ${err.reason}`);
    }
  }
  onUpdateMarkdown(slug) {
    return () => {
      Meteor.call('basicPages.update', slug, this.errorSuccess);
    };
  }
  onUpdateMethod(methodName) {
    return () => {
      this.setState({disabled: true});
      Meteor.call(methodName, this.errorSuccess);
    };
  }
  componentDidMount() {
    this.computation = null;
    Meteor.setTimeout(() => {
      Tracker.autorun((comp) => {
        if (comp.firstRun) {
          this.computation = comp;
        }
        const job = Col.adminJobs.findOne();
        if (job) {
          if (job.status === 'completed') {
            sAlert.success('Mise à jour réussie');
            Meteor.call('cleanJobs');
          }
          if (job.status === 'failed') {
            sAlert.error(job.failures[0].err);
            Meteor.call('cleanJobs');
          }
        }
      });
    }, 0);
  }
  componentWillUnmount() {
    if (this.computation) {
      this.computation.stop();
    }
  }
  onRowClick(e) {
    console.log('Row clicked', e, this);
  }
  render() {
    const items = Utils.BASIC_PAGES.map(p => (
      [
        p.title,
        <Button
          iconName='refresh' className='btn'
          onClick={this.onUpdateMarkdown(p.slug)}
          disabled={this.data.nbJobs}
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
        disabled={this.data.nbJobs}
      >
        Mettre à jour
      </Button>
    ]));
    return (
      <section className='maximized MainContent Admin animated fadeIn'>
        {
          this.data.user ? (
            <div className='animated fadeIn lisibility'>
              <h1>Administration</h1>
              <h2>Gestion des utilisateurs</h2>
              <form>
                <Button
                  primary={true} disabled={true}
                  iconName='cloud-upload'
                >
                  Exporter
                </Button>
                <Button
                  disabled={true}
                  iconName='cloud-download'
                >
                  Importer
                </Button>
              </form>
              <MeteorGriddle
                publication='users.all'
                collection={Meteor.users}
                columns={['username', 'profile.name', 'profile.firstName']}
                matchingResultsCount='users.counter'
                onRowClick={this.onRowClick}
              />
              <h2>Mise à jour du serveur</h2>
              <Table
                header={['Description', 'Action']}
                items={items}
              />
            <AnimatedLink />
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
