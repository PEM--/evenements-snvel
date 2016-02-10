initSubscriptionCache = () => {
  console.log('Subscription caching');
  globalSubs = new SubsManager();
  globalSubs.subscribe('basicPages.all');
  globalSubs.subscribe('socialLinks.all');
};
