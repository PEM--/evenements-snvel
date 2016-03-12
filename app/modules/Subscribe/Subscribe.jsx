const { Views, Col } = MainApp;
const { AnimatedLink, Cart, Table, BaseReactMeteor } = Views;

class Subscribe extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return { program: Col.Programs.findOne(), user: Meteor.user() };
  }
  render() {
    const { user, program } = this.data;
    console.log('program', program);
    console.log('user', user);
    return (
      <section className='maximized MainContent Subscribe animated fadeIn'>
        <Cart amount={1250.23} items={3} />
        <div className='lisibility'>
          <h1>Inscription</h1>
          <Table
            header={['Choix des prestations', 'Prix TTC', 'Je m\'inscrits']}
            items={[
              ['Content 1 - 1', 'Content 1 - 2', 'Content 1 - 3'],
              ['Content 1 - 1', 'Content 1 - 2', 'Content 1 - 3'],
              ['Content 1 - 1', 'Content 1 - 2', 'Content 1 - 3']
            ]}
          />
        </div>
      </section>
    );
  }
}

MainApp.Views.Subscribe = Subscribe;
