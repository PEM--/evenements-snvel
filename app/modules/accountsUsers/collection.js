initUsers = () => {
  const Profile = {
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
      index: true, unique: true,
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
    },
    company: { type: String, label: 'Nom de l\'entreprise', min: 1, max: 256 },
    lastName: { type: String, label: 'Nom du contact', min: 1, max: 256 },
    firstName: { type: String, label: 'Prénom du contact', min: 1, max: 256 },
    address: {
      type: Object, label: 'Adresse de facturation'
    },
    phone: { type: String, label: 'N° de téléphone fixe', min: 1, max: 256, optional: true },
    mobile: { type: String, label: 'N° de mobile', min: 1, max: 256, optional: true },
  };

  const ProfileSchema = new SimpleSchema(Profile);
  MainApp.Schema.ProfileSchema = ProfileSchema;

  const SignOnSchema = new SimpleSchema({
    email: {
      type: String, regEx: SimpleSchema.RegEx.Email,
      defaultValue: '', view: {
        name: 'Input', type: 'email', label: 'Entrez votre email :',
        placeholder: 'Votre email'
      }
    },
    password: {
      type: String, label: 'Mot de passe', min: 6, max: 128,
      defaultValue: '', view: {
        name: 'Input', type: 'password', label: 'Entrez votre mot de passe :',
        placeholder: 'Votre mot de passe'
      }
    }
  });
  MainApp.Schema.SignOnSchema = SignOnSchema;

  const SignUpSchema = new SimpleSchema(Object.assign({
    email: { type: String, label: 'Email', regEx: SimpleSchema.RegEx.Email },
    password: { type: String, label: 'Mot de passe', min: 6, max: 128 },
    confirm: {
      type: String, label: 'Confirmation', min: 6, max: 128,
      custom: function() {
        const def = this.field('password');
        if (def.value !== this.value) {
          return 'passwordNotConfirmMatch';
        }
        return true;
      }
    }
  }, Profile));
  MainApp.Schema.SignUpSchema = SignUpSchema;

  const UsersSchema = new SimpleSchema({
    emails: {type: [Object], label: 'Emails'},
    'emails.$.address': {
      type: String, label: 'Email', regEx: SimpleSchema.RegEx.Email
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
