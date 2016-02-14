const { Select, Input, Button, AnimatedLink } = MainApp.Views;

class SignUp extends React.Component {
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
      <section className='maximized MainContent SignUp animated fadeIn'>
        <h1>'Création de compte'</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
              <Input
                type='text' placeholder='Entrez votre n° CSO'
                hasError={this.state.csoNumberError}
                value={this.state.csoNumber}
                onChange={this.onCsoNumberChange}
                />
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
              <Input
                type='password' placeholder='Confirmer votre mot de passe'
                errorText={this.state.errorConfirm}
                value={this.state.confirm}
                onChange={this.onConfirmChange}
              />
            </div>
          </fieldset>
          <Button isDisabled={this.state.isValidForm} >Je crée mon compte</Button>
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
