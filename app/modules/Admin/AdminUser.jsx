const { Views, Utils, Col } = MainApp;
const { AnimatedLink, Spinner, Table, Button } = Views;

class AdminUser extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    Meteor.subscribe('adminJobs');
    return {
      user: Meteor.user(), nbJobs: Col.adminJobs.find().count()
    };
  }
  render() {
    return (
      <section className='maximized MainContent Admin animated fadeIn'>
        <h1>User</h1>
      </section>
    );
  }
}

Views.AdminUser = AdminUser;
