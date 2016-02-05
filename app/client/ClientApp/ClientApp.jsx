import Helmet from 'react-helmet';
import AppBar from 'material-ui/lib/app-bar';

const ClientApp = ({children}) => (
  <div>
    <Helmet
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]}
    />
    <AppBar title='Evénements SNVEL' iconClassNameRight='muidocs-icon-navigation-expand-more' />
    {children}
  </div>
);

export default ClientApp;
