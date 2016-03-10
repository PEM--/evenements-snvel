const { Schema, Col, Utils } = MainApp;

if (Meteor.isServer) {
  subscribersUpdate = function(callback) {
    console.log('Importing subscribers...');
    const result = Utils.importSpreadSheet('Evènements SNVEL - Adhérents Test Base');
    let subscribers = Object.keys(result.rows)
      .filter((k, idx) => idx !== 0)
      .map(k => {
        const r = result.rows[k];
        return {
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
      });
    let error = null;
    let line = 2;
    try {
      subscribers.forEach((s, idx) => {
        console.log('Insert subscriber line', idx + 2, 'with CSO', s.csoNumber);
        Col.Subscribers.insert(s);
        line++;
      });
    } catch (err) {
      console.warn('Insertion failed at:', line, 'with error:', err);
      error = { line, err };
    }
    if (callback) { callback(error); }
  };
}

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
};

  // Methods
if (Meteor.isServer) {
  Col.adminJobs.processJobs('subscribers.update', function(job) {
    console.log('Job started');
    Col.Subscribers.remove({});
    subscribersUpdate((err) => {
      if (err) {
        console.warn('Job failed', err);
      }
      console.log('Job ended');
      job.done();
    });
  });
  Col.adminJobs.processJobs('test', function(job) {
    console.log('Job started');
    Meteor.setTimeout(() => {
      console.log('Job ended');
      job.done();
    });
  });
  Meteor.methods({
    'subscribers.update': function() {
      if (!this.userId) { throw new Meteor.Error('unauthorized'); }
      const user = Meteor.users.findOne(this.userId);
      if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
      const j = new Job(Col.adminJobs, 'test', {});
      return j.save();
    }
  });
}
