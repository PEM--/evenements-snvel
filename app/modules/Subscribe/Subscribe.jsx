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
    return { program: Col.Programs.findOne() };
  }
  render() {
    console.log(this.data.program);
    return (
      <section className='maximized MainContent animated fadeIn'>
        <div className='lisibility'>
          <h1>Inscription</h1>
          <Cart amount={12} />
          <Table
            header={['Choix des prestations', 'Prix TTC', 'Je m\'inscrits']}
            items={[
              ['Content 1 - 1', 'Content 1 - 2', 'Content 1 - 3']
            ]}
          />
        </div>
      </section>
    );
  }
}

MainApp.Views.Subscribe = Subscribe;
