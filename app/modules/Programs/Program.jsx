const { Views } = MainApp;
const { AnimatedLink, GoogleMap } = Views;

const Program = () => (
  <section className='maximized MainContent animated fadeIn'>
    <div className='lisibility'>
      <h1>Programme</h1>
      <GoogleMap />
      <AnimatedLink to='/'>Revenir à l'accueil</AnimatedLink>
    </div>
  </section>
);

Views.Program = Program;
