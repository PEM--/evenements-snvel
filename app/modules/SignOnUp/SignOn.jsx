const { Views } = MainApp;
const { Input, Button, AnimatedLink } = Views;

formFromSchema = (form, schema, initialState = null) => {
  // Create the initial state
  let state = initialState ? initialState : MainApp.Schema[schema].clean({});
  const keys = MainApp.Schema[schema].objectKeys();
  keys.reduce((acc, k) => {
    // acc[`error${s.capitalize(k)}`] = null;
    return acc;
  }, state);
  form.state = state;
  // Create the state manipulation functions
  let functions = keys.forEach(k => {
    form[`onChange${s.capitalize(k)}`] = function(e) {
      let stateModifier = {};
      stateModifier[k] = e;
      form.setState(stateModifier);
    }.bind(form);
  });
  // Create a form checking function
  form.validateForm = function() {
    try {
      MainApp.Schema[schema].validate(this.state);
      return { isValidForm: true };
    } catch (error) {
      let result = {
        isValidForm: false
      };
      result[error.errors[0].name] = error.reason;
      return result;
    }
    return result;
  }.bind(form);
  // Create nodes filled with widget
  form.nodes = keys.map(k => {
    const def = MainApp.Schema[schema].getDefinition(k);
    const props = Object.keys(def.view).filter(prop => prop !== 'name')
      .reduce((acc, prop) => {
        acc[prop] = def.view[prop];
        return acc;
      }, {
        key: `${schema}.${k}`,
        onChange: form[`onChange${s.capitalize(k)}`]
      });
    return {
      name: k,
      create: supProps => React.createElement(
        MainApp.Views[def.view.name], Object.assign({}, props, supProps)
      )
    };
  });
};

class SignOn extends React.Component {
  constructor(props) {
    super(props);
    formFromSchema(this, 'SignOnSchema');
  }
  render() {
    const formStatus = this.validateForm();
    return (
      <section className='maximized MainContent SignOn animated fadeInDown'>
        <h1>Connexion</h1>
        <form>
          <fieldset>
            <div className='fieldsContainer'>
              { this.nodes.map(n => {
                console.log('State', n.name, this.state);
                let addProps = { value: this.state[n.name] };
                if (formStatus.hasOwnProperty(n.name) && this.state[n.name].length > 0) {
                  addProps.errorText = formStatus[n.name];
                }
                return n.create(addProps);
              }) }
            </div>
          </fieldset>
          <Button isDisabled={!formStatus.isValidForm}>Je me connecte</Button>
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
