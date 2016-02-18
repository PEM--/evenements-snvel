const { Views } = MainApp;
const { Button, AnimatedLink } = Views;

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
        const beforeSignon = Session.get('beforeSignon');
        const nextPath = !beforeSignon || beforeSignon === '/signon' ? '/' : beforeSignon;
        Session.set(beforeSignon, null);
        FlowRouter.go(nextPath);
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
              { this.nodes.map(n => n.widget(this.state, formStatus)) }
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
          <Button
            isDisabled={!formStatus.isValidForm}
            isPrimary={true}
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

Views.SignOn = SignOn;
