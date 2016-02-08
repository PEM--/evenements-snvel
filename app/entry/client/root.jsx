import routes from './routes';
import Wrapper from 'RootEnv/reduxWrapper';
import storeBuilder from 'RootEnv/storeBuilder';

import { palette } from './styles';

// Global subscription

if (Meteor.isClient) {
  // Load Google Analytics
  const { UA } = Meteor.settings.public.googleAnalytics;

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', UA, 'auto');
  ga('send', 'pageview');
}

Meteor.startup(() => {
  const clientOptions = {
    wrapper: Wrapper,
    createReduxStore: storeBuilder,
    rootElement: 'react-app',
    rootElementType: 'div',
    rootElementAttributes: [
      ['style', `background-color: ${palette.primary1Color}; color: ${palette.alternateTextColor}; width: 100%;`]
    ],
    props: {
      onUpdate() {
        try {
          // Notify the page has been changed to Google Analytics
          ga('send', 'pageview');
        } catch (error) {
          console.warn('Google Analytics error', error);
        }
      }
    },
    preRender: function(req, res) {
      ReactCookie.plugToRequest(req, res);
    }
  };
  const serverOptions = {
    wrapper: Wrapper, createReduxStore: storeBuilder
  };
  ReactRouterSSR.Run(routes, clientOptions, serverOptions);
});
