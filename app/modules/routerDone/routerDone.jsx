// Routing

const { Col, Views } = MainApp;

// Routing bor BasicPages
const setBasicPageRoutes = () => {
  const basicPages = Col.BasicPages.find({}, {fields: {slug: 1}}).fetch();
  basicPages.forEach(page => {
    FlowRouter.route(`/${page.slug}`, {
      name: page.slug,
      action() {
        ReactLayout.render(Views.MainApp, {
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
    setBasicPageRoutes();
    // Release router for routing once all routes are declared
    Meteor.startup(() => {
      FlowRouter.initialize();
      console.log('Router done');
    });
  }
  if (Meteor.isServer) {
    setBasicPageRoutes();
    initSitemap();
  }
};
