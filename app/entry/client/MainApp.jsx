import { createClass, Component } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import { muiTheme, palette } from './styles';

injectTapEventPlugin();

// <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
// <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
// <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
// <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
// <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
// <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
// <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
// <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
// <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
// <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
// <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
// <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
// <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
// <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
// <link rel="manifest" href="/manifest.json">
// <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">

      // link={[
      //
      // ]}

const MainApp = ({children}) => (
  <div>
    <Helmet
      meta={[
        {name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {name: 'msapplication-TileColor', content: palete.primary2Color},
        {name: 'msapplication-TileImage', content: '/mstile-144x144.png'},
        {name: 'theme-color', content: '#ffffff'}
      ]}
    />
    {children}
  </div>
);

export default themeDecorator(muiTheme)(MainApp);
