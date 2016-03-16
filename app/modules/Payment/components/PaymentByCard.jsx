const { Views } = MainApp;

class PaymentByCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const { prices, discounts, totalHT, totalTTC } = this.props;
    return (
      // <Invoice prices={prices} discounts={discounts} totalHT={totalHT} totalTTC={totalTTC} />
      <div className='card-wrapper' />
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
