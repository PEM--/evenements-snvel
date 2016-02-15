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
    return (currentState, formStatus) => {
      console.log('Node', k, currentState[k], schema, def.view.name);
      let addProps = { value: currentState[k] };
      if (formStatus.hasOwnProperty(k) && currentState[k].length > 0) {
        addProps.errorText = formStatus[k];
      }
      return React.createElement(
        MainApp.Views[def.view.name], Object.assign({}, props, addProps)
      );
    };
  });
};
