const { Views, Col } = MainApp;
const { Spinner, BaseReactMeteor } = Views;

class PaymentWaiting extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne(
        {reference: this.props.program},
        {fields: {reference: 1}}
      ),
      user: Meteor.user()
    };
  }
  render() {
    const {user, program} = this.data;
    return (
      <section className='maximized MainContent Payment animated fadeIn'>
        <h1>Paiement en attente</h1>
        <Spinner />
      </section>
    );
  }
}

MainApp.Views.PaymentWaiting = PaymentWaiting;
