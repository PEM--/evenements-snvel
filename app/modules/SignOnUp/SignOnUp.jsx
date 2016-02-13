const { Input, AnimatedLink } = MainApp.Views;

class SignOnUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirm: '',
      confirmError: '',
      isValidForm: false,
      isSignUp: this.props.isSignUp ? this.props.isSignUp : false
    };
    [
      'onEmailChange', 'onPasswordChange', 'onConfirmChange'
    ].map(f => this[f] = this[f].bind(this));
  }
  onEmailChange(e) {}
  onPasswordChange(e) {}
  onConfirmChange(e) {}
  render() {
    const { isSignUp } = this.props;
    return (
      <section className='maximized MainContent SignOnUp'>
        <div key={Number(isSignUp)} className='lisibility animated fadeIn'>
          <h1>{isSignUp ? 'Création de compte' : 'Connexion'}</h1>
          <form>
            <fieldset>
              <Input/>
            </fieldset>
          </form>
          {
            !isSignUp ? (
              <div className='linkActions'>
                <div>
                  <AnimatedLink to='/password-change'>Mot de passe oublié</AnimatedLink>
                </div>
                <div>
                  <AnimatedLink to='/signup'>Je n'ai pas encore de compte</AnimatedLink>
                </div>
              </div>
            ) : (
              <div className='linkActions'>
                <AnimatedLink to='/signon'>J'ai déjà un compte</AnimatedLink>
              </div>
            )
          }
        </div>
      </section>
    );
  }
}

MainApp.Views.SignOnUp = SignOnUp;
