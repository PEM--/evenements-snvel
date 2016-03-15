// Accounts options
console.log('Configure accounts');
Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false
});

if (Meteor.isClient) {
  Accounts.onEmailVerificationLink(function(token, done) {
    console.log('Received confirmation');
    FlowRouter.go('subscribe');
    done();
  });
  // passwordDone = null;
  // Accounts.onResetPasswordLink(function(token, done) {
  //   console.log('Received confirmation');
  // });
}

if (Meteor.isServer) {
  Accounts.onLogin(function() {
    const user = Meteor.users.findOne(this.userId);
    console.log('User logged in', user.email());
    const lastConnection = new Date();
    Meteor.users.update(user._id, {$set: { lastConnection }});
  });
}

Meteor.startup(() => {
  const PasswordForgottenSchema = new SimpleSchema({
    email: {
      type: String, label: 'Email', regEx: SimpleSchema.RegEx.Email,
      defaultValue: '', view: {
        name: 'Input', type: 'email', label: 'Entrez votre email :',
        placeholder: 'Votre email'
      }
    }
  });
  MainApp.Schema.PasswordForgottenSchema = PasswordForgottenSchema;
  const PasswordChangeSchema = new SimpleSchema({
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
  });
  MainApp.Schema.PasswordChangeSchema = PasswordChangeSchema;
});

Meteor.methods({
  'accounts.resetPassword': function(email) {
    // User needs to be logged-out
    if (this.userId) { throw new Meteor.Error('unauthorized'); }
    check(email, MainApp.Schema.PasswordForgottenSchema);
    if (Meteor.isServer) {
      this.unblock();
      const user = Meteor.users.findOne({'emails.address': email.email});
      if (!user) { throw new Meteor.Error('unauthorized'); }
      Accounts.sendResetPasswordEmail(user._id);
      console.log('Password reset for', user.email());
    }
  },
  'accounts.newPassword': function(passwords) {
    // User needs to be logged-out
    if (this.userId) { throw new Meteor.Error('unauthorized'); }
    check(passwords, MainApp.Schema.PasswordChangeSchema);

  }
});
