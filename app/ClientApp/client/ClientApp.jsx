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
    style={[
      styles.flexItemStaticSize,
      {
        background: 'white'
      }
    ]}
  >
    <MaximizedContainer>
      <h1>Header</h1>
    </MaximizedContainer>
  </div>
));

const Footer = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize,
      {
        background: palette.primary2Color
      }
    ]}
  >
    <MaximizedContainer>
      <h1>Footer</h1>
    </MaximizedContainer>
  </div>
));

const ClientApp = radium(({children}) => (
  <div
    style={[
      // styles.fadeIn,
      {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start'
      }
    ]}
    className='animated fadeIn'
  >
    <Helmet
      title='Evénements SNVEL'
    />
    <Header />
    <div
      style={[
        styles.flexItemDynamicSize
      ]}
    >
      <MaximizedContainer>
        {children}
      </MaximizedContainer>
    </div>
    <Footer />
  </div>
));

export default ClientApp;
