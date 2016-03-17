const { Views } = MainApp;
const { Input, Button } = Views;

class PaymentByCard extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'CardSchema');
    this.state.formError = null;
    this.state.waitingPayment = false;
    this.onFormValidate = this.onFormValidate.bind(this);
  }
  resolveError(error) {
    console.warn('Error in payment process', error);
    sAlert.error(error.reason);
    Meteor.setTimeout(() => { this.setState({waitingPayment: false}); }, 1000);
  }
  onFormValidate() {
    this.setState({waitingPayment: true});
    console.log('State', this.state);
    Meteor.setTimeout(() => { this.setState({waitingPayment: false}); }, 1000);
    return;
    Meteor.call('clientToken', this.props.program, (tokenError, tokenResult) => {
      if (tokenError) { return this.resolveError(tokenError); }
      console.log('Braintree customer', braintreeCustomerAndToken.braintreeCustomerId);
      Meteor.setTimeout(() => { this.setState({waitingPayment: false}); }, 1000);
      const user = this.data.user;
      // Creating a payment nonce
      client = new braintree.api.Client({
        clientToken: braintreeCustomerAndToken.token
      });
      client.tokenizeCard({
        number: cardNumber,
        cardholderName: cardName,
        expirationDate: cardExpiry,
        cvv: cardCvc,
        billingAddress: {
          streetAddress: user.profile.address,
          postalCode: user.profile.postalCode,
          locality: user.profile.city
        }
      }, (errorNounce, nonce) => {
        if (errorNounce) { return this.resolveError(errorNounce); }
        console.log('Nonce received from Braintree');
        // Perform the payment using the nonce
        Meteor.call('cardPayment', nonce, {
          prices: this.prices,
          discounts: this.discounts,
          totalHT: this.state.totalHT,
          totalTTC: this.state.totalTTC
        }, (errorPayment, resultPayment) => {
          if (errorPayment) { return this.resolveError(errorPayment); }
          console.log('Payment succeed');
          sAlert.success('Paiement validé');
          // Meteor.setTimeout(() => FlowRouter.go('/subscription?step=report'), 300);
          // this.props.onFormValidate();
          Meteor.setTimeout(() => { this.setState({waitingPayment: false}); }, 1000);
        });
      });
    });
  }
  render() {
    const formStatus = this.validateForm();
    const { amount, onValidate } = this.props;
    return (
      <div className='card animated fadeIn'>
        <h2>Paiement par carte sélectionné</h2>
        <form autoComplete='off'>
          <fieldset>
            <h3>Montant : <span className='price'>{
              numeralAmountFormat(amount)
            } TTC</span></h3>
            <div className='card-wrapper' />
            <div className='fieldsContainer'>
              { this.nodes.map(n => n.widget(this.state, formStatus)) }
            </div>
          </fieldset>
          <div
            className={classNames('formError', {
              active: this.state.formError
            })}
          >
            <i className='fa fa-warning'></i>
            <span>{this.state.formError}</span>
          </div>
          <div className='textCenter'>
            <Views.Button
              primary={true} onClick={this.onFormValidate}
              disabled={!formStatus.isValidForm || this.state.waitingPayment}
            >
              Je valide mon paiment
            </Views.Button>
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    // @TODO Set a Tracker for reactive sizes
    const viewportSize = Math.min(rwindow.$width(), rwindow.$height());
    const cardWidth = viewportSize < 400 ? 200 : 300;
    // Create card for displaying user's entries
    Meteor.setTimeout(() => {
      this.card = new Card({
        width: cardWidth,
        form: 'form',
        container: '.card-wrapper',
        messages: {
          validDate: 'Date de\nvalidité',
          monthYear: 'Mois / Année'
        },
        values: {
          number: '•••• •••• •••• ••••',
          name: 'NOM COMPLET',
          expiry: '••/••',
          cvc: '•••'
        }
      });
    }, 32);
  }
}

Views.PaymentByCard = PaymentByCard;
