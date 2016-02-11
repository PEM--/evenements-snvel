// Routing

const { Col, Views } = MainApp;

// Routing bor BasicPages
const setBasicPageRoutes = () => {
  const basicPages = Col.BasicPages.find({}, {fields: {slug: 1}}).fetch();
  basicPages.forEach(page => {
    FlowRouter.route(`/${page.slug}`, {
      name: page.slug,
      action() {
        ReactLayout.render(Views.MainLayout, {
          children: <Views.BasicPages slug={page.slug} />
        });
      }
    });
    if (Meteor.isServer) {
      console.log(`Route ${page.slug} declared`);
    }
  });
};

initRouterDone = () => {
  if (Meteor.isClient) {
    // Release router for routing once all routes are declared
    Meteor.startup(() => {
      Tracker.autorun((comp) => {
        console.log('Waiting for initial subscriptions');
        areSubsReady = globalSubs.ready();
        if (areSubsReady) {
          console.log('MainApp received subscription');
          initBasicPages();
          setBasicPageRoutes();
          // Delay router initialization for iOS and Safari
          Meteor.setTimeout(() => FlowRouter.initialize(), 300);
          console.log('Initial subscription read! Router started.');
          comp.stop();
        }
      });
    });
  }
  if (Meteor.isServer) {
    Meteor.startup(() => {
      setBasicPageRoutes();
      initSitemap();
    });
  }
};
