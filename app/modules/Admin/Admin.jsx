const { Views } = MainApp;
const { AnimatedLink } = Views;

const Admin = ({user}) => (
  <section className='maximized MainContent animated fadeIn'>
    <div className='lisibility'>
      <h1>Admin</h1>
      {
        user ? <p>Permissions accordées</p> : <p>Vérification des permissions</p>
      }
    </div>
  </section>
);

Views.Admin = Admin;
