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
  Col.Programs = Programs;
  // Fill collection with default if necessary
  if (Meteor.isServer) {
    if (Programs.find().count() === 0) {
      console.log('Importing programs...');
      Utils.importPrograms();
    }
    // Publish
    Meteor.publish('programs.all', function() {
      return Programs.find();
    });
  }
  console.log('Programs filled and exposed');
};
