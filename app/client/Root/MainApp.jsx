import { createClass, Component } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import colors from 'material-ui/lib/styles/colors';
import styles from './styles/MainApp.import.css';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.deepPurple500,
    primary2Color: colors.deepOrange500,
    primary3Color: colors.orange50
  },
}, {
  avatar: {
    borderColor: null,
  },
  // @TODO Check this maybe in the DDP connection?
  // userAgent: req.headers['user-agent']
});

const MainApp = ({children}) => {
  console.log('MainApp');
  return (
    <div style={styles.body}>
      <Helmet
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]}
      />
      {children}
    </div>
  );
};

export default themeDecorator(muiTheme)(MainApp);
