const { Views } = MainApp;
const { AnimatedLink, Spinner } = Views;

const Admin = ({user}) => (
  <section className='maximized MainContent animated fadeIn'>
    {
      user ? (
        <div className='animated fadeIn lisibility'>
          <h1>Admin</h1>
          <p>Permissions accordées</p>
          <AnimatedLink to='/'>Revenir à l'accueil</AnimatedLink>
        </div>
      ) : (
        <Spinner />
      )
    }
  </section>
);

Views.Admin = Admin;
