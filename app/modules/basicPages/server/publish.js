// Fill the defaults

basicPagesInitPublish = () => {
  const BasicPages = MainApp.Col.BasicPages;

  if (BasicPages.find({}, {fileds: {_id: 1}}).count() === 0) {
    console.log('Empty BasicPages, filling it with defaults');
    BasicPages.insert({
      title: 'Conditions générales de ventes',
      slug: 'cgv',
      content: DEFAULT_CGV
    });
  }
  // Publish
  Meteor.publish('basicPages.all', function() {
    return BasicPages.find();
  });
  console.log('Basic pages filled and exposed');
  // Indexes
  Meteor.startup(function() {
    console.log('Setting up BasicPages index');
    BasicPages._ensureIndex({_id: 1, slug: 1});
  });
};
