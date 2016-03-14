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
        {fields: {events: 1, priceRights: 1, discounts: 1, specialRules: 1, tva: 1}}
      ),
      user: Meteor.user()
    };
  }
  onSubscribe(e) {
    const code = e.target.id;
    const idx = this.state.chosen.indexOf(code);
    const chosen = idx === -1 ?
      [... this.state.chosen, e.target.id] :
      [... this.state.chosen.slice(0, idx), ... this.state.chosen.slice(idx + 1)];
    const { user, program } = this.data;
    const userType = user.profile.category;
    const amount = chosen.reduce((acc, c) => {
      acc += Col.Programs.discountedVatPriceForCode(program, userType, c);
      return acc;
    }, 0);
    this.setState({chosen, items: chosen.length, amount});
  }
  getPrices(userType) {
    let line = 0;
    const { user, program } = this.data;
    return program.priceRights.reduce((acc, p) => {
      const priceAmount = Col.Programs.priceForCode(program, userType, p.code);
      const eventTags = p.inEvents && priceAmount !== -1 ?
        Events({events: program.events, code: p.code}) : '';
      if (priceAmount !== -1) {
        const selected = this.state.chosen.indexOf(p.code) !== -1;
        acc.push([
          <article className='title' key={line++}>
            <h1 className='priceDescription'>{p.description}</h1>
          {/* eventTags */}
          </article>,
          <div className='prices'>
            <div className='price'>{numeralAmountFormat(priceAmount)} HT</div>
            <div className='price'>
              {numeralAmountFormat(Col.Programs.vatPriceForCode(program, userType, p.code))} TTC
            </div>
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
    const userType = user.profile.category;
    console.log('userType', userType);
    const propose = Col.Programs.proposeAttendant(program, this.state.chosen);
    console.log('propose', propose);
    return (
      <section className='maximized MainContent Subscribe animated fadeIn'>
        <Cart amount={this.state.amount} items={this.state.items} />
        <div className='lisibility'>
          <h1>Inscription</h1>
          <Table
            header={['Choix des prestations', 'Prix', 'Je m\'inscrits']}
            items={this.getPrices(userType)}
          />
        </div>
        <div className='lisibility animated fadeInUp'>
          { propose ?
            <Table
              header={['Choix des prestations', 'Prix', 'Je m\'inscrits']}
              items={this.getPrices('Accompagnant')}
            /> : ''
          }
        </div>
      </section>
    );
  }
}

MainApp.Views.Subscribe = Subscribe;
