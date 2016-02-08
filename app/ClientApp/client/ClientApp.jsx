import radium from 'radium';
import {palette, styles} from '../../entry/client/styles/index';
import Helmet from 'react-helmet';

import MainMenu from './components/MainMenu';
import MaximizedContainer from './components/MaximizedContainer';
import Header from './components/Header';
import Footer from './components/Footer';

const ClientApp = radium(({children}) => (
  <div>
    <Helmet title='Evénements SNVEL' />
    <MainMenu />
    <div
      style={[
        styles.transparent, styles.flex, styles.flex.col,
        {minHeight: '100vh'}
      ]}
      className='animated fadeIn'
    >
      <Header />
      <div
        style={[
          styles.flexItemDynamicSize,
          {height: '100%'}
        ]}
      >
        <MaximizedContainer>
          {children}
        </MaximizedContainer>
      </div>
      <Footer />
    </div>
  </div>
));

export default ClientApp;
