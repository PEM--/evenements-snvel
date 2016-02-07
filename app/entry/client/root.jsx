import routes from './routes';
import Wrapper from 'RootEnv/reduxWrapper';
import storeBuilder from 'RootEnv/storeBuilder';

// Global subscription



Meteor.startup(() => {
  const clientOptions = {
    rootElement: document.body,
    wrapper: Wrapper,
    createReduxStore: storeBuilder,
  };
  const serverOptions = {
    ...clientOptions,
    dontMoveScripts: false
  };
  ReactRouterSSR.Run(routes, clientOptions, serverOptions);
});

/*
const {IndexRoute, Route} = ReactRouter;

AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

ReactRouterSSR.Run(AppRoutes, {
  props: {
    onUpdate() {
      // Notify the page has been changed to Google Analytics
      ga('send', 'pageview');
    }
  }
}, {
  preRender: function(req, res) {
    ReactCookie.plugToRequest(req, res);
  }
});

if (Meteor.isClient) {
  // Load Google Analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXXX-X', 'auto');
  ga('send', 'pageview');
}
 */
