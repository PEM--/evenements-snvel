const { Views } = MainApp;
const { Button } = Views;

const AdminUserActions = ({user}) => {
  const verifyEmail = () => {
    sAlert.error('Need development');
  };
  return (
    <div className='actions lisibility'>
      <h2>Actions</h2>
      <Button
        className='btn'
        iconName='envelope-o'
        onClick={verifyEmail}
        disabled={user.emails[0].verified}
       >Re-vérifier l'email</Button>
    </div>    
  );
};

Views.AdminUserActions = AdminUserActions;
