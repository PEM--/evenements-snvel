const OPTIONS = {
  position: 'bottom-right',
  effect: 'bouncyflip',
  timeout: 3000
};

sAlert = {
  info(text) { MainApp.Views.Alert.info(text, OPTIONS); },
  success(text) { MainApp.Views.Alert.success(text, OPTIONS); },
  warning(text) { MainApp.Views.Alert.warning(text, OPTIONS); },
  error(text) {
    let options = Object.assign({}, OPTIONS);
    options.timeout = 10000;
    MainApp.Views.Alert.error(text, OPTIONS);
  }
};
