const { Schema, Col, Utils } = MainApp;

// Methods
Meteor.methods({
  'userTypes.update': function() {
    if (!this.userId) { throw new Meteor.Error('unauthorized'); }
    const user = Meteor.users.findOne(this.userId);
    if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
    if (Meteor.isServer) {
      Col.adminJobs.processJobs('userTypes.update', function(job) {
        Col.UserTypes.remove({});
        userTypesUpdate();
        job.done();
      });
      const j = new Job(Col.adminJobs, 'userTypes.update', {});
      return j.save();
    }
  },
  'user.create': function(rawUser) {
    // Creation can only be done when no user is logged in
    if (this.userId) { throw new Meteor.Error('unauthorized'); }
    check(rawUser, Schema.SignUpSchema);
    let user = Schema.SignUpSchema.objectKeys().reduce((acc, k) => {
      switch (k) {
      case 'name':
      case 'firstName':
      case 'city':
        acc.profile[k] = s(rawUser[k]).trim().toLowerCase().titleize().value();
        break;
      case 'email':
        acc.username = rawUser.email.trim().toLowerCase();
        acc.email = acc.username;
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
  },
  'user.addProgram': function(program) {
    if (!this.userId) { throw new Meteor.Error('unauthorized'); }
    let user = Meteor.users.findOne(this.userId);
    if (!user) { throw new Meteor.Error('unauthorized'); }
    check(program, Schema.ProfileProgramSchema);
    program.date = moment().format('DD/MM/YYYY');
    const idx = user.profile.programs.reduce((acc, p, index) => {
      if (p.reference === program.reference) { acc = index; }
      return acc;
    }, -1);
    if (idx !== -1) {
      user.profile.programs = [... user.profile.programs.slice(0, idx), ... user.profile.programs.slice(idx + 1)];
    }
    user.profile.programs.push(program);
    delete user._id;
    if (Meteor.isServer) {
      Meteor.users.update({_id: this.userId}, user, {bypassCollection2: true});
      console.log('User', user.email(), 'subscribed to', JSON.stringify(program));
    }
  },
  'user.waitingPayment': function(programRef) {
    if (!this.userId) { throw new Meteor.Error('unauthorized'); }
    check(programRef, String);
    if (Meteor.isServer) {
      Utils.setPaymentForUser(this.userId, programRef, 'Attente paiement');
    }
  },
  'user.reSendVerificationEmail': function(userId) {
    if (!this.userId) { throw new Meteor.Error('unauthorized'); }
    const user = Meteor.users.findOne(this.userId);
    if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
    this.unblock();
    if (Meteor.isServer) {
      Accounts.sendVerificationEmail(userId);
      return true;
    }
  },
  'user.forceValidEmail': function(userId) {
    if (!this.userId) { throw new Meteor.Error('unauthorized'); }
    const user = Meteor.users.findOne(this.userId);
    if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
    this.unblock();
    if (Meteor.isServer) {
      Meteor.users.update({_id: userId}, {
        $set: { 'emails.0.verified': true }
      });
      return true;
    }
  },
  'user.setOrUnsetAdminRights': function(userId) {
    if (!this.userId) { throw new Meteor.Error('unauthorized'); }
    const user = Meteor.users.findOne(this.userId);
    if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
    if (Meteor.isServer) {
      if (Roles.userIsInRole(userId, 'admin')) {
        Roles.removeUsersFromRoles(userId, 'admin');
      } else {
        Roles.addUsersToRoles(userId, ['admin']);
      }
      return true;
    }
  }
});
