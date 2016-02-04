import Helmet from 'react-helmet';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.green500,
    primary2Color: colors.green700,
    primary3Color: colors.green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  // Check this maybe in the DDP connection?
  // userAgent: req.headers['user-agent']
});

const ClientApp = ({children}) => (
  <div>
    <Helmet
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]}
    />
    <AppBar title='Evénements SNVEL' iconClassNameRight='muidocs-icon-navigation-expand-more' />
    {children}
  </div>
);

export default themeDecorator(muiTheme)(ClientApp);
