Migrations.add({
  version: 1,
  up: function() {
    console.log('Migration: 1...');
    const usersWithoutUsername = Meteor.users.find({username: {$exists: false}}).fetch();
    usersWithoutUsername.forEach(u => {
      const email = u.emails[0].address;
      Meteor.users.update({_id: u._id}, {$set: {username: email}});
      console.log('User', email, 'migrated');
    });
    console.log('Migration: 1 done');
  }
});

Migrations.add({
  version: 2,
  up: function() {
    console.log('Migration: 2...');
    const usersWithoutCountry = Meteor.users.find({'profile.country': {$exists: false}}).fetch();
    usersWithoutCountry.forEach(u => {
      const email = u.emails[0].address;
      Meteor.users.update({_id: u._id}, {$set: {'profile.country': 'France'}});
      console.log('User', email, 'migrated');
    });
    console.log('Migration: 2 done');
  }
});

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
