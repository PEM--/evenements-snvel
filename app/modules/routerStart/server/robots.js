// Robots.txt
// Specs: http://www.robotstxt.org/robotstxt.html

// Allow indexing for all pages except admin's ones
[
  'User-agent: *',
  'Disallow: /admin/',
  'Disallow: /login/'
].forEach(line => {
  console.log('Robots.txt on', line);
  robots.addLine(line);
});
