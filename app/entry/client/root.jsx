import routes from 'client/Root/routes';
import Wrapper from 'RootEnv/reduxWrapper';
import storeBuilder from 'RootEnv/storeBuilder';

Meteor.startup(() => {
  const clientOptions = {
    wrapper: Wrapper,
    createReduxStore: storeBuilder,
  };
  const serverOptions = { ...clientOptions };
  ReactRouterSSR.Run(routes, clientOptions, serverOptions);
});
