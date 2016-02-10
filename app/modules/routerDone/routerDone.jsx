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
        if (globalSubs.ready()) {
          console.log('MainApp', MainApp);
          initBasicPages();
          setBasicPageRoutes();
          FlowRouter.initialize();
          console.log('Initial subscription read! Router started.');
          console.log('comp', comp);
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
