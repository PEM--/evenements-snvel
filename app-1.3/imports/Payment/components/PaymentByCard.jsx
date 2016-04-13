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
    const { program } = this.props;
    this.setState({waitingPayment: true});
    const number = this.state.number.trim().split(' ').join('');
    const cardholderName = this.state.name.trim().toUpperCase();
    const expirationDate = this.state.expiry.trim().split(' ').join('');
    const cvv = this.state.cvc.trim();
    Meteor.call('clientToken', program, (tokenError, tokenResult) => {
      if (tokenError) { return this.resolveError(tokenError); }
      console.log('Braintree customer', tokenResult);
      Meteor.setTimeout(() => { this.setState({waitingPayment: false}); }, 1000);
      const { address, postalCode, city } = this.props.user.profile;
      // Creating a payment nonce
      client = new braintree.api.Client({clientToken: tokenResult.token});
      client.tokenizeCard({
        number, cardholderName, expirationDate, cvv,
        billingAddress: {streetAddress: address, postalCode, locality: city}
      }, (errorNonce, nonce) => {
        if (errorNonce) { return this.resolveError(errorNonce); }
        console.log('Nonce received from Braintree', nonce);
        // Perform the payment using the nonce
        Meteor.call('cardPayment', nonce, program, (errorPayment, resultPayment) => {
          if (errorPayment) { return this.resolveError(errorPayment); }
          console.log('Payment succeed');
          sAlert.success('Paiement validé');
          return this.props.onValidate();
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
    // const viewportSize = Math.min(rwindow.$width(), rwindow.$height());
    // const cardWidth = viewportSize < 400 ? 200 : 300;
    // Create card for displaying user's entries
    Meteor.setTimeout(() => {
      this.card = new Card({
        form: 'form',
        container: '.card-wrapper',
        formatting: true,
        messages: {
          validDate: 'Date de\nvalidité',
          monthYear: 'Mois / Année'
        },
        placeholders: {
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
