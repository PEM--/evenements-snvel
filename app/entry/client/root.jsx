import routes from './routes';
import Wrapper from 'RootEnv/reduxWrapper';
import storeBuilder from 'RootEnv/storeBuilder';

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
    props: {
      onUpdate() {
        // Notify the page has been changed to Google Analytics
        ga('send', 'pageview');
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

/*
const {IndexRoute, Route} = ReactRouter;


<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-73432166-1', 'auto');
  ga('send', 'pageview');

</script>

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
*/
