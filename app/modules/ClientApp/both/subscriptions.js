console.log('Subscription caching');
const globalSubs = new SubsManager();
FastRender.onAllRoutes(function(path) {
  globalSubs.subscribe('basicPages.all');
});

export default globalSubs;
