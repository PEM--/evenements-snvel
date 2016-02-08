Meteor.startup(function() {
  console.log('Subscription caching');
  globalSubs = new SubsManager();
  FastRender.onAllRoutes(function(path) {
    globalSubs.subscribe('basicPages.all');
  });
});
