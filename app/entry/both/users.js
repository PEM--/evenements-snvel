// Insert default users if db has none
if (meteor.users.find().count() === 0) {
  console.log('Creating default users');
  const adminId = Accounts.createuser({
    profile: {
      firstName: 'admin',
      lastName: 'admin'
    },
    email: 'admin@test.com',
    password: 'admin'
  });
  Roles.addUsersToRoles(adminid, ['admin']);
}
