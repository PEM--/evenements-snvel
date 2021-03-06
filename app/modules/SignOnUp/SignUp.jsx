const { Col, Views, Schema } = MainApp;
const { Button, AnimatedLink } = Views;

class SignUp extends Views.BaseReactMeteor {
  getMeteorData() {
    if (Meteor.isServer) { Meteor.subscribe('userTypes.all'); }
    return { userTypes: Col.UserTypes.find().fetch() };
  }
  constructor(props) {
    super(props);
    [
      'onCreate', 'onCancel', 'onChangeCategory'
    ].forEach(f => this[f] = this[f].bind(this));
    formFromSchema(this, 'SignUpSchema');
  }
  onCreate() {
    const profile = MainApp.Schema.SignUpSchema.clean(this.state);
    Meteor.call('user.create', profile, (err, result) => {
      if (err) {
        console.warn('Erreur lors de la création de compte', err);
        let msg = 'Inscription en erreur';
        switch (err.reason) {
        case 'Username already exists.':
          msg = 'Cette adresse email est déjà utilisée';
          break;
        default:
          if (Schema.MESSAGES.hasOwnProperty(err.reason)) {
            msg = Schema.MESSAGES[err.reason];
          }
        }
        return sAlert.error(msg);
      }
      FlowRouter.go('emailconfirm');
    });
  }
  onChangeCategory(e) {
    if (e !== 'Adhérent SNVEL') {
      this.setState({
        csoNumber: '', isDisabledCsoNumber: true, category: e
      });
    } else {
      this.setState({category: e, isDisabledCsoNumber: false});
    }
  }
  onCancel() { FlowRouter.go('/'); }
  render() {
    const filter1stFields = ['email', 'password', 'confirm'];
    const filterAddress = [
      'address', 'addressComplementary', 'postalCode', 'city', 'country'
    ];
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent SignUp animated fadeIn'>
        <h1>Création de compte</h1>
        <form autoComplete='on'>
          <fieldset>
            <legend>Compte sur la plateforme</legend>
            <div className='fieldsContainer'>
              { this.nodes.filter(n => filter1stFields.indexOf(n.name) !== -1)
                .map(n => n.widget(this.state, formStatus))
              }
            </div>
          </fieldset>
          <fieldset>
            <legend>Vos informations personelles</legend>
            <div className='fieldsContainer'>
              { this.nodes
                .filter(n => filter1stFields.indexOf(n.name) === -1)
                .filter(n => filterAddress.indexOf(n.name) === -1)
                .map(n => n.widget(this.state, formStatus))
              }
            </div>
            <fieldset className='invoiceAddress'>
              <legend>Votre adresse de facturation</legend>
              <div className='fieldsContainer'>
                { this.nodes
                  .filter(n => filter1stFields.indexOf(n.name) === -1)
                  .filter(n => filterAddress.indexOf(n.name) !== -1)
                  .map(n => n.widget(this.state, formStatus))
                }
              </div>
            </fieldset>
          </fieldset>
          <div
            className={classNames('formError', {
              active: this.state.formError
            })}
          >
            <i className='fa fa-warning'></i>
            <span>{this.state.formError}</span>
          </div>
          <div className='buttons'>
            <Button
              disabled={!formStatus.isValidForm}
              primary={true}
              iconName='user-plus'
              onClick={this.onCreate}
            >
              Je crée mon compte
            </Button>
            <Button
              iconName='times'
              onClick={this.onCancel}
            >
              J'annule
            </Button>
          </div>
        </form>
        <div className='linkActions'>
          <i className='fa fa-info-circle'></i>
          <AnimatedLink to='/signon'>J'ai déjà un compte</AnimatedLink>
        </div>
      </section>
    );
  }
}

Views.SignUp = SignUp;
