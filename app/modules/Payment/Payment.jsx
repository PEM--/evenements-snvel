const { Views, Col } = MainApp;
const { AnimatedLink, Select, Input, Button, BaseReactMeteor } = Views;

class Payment extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 'card'
    };
    this.onPaymentChange = this.onPaymentChange.bind(this);
  }
  onPaymentChange(e) {
    this.setState({paymentType: e});
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
        <Select
          value={this.state.paymentType}
          onChange={this.onPaymentChange}
          placeholder='Sélectionnez un type de paiment'
          options={[
            { value: 'check', label: 'Paiement par chèque' },
            { value: 'card', label: 'Paiment par carte' }
          ]}
        />
        {
          this.state.paymentType === 'check' ?
            <div className='check animated fadeIn'>
              <h2>Paiement par chèque sélectionné</h2>
            </div> : ''
        }
        {
          this.state.paymentType === 'card' ?
            <div className='card animated fadeIn'>
              <h2>Paiement par carte sélectionné</h2>
            </div> : ''
        }
        <AnimatedLink to='subscribe'>Retour aux inscription</AnimatedLink>
      </section>
    );
  }
}

MainApp.Views.Payment = Payment;
