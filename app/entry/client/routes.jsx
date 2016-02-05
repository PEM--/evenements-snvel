import MainApp from './MainApp';
import ClientApp from '../../ClientApp/client';
import AdminApp from '../../AdminApp/client';

export default {
  component: MainApp,
  childRoutes: [
    ClientApp,
    AdminApp
  ]
};
