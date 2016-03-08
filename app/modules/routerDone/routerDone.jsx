// Routing

const { Col, Views } = MainApp;

const declareRoutes = () => {
  if (Meteor.isClient) { Session.setDefault('isMenuOpen', false); }
  [ {route: '/', name: 'home', children: <Views.Welcome /> },
    {route: '/signon', name: 'signon', children: <Views.SignOn /> },
    {route: '/signup', name: 'signup', children: <Views.SignUp /> },
    {route: '/emailconfirm', name: 'emailconfirm', children: <Views.EmailConfirm /> },
    {route: '/verify-email/:token', name: 'emailconfirm', children: <Views.VerifiedEmail /> },
    {route: '/program', name: 'program', children: <Views.Program /> },
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
  FlowRouter.triggers.enter([
    function(context, redirect) {
      if (!Meteor.userId()) {
        Session.set('beforeSignon', context.path);
        redirect('signon');
      }
    }
  ], {only: ['admin', 'subscribe']});
  FlowRouter.triggers.exit([
    // Close menu on route change
    () => {
      if (Meteor.isClient) {
        if (Session.get('isMenuOpen')) {
          Session.set('isMenuOpen', false);
        }
      }
    }
  ]);
};

const initNotFoundRoute = () => {
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
  initSubscribers();
  initPrograms();
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
        Meteor.defer(() => {
          initNotFoundRoute();
          FlowRouter.initialize({hashbang: true});
          const routeName = FlowRouter.getRouteName(window.location.pathname);
          console.log('window.location.pathname', window.location.pathname, 'routeName', routeName);
          FlowRouter.go(routeName ? window.location.pathname : 'not-found');
        });
        console.log('Initial subscription read! Router started.');
        comp.stop();
      }
    });
  }
  if (Meteor.isServer) {
    initSubscriptionCache();
    appStartup();
    initSitemap();
    initNotFoundRoute();
  }
});
