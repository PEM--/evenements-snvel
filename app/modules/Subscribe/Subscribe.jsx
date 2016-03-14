const { Views, Col } = MainApp;
const { AnimatedLink, CheckBox, Cart, Table, Events, BaseReactMeteor } = Views;

class Subscribe extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.state = {
      chosen: [],
      items: 0,
      amount: 0
    };
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne(
        {reference: 'univ2016'},
        {fields: {events: 1, priceRights: 1, discounts: 1, tva: 1}}
      ),
      user: Meteor.user()
    };
  }
  onSubscribe(e) {
    console.log('onSubscribe', e.target.id);
    const chosen = this.state.chosen.concat([e.target.id]);
    const amount = chosen.reduce((acc, c) => {
      const price = this.priceAmountForCode(c);
      acc += price * (1 + this.data.program.tva);
      return acc;
    }, 0);
    this.setState({chosen, items: chosen.length, amount});
  }
  priceAmountForCode(code) {
    const { user, program } = this.data;
    const userType = user.profile.category;
    const price = user ? program.priceRights.find(p => p.code === code) : null;
    const priceAmount = user ? price.byType.find(t => t.category === userType).amount : 0;
    // const discount = program.discounts.find(d => d.code === c.code);
    // const discountAmount = discount.byType.find(t => t.category === userType).amount;
    return priceAmount;
  }
  getPrices() {
    let line = 0;
    const { user, program } = this.data;
    const userType = user.profile.category;
    return program.priceRights.reduce((acc, p) => {
      const priceAmount = p.byType.find(t => t.category === userType).amount;
      const eventTags = p.inEvents && priceAmount !== -1 ?
        Events({events: program.events, code: p.code}) : '';
      if (priceAmount !== -1) {
        const selected = this.state.chosen.indexOf(p.code) !== -1;
        acc.push([
          <article className='title' key={line++}>
            <h1 className='priceDescription'>{p.description}</h1>
            {eventTags}
          </article>,
          <div className='prices'>
            <div className='price'>{numeralAmountFormat(priceAmount)} HT</div>
            <div className='price'>{numeralAmountFormat(priceAmount * (1 + program.tva))} TTC</div>
          </div>,
          <CheckBox
            id={p.code} isChecked={selected} onChange={this.onSubscribe}
          >Je m'inscrits</CheckBox>
        ]);
      }
      return acc;
    }, []);
  }
  render() {
    const { user, program } = this.data;
    return (
      <section className='maximized MainContent Subscribe animated fadeIn'>
        <Cart amount={this.state.amount} items={this.state.items} />
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
