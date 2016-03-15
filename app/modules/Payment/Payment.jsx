const { Views, Col } = MainApp;
const { AnimatedLink, Select, Input, Button, BaseReactMeteor } = Views;

class Payment extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne(
        {reference: this.props.program},
        {fields: {events: 1, priceRights: 1, discounts: 1, specialRules: 1, tva: 1}}
      ),
      user: Meteor.user()
    };
  }
  render() {
    return (
      <section className='maximized MainContent Payment animated fadeIn'>
        <h1>Paiement</h1>
        <AnimatedLink to='subscribe'>Retour aux inscription</AnimatedLink>
      </section>
    );
  }
}

MainApp.Views.Payment = Payment;
