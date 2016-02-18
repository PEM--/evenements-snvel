const { Views } = MainApp;
const { Button, AnimatedLink } = Views;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'SignUpSchema');
    this.onCreate = this.onCreate.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  onCreate() {

  }
  onCancel() { FlowRouter.go('/'); }
  render() {
    const filter1stFields = ['email', 'password', 'confirm'];
    const filterAddress = [
      'street', 'streetComplementary', 'postalCode', 'city', 'country'
    ];
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent SignUp animated fadeIn'>
        <h1>Création de compte</h1>
        <form>
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
              isDisabled={!formStatus.isValidForm}
              isPrimary={true}
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
