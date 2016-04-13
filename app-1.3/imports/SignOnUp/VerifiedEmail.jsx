if (Meteor.isServer) {
  const { Views } = MainApp;

  const VerifiedEmail = () => {
    return (
      <section className='maximized MainContent animated fadeIn'>
        <h1>Email en cours de vérification</h1>
        <p>Veuillez patienter.</p>
      </section>
    );
  };

  MainApp.Views.VerifiedEmail = VerifiedEmail;
}
