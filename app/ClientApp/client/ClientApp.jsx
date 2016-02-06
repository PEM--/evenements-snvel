import radium from 'radium';
import {palette, styles} from '../../entry/client/styles/index';
import Helmet from 'react-helmet';

const MaximizedContainer = radium(({children}) => (
  <div
    style={[
      styles.maximized,
      {
        background: 'red',
      }
    ]}
  >
    {children}
  </div>
));

const Header = radium(() => (
  <div
    style={{
      background: 'white',
      flex: '0 0 auto'
    }}
  >
    <MaximizedContainer>
      <h1>Header</h1>
    </MaximizedContainer>
  </div>
));

const Footer = radium(() => (
  <div
    style={{
      background: palette.primary2Color,
      flex: '0 0 auto'
    }}
  >
    <MaximizedContainer>
      <h1>Footer</h1>
    </MaximizedContainer>
  </div>
));

const ClientApp = radium(({children}) => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start'
    }}
  >
    <Helmet
      title='Evénements SNVEL'
    />
    <Header />
    <MaximizedContainer>
      {children}
    </MaximizedContainer>
    <Footer />
  </div>
));

export default ClientApp;
