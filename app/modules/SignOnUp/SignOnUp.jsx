const { CheckBox, Input, Button, AnimatedLink } = MainApp.Views;

class SignOnUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscriber: false,
      csoNumber: '',
      csoNumberError: null,
      email: '',
      emailError: null,
      password: '',
      passwordError: 'Un minimum de 6 caractères',
      confirm: '',
      confirmError: null,
      isValidForm: false,
      isSignUp: this.props.isSignUp ? this.props.isSignUp : false
    };
    [
      'onEmailChange', 'onPasswordChange', 'onConfirmChange', 'onCsoNumberChange'
    ].map(f => this[f] = this[f].bind(this));
  }
  onCsoNumberChange(e) {
    console.log('e', e);
    this.setState({csoNumber: e.target.value });
  }
  onEmailChange(e) { this.setState({email: e.target.value }); }
  onPasswordChange(e) { this.setState({password: e.target.value }); }
  onConfirmChange(e) { this.setState({confirm: e.target.value }); }
  render() {
    const { isSignUp } = this.props;
    return (
      <section className='maximized MainContent SignOnUp'>
        <div key={Number(isSignUp)} className='lisibility animated fadeIn'>
          <h1>{isSignUp ? 'Création de compte' : 'Connexion'}</h1>
          <form>
            <fieldset>
              <div className='fieldsContainer'>
                {
                  isSignUp ? <Input
                    type='text' placeholder='Entrez votre n° CSO'
                    hasError={this.state.csoNumberError}
                    value={this.state.csoNumber}
                    onChange={this.onCsoNumberChange}
                  /> : ''
                }
                <Input
                  type='email' placeholder='Entrez votre email'
                  hasError={this.state.errorEmail}
                  value={this.state.email}
                  onChange={this.onEmailChange}
                />
                <Input
                  type='password' placeholder='Entrez votre mot de passe'
                  hasError={this.state.errorPassword}
                  errorText={this.state.errorPassword}
                  onChange={this.onPasswordChange}
                />
              {
                isSignUp ? <Input
                  type='password' placeholder='Confirmer votre mot de passe'
                  errorText={this.state.errorConfirm}
                  value={this.state.confirm}
                  onChange={this.onConfirmChange}
                /> : ''
              }
            </div>
            </fieldset>
            <Button isDisabled={this.state.isValidForm} >
              {isSignUp ? 'Je crée mon compte' : 'Je me connecte'}
            </Button>
          </form>
          {
            !isSignUp ? (
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
            ) : (
              <div className='linkActions'>
                <i className='fa fa-info-circle'></i>
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
