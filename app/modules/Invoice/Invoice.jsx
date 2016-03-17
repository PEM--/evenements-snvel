const { Views, Col, Utils } = MainApp;
const { BaseReactMeteor, AnimatedLink } = Views;

class Invoice extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) { Meteor.subscribe('programs.all'); }
    return {
      program: Col.Programs.findOne(
        {reference: this.props.program},
        {fields: {
          title: 1, location: 1, period: 1,
          reference: 1, priceRights: 1, discounts: 1, specialRules: 1, tva: 1
        }}
      ),
      user: Meteor.user()
    };
  }
  render() {
    const { user, program } = this.data;
    const { title, location, period } = program;
    const userType = user.profile.category;
    const found = user.profile.programs.find(p => p.reference === program.reference);
    const labels = found.prices.map(p => {
      const right = program.priceRights.find(r => p === r.code);
      return right.description;
    });
    const invoice = Utils.renderInvoice(
      labels,
      [
        'Journée étude avec repas 24/03'
      ],
      140,
      120
      // Col.Programs.finalPrice(prg, userType, codes, now, false),
      // Col.Programs.finalPrice(prg, userType, codes, now, true)
    );
    return (
      <section className='maximized MainContent Invoice animated fadeIn'>
        <h1 className='lisibility'>Votre inscription</h1>
        <h2 className='lisibility'>{title}</h2>
        <h3 className='lisibility'>{location} - {period}</h3>
        <div className='receipt'><pre>{invoice}</pre></div>
        <AnimatedLink to='/'>Revenez à l'accueil</AnimatedLink>
      </section>
    );
  }
}

Views.Invoice = Invoice;
