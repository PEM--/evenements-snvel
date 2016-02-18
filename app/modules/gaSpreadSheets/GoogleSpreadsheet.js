const serviceEmail = 'evenements-snvel@evenements-snvel.iam.gserviceaccount.com';

MainApp.Utils.importSubscribers = function() {
  const spreadsheetName = 'Evènements SNVEL - Adhérents';
  console.log('Fetching data from Google Drive:', spreadsheetName);
  const result = Meteor.call('spreadsheet/fetch2', spreadsheetName, '1', {email: serviceEmail});
  Object.keys(result.rows).forEach((k, idx) => {
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
    console.log('Insert line', idx, subscriber.csoNumber);
    MainApp.Col.Subscribers.insert(subscriber);
  });
};
