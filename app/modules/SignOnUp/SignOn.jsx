const { Views } = MainApp;
const { Input, Button, AnimatedLink } = Views;

formFromSchema = (form, schema, initialState = null) => {
  // Create the initial state
  let state = initialState ? initialState : MainApp.Schema[schema].clean({});
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
      stateModifier[k] = e;
      console.log('setState', k, e, stateModifier, form.state[k]);
      form.setState(stateModifier);
    };
    form[`onChange${s.capitalize(k)}`] = form[`onChange${s.capitalize(k)}`].bind(form);
  });
  // Create nodes filled with widget
  form.nodes = keys.map(k => {
    const def = MainApp.Schema[schema].getDefinition(k);
    const props = Object.keys(def.view).filter(prop => prop !== 'name')
      .reduce((acc, prop) => {
        acc[prop] = def.view[prop];
        return acc;
      }, {
        key: `${schema}.${k}`,
        name: k,
        onChange: form[`onChange${s.capitalize(k)}`]
      });
    const widget = React.createElement(MainApp.Views[def.view.name], props);
    return widget;
  });
};

class SignOn extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'SignOnSchema');
  }
  render() {
    console.log('SignOn rendering with state', this.state);
    return (
      <section className='maximized MainContent SignOn animated fadeInDown'>
        <h1>Connexion</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
              { this.nodes.map(n => {
                n.props[n.name] = this.state[n.name];
                console.log('n', n);
                return n;
              }) }
            </div>
          </fieldset>
          <Button isDisabled={!this.state.isValidForm}>Je me connecte</Button>
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
