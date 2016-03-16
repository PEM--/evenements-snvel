const PHONE_NUMBER_REGEX = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const { Schema, Col, Utils } = MainApp;

if (Meteor.isServer) {
  userTypesUpdate = () => {
    console.log('Importing user types...');
    const result = Utils.importSpreadSheet('Evènements SNVEL - Typologie participants');
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
  };
}
initUsers = () => {
  const UserTypes = new Mongo.Collection('userTypes');
  const UserTypesSchema = new SimpleSchema({
    title: { type: String, min: 2, max: 64, index: true, unique: true },
    restricted: { type: Boolean, defaultValue: false, index: true }
  });
  UserTypes.attachSchema(UserTypesSchema);
  Schema.UserTypesSchema = UserTypesSchema;
  Col.UserTypes = UserTypes;
  // Fill collection with default if necessary
  if (Meteor.isServer) {
    if (UserTypes.find().count() === 0) {
      userTypesUpdate();
    }
    // Publish
    Meteor.publish('userTypes.all', function() {
      const user = this.userId ? Meteor.users.findOne(this.userId) : null;
      const query = user && user.isAdmin() ? {} : {restricted: false};
      return UserTypes.find(query);
    });
  }
  console.log('User types filled and exposed');

  const ProfileProgramAttendant = new SimpleSchema({
    name: {type: String, label: 'Nom de l\'accompagnant', min: 1, max: 256},
    firstName: {type: String, label: 'Prénom de l\'accompagnant', min: 1, max: 256},
    prices: {type: [String], label: 'Prix & droits', minCount: 1, maxCount: 256},
  });
  const ProfileProgramSchema = new SimpleSchema({
    reference: {type: String, label: 'Référence', min: 2, max: 16},
    date: {type: String, label: 'Date d\'inscription', min: 12, max: 12, optional: true},
    status: {type: String, label: 'Statut de paiement', allowedValues: ['Inscrit', 'Attente paiement', 'Payé']},
    prices: {type: [String], label: 'Prix & droits', minCount: 1, maxCount: 256},
    attendant: {type: ProfileProgramAttendant, label: 'Accompagnant', optional: true}
  });

  const Profile = {
    category: {
      label: 'Catégorie', type: String, allowedValues() {
        return UserTypes.find().fetch().map(u => u.title);
      },
      autoValue() {
        if (!this.value) {
          const allowedValues = Schema.ProfileSchema
            .getDefinition('category').allowedValues;
          return allowedValues[0];
        }
        return this.value;
      }, view: {
        name: 'Select', label: 'Sélectionner votre catégorie :',
        placeholder: 'Votre catégorie', options() {
          return UserTypes.find().fetch().map(u => u.title);
        }
      }
    },
    csoNumber: {
      type: String, optional: true, label: 'N° ordinal',
      min: 0, max: 8, defaultValue: '', custom() {
        const defCategory = this.field('category');
        const allowedValues = Schema.ProfileSchema
          .getDefinition('category').allowedValues;
        if (defCategory.value === allowedValues[0]) {
          if (this.value.length > 1 && this.value.length <= 8) {
            return null;
          } else if (this.value.length > 8) {
            return 'csoNumberError';
          }
          return 'required';
        }
        return null;
      }, view: {
        name: 'Input', type: 'text', placeholder: 'Votre n° ordinal'
      }
    },
    organization: {
      type: String, label: 'Nom de l\'entreprise', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Votre entreprise :',
        placeholder: 'Nom de l\'entreprise ou de la structure'
      }
    },
    name: {
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
    address: {
      type: String, label: 'Adresse', min: 1, max: 256,
      defaultValue: '', view: {
        name: 'Input', type: 'text', placeholder: 'Votre rue'
      }
    },
    addressComplementary: {
      type: String, label: 'Complément d\'adresse', min: 0, max: 256,
      optional: true, defaultValue: '', view: {
        name: 'Input', type: 'text', label: 'Complément d\'adresse :',
        placeholder: 'Bâtiments, voirie, lieu-dit, ...'
      }
    },
    postalCode: {
      type: String, label: 'Code postal', min: 1, max: 7,
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
      type: String, label: 'N° de ligne fixe', min: 0, max: 16,
      optional: true, defaultValue: '', view: {
        name: 'Input', type: 'tel', placeholder: 'Votre n° de téléphone fixe'
      }
    },
    mobile: {
      type: String, label: 'N° de mobile', min: 6, max: 16,
      defaultValue: '', regEx: PHONE_NUMBER_REGEX, view: {
        name: 'Input', type: 'tel', placeholder: 'Votre n° mobile'
      }
    }
  };
  // Set UsersSchema with optional keys for profile
  const ProfileSchema = new SimpleSchema(
    Object.keys(Profile).reduce((acc, k) => {
      acc[k] = Object.assign({optional: true}, Profile[k]);
      return acc;
    }, {
      programs: {
        type: [ProfileProgramSchema], label: 'Programmes',
        minCount: 0, maxCount: 1024, defaultValue: []
      }
    })
  );
  Schema.ProfileProgramSchema = ProfileProgramSchema;
  Schema.ProfileSchema = ProfileSchema;

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
  Schema.SignOnSchema = SignOnSchema;

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
  Schema.SignUpSchema = SignUpSchema;

  const UsersSchema = new SimpleSchema({
    username: {type: String, optional: true},
    emails: {type: Array, label: 'Emails', optional: true},
    'emails.$': {type: Object},
    'emails.$.address': {
      type: String, label: 'Email', regEx: SimpleSchema.RegEx.Email,
    },
    'emails.$.verified': {type: Boolean, label: 'Email vérifié'},
    services: {
      type: Object,
      label: 'Services d\'authentification',
      optional: true,
      blackbox: true
    },
    roles: {
      type: [String], label: 'Rôles', optional: true, blackbox: true,
      defaultValue: ['public']
    },
    createdAt: {type: Date, label: 'Date de creation du profil', defaultValue() {return new Date();}},
    lastConnection: {type: Date, label: 'Date de dernière connexion', autoValue() {return new Date();}},
    profile: {
      type: ProfileSchema,
      label: 'Information utilisateur',
      optional: true
    },
    heartbeat: { type: Date, optional: true }
  });
  Meteor.users.attachSchema(UsersSchema);
  Meteor.users.helpers({
    email() { return this.emails[0].address; },
    isAdmin() { return Roles.userIsInRole(this._id, 'admin'); },
    sumPrice(program) {
      const found = this.profile.programs.find(p => p.reference === program.reference);
      const now = moment(found.date, 'DD/MM/YYYY');
      const forUser = Col.Programs.finalPrice(
        program, this.profile.category, found.prices, now
      );
      const forAttendant = found.attendant ? Col.Programs.finalPrice(
        program, 'Accompagnant', found.attendant.prices, now
      ) : 0;
      return forUser + forAttendant;
    }
  });

  Schema.UsersSchema = UsersSchema;

  if (Meteor.isServer) {
    // Publish
    Meteor.publish('users.me', function() {
      if (!this.userId) {
        return this.ready();
      }
      return Meteor.users.find(this.userId);
    });
    console.log('BasicPages filled and exposed');
  }
};
