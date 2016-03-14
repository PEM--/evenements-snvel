const { Views, Col } = MainApp;
const { AnimatedLink, CheckBox, Cart, Table, Events, BaseReactMeteor } = Views;

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
  getPrices() {
    let line = 0;
    const { user, program } = this.data;
    const userType = user.profile.category;
    // const price = user ? program.priceRights.find(p => p.code === c.code) : null;
    // const priceAmount = user ? price.byType.find(t => t.category === userType).amount : 0;
    // const discount = program.discounts.find(d => d.code === c.code);
    // const discountAmount = discount.byType.find(t => t.category === userType).amount;
    return program.priceRights.reduce((acc, p) => {
      const priceAmount = p.byType.find(t => t.category === userType).amount;
      const eventTags = p.inEvents && priceAmount !== -1 ?
        Events({events: program.events, code: p.code}) : '';
      if (priceAmount !== -1) {
        acc.push([
          <article className='title' key={line++}>
            <h1 className='priceDescription'>{p.description}</h1>
            {eventTags}
          </article>,
          <div className='prices'>
            <div className='price'>{numeralAmountFormat(priceAmount)} HT</div>
            <div className='price'>{numeralAmountFormat(priceAmount * (1 + program.tva))} TTC</div>
          </div>,
          <CheckBox>Je m'inscrits</CheckBox>
        ]);
      }
      return acc;
    }, []);
  }
  render() {
    const { user, program } = this.data;
    // console.log('program', program);
    // console.log('user', user);
    return (
      <section className='maximized MainContent Subscribe animated fadeIn'>
        <Cart amount={0} items={0} />
        <div className='lisibility'>
          <h1>Inscription</h1>
          <Table
            header={['Choix des prestations', 'Prix', 'Je m\'inscrits']}
            items={this.getPrices()}
          />
        </div>
      </section>
    );
  }
}

MainApp.Views.Subscribe = Subscribe;
