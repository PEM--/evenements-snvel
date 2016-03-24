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
              <div className='content'>
                <div className='profile lisibility'>
                  <h1>{user.fullName()}</h1>
                  <h2 className='textCenter'>{user.profile.organization}</h2>
                  <p className='email'>                
                    <a className='AnimatedLink cream' href={`mailto:${user.email()}`}>{user.email()}</a>
                  </p>
                  <p className='address'>
                    <span>{user.profile.address}</span>
                    <span>{user.profile.addressComplementary}</span>
                    <span>{`${user.profile.postalCode} ${user.profile.city}`}</span>
                    <span>{user.profile.country}</span>
                  </p>
                  <p className='mobile'>
                    <a className='AnimatedLink cream' href={`tel:${user.profile.mobile}`}>
                      {user.profile.mobile}
                    </a>
                  </p>
                  {
                    user.profile.phone ?
                      <p className='phone'>
                        <a className='AnimatedLink cream' href={`tel:${user.profile.phone}`}>
                          {user.profile.phone}
                        </a>
                      </p> : ''
                  }
                </div>
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
