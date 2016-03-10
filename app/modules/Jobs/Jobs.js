const adminJobs = JobCollection('adminJobQueue');

if (Meteor.isServer) {
  adminJobs.allow({
    admin: function (userId, method, params) {
      const user = Meteor.users.findOne(userId);
      return user && user.isAdmin();
    }
  });
  // adminJobs.setLogStream(process.stdout);

  Meteor.startup(() => {
    Meteor.publish('adminJobs', function() {
      const user = Meteor.users.findOne(this.userId);
      return user && user.isAdmin() ? adminJobs.find({}) : this.ready();
    });
    adminJobs.startJobServer();
    adminJobs.processJobs('test', function(job, cb) {
      console.log('Job started');
      Meteor.setTimeout(() => {
        console.log('Job ended');
        job.done();
        cb();
      }, 2000);
    });
  });
}

MainApp.Col.adminJobs = adminJobs;
