initSubscribers = () => {
  const Subscribers = new Mongo.Collection('subscribers');
  const SubscribersSchema = new SimpleSchema({
    csoNumber: {
      type: String, optional: true, label: 'N° ordinal',
      index: true, unique: true, min: 0, max: 8
    },
    name: { type: String, label: 'Nom', min: 1, max: 256 },
    firstName: { type: String, label: 'Prénom', min: 1, max: 256 },
    ssd: { type: String, label: 'SSD', min: 1, max: 256 },
    postalCode: { type: String, label: 'CP', min: 1, max: 7 },
    city: { type: String, label: 'ville', min: 1, max: 128 },
    email: { type: String, label: 'Mail', optional: true },
    status: { type: String, label: 'Statut', optional: true },
    lastSubscription: { type: String, label: 'Dernière cotisation', min: 1, max: 12 },
    subscriptionType: { type: String, label: 'Type d\'adhésion', min: 1, max: 64 },
    tacitAgreement: { type: String, label: 'Tacite reconduction', min: 1, max: 4 },
    birthdayDate: { type: String, label: 'Date d\'anniversaire', min: 1, max: 64 },
    webSubscription: { type: String, label: 'Adhésion Web', min: 1, max: 64 },
    vetenaryStatus: { type: String, label: 'Statut vétérinaire', min: 1, max: 64 }
  });
  Meteor.users.attachSchema(SubscribersSchema);
  MainApp.Schema.SubscribersSchema = SubscribersSchema;
  MainApp.Col.Subscribers = Subscribers;
  // Fill collection with default if necessary
  if (Meteor.isServer && Subscribers.find().count() === 0) {
    console.log('Importing subscribers...');
    MainApp.Utils.importSubscribers();
  }
  console.log('Subscribers filled and exposed');
};
