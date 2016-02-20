const { Col, Schema, Utils } = MainApp;

initBasicPages = () => {
  const BasicPages = new Mongo.Collection('basicPages');
  const BasicPagesSchema = new SimpleSchema({
    title: { label: 'Titre', type: String, max: 256 },
    slug: { label: 'URL', type: String, min: 3, max: 256, unique: true, index: true},
    content: {label: 'Contenu', type: String, min: 3, max: 16384 }
  });
  BasicPages.attachSchema(BasicPagesSchema);

  Col.BasicPages = BasicPages;
  Schema.BasicPagesSchema = BasicPagesSchema;

  if (Meteor.isServer) {
    if (BasicPages.find({}, {fields: {_id: 1}}).count() === 0) {
      console.log('Empty BasicPages, filling it with defaults');
      [
        {
          title: 'Conditions génèrales de ventes', slug: 'cgv',
          content: Utils.getDriveFile('Evènements SNVEL - Conditions générales de ventes')
        },
        {
          title: 'Confidentialité', slug: 'cookie',
          content: Utils.getDriveFile('Evènements SNVEL - Confidentialité')
        },
        {
          title: 'Mentions légales', slug: 'legal',
          content: Utils.getDriveFile('Evènements SNVEL - Mentions légales')
        }
      ].forEach(p => BasicPages.insert({...p}));
    }
    // Publish
    Meteor.publish('basicPages.all', function() {
      Counts.publish(this, 'basicPages.counter', BasicPages.find());
      return BasicPages.find();
    });
    console.log('BasicPages filled and exposed');
  }
};
