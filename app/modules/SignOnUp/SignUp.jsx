const { Views } = MainApp;
const { Input, Button, AnimatedLink } = Views;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'SignUpSchema');
  }
  render() {
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent SignUp animated fadeIn'>
        <h1>Création de compte</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
              { this.nodes.map(n => n(this.state, formStatus)) }
            </div>
          </fieldset>
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

MainApp.Views.SignUp = SignUp;
