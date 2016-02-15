// Routing

const { Col, Views } = MainApp;

const declareRoutes = () => {
  if (Meteor.isClient) { Session.setDefault('isMenuOpen', false); }
  [ {route: '/', name: 'home', children: <Views.Welcome /> },
    {route: '/signon', name: 'signon', children: <Views.SignOn /> },
    {route: '/signup', name: 'signup', children: <Views.SignUp /> },
    {route: '/presentation', name: 'presentation', children: <Views.Presentation /> },
    {route: '/subscribe', name: 'subscribe', children: <Views.Subscribe /> },
    {route: '/admin', name: 'admin', children: <Views.Admin /> }
  ].forEach(r => {
    FlowRouter.route(r.route, {
      name: r.name,
      action() {
        ReactLayout.render(Views.MainLayout, { children: r.children });
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
  // FlowRouter.triggers.enter([
  //   function(context, redirect) {
  //     if (!Meteor.userId()) {
  //       redirect('signon');
  //     }
  //   }
  // ], {only: ['admin', 'subscribe']});
  FlowRouter.triggers.exit([
    // Close menu on route change
    () => {if (Meteor.isClient) { Session.set('isMenuOpen', false); }}
  ]);
  Accounts.onLogin(function() {
    console.log('*** USER IS LOGGED-IN !!!');
    if (Meteor.isClient) {
      const name = FlowRouter.current().name;
      if (name === 'signon') {
        FlowRouter.go('/');
      }
    }
  });
  // Not found
  FlowRouter.notFound = {
    action() {
      ReactLayout.render(Views.MainLayout, { children: <Views.NotFound /> });
    }
  };
};

appStartup = () => {
  initBasicPages();
  initUsers();
  initSocialLinks();
  declareRoutes();
};

// Release router for routing once all routes are declared
Meteor.startup(() => {
  if (Meteor.isClient) {
    initSubscriptionCache();
    Tracker.autorun((comp) => {
      console.log('Waiting for initial subscriptions');
      areSubsReady = globalSubs.ready();
      if (areSubsReady) {
        console.log('MainApp received subscription');
        appStartup();
        FlowRouter.initialize();
        Meteor.defer(() => {
          const routeName = FlowRouter.getRouteName(window.location.pathname);
          FlowRouter.go(routeName ? window.location.pathname : 'not-found');
        });
        console.log('Initial subscription read! Router started.');
        comp.stop();
      }
    });
  } else {
    initSubscriptionCache();
    appStartup();
    initSitemap();
  }
});
