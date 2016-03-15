const { Views } = MainApp;
const { Button, AnimatedLink } = Views;

class PaswordForgotten extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'PasswordForgottenSchema');
    this.state.formError = null;
    this.onClick = this.onClick.bind(this);
  }
  onCancel() { FlowRouter.go('/'); }
  onClick() {
    console.log('Validate', this.state);
  }
  render() {
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent SignOn animated fadeIn'>
        <h1>Mot de passe oublié</h1>
        <p>Saisissez votre email</p>
        <form autoComplete='on'>
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
            disabled={!formStatus.isValidForm}
            primary={true}
            onClick={this.onClick}
          >
            Je valide ma demande
          </Button>
          <Button iconName='times' onClick={this.onCancel}>J'annule</Button>
        </form>
      </section>
    );
  }
}

MainApp.Views.PaswordForgotten = PaswordForgotten;
