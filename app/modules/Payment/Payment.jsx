const { Views, Col } = MainApp;
const { AnimatedLink, Radio, Input, Button, BaseReactMeteor } = Views;

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
            <div className='check animated fadeIn'>
              <h2>Paiement par chèque sélectionné</h2>
              <form>
                <h3>Montant : <span className='price'>{
                  numeralAmountFormat(amount)
                } TTC</span></h3>
                <p>
                  Veuillez adresser votre chèque à l'ordre du <b>SNVEL</b>&nbsp;
                  et envoyez le par courrier postal à l'adresse suivante :
                </p>
                <p className='textCenter'>
                  <b>SNVEL</b> - 10, Place Léon Blum - 75011 Paris
                </p>
                <p><span className='fa fa-exclamation-circle'></span> Sur réception et encaissement de ce dernier, un email de facture vous sera transmis validant votre inscription.</p>
                <div className='textCenter'>
                  <Button primary={true} onClick={this.onValidateCheck}>
                    Je valide ce paiment
                  </Button>
                </div>
              </form>
            </div> : ''
        }
        {
          user && program && this.state.paymentType === 'card' ?
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
