const { Utils, Schema, Col } = MainApp;

initPrograms = () => {
  const Programs = new Mongo.Collection('programs');
  const ConferencesSchema = new SimpleSchema({
    title: { type: String, label: 'Conférences', min: 0, max: 64 },
    begin: { type: Date, label: 'Début' },
    fin: { type: Date, label: 'Fin', optional: true },
    moderator: { type: String, label: 'Modérateur(s)', min: 0, max: 512 },
    speaker: { type: String, label: 'Intervenants(s)', min: 0, max: 512 },
    description: { type: String, label: 'Description', min: 0, max: 512 },
    code: { type: String, label: 'Codification', min: 1, max: 64 }
  });
  const SessionsSchema = new SimpleSchema({
    title: { type: String, label: 'Session', min: 2, max: 64 },
    conference: { type: [ConferencesSchema], label: 'Conférences', minCount: 1, max: 512 }
  });
  const EventsSchema = new SimpleSchema({
    title: { type: String, label: 'Type programme', min: 2, max: 64 },
    session: { type: [SessionsSchema], label: 'Sessions', minCount: 1, max: 512 }
  });
  const ValueForType = new SimpleSchema({
    category: { type: String, min: 2, max: 64 },
    amout: { type: Number }
  });
  const Discounts = new SimpleSchema({
    code: { type: String, label: 'Codification', min: 1, max: 64 },
    amounts: { type: [ValueForType], label: 'Montant par population', min: 1, max: 64 }
  });
  const ProgramsSchema = new SimpleSchema({
    reference: { type: String, label: 'Référence', index: true, unique: true, min: 2, max: 16 },
    title: { type: String, label: 'Titre', min: 2, max: 32 },
    location: { type: String, label: 'Lieu', min: 2, max: 32 },
    period: { type: String, label: 'Période (date)', min: 2, max: 32 },
    description: { type: String, label: 'Description', min: 2, max: 512 },
    begin: {type: Date, index: true, label: 'Début' },
    end: {type: Date, index: true, label: 'Fin' },
    lattidure: {type: String, label: 'Lattitude', min: 2, max: 16},
    longitude: {type: String, label: 'Longitude', min: 2, max: 16},
    zoom: {type: String, label: 'Zoom', min: 1, max: 2, allowedValues: (() => {
      let count = 2, res = [];
      while (count++ < 21) {
        res.push(String(count));
      }
      return res;
    })()},
    events: { type: [EventsSchema], label: 'Evènements', minCount: 1, maxCount: 512 }
  });
  Meteor.users.attachSchema(ProgramsSchema);
  Schema.ProgramsSchema = ProgramsSchema;
  Schema.EventsSchema = EventsSchema;
  Schema.ConferencesSchema = ConferencesSchema;
  Schema.SessionsSchema = SessionsSchema;
  Schema.EventsSchema = EventsSchema;
  Schema.Discounts = Discounts;
  Schema.ValueForType = ValueForType;
  Col.Programs = Programs;
  // Fill collection with default if necessary
  if (Meteor.isServer) {
    if (Programs.find().count() === 0) {
      console.log('Importing programs...');
      const spreadsheetName = 'Evènements SNVEL - Programmes';
      const programsSheet = Utils.importSpreadSheet(spreadsheetName);
      const programs = Object.keys(programsSheet.rows)
        .filter((pKey, pIdx) => pIdx !== 0)
        .map((pKey, pIdx) => {
          const eventsSheet = Utils.importSpreadSheet(spreadsheetName, 2 + pIdx);
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
      console.warn('Importing prices...');


      console.warn('Importing discounts...');


    }
    // Publish
    Meteor.publish('programs.all', function() {
      return Programs.find();
    });
  }
  console.log('Programs filled and exposed');
};
