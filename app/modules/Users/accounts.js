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
}

if (Meteor.isServer) {
  Accounts.onLogin(function() {
    const user = Meteor.users.findOne(this.userId);
    console.log('User logged in', user.email());
    const lastConnection = new Date();
    Meteor.users.update(user._id, {$set: { lastConnection }});
  });
}
