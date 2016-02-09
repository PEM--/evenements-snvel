// Last file loaded
// Initilize collections and publications
if (Meteor.isServer) {
  initBasicPages();
}
// Initialize subscriptions
initSubscriptionCache();
// Start routing
initRouterDone();
