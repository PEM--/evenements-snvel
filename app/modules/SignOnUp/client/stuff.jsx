BuildStateFromSchema = (form, schema) => {
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
  // Create nodes filled with widget
  // form.nodes = keys.map(k => {
  //
  // });
};
