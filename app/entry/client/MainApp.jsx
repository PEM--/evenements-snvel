import { createClass, Component } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import { muiTheme } from './styles';

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

export default themeDecorator(muiTheme)(MainApp);
