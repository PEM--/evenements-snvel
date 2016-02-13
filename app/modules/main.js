// Last file loaded
Meteor.startup(() => {
  // Initilize collections and publications
  if (Meteor.isServer) {
    initBasicPages();
  }
  // Initialize subscriptions
  initSubscriptionCache();
  // Initiliaze subscription that doesn't produce pages
  initSocialLinks();
  // Start routing
  initRouterDone();
});
