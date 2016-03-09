const { Schema, Col, Utils } = MainApp;

const subscribersUpdate = (callback) => {
  console.log('Importing subscribers...');
  const result = Utils.importSpreadSheet('Evènements SNVEL - Adhérents');
  Object.keys(result.rows)
    .filter((k, idx) => idx !== 0)
    .forEach((k, idx) => {
      const r = result.rows[k];
      const subscriber = {
        csoNumber: s(r[1]).trim().value(),
        name: s(r[2]).trim().toLowerCase().titleize().value(),
        firstName: s(r[3]).trim().toLowerCase().titleize().value(),
        ssd: s(r[4]).trim().value(),
        postalCode: s(r[5]).trim().value(),
        city: s(r[6]).trim().toLowerCase().titleize().value(),
        email: r[7] ? s(r[7]).trim().toLowerCase().value() : '',
        status: s(r[8]).trim().toLowerCase().capitalize().value(),
        lastSubscription: s(r[9]).trim().value(),
        subscriptionType: s(r[10]).trim().toLowerCase().value(),
        tacitAgreement: s(r[11]).trim().value(),
        birthdayDate: s(r[12]).trim().value(),
        webSubscription: r[13] ? s(r[13]).trim().value() : '',
        vetenaryStatus: s(r[14]).trim().toLowerCase().capitalize().value()
      };
      console.log('Insert subscriber from line', idx, 'and CSO', subscriber.csoNumber);
      try {
        Col.Subscribers.insert(subscriber);
      } catch (err) {
        console.warn('Subscriber update error at line', idx, 'and error', err);
        if (callback) {
          callback(idx, err);
        }
      }
    });
};

initSubscribers = () => {
  const Subscribers = new Mongo.Collection('subscribers');
  const SubscribersSchema = new SimpleSchema({
    csoNumber: {
      type: String, optional: true, label: 'N° ordinal',
      index: true, unique: true, min: 0, max: 8
    },
    name: {type: String, label: 'Nom', min: 1, max: 256},
    firstName: {type: String, label: 'Prénom', min: 0, max: 256, optional: true, defaultValue: ''},
    ssd: {type: String, label: 'SSD', min: 0, max: 256, optional: true, defaultValue: ''},
    postalCode: {type: String, label: 'CP', min: 0, max: 7, optional: true, defaultValue: ''},
    city: {type: String, label: 'ville', min: 0, max: 128, optional: true, defaultValue: ''},
    email: {type: String, label: 'Mail', optional: true },
    status: {type: String, label: 'Statut', optional: true },
    lastSubscription: {type: String, label: 'Dernière cotisation', min: 0, max: 12, optional: true, defaultValue: ''},
    subscriptionType: {type: String, label: 'Type d\'adhésion', min: 0, max: 64, optional: true, defaultValue: ''},
    tacitAgreement: {type: String, label: 'Tacite reconduction', min: 0, max: 4, optional: true, defaultValue: ''},
    birthdayDate: {type: String, label: 'Date d\'anniversaire', min: 0, max: 64, optional: true, defaultValue: ''},
    webSubscription: {type: String, label: 'Adhésion Web', min: 0, max: 64, optional: true, defaultValue: ''},
    vetenaryStatus: {type: String, label: 'Statut vétérinaire', min: 0, max: 64, optional: true, defaultValue: ''}
  });
  Subscribers.attachSchema(SubscribersSchema);
  Schema.SubscribersSchema = SubscribersSchema;
  Col.Subscribers = Subscribers;
  // Fill collection with default if necessary
  if (Meteor.isServer && Subscribers.find().count() === 0) {
    subscribersUpdate();
  }
  console.log('Subscribers filled and exposed');

  // Methods
  Meteor.methods({
    'subscribers.update': function() {
      if (!this.userId) { throw new Meteor.Error('unauthorized'); }
      const user = Meteor.users.findOne(this.userId);
      if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
      if (Meteor.isServer) {
        Col.Subscribers.remove({});
        subscribersUpdate((idx, err) => {
          throw new Meteor.Error(403, `Erreur à la ligne ${idx}: ${err.toString()}`);
        });
      }
    }
  });
};
