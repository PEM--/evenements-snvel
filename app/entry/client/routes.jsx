import MainApp from './MainApp';
import ClientApp from '../../modules/ClientApp/client';
import AdminApp from '../../modules/AdminApp/client';

export default {
  component: MainApp,
  childRoutes: [
    AdminApp,
    ClientApp
  ]
};
