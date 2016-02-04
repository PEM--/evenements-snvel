import Helmet from 'react-helmet';

const ClientApp = ({children}) => (
  <div>
    <h1>ClientApp</h1>
    <Helmet
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]}
    />
    {children}
  </div>
);

export default ClientApp;
