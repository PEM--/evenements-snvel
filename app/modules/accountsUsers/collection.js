initUsers = () => {
  const ProfileSchema = new SimpleSchema({
    category: {
      label: 'Catégorie',
      type: String,
      allowedValues: [
        'Adhérent SNVEL',
        'Conférencier',
        'Partenaire',
        'Filiale SNVEL',
        'Etudiant adhérent SNVEL junior',
        'Organisateur',
        'Membre du CA SNVEL'
      ],
      autoValue: function() {
        const allowedValues = MainApp.Schema.ProfileSchema.getAllowedValuesForKey('category');
        return allowedValues[0];
      }
    },
    csoNumber: {
      type: String, optional: true, label: 'N° ordinal',
      custom: function() {
        const def = this.field('category');
        const allowedValues = MainApp.Schema.ProfileSchema.getAllowedValuesForKey('category');
        if (def.value === allowedValues[0]) {
          if (!this.value || (this.value.length < 1 && this.value.length > 7)) {
            return 'csoNumberError';
          }
        }
        return true;
      }
    }
  });
  MainApp.Schema.ProfileSchema = ProfileSchema;

  const UsersSchema = new SimpleSchema({
    emails: {type: [Object], label: 'Emails'},
    'emails.$.address': {
      type: String,
      label: 'Email',
      regEx: SimpleSchema.RegEx.Email
    },
    'emails.$.verified': {type: Boolean, label: 'Email vérifié'},
    services: {
      type: Object,
      label: 'Services d\'authentification',
      optional: true,
      blackbox: true
    },
    roles: { type: [String], label: 'Rôles', optional: true, defaultValue: ['public']},
    lastConnection: {type: Date, label: 'Dernière connexion réalisée le', defaultValue: new Date()},
    profile: {
      type: MainApp.Schema.ProfileSchema,
      label: 'Information utilisateur',
      optional: true
    }
  });
  Meteor.users.attachSchema(UsersSchema);

  MainApp.Schema.UsersSchema = UsersSchema;
};
