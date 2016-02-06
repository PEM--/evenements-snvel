import radium from 'radium';
import {palette, styles} from '../../entry/client/styles/index';
import Helmet from 'react-helmet';

import MaximizedContainer from './components/MaximizedContainer';
import Header from './components/Header';
import Footer from './components/Header';

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
