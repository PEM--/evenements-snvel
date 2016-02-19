const serviceEmail = 'evenements-snvel@evenements-snvel.iam.gserviceaccount.com';

const { Utils, Col } = MainApp;

Object.assign(Utils, {
  importUserTypes() {
    const spreadsheetName = 'Evènements SNVEL - Typologie participants';
    console.log('Fetching data from Google Drive:', spreadsheetName);
    const result = Meteor.call('spreadsheet/fetch2', spreadsheetName, '1', {email: serviceEmail});
    Object.keys(result.rows)
      .filter((k, idx) => idx !== 0)
      .forEach((k, idx) => {
        const r = result.rows[k];
        const userType = {
          title: s(r[1]).trim().value(),
          restricted: r[2] ? true : false
        };
        console.log('Insert user type from line', idx, 'and', userType, userType.restricted);
        Col.UserTypes.insert(userType);
      });
  },
  importSubscribers() {
    const spreadsheetName = 'Evènements SNVEL - Adhérents';
    console.log('Fetching data from Google Drive:', spreadsheetName);
    const result = Meteor.call('spreadsheet/fetch2', spreadsheetName, '1', {email: serviceEmail});
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
        Col.Subscribers.insert(subscriber);
      });
  },
  importPrograms() {
    const spreadsheetName = 'Evènements SNVEL - Programmes';
    console.log('Fetching data from Google Drive:', spreadsheetName);
    const programsSheet = Meteor.call('spreadsheet/fetch2', spreadsheetName, '1', {email: serviceEmail});
    const programs = Object.keys(programsSheet.rows)
      .filter((pKey, pIdx) => pIdx !== 0)
      .map((pKey, pIdx) => {
        const eventsSheet = Meteor.call('spreadsheet/fetch2', spreadsheetName, String(2 + pIdx), {email: serviceEmail});
        const events = Object.keys(eventsSheet.rows)
          .filter((rKey, rIdx) => rIdx !== 0)
          .reduce((acc, rKey) => {
            const rEvent = eventsSheet.rows[rKey];
            const eventTitle = s(rEvent[1]).trim().value();
            let foundEvent = acc.find(c => c.title === eventTitle);
            if (!foundEvent) {
              acc.push({ title: eventTitle, sessions: [] });
              foundEvent = acc[0];
            }
            const sessionTitle = rEvent[2] ? s(rEvent[2]).trim().value() : '';
            let foundSession = foundEvent.sessions.find(s => s.title === sessionTitle);
            if (!foundSession) {
              foundEvent.sessions.push({ title: sessionTitle, conferences: [] });
              foundSession = foundEvent.sessions[0];
            }
            foundSession.conferences.push({
              title: rEvent[3] ? s(rEvent[3]).trim().value() : '',
              begin: moment(s(rEvent[4]).trim().value(), 'DD/MM/YYYY HH:mm:ss').toDate(),
              fin: moment(s(rEvent[5]).trim().value(), 'DD/MM/YYYY HH:mm:ss').toDate(),
              moderator: rEvent[6] ? s(rEvent[6]).trim().value() : '',
              speaker: rEvent[7] ? s(rEvent[7]).trim().value() : '',
              description: rEvent[8] ? s(rEvent[8]).trim().value() : '',
              code: s(rEvent[9]).trim().value()
            });
            return acc;
          }, []);
        const rProgram = programsSheet.rows[pKey];
        const program = {
          reference: s(rProgram[1]).toLowerCase().trim().value(),
          title: s(rProgram[2]).trim().value(),
          location: s(rProgram[3]).trim().value(),
          period: s(rProgram[4]).trim().value(),
          description: s(rProgram[5]).trim().value(),
          begin: moment(s(rProgram[6]).trim().value(), 'DD/MM/YYYY').toDate(),
          end: moment(s(rProgram[7]).trim().value(), 'DD/MM/YYYY').toDate(),
          lattidure: String(rProgram[8]),
          longitude: String(rProgram[9]),
          zoom: String(rProgram[10]),
          events
        };
        console.log('Insert program from line', pIdx, 'and reference', program.reference);
        Col.Programs.insert(program);
      });
  }
});
