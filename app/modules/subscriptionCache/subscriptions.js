initSubscriptionCache = () => {
  console.log('Subscription caching');
  globalSubs = new SubsManager();
  globalSubs.subscribe('socialLinks.all');
  globalSubs.subscribe('basicPages.all');
  globalSubs.subscribe('users.me');
};
