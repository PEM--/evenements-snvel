const { Views } = MainApp;
const { Button } = Views;

const EmailActions = ({user}) => {
  const verifyEmail = () => {
    Meteor.call('user.reSendVerificationEmail', user._id, (error) => {
      if (error) {
        console.warn('Error while re-sending verification emails', error.toString());
        return sAlert.error(`Erreur lors de la vérification d'email : ${error.toString()}`);
      }
      sAlert.success('Email de vérification envoyé');
    });
  };
  const validEmail = () => {
    Meteor.call('user.forceValidEmail', user._id, (error) => {
      if (error) {
        console.warn('Error while force validating email', error.toString());
        return sAlert.error(`Erreur lors de validation d'email : ${error.toString()}`);
      }
      sAlert.success('Email validé');
    });
  };
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

const AdminActions = ({user}) => {
  const setUnset = () => {
    Meteor.call('user.setOrUnsetAdminRights', user._id, (error) => {
      if (error) {
        console.warn('Error while setting / resetting admin rights', error.toString());
        return sAlert.error(`Erreur lors de la mise à jour des droits : ${error.toString()}`);
      }
      sAlert.success('Mise à jour de droits réussie');
    });
  };
  const icon = user.isAdmin() ? 'lock' : 'key';
  const text = (user.isAdmin() ? 'Retirer' : 'Ajouter') + ' l\'administration';
  return (
    <Button className='btn' iconName={icon} onClick={setUnset}>{text}</Button>
  );
};

const AdminUserActions = ({user}) => {
  return (
    <div className='actions lisibility'>
      <h2>Actions</h2>
      <h3>Emails</h3>
      <EmailActions user={user} />
      <hr />
      {/*<h3>Paiements</h3>
      <hr /> */}
      <h3>Droits additionnels</h3>
      <AdminActions user={user} />
      <hr />
    </div>
  );
};

Views.AdminUserActions = AdminUserActions;
