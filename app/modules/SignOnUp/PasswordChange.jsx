const { Views } = MainApp;
const { Button, AnimatedLink } = Views;

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'PasswordChangeSchema');
    this.state.formError = null;
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    console.log('Validate', this.state);
    
  }
  render() {
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent animated fadeInDown'>
        <h1>Nouveau mot de passe</h1>
        <p>Définissez votre nouveau mot de passe</p>
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
            Je définis mon mot de passe
          </Button>
        </form>
      </section>
    );
  }
}

MainApp.Views.PasswordChange = PasswordChange;
