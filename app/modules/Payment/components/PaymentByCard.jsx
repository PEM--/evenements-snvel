const { Views } = MainApp;
const { Buttons } = Views;

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
      let card = new Card({
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
