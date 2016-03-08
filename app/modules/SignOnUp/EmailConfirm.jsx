const { Views } = MainApp;
const { Spinner } = Views;

const EmailConfirm = () => {
  return (
    <section className='maximized MainContent SignUp animated fadeIn'>
      <h1>En attente de confirmation de votre mail</h1>
      <p>Un email de confirmation vous a été envoyé.</p>
      <p>Vous activerez votre compte en cliquant sur le bouton d'inscription dans ce dernier.</p>
      <p className='textCenter'>
        <Spinner />
      </p>
    </section>
  );
};

MainApp.Views.EmailConfirm = EmailConfirm;
