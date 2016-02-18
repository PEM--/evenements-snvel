const PROFILE_CATEGORY = [
  'Adhérent SNVEL',
  'Conférencier',
  'Partenaire',
  'Filiale SNVEL',
  'Etudiant adhérent SNVEL junior',
  'Organisateur',
  'Membre du CA SNVEL'
];

const PHONE_NUMBER_REGEX = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

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
        name: 'Input', type: 'text', placeholder: 'Votre n° ordinal'
      }
    },
    company: {
      type: String, label: 'Nom de l\'entreprise', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Votre entreprise :',
        placeholder: 'Nom de l\'entreprise ou de la structure'
      }
    },
    lastName: {
      type: String, label: 'Nom du contact', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Votre représentant :',
        placeholder: 'Votre nom'
      }
    },
    firstName: {
      type: String, label: 'Prénom du contact', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', placeholder: 'Votre prénom'
      }
    },
    street: {
      type: String, label: 'Adresse', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', placeholder: 'Votre rue'
      }
    },
    streetComplementary: {
      type: String, label: 'Complément d\'adresse', min: 1, max: 256,
      optional: true, defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Complément d\'adresse :',
        placeholder: 'Bâtiments, voirie, lieu-dit, ...'
      }
    },
    postalCode: {
      type: String, label: 'Code postal', min: 1, max: 5,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Votre code postal :',
        placeholder: 'Code postal'
      }
    },
    city: {
      type: String, label: 'Votre ville', min: 1, max: 128,
      defaultValue: '', view: {
        name: 'Input', type: 'text', placeholder: 'Votre ville'
      }
    },
    country: {
      type: String, label: 'Votre pays', min: 1, max: 128,
      defaultValue: 'France', allowedValues: countries.names(),
      view: {
        name: 'Select', label: 'Sélectionner votre pays :',
        placeholder: 'Votre pays', options: countries.names()
      }
    },
    phone: {
      type: String, label: 'N° de ligne fixe', min: 1, max: 16,
      optional: true, defaultValue: '', regEx: PHONE_NUMBER_REGEX, view: {
        name: 'Input', type: 'tel', placeholder: 'Votre n° de téléphone fixe'
      }
    },
    mobile: {
      type: String, label: 'N° de mobile', min: 1, max: 16,
      optional: true, defaultValue: '', regEx: PHONE_NUMBER_REGEX, view: {
        name: 'Input', type: 'tel', placeholder: 'Votre n° mobile'
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
