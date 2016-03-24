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
    return (
      <section className='maximized MainContent AdminUser animated fadeIn'>
        {
          user ?
            <div>
              <div className='content'>
                <Views.AdminUserProfile user={user} />
              </div>
              <hr />
              <AnimatedLink to='/admin'>Retour</AnimatedLink>
            </div> :
            <Spinner className='maximized' />
        }
      </section>
    );
  }
}

Views.AdminUser = AdminUser;
