import { createClass, Component } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import { muiTheme, palette } from './styles';

injectTapEventPlugin();

const MainApp = ({children}) => (
  <div>
    <Helmet
      meta={[
        {name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {name: 'msapplication-TileColor', content: palette.primary2Color},
        {name: 'msapplication-TileImage', content: '/mstile-144x144.png'},
        {name: 'theme-color', content: '#ffffff'}
      ]}
      link={[
        {rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png'},
        {rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png'},
        {rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png'},
        {rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png'},
        {rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png'},
        {rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png'},
        {rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png'},
        {rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png'},
        {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32'},
        {rel: 'icon', type: 'image/png', href: '/favicon-194x194.png', sizes: '194x194'},
        {rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96'},
        {rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192'},
        {rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16'},
        {rel: 'manifest', href: '/manifest.json'},
        {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: palette.alternateTextColor}
      ]}
    />
    {children}
  </div>
);

export default themeDecorator(muiTheme)(MainApp);