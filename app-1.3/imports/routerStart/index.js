import scrollHistory from './scrollHistory';

// Routing

const routerStart = () => {
  // Block the routing untill all routes are defined (see routing-defined)
  if (Meteor.isClient) {
    scrollHistory();
    FlowRouter.wait();
    console.log('Routing blocked');
  }

  // Routing rules for SSR
  if (Meteor.isServer) {
    // Robots.txt
    // Specs: http://www.robotstxt.org/robotstxt.html

    // Allow indexing for all pages except admin's ones
    [ 'User-agent: *',
      'Disallow: /admin/',
      'Disallow: /login/'
    ].forEach(line => {
      console.log('Robots.txt on', line);
      robots.addLine(line);
    });
    // Cache is set on 100s
    const TIME_IN_MS = 1000 * 100;
    FlowRouter.setPageCacheTimeout(TIME_IN_MS);
    // Defer Script loading
    FlowRouter.setDeferScriptLoading(true);
    console.log('SSR cache set');
  }
};

export default routerStart;
