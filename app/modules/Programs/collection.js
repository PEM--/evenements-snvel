initPrograms = () => {
  const Programs = new Mongo.Collection('programs');
  const ProgramsSchema = new SimpleSchema({
    reference: { type: String, label: 'Référence', index: true, unique: true, min: 2, max: 16 },
    title: { type: String, label: 'Titre', min: 2, max: 32 },
    period: { type: String, label: 'Période (date)', min: 2, max: 32 },
    location: { type: String, label: 'Lieu', min: 2, max: 32 },
    description: { type: String, label: 'Description', min: 2, max: 512 },
    begin: {type: Date, index: true, label: 'Début' },
    end: {type: Date, index: true, label: 'Fin' },
    lattidure: {type: String, label: 'Lattitude', min: 2, max: 16},
    longitude: {type: String, label: 'Longitude', min: 2, max: 16},
    zoom: {type: String, label: 'Zoom', min: 1, max: 2/*, allowedValues: (() => {
      
      return [4];
    })()*/}

    // Programmes	Préiode (date)	Lieu	Description	Début	Fin	Lattitude	Longitude	Zoom
  });
  Meteor.users.attachSchema(ProgramsSchema);
  MainApp.Schema.ProgramsSchema = ProgramsSchema;
  MainApp.Col.Programs = Programs;
  // Fill collection with default if necessary
  if (Meteor.isServer && Programs.find().count() === 0) {
    console.log('Importing programs...');
    // MainApp.Utils.importPrograms();
  }
  console.log('Programs filled and exposed');
};
