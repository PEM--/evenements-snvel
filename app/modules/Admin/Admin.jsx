const { AnimatedLink } = MainApp.Views;

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

MainApp.Views.Admin = Admin;
