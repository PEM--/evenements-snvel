import ClientApp from './ClientApp';
import ClientHome from './components/ClientHome';

// Secondary links
import Cgv from './components/Cgv';

export default {
  path: '/',
  component: ClientApp,
  indexRoute: { component: ClientHome },
  childRoutes: [
    {path: '/cgv', component: Cgv}
  ]
};
