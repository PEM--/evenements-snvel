globalSubs = new SubsManager();

FastRender.onAllRoutes(function(path) {
  globalSubs.subscribe('basicPages');
});
