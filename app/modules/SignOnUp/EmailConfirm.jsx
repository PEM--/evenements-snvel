const { Spinner } = MainApp.Views;

const textEmail = {
  title: 'En attente de confirmation de votre mail',
  p1: 'Un email de confirmation vous a été envoyé.',
  p2: 'Vous activerez votre compte en cliquant sur le bouton d\'inscription dans ce dernier.'
};

const textPassword = {
  title: 'En attente de confirmation de votre mail',
  p1: 'Un email de changement de mot de passe vous a été envoyé.',
  p2: 'Vous pourrez changer votre mot de passe en cliquant sur le bouton d\'inscription dans ce dernier.'
};

const EmailConfirm = ({forPassword = false}) => {
  const texts = forPassword ? textPassword : textEmail;
  return (
    <section className='maximized MainContent animated fadeIn'>
      <h1>{texts.title}</h1>
      <p>{texts.p1}</p>
      <p>{texts.p2}</p>
      <div style={{width: '100%', height: '100px'}} >
        <Spinner className='maximized' style={{height: '100px'}} />
      </div>
    </section>
  );
};

MainApp.Views.EmailConfirm = EmailConfirm;
