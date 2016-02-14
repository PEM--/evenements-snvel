countries.names = () => countries.map(c => (
  c.name.native.fra ? c.name.native.fra.common : c.name.common
));
countries.findByName = (name) => {
  const country = countries.names().indexOf(name);
  return countries[country];
};
countries.findCca2 = (name) => countries.findByName(name).cca2;
