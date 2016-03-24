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
            <div className='content'>
              <div className='profile lisibility'>
                <h1>{user.fullName()}</h1>
                <p className='email'>                
                  <a className='AnimatedLink cream' href={`mailto:${user.email()}`}>{user.email()}</a>
                </p>
                <p className='address'>
                  <span>{user.profile.address}</span><br />
                  {
                    user.profile.addressComplementary ?
                    <div>
                      <span>{user.profile.addressComplementary}</span><br />
                    </div>: ''
                  }
                  <span>{user.profile.postalCode} - {user.profile.city}</span><br />
                  <span>{user.profile.country}</span><br />
                </p>
              </div>
            </div> :
            <Spinner className='maximized' />
        }
        <hr />
        <AnimatedLink to='/admin'>Retour</AnimatedLink>
      </section>
    );
  }
}

Views.AdminUser = AdminUser;
