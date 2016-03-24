const { Views } = MainApp;
const { Button } = Views;

const AdminUserActions = ({user}) => {
  const verifyEmail = () => {
    Meteor.call('user.reSendVerificationEmail', user._id, (error) => {
      if (error) {
        console.warn('Error while re-sending verification emails', error.toString())
        return sAlert.error(`Erreur lors de la vérification d'email : ${error.toString()}`);
      }
      sAlert.success('Email de vérification envoyé');
    });    
  };
  const validEmail =() => {
    Meteor.call('user.forceValidEmail', user._id, (error) => {
      if (error) {
        console.warn('Error while force validating email', error.toString())
        return sAlert.error(`Erreur lors de validation d'email : ${error.toString()}`);
      }
      sAlert.success('Email validé');
    });
  }
  return (
    <div className='actions lisibility'>
      <h2>Actions</h2>
      <h3>Emails</h3>
      <Button
        className='btn'
        iconName='envelope-o'
        onClick={verifyEmail}
        disabled={user.emails[0].verified}
      >
        Re-vérifier l'email
      </Button>
      <br />
      <Button
        className='btn'
        onClick={validEmail}
        disabled={user.emails[0].verified}
      >
        Valider l'email
      </Button>
      <hr /> 
    </div>    
  );
};

Views.AdminUserActions = AdminUserActions;
