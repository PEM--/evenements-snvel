import ClientApp from './ClientApp';
import ClientHome from './components/ClientHome';

// Secondary links
import NotFound from './components/NotFound';
import Cgv from './components/Cgv';


export default {
  path: '/',
  component: ClientApp,
  indexRoute: { component: ClientHome },
  childRoutes: [
    {path: '/cgv', component: Cgv},
    {path: '*', component: NotFound}
  ]
};
