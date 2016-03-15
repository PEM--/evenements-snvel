const { Views } = MainApp;
const { Button, AnimatedLink } = Views;

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'PasswordForgottenSchema');
    this.state.formError = null;
    this.onClick = this.onClick.bind(this);
  }
  render() {
    return (
      <section className='maximized MainContent SignOn animated fadeInDown'>
        <h1>Nouveau mot de passe</h1>
        <p>Saisissez votre email</p>
        <form autoComplete='on'>

        </form>
      </section>
    );
  }
}

MainApp.Views.PasswordChange = PasswordChange;
