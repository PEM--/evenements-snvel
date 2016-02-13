// Routing

const { Col, Views } = MainApp;

const declareRoutes = () => {
  [ {route: '/', name: 'home', children: <Views.Welcome /> },
    {route: '/signon', name: 'signon', children: <Views.SignOnUp /> },
    {route: '/signup', name: 'signup', children: <Views.SignOnUp isSignUp={true} /> }
  ].forEach((r) => {
    FlowRouter.route(r.route, {
      name: r.name,
      action() {
        ReactLayout.render(Views.MainLayout, {
          children: r.children
        });
      }
    });
    console.log(`Route ${r.name} declared`);
  });
  // Routing bor BasicPages
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
      console.log(`Route: ${page.slug} declared`);
    }
  });
  // Not found
  FlowRouter.notFound = {
    action() {
      ReactLayout.render(Views.MainLayout, { children: <Views.NotFound /> });
    }
  };
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
          declareRoutes();
          FlowRouter.initialize();
          Meteor.defer(() => {
            const routeName = FlowRouter.getRouteName(window.location.pathname);
            FlowRouter.go(routeName ? window.location.pathname : 'not-found');
          });
          console.log('Initial subscription read! Router started.');
          comp.stop();
        }
      });
    });
  }
  if (Meteor.isServer) {
    Meteor.startup(() => {
      declareRoutes();
      initSitemap();
    });
  }
};
