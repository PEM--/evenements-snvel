const BasicPages = new Mongo.Collection('basicPages');

const BasicPagesSchema = new SimpleSchema({
  title: { label: 'Titre', type: String, max: 256 },
  slug: { label: 'URL', type: String, min: 3, max: 256},
  content: {label: 'Contenu', type: String, min: 3, max: 16384 }
});
BasicPages.attachSchema(BasicPagesSchema);

if (Meteor.isServer) {
  // Fill the defaults
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
}

export default { BasicPages, BasicPagesSchema };
