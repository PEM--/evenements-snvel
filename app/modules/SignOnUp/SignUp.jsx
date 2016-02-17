const { Views } = MainApp;
const { Button, AnimatedLink } = Views;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'SignUpSchema');
  }
  render() {
    const filter1stFields = ['email', 'password', 'confirm'];
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent SignUp animated fadeIn'>
        <h1>Création de compte</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
              { this.nodes.filter(n => filter1stFields.indexOf(n.name) !== -1)
                .map(n => n.widget(this.state, formStatus))
              }
            </div>
          </fieldset>
          <fieldset>
            <div className='fieldsContainer'>
              { this.nodes.filter(n => filter1stFields.indexOf(n.name) === -1)
                .map(n => n.widget(this.state, formStatus))
              }
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
          <div className='buttons'>
            <Button
              isDisabled={!formStatus.isValidForm}
            >
              Je crée mon compte
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
