const PHONE_NUMBER_REGEX = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const { Schema, Col, Utils } = MainApp;

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
      index: true, unique: true, min: 0, max: 8,
      custom() {
        const def = this.field('category');
        const allowedValues = Schema.ProfileSchema
          .getDefinition('category').allowedValues;
        if (def.value === allowedValues[0]) {
          if (!this.value || (this.value.length < 1 && this.value.length > 7)) {
            return 'csoNumberError';
          }
        }
        if (Meteor.isServer) {
          // return 'csoAlreadyDeclared';
          return 'csoAlreadyDeclared';
        }
        return true;
      }, defaultValue: '', view: {
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

  const ProfileSchema = new SimpleSchema(Profile);
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
      type: Schema.ProfileSchema,
      label: 'Information utilisateur',
      optional: true
    }
  });
  Meteor.users.attachSchema(UsersSchema);
  Meteor.users.helpers({
    isAdmin() { return Roles.userIsInRole(this._id, 'admin'); }
  });

  Schema.UsersSchema = UsersSchema;

  Meteor.methods({
    'users.create': user => {
      check(user, SignUpSchema);
      if (this.userId) {
        const internaleUser = Meteor.users.find(this.userId);
        if (!internaleUser.isAdmin()) {
          throw new Meteor.Error('unauthorized');
        }
      }
      const newProfile = Schema.ProfileSchema.objectKeys()
        .reduce((acc, k) => {
          acc[k] = user[k];
          return acc;
        }, {});
      const _id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: newProfile
      });
      Roles.addUsersToRoles(_id, ['public']);
      console.log('User created:', user.email);
      this.unblock();
      Accounts.sendVerificationEmail(_id);
      console.log('Verification email sent for:', accountInfo.login.email);
      return true;
    }
  });

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
    }
  });
};
