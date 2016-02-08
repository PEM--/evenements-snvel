console.log('Subscription caching');
const globalSubs = new SubsManager();
if (Meteor.isClient) {
  globalSubs.subscribe('basicPages.all');
}
if (Meteor.isServer) {
  FastRender.onAllRoutes(function(path) {
    globalSubs.subscribe('basicPages.all');
  });
}

export default globalSubs;
