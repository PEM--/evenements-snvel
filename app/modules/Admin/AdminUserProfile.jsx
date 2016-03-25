const { Views } = MainApp;

const AdminUserProfile = ({user}) => {
  return (
    <div className='profile lisibility'>
      <h1 className='textCenter'>{user.fullName()}</h1>
      <h2 className='textCenter'>{user.profile.organization}</h2>
      <p>
        <span>{user.profile.category}</span>
        <span className='csoNumber'>{user.profile.csoNumber}</span>
      </p>
      <p className='email'>                
        <a
          className={classNames('AnimatedLink', 'cream', {
            unverifiedEmail: !user.emails[0].verified
          })}
          href={`mailto:${user.email()}`}>
          {user.email()}
        </a>
      </p>
      <p className='address'>
        <span>{user.profile.address}</span>
        <span>{user.profile.addressComplementary}</span>
        <span>{`${user.profile.postalCode} ${user.profile.city}`}</span>
        <span>{user.profile.country}</span>
      </p>
      {
        user.profile.mobile ?
          <p className='mobile'>
            <a className='AnimatedLink cream' href={`tel:${user.profile.mobile}`}>
              {user.profile.mobile}
            </a>
          </p> : ''
      }
      {
        user.profile.phone ?
          <p className='phone'>
            <a className='AnimatedLink cream' href={`tel:${user.profile.phone}`}>
              {user.profile.phone}
            </a>
          </p> : ''
      }
      <p className='roles'>
        {
          user.roles.map((r, idx) => (
            <span key={`roles-${idx}`} className={r}>{r}</span>
          ))
        }
      </p>
    </div>    
  );
}

Views.AdminUserProfile = AdminUserProfile;
