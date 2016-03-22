// Sitempas

initSitemap = () => {
  // Creating sitemaps for all routes
  const allRoutes = _.filter(_.pluck(FlowRouter._routes, 'path'), function(route) {
    // Filter unwanted toutes in SEO
    return (
      // Remove all admin routes
      !s.include(route, 'admin') &&
      // Remove not found route
      !s.include(route, 'notfound') &&
      // Remove all login, logout routes
      !s.include(route, 'login') && !s.include(route, 'password') &&
      !s.include(route, 'email') &&
      // Remove all payment & screens related to signedin routes
      !s.include(route, 'payment') && !s.include(route, 'invoice') &&
      !s.include(route, 'subscribe'));
  });
  const pages = allRoutes.map(function(route) {
    console.log('Route', route, 'added to /sitemap.xml');
    return {page: route, lastmod: new Date()};
  });
  sitemaps.add('sitemap.xml', pages);
};
