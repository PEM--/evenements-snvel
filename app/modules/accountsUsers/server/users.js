// Insert default users if db has none
if (Meteor.users.find().count() === 0) {
  console.log('Creating default users');
  const admin = Meteor.settings.private.admin;
  const adminId = Accounts.createUser({
    profile: {
      firstName: admin.profile.firstName,
      lastName: admin.profile.lastName
    },
    username: admin.username,
    password: admin.password,
    email: admin.email
  });
  Roles.addUsersToRoles(adminId, ['admin', 'public']);
}
console.log('Users are ready');
