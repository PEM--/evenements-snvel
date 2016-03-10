const { Col, Schema, Utils } = MainApp;

Utils.BASIC_PAGES = BASIC_PAGES = [
  {
    title: 'Conditions génèrales de ventes', slug: 'cgv',
    markdown: 'Evènements SNVEL - Conditions générales de ventes'
  },
  {
    title: 'Confidentialité', slug: 'cookie',
    markdown: 'Evènements SNVEL - Confidentialité'
  },
  {
    title: 'Mentions légales', slug: 'legal',
    markdown: 'Evènements SNVEL - Mentions légales'
  }
];

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
      BASIC_PAGES
        .map(p => ({
          title: p.title, slug: p.slug, content: Utils.getDriveFile(p.markdown)
        }))
        .forEach(p => BasicPages.insert({...p}));
    }
    // Publish
    Meteor.publish('basicPages.all', function() {
      return BasicPages.find();
    });
    Meteor.publish('basicPages.withCounter', function() {
      Counts.publish(this, 'basicPages.counter', BasicPages.find());
      return BasicPages.find();
    });
    console.log('BasicPages filled and exposed');
  }

  Meteor.methods({
    'basicPages.update': function(slug) {
      if (!this.userId) { throw new Meteor.Error('unauthorized'); }
      const user = Meteor.users.findOne(this.userId);
      if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
      check(slug, String);
      const found = BASIC_PAGES.find(p => p.slug === slug);
      if (Meteor.isServer) {
        Col.adminJobs.processJobs('basicPages.update', function(job) {
          const content = Utils.getDriveFile(found.markdown);
          BasicPages.update({ slug }, {$set: {content}});
          job.done();
        });
        const j = new Job(Col.adminJobs, 'basicPages.update', {});
        return j.save();
      }
    }
  });
};
