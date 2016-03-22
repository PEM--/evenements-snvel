const { Views, Utils, Col } = MainApp;
const { AnimatedLink, Spinner, Table, Button } = Views;

class AdminUser extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    Meteor.subscribe('adminJobs');
    return {
      user: Meteor.users.findOne(FlowRouter.getParam('id'))
    };
  }
  render() {
    const { user } = this.data;
    return (
      <section className='maximized MainContent Admin animated fadeIn'>
        {
          user ?
            <div>
              <h1>User</h1>
              <p>{user.firstName}</p>
            </div> :
            <Spinner />
        }
      </section>
    );
  }
}

Views.AdminUser = AdminUser;
