// Routing

// Create a logger
// Block the routing untill all routes are defined (see routing-defined)
if (Meteor.isClient) {
  const IS_ROUTER_STARTED = 'isRouterStarted';
  MainApp.Utils.IS_ROUTER_STARTED = IS_ROUTER_STARTED;
  Session.setDefault(IS_ROUTER_STARTED, false);
  FlowRouter.wait();
  console.log('Routing blocked');
}

// Routing rules for SSR
if (Meteor.isServer) {
  // Cache is set on 10s
  const TIME_IN_MS = 1000 * 10;
  FlowRouter.setPageCacheTimeout(TIME_IN_MS);
  // Defer Script loading
  FlowRouter.setDeferScriptLoading(true);
  console.log('SSR cache set');
}
