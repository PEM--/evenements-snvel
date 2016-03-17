const { Views, Col, Utils } = MainApp;
const { BaseReactMeteor, AnimatedLink } = Views;

class Invoice extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) { Meteor.subscribe('programs.all'); }
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
    return (
      <section className='maximized MainContent Invoice animated fadeIn'>
        <h1 className='lisibility'>Résumé de vos droits</h1>
        <div className='receipt'>
          <pre>123</pre>
        </div>
        <AnimatedLink to='/'>Revenez à l'accueil</AnimatedLink>
      </section>
    );
  }
}
