Migrations.add({
  version: 1,
  up: function() {
    console.log('Migration: 1...');
    let usersWithoutUsername = Meteor.users.find({username: {$exists: false}}).fetch();
    usersWithoutUsername.forEach(u => {
      const email = u.emails[0].address;
      Meteor.users.update({_id: u._id}, {$set: {username: email}});
      console.log('User', email, 'migrated');
    });
    console.log('Migration: 1 done');
  }
});

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
