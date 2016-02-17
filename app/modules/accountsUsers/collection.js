const PROFILE_CATEGORY = [
  'Adhérent SNVEL',
  'Conférencier',
  'Partenaire',
  'Filiale SNVEL',
  'Etudiant adhérent SNVEL junior',
  'Organisateur',
  'Membre du CA SNVEL'
];

initUsers = () => {
  const Profile = {
    category: {
      label: 'Catégorie', type: String, allowedValues: PROFILE_CATEGORY,
      autoValue: function() {
        const allowedValues = MainApp.Schema.ProfileSchema
          .getDefinition('category').allowedValues;
        return allowedValues[0];
      }, view: {
        name: 'Select', label: 'Sélectionner votre catégorie :',
        placeholder: 'Votre catégorie', options: PROFILE_CATEGORY
      }
    },
    csoNumber: {
      type: String, optional: true, label: 'N° ordinal',
      index: true, unique: true, min: 1, max: 8,
      custom: function() {
        const def = this.field('category');
        const allowedValues = MainApp.Schema.ProfileSchema
          .getDefinition('category').allowedValues;
        if (def.value === allowedValues[0]) {
          if (!this.value || (this.value.length < 1 && this.value.length > 7)) {
            return 'csoNumberError';
          }
        }
        return true;
      }, defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Entrez votre n° ordinal :',
        placeholder: 'Votre n° ordinal'
      }
    },
    company: {
      type: String, label: 'Nom de l\'entreprise', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Entrez le nom de notre entreprise :',
        placeholder: 'Votre entreprise'
      }
    },
    lastName: {
      type: String, label: 'Nom du contact', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Entrez le nom de votre représentant :',
        placeholder: 'Votre nom'
      }
    },
    firstName: {
      type: String, label: 'Prénom du contact', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Votre prénom :',
        placeholder: 'Votre prénom'
      }
    },
    address: {
      type: String, label: 'Adresse de facturation', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Votre adresse de facturation :',
        placeholder: 'Votre rue'
      }
    },
    phone: {
      type: String, label: 'N° de téléphone fixe', min: 1, max: 256,
      optional: true, defaultValue: '', view: {
        name: 'Input', type: 'tel', label: 'Entrez notre n° de ligne fixe :',
        placeholder: 'Votre n° de téléphone fixe'
      }
    },
    mobile: {
      type: String, label: 'N° de mobile', min: 1, max: 256, optional: true,
      defaultValue: '', view: {
        name: 'Input', type: 'tel', label: 'Entrez n° de mobile :',
        placeholder: 'Votre n° mobile'
      }
    }
  };

  const ProfileSchema = new SimpleSchema(Profile);
  MainApp.Schema.ProfileSchema = ProfileSchema;

  const SignOnSchema = new SimpleSchema({
    email: {
      type: String, label: 'Email', regEx: SimpleSchema.RegEx.Email,
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
    email: {
      type: String, label: 'Email', regEx: SimpleSchema.RegEx.Email,
      defaultValue: '', view: {
        name: 'Input', type: 'email', label: 'Entrez votre email :',
        placeholder: 'Votre email'
      }
    },
    password: {
      type: String, label: 'Mot de passe', min: 6, max: 128,
      defaultValue: '', view: {
        name: 'Password', label: 'Choisissez un mot de passe :',
        placeholder: 'Votre mot de passe',
        hint: 'Votre mot de passe devrait contenir plusieurs majuscules, minuscules, chiffres et symboles.'
      }
    },
    confirm: {
      type: String, label: 'Confirmation', min: 6, max: 128,
      custom: function() {
        const def = this.field('password');
        if (def.value !== this.value) {
          return 'passwordNotConfirmMatch';
        }
        return true;
      }, defaultValue: '', view: {
        name: 'Input', type: 'password',
        label: 'Confirmer votre mot de passe :',
        placeholder: 'Votre mot de passe'
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
    roles: {type: [String], label: 'Rôles', optional: true, defaultValue: ['public']},
    lastConnection: {type: Date, label: 'Dernière connexion réalisée le', defaultValue: new Date()},
    profile: {
      type: MainApp.Schema.ProfileSchema,
      label: 'Information utilisateur',
      optional: true
    }
  });
  Meteor.users.attachSchema(UsersSchema);
  Meteor.users.helpers({
    isAdmin() { return Roles.userIsInRole(this._id, 'admin'); }
  });

  MainApp.Schema.UsersSchema = UsersSchema;

  if (Meteor.isServer) {
    // Publish
    Meteor.publish('users.me', function() {
      if (!this.userId) {
        return this.ready();
      }
      return Meteor.users.find(this.userId);
    });
    // console.log('BasicPages filled and exposed');
  }
};
