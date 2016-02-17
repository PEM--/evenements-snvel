initBasicPages = () => {
  const BasicPages = new Mongo.Collection('basicPages');
  const BasicPagesSchema = new SimpleSchema({
    title: { label: 'Titre', type: String, max: 256 },
    slug: { label: 'URL', type: String, min: 3, max: 256, unique: true, index: true},
    content: {label: 'Contenu', type: String, min: 3, max: 16384 }
  });
  BasicPages.attachSchema(BasicPagesSchema);

  MainApp.Col.BasicPages = BasicPages;
  MainApp.Schema.BasicPagesSchema = BasicPagesSchema;

  if (Meteor.isServer) {
    if (BasicPages.find({}, {fields: {_id: 1}}).count() === 0) {
      console.log('Empty BasicPages, filling it with defaults');
      [
        {title: 'Conditions génèrales de ventes', slug: 'cgv', content: DEFAULT_CGV},
        {title: 'Confidentialité', slug: 'cookie', content: DEFAULT_COOKIE},
        {title: 'Mentions légales', slug: 'legal', content: DEFAULT_LEGAL}
      ].forEach(p => BasicPages.insert({...p}));
    }
    // Publish
    Meteor.publish('basicPages.all', function() {
      const cursor = BasicPages.find();
      Counts.publish(this, 'basicPages.counter', cursor);
      return cursor;
    });
    console.log('BasicPages filled and exposed');
  }
};
