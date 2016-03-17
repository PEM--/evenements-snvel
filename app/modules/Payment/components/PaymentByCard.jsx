const { Views } = MainApp;
const { Input, Button } = Views;

class PaymentByCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('CardSchema', MainApp.Schema.CardSchema);
    formFromSchema(this, 'CardSchema');
    this.state.formError = null;
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
              primary={true} onClick={onValidate}

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
