const adminJobs = JobCollection('adminJobQueue');

if (Meteor.isServer) {
  adminJobs.allow({
    admin: function (userId, method, params) {
      const user = Meteor.users.findOne(userId);
      return user && user.isAdmin();
    }
  });
  adminJobs.setLogStream(process.stdout);

  Meteor.startup(() => {
    Meteor.publish('adminJobs', function() {
      const user = Meteor.users.findOne(this.userId);
      return user && user.isAdmin() ? adminJobs.find({}) : this.ready();
    });
    return adminJobs.startJobServer();
  });
}

MainApp.Col.adminJobs = adminJobs;
