const { Schema, Col, Utils } = MainApp;

if (Meteor.isServer) {
  subscribersUpdate = function(callback, future) {
    console.log('Importing subscribers...');
    const result = Utils.importSpreadSheet('Evènements SNVEL - Adhérents');
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
    let line = 1;
    const subscribeUnitary = () => {
      const subscriber = subscribers.pop();
      if (subscriber) {
        console.log('Insert subscriber line', line, 'with CSO', subscriber.csoNumber);
        Col.Subscribers.insert(subscriber);
        line++;
        Meteor.defer(subscribeUnitary);
        if (future) { return future.wait(); }
      } else if (callback) {
        callback();
      }
    };
    subscribeUnitary();

      //
      //
      //   console.log('Insert subscriber from line', idx, 'and CSO', subscriber.csoNumber);
      //   Meteor.defer(() => {
      //     try {
      //       Col.Subscribers.insert(subscriber);
      //     } catch (err) {
      //       console.warn('Subscriber update error at line', idx, 'and error', err);
      //       if (callback) {
      //         callback(idx, err);
      //       }
      //     }
      //   });
      // });
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
  const Future = Meteor.npmRequire('fibers/future');
  const longIteration = function(callback) {
    const future = new Future();
    const NB = 100000;
    let arr = [];
    for (let i = 0; i < NB; i++) {
      arr.push(i);
    }
    // Meteor.setTimeout(() => {future.return();}, 2000);
    // const unpop = () => {
    //   const innerfut = new Future();
    //   const poped = arr.pop();
    //   if (poped) {
    //     console.log('Arr', poped);
    //     Meteor.defer(unpop);
    //     return innerfut.wait();
    //   } else if (callback) {
    //     callback();
    //     return future.return();
    //   }
    //   return innerfut.wait();
    // };
    // unpop().wait();
    return future.wait();
  };
  const sleep = function(ms, callback, future) {
    console.log('longIteration: started');
    const fut = new Future();
    setTimeout(function() {
      // longIteration(callback);
      console.log('longIteration: done');
      callback();
      fut.return();
    }, ms);
    return fut.wait();
  };
  Meteor.methods({
    'subscribers.temp': function() {
      if (!this.userId) { throw new Meteor.Error('unauthorized'); }
      const user = Meteor.users.findOne(this.userId);
      if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
      Col.Subscribers.remove({});
      this.unblock();
      const future = new Future();
      subscribersUpdate(function(idx, err) {
        console.log('Subscribers updated');
        if (err) {
          return future.throw(403, `Erreur à la ligne ${idx + 2}: ${err.toString()}`);
        }
        return future.return(true);
      }, future);
      return future.wait();
    },
    'subscribers.update': function() {
      console.log('subscribers.update: started');
      this.unblock();
      const future = new Future();
      sleep(2 * 1000, () => {
        console.log('subscribers.update: done');
        return future.return(true);
      });
      return future.wait();
    }
  }
  );
}
