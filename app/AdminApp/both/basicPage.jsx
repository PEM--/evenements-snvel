Col.BasicPages = new Mongo.Collection('basicPages');

Schema.BasicPages = new SimpleSchema({
  title: {
    type: String, max: 256
  }
});
