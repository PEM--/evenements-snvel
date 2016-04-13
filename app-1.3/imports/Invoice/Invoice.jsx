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
  getLabels(codes) {
    const program = this.data.program;
    return codes.map(c => {
      const right = program.priceRights.find(r => c === r.code);
      return right.description;
    });
  }
  render() {
    const { user, program } = this.data;
    const { title, location, period } = program;
    const invoice = Utils.calcInvoice(user, program);
    return (
      <section className='maximized MainContent Invoice animated fadeIn'>
        <h1 className='lisibility'>Votre inscription</h1>
        <h2 className='lisibility'>{title}</h2>
        <h3 className='lisibility'>{location} - {period}</h3>
        <div className='receipt'><pre>{invoice}</pre></div>
        <AnimatedLink />
      </section>
    );
  }
}

Views.Invoice = Invoice;
