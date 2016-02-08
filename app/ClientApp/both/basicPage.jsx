Col.BasicPages = new Mongo.Collection('basicPages');

Schema.BasicPages = new SimpleSchema({
  title: { label: 'Titre', type: String, max: 256 },
  slug: { label: 'URL', type: String, min: 3, max: 256},
  content: {label: 'Contenu', type: String, min: 3, max: 2048 }
});

Col.BasicPages.attachSchema(Schema.BasicPages);

if (Meteor.isServer) {
  if (Col.BasicPages.find({}, {fileds: {_id: 1}}).count() === 0) {
    console.log('Empty BasicPages, filling it with defaults');
  }
}
