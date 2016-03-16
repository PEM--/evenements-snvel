const { Views } = MainApp;
const { Input, Button } = Views;

class PaymentByCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { amount, onValidate } = this.props;
    return (
      <div className='card animated fadeIn'>
        <h2>Paiement par carte sélectionné</h2>
        <form>
          <fieldset>
            <h3>Montant : <span className='price'>{
              numeralAmountFormat(amount)
            } TTC</span></h3>
            <div className='card-wrapper' />
          </fieldset>
          <div className='textCenter'>
            <Views.Button primary={true} onClick={onValidate}>
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
  // componentWillUnmount() {
  //   console.log('Card', this.card);
  // }
}

Views.PaymentByCard = PaymentByCard;
