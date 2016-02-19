initSubscriptionCache = () => {
  console.log('Subscription caching');
  globalSubs = new SubsManager();
  globalSubs.subscribe('socialLinks.all');
  globalSubs.subscribe('basicPages.all');
  globalSubs.subscribe('programs.all');
  globalSubs.subscribe('userTypes.all');
  globalSubs.subscribe('users.me');
};
