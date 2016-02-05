import { createClass, Component } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import colors from 'material-ui/lib/styles/colors';
import styles from './styles/MainApp.import.css';
import styles2 from './styles/test.styl';

injectTapEventPlugin();

let muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.deepPurple500,
    primary2Color: colors.deepOrange500,
    primary3Color: colors.orange50,
    accent1Color: colors.deepOrange500
  },
}, {
  avatar: {
    borderColor: null,
  }
});
if (Meteor.isClient) {
  muiTheme.userAgent = navigator.userAgent;
}

// console.log('styles2', styles2);

const MainApp = ({children}) => {
  console.log('MainApp');
  return (
    <div className={styles.myContent}>
      <Helmet
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]}
      />
    <h1 className='tomato'>MainApp</h1>
    <h2 className={styles2.stuff}>Inner header</h2>
    <p>Balblabla</p>
      {children}
    </div>
  );
};

export default themeDecorator(muiTheme)(MainApp);
