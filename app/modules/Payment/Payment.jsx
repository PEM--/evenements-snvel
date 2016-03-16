const { Views, Col } = MainApp;
const { AnimatedLink, Radio, Input, Button, BaseReactMeteor } = Views;

class Payment extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = { paymentType: 'check' };
    [
      'onPaymentChange', 'onValidateCheck'
    ].forEach(f => this[f] = this[f].bind(this));
  }
  onPaymentChange(e) {
    this.setState({paymentType: e});
  }
  onValidateCheck() {
    console.log('Validated');
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne(
        {reference: this.props.program},
        {fields: {priceRights: 1, discounts: 1, specialRules: 1, tva: 1}}
      ),
      user: Meteor.user()
    };
  }
  render() {
    const {user, program} = this.data;
    return (
      <section className='maximized MainContent Payment animated fadeIn'>
        <h1>Paiement</h1>
        <Radio
          value={this.state.paymentType}
          onChange={this.onPaymentChange}
          label='Sélectionnez votre moyen de paiment' options={[
            { value: 'check', label: 'Paiement par chèque' },
            { value: 'card', label: 'Paiment par carte' }
          ]}
        />
        {
          this.state.paymentType === 'check' ?
            <div className='check animated fadeIn'>
              <h2>Paiement par chèque sélectionné</h2>
              <form>
                <h3>Montant : <span>{numeralAmountFormat(user.sumPrice(program))} TTC</span></h3>
                <Button primary={true} onClick={this.onValidateCheck}>
                  Je valide ce paiment
                </Button>
              </form>
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
