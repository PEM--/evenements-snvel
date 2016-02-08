initBasicPages = () => {
  const BasicPages = new Mongo.Collection('basicPages');
  const BasicPagesSchema = new SimpleSchema({
    title: { label: 'Titre', type: String, max: 256 },
    slug: { label: 'URL', type: String, min: 3, max: 256},
    content: {label: 'Contenu', type: String, min: 3, max: 16384 }
  });
  BasicPages.attachSchema(BasicPagesSchema);

  MainApp.Col.BasicPages = BasicPages;
  MainApp.Schema.BasicPagesSchema = BasicPagesSchema;

  if (Meteor.isServer) {
    basicPagesInitPublish();
  }
};
