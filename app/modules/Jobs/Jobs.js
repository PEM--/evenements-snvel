const adminJobs = JobCollection('adminJobQueue');

if (Meteor.isServer) {
  adminJobs.allow({
    admin: function (userId, method, params) {
      const user = Meteor.users.findOne(userId);
      return user && user.isAdmin();
    }
  });
  Meteor.startup(() => {
    adminJobs.remove({});
    Meteor.publish('adminJobs', function() {
      const user = Meteor.users.findOne(this.userId);
      return user && user.isAdmin() ? adminJobs.find({}) : this.ready();
    });
    // adminJobs.setLogStream(process.stdout);
    adminJobs.startJobServer();
  });

  // Meteor methods
  Meteor.methods({
    cleanJobs() {
      const user = Meteor.users.findOne(this.userId);
      if (user && user.isAdmin()) {
        adminJobs.remove({});
      } else {
        throw new Meteor.Error(403, 'Unauthorized call to cleanJobs');
      }
    }
  });
}

MainApp.Col.adminJobs = adminJobs;
