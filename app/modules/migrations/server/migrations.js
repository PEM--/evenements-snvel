Migrations.add({
  version: 1,
  up: function() {
    console.log('Migration: 1...');
    let usersWithoutUsername = Meteor.users.find({username: {$exists: false}}).fetch();
    usersWithoutUsername.forEach(u => {
      Meteor.users.update({_id: u._id}, {$set: {username: u.email()}});
      console.log('User', u.email(), 'migrated');
    });
    console.log('Migration: 1 done');
  }
});

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
