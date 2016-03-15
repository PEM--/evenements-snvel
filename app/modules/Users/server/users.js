// Insert default users if db has none
if (Meteor.users.find().count() === 0) {
  console.log('Creating default users');
  Meteor.settings.private.admins.forEach(admin => {
    const adminId = Accounts.createUser({
      profile: {
        category: admin.profile.category,
        firstName: admin.profile.firstName,
        name: admin.profile.lastName,
        programs: []
      },
      username: admin.username,
      password: admin.password,
      email: admin.email
    });
    Roles.addUsersToRoles(adminId, ['admin', 'public']);
  });
}
console.log('Users are ready');
