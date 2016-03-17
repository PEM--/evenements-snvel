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
    const { title, location, period } = this.data.program;
    const invoice = Utils.renderInvoice(
      [
        {
          designation: 'Journée étude avec repas 24/03',
          value: 60
        }
      ],
      [],
      120,
      140
    );
    return (
      <section className='maximized MainContent Invoice animated fadeIn'>
        <h1 className='lisibility'>Résumé de vos droits</h1>
        <h2 className='lisibility'>{title}</h2>
        <h3 className='lisibility'>{location} - {period}</h3>
        <div className='receipt'><pre>{invoice}</pre></div>
        <AnimatedLink to='/'>Revenez à l'accueil</AnimatedLink>
      </section>
    );
  }
}

Views.Invoice = Invoice;
