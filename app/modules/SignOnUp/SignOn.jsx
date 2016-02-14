const { Views } = MainApp;
const { Input, Button, AnimatedLink } = Views;

formFromSchema = (form, schema) => {
  // Create the initial state
  let state = MainApp.Schema[schema].clean({});
  const keys = MainApp.Schema[schema].objectKeys();
  keys.reduce((acc, k) => {
    acc[`error${s.capitalize(k)}`] = null;
    return acc;
  }, state);
  state.isValidForm = false;
  form.state = state;
  // Create the state manipulation functions
  let functions = keys.forEach(k => {
    form[`onChange${s.capitalize(k)}`] = function(e) {
      let stateModifier = {};
      stateModifier[k] = e.target.value;
      form.setState(stateModifier);
    };
    form[`onChange${s.capitalize(k)}`] = form[`onChange${s.capitalize(k)}`].bind(form);
  });
  // Create a node filled with widget
};

class SignOn extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'SignOnSchema');
  }
  render() {
    return (
      <section className='maximized MainContent SignOn animated fadeInDown'>
        <h1>Connexion</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
              <Input
                type='email' placeholder='Entrez votre email'
                errorText={this.state.errorEmail}
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <Input
                type='password' placeholder='Entrez votre mot de passe'
                errorText={this.state.errorPassword}
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
          </fieldset>
          <Button isDisabled={!this.state.isValidForm} >Je me connecte</Button>
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
