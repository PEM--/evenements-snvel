const PHONE_NUMBER_REGEX = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const { Schema, Col, Utils } = MainApp;

if (Meteor.isServer) {
  const userTypesUpdate = () => {
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
      defaultValue: 'PEM', view: {
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
      defaultValue: 'Pierre-Eric', view: {
        name: 'Input', type: 'text', placeholder: 'Votre prénom'
      }
    },
    address: {
      type: String, label: 'Adresse', min: 1, max: 256,
      defaultValue: '85, avenue du docteur A. Netter', view: {
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
      defaultValue: '75012', view: {
        name: 'Input', type: 'text', label: 'Votre code postal :',
        placeholder: 'Code postal'
      }
    },
    city: {
      type: String, label: 'Votre ville', min: 1, max: 128,
      defaultValue: 'Paris', view: {
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
      defaultValue: '0609905774', regEx: PHONE_NUMBER_REGEX, view: {
        name: 'Input', type: 'tel', placeholder: 'Votre n° mobile'
      }
    }
  };

  // Set UsersSchema with optional keys for profile
  const ProfileSchema = new SimpleSchema(
    Object.keys(Profile).reduce((acc, k) => {
      acc[k] = Object.assign({optional: true}, Profile[k]);
      return acc;
    }, {})
  );
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
      defaultValue: 'pemarchandet@mailinator.com', view: {
        name: 'Input', type: 'email', label: 'Entrez votre email :',
        placeholder: 'Votre email'
      }
    },
    password: {
      type: String, label: 'Mot de passe', min: 6, max: 128,
      defaultValue: 'pemarchandet', view: {
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
      }, defaultValue: 'pemarchandet', view: {
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
    isAdmin() { return Roles.userIsInRole(this._id, 'admin'); }
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

  // Methods
  Meteor.methods({
    'userTypes.update': function() {
      if (!this.userId) { throw new Meteor.Error('unauthorized'); }
      const user = Meteor.users.findOne(this.userId);
      if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
      if (Meteor.isServer) {
        Col.UserTypes.remove({});
        userTypesUpdate();
      }
    },
    'user.create': function(rawUser) {
      // Creation can only be done when no user is logged in
      if (this.userId) { throw new Meteor.Error('unauthorized'); }
      check(rawUser, SignUpSchema);
      let user = SignUpSchema.objectKeys().reduce((acc, k) => {
        switch (k) {
        case 'name':
        case 'firstName':
        case 'city':
          acc.profile[k] = s(rawUser[k]).trim().toLowerCase().titleize().value();
          break;
        case 'username':
        case 'email':
          acc[k] = rawUser.email.trim().toLowerCase();
          break;
        case 'password':
          acc.password = rawUser[k].trim();
          break;
        case 'confirm': break;
        default:
          acc.profile[k] = rawUser[k].trim();
        }
        return acc;
      }, {profile: {}});
      if (Meteor.isServer) {
        // Check if user is a Subscriber
        if (user.profile.category === 'Adhérent SNVEL') {
          const subscriber = Col.Subscribers.findOne({csoNumber: user.profile.csoNumber});
          if (!subscriber) {
            console.log('CSO doesn\'t exist:', user.profile.csoNumber);
            throw new Meteor.Error(403, 'csoNumberNoMatch');
          }
          if (subscriber.name !== user.profile.name) {
            console.log('CSO number doesn\'t match name:', user.profile.csoNumber, subscriber.name, user.profile.name);
            throw new Meteor.Error(403, 'csoNumberNameMismatch');
          }
          if (subscriber.status !== 'En cours de validité') {
            console.log('CSO expired:', user.profile.csoNumber, subscriber.status);
            throw new Meteor.Error(403, 'csoNumberExpired');
          }
        }
        const userId = Accounts.createUser(user);
        console.log('User created:', user.email);
        this.unblock();
        Accounts.sendVerificationEmail(userId);
        console.log('Verification email sent for:', user.email);
        return true;
      }
    }
  });
};
