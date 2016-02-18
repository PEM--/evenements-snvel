formFromSchema = (form, schema, initialState = null) => {
  // Create the initial state
  let state = initialState ? initialState : MainApp.Schema[schema].clean({});
  const keys = MainApp.Schema[schema].objectKeys();
  form.state = state;
  // Create the state manipulation functions
  let functions = keys.forEach(k => {
    form[`onChange${s.capitalize(k)}`] = function(e) {
      let stateModifier = {};
      stateModifier[k] = e;
      console.log(`onChange${s.capitalize(k)}`, e, stateModifier);
      form.setState(stateModifier);
    };
  });
  // Create a form checking function
  form.validateForm = function() {
    try {
      const formState = MainApp.Schema[schema].clean(
        Object.assign({}, this.state)
      );
      console.log('formState', formState);
      MainApp.Schema[schema].validate(formState);
      return { isValidForm: true };
    } catch (error) {
      let result = { isValidForm: false };
      result[error.errors[0].name] = error.reason;
      return result;
    }
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
      widget: (currentState, formStatus) => {
        let addProps = { value: currentState[k] };
        if (formStatus.hasOwnProperty(k) && currentState[k].length > 0) {
          addProps.errorText = formStatus[k];
        }
        return React.createElement(
          MainApp.Views[def.view.name], Object.assign({}, props, addProps)
        );
      }
    };
  });
};
