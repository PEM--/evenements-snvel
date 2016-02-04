import MainApp from './MainApp';
import ClientApp from 'client/ClientApp';
import AdminApp from 'client/AdminApp';

export default {
  component: MainApp,
  childRoutes: [
    ClientApp,
    AdminApp
  ]
};
