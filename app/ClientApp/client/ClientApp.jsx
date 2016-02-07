import radium from 'radium';
import {palette, styles} from '../../entry/client/styles/index';
import Helmet from 'react-helmet';

import { bubble } from 'react-burger-menu';

import MaximizedContainer from './components/MaximizedContainer';
import Header from './components/Header';
import Footer from './components/Footer';

const ClientApp = radium(({children}) => (
  <div
    style={[
      styles.transparent,
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
      <bubble>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
      </bubble>
      <MaximizedContainer>
        {children}
      </MaximizedContainer>
    </div>
    <Footer />
  </div>
));

export default ClientApp;
