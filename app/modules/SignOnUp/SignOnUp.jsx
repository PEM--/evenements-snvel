const { AnimatedLink } = MainApp.Views;

const SignOnUp = ({isSignUp = false}) => (
  <section className='maximized MainContent SignOnUp'>
    <div key={Number(isSignUp)} className='lisibility animated fadeIn'>
      <h1>{isSignUp ? 'Création de compte' : 'Connexion'}</h1>
      {
        !isSignUp ? <AnimatedLink to='/password-change'>Mot de passe oublié</AnimatedLink> : ''
      }
    </div>
  </section>
);


MainApp.Views.SignOnUp = SignOnUp;
