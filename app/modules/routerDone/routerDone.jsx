// Routing

const { Col, Views } = MainApp;

const ROUTE_PROGRAM = 'univ2016';

const declareRoutes = () => {
  if (Meteor.isClient) { Session.setDefault('isMenuOpen', false); }
  [ {route: '/', name: 'home', children: <Views.Welcome program={ROUTE_PROGRAM} /> },
    {route: '/signon', name: 'signon', children: <Views.SignOn /> },
    {route: '/signup', name: 'signup', children: <Views.SignUp /> },
    {route: '/emailconfirm', name: 'emailconfirm', children: <Views.EmailConfirm /> },
    {route: '/passwordforgotten', name: 'passwordforgotten', children: <Views.PaswordForgotten /> },
    {route: '/passwordwaiting', name: 'passwordwaiting', children: <Views.EmailConfirm forPassword={true} /> },
    {route: '/program', name: 'program', children: <Views.Program program={ROUTE_PROGRAM} /> },
    {route: '/subscribe', name: 'subscribe', children: <Views.Subscribe program={ROUTE_PROGRAM} /> },
    {route: '/payment', name: 'payment', children: <Views.Payment program={ROUTE_PROGRAM} /> },
    {route: '/paymentwaiting', name: 'paymentwaiting', children: <Views.PaymentWaiting program={ROUTE_PROGRAM} /> },
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
  // Routing when email is verified
  FlowRouter.route('/verify-email/:token', {
    action() {
      const token = FlowRouter.getParam('token');
      console.log('Verification token', token);
      if (Meteor.isClient) {
        Accounts.verifyEmail(token, (err) => {
          if (err) {
            console.warn('Verification token error', err);
            return FlowRouter.go('not-found');
          }
          FlowRouter.go('subscribe');
        });
      }
      if (Meteor.isServer) {
        ReactLayout.render(Views.MainLayout, { children: <Views.VerifiedEmail /> });
      }
    }
  });
  // Routing when password change is verified
  FlowRouter.route('/reset-password/:token', {
    action() {
      const token = FlowRouter.getParam('token');
      console.log('Verification token', token);
      if (Meteor.isClient) {
        ReactLayout.render(Views.MainLayout, { children: <Views.PasswordChange token={token} /> });
      }
      if (Meteor.isServer) {
        ReactLayout.render(Views.MainLayout, { children: <Views.VerifiedEmail /> });
      }
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
  initPayment();
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
          FlowRouter.initialize();
          // const routeName = FlowRouter.getRouteName(window.location.pathname);
          // console.log('window.location.pathname', window.location.pathname, 'routeName', routeName);
          // FlowRouter.go(routeName ? window.location.pathname : 'not-found');
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
