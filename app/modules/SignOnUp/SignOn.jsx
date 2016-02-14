const { Input, Button, AnimatedLink } = MainApp.Views;

class SignOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscriber: false,
      email: '',
      emailError: null,
      password: '',
      passwordError: 'Un minimum de 6 caractères',
      isValidForm: false
    };
    [
      'onEmailChange', 'onPasswordChange'
    ].map(f => this[f] = this[f].bind(this));
  }
  onEmailChange(e) { this.setState({email: e.target.value }); }
  onPasswordChange(e) { this.setState({password: e.target.value }); }
  render() {
    return (
      <section className='maximized MainContent SignOn animated fadeInDown'>
        <h1>Connexion</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
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
            </div>
          </fieldset>
          <Button isDisabled={this.state.isValidForm} >Je me connecte</Button>
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
