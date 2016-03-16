const { Views, Col } = MainApp;
const {
  AnimatedLink, Radio, Input, Button,
  PaymentByCard, PaymentByCheck, BaseReactMeteor
} = Views;

class Payment extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = { paymentType: 'card' };
    [
      'onPaymentChange', 'onValidateCheck'
    ].forEach(f => this[f] = this[f].bind(this));
  }
  onPaymentChange(e) {
    this.setState({paymentType: e});
  }
  onValidateCheck() {
    console.log('this.props.program', this.props.program);
    Meteor.call('user.waitingPayment', this.props.program, (error) => {
      if (error) {
        console.warn('Check payment validation failed', error);
        sAlert.error(
          'La validation du paiement par chèque est impossible pour le moment. Veuillez ré-essayer plus tard'
        );
      }
      FlowRouter.go('paymentwaiting');
    });
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne(
        {reference: this.props.program},
        {fields: {
          reference: 1, priceRights: 1, discounts: 1, specialRules: 1, tva: 1
        }}
      ),
      user: Meteor.user()
    };
  }
  render() {
    const {user, program} = this.data;
    const amount = Meteor.users.sumPrice(user, program);
    return (
      <section className='maximized MainContent Payment animated fadeIn'>
        <h1>Paiement</h1>
        <Radio
          value={this.state.paymentType}
          onChange={this.onPaymentChange}
          label='Sélectionnez votre moyen de paiement' options={[
            { value: 'check', label: 'Paiement par chèque' },
            { value: 'card', label: 'Paiment par carte' }
          ]}
        />
        {
          user && program && this.state.paymentType === 'check' ?
            <PaymentByCheck
              amount={amount} onValidate={this.onValidateCheck}
            /> : ''
        }
        { /*
          user && program && this.state.paymentType === 'card' ?
            <div className='card animated fadeIn'>
              <h2>Paiement par carte sélectionné</h2>
              <PaymentByCard />
            </div> : ''
        */ }
        <AnimatedLink to='subscribe'>Retour aux inscription</AnimatedLink>
      </section>
    );
  }
}

Views.Payment = Payment;
