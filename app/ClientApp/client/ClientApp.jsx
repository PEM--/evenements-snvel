import Helmet from 'react-helmet';
import AppBar from 'material-ui/lib/app-bar';

const ClientApp = ({children}) => (
  <div>
    <Helmet
      title='Evénements SNVEL'
    />
    <AppBar title='Evénements SNVEL' iconClassNameRight='muidocs-icon-navigation-expand-more' />
    {children}
  </div>
);

export default ClientApp;
