const { Views } = MainApp;
const { Input, Button, AnimatedLink } = Views;

class SignOn extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'SignOnSchema');
    this.state.formError = null;
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      if (error) {
        console.warn('Login error', error);
        this.setState({formError: 'Nous ne vous avons pas identifié'});
      } else {
        FlowRouter.go('/');
      }
    });
  }
  render() {
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent SignOn animated fadeInDown'>
        <h1>Connexion</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
              { this.nodes.map(n => n(this.state, formStatus)) }
            </div>
          </fieldset>
          {
            <div
              className={classNames('formError', {
                active: this.state.formError
              })}
            >
              <i className='fa fa-warning'></i>
              <span>{this.state.formError}</span>
            </div>
          }
          <Button
            isDisabled={!formStatus.isValidForm}
            onClick={this.onClick}
          >
            Je me connecte
          </Button>
        </form>
        <div className='linkActions'>
          <div>
            <i className='fa fa-question-circle'></i>
            <AnimatedLink to='/password-change'>J'ai oublié mon mot de passe</AnimatedLink>
          </div>
          <div>
            <i className='fa fa-info-circle'></i>
            <AnimatedLink to='/signup'>Je n'ai pas encore de compte</AnimatedLink>
          </div>
        </div>
      </section>
    );
  }
}

MainApp.Views.SignOn = SignOn;
