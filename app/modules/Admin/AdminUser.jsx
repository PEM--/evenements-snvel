const { Views, Utils, Col } = MainApp;
const { AnimatedLink, Spinner, Table, Button } = Views;

class AdminUser extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    Meteor.subscribe('users.all');
    return {
      user: Meteor.users.findOne(FlowRouter.getParam('id'))
    };
  }
  render() {
    const { user } = this.data;
    console.log('User', user, FlowRouter.getParam('id'));
    return (
      <section className='maximized MainContent AdminUser animated fadeIn'>
        {
          user ?
            <div>
              <h1>User</h1>
              <p>{user.profile.name}</p>
              <p>{user.profile.firstName}</p>
              <p>{user.roles}</p>
            </div> :
            <Spinner />
        }
      </section>
    );
  }
}

Views.AdminUser = AdminUser;
