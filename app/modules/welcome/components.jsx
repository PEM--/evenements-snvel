const { AnimatedLink } = MainApp.Views;

const Welcome = () => (
  <section className='maximized MainContent animated fadeInUp'>
    <h1>Universités SNVEL</h1>
    <p>
      <AnimatedLink to='/cgv'>Conditions génèrales de ventes</AnimatedLink>
    </p>
    <p>
      <AnimatedLink to='/cookie'>Confidentialité</AnimatedLink>
    </p>
    <p>
      <AnimatedLink to='/legal'>Mentions légales</AnimatedLink>
    </p>
  </section>
);

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(MainApp.Views.MainLayout, {
      children: <Welcome />
    });
  }
});

console.log('Home route declared');
