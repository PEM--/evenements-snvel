import ClientApp from './ClientApp';
import ClientHome from './components/ClientHome';

export default {
  path: '/',
  component: ClientApp,
  indexRoute: { component: ClientHome },
  childRoutes: []
};
