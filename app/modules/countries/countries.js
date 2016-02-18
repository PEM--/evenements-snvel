Object.assign(countries, {
  names() {
    return countries.map(c => (
      c.name.native.fra ? c.name.native.fra.common : c.name.common
    ));
  },
  findByName(name) {
    const country = countries.names().indexOf(name);
    return countries[country];
  },
  findCca2(name) {
    return countries.findByName(name).cca2;
  }
});
