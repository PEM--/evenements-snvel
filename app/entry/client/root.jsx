import routes from './routes';
import Wrapper from 'RootEnv/reduxWrapper';
import storeBuilder from 'RootEnv/storeBuilder';

// Accounts options
Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});

// Global subscription



Meteor.startup(() => {
  const clientOptions = {
    wrapper: Wrapper,
    createReduxStore: storeBuilder,
  };
  const serverOptions = { ...clientOptions };
  ReactRouterSSR.Run(routes, clientOptions, serverOptions);
});
