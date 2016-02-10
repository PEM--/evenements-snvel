// Routing

// Create a logger
// Block the routing untill all routes are defined (see routing-defined)
if (Meteor.isClient) {
  FlowRouter.wait();
  console.log('Routing blocked');
}

// Routing rules for SSR
if (Meteor.isServer) {
  // Cache is set on 100s
  const TIME_IN_MS = 1000 * 100;
  FlowRouter.setPageCacheTimeout(TIME_IN_MS);
  // Defer Script loading
  FlowRouter.setDeferScriptLoading(true);
  console.log('SSR cache set');
}
