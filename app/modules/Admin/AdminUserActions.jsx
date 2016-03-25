const { Views } = MainApp;
const { Button } = Views;

const EmailActions = ({user}) => {
  const verifyEmail = () => {
    Meteor.call('user.reSendVerificationEmail', user._id, (error) => {
      if (error) {
        console.warn('Error while re-sending verification emails', error.toString())
        return sAlert.error(`Erreur lors de la vérification d'email : ${error.toString()}`);
      }
      sAlert.success('Email de vérification envoyé');
    });    
  };
  const validEmail = () => {
    Meteor.call('user.forceValidEmail', user._id, (error) => {
      if (error) {
        console.warn('Error while force validating email', error.toString())
        return sAlert.error(`Erreur lors de validation d'email : ${error.toString()}`);
      }
      sAlert.success('Email validé');
    });
  }
  const verified = user.emails[0].verified; 
  return (
    <div>
      <Button
        className='btn' iconName='envelope-o'
        onClick={verifyEmail} disabled={verified}
      >
        Re-vérifier l'email
      </Button>
      <br />
      <Button className='btn' onClick={validEmail} disabled={verified}>
        Valider l'email
      </Button>
    </div>
  );
};

const AdminUserActions = ({user}) => {
  return (
    <div className='actions lisibility'>
      <h2>Actions</h2>
      <h3>Emails</h3>
      <EmailActions user={user} />
      <hr /> 
      <h3>Paiements</h3>
      <hr />
    </div>    
  );
};

Views.AdminUserActions = AdminUserActions;
