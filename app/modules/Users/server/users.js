// Insert default users if db has none
if (Meteor.users.find().count() === 0) {
  console.log('Creating default users');
  Meteor.settings.private.admins.forEach(admin => {
    const adminId = Accounts.createUser({
      profile: Object.assign({programs: []}, admin.profile),
      username: admin.username,
      password: admin.password,
      email: admin.email
    });
    Roles.addUsersToRoles(adminId, ['admin', 'public']);
    console.log('User created:', admin.email);
  });
}
console.log('Users are ready');
