import { createClass, Component } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const MainApp = ({children}) => (
  <div>
    <Helmet
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]}
    />
    {children}
  </div>
);

export default MainApp;
