const { AnimatedLink } = MainApp.Views;

const Welcome = () => (
  <section className='maximized animated fadeIn'>
    <h1>Welcome page</h1>
    <AnimatedLink to='/cgv'>Conditions générales de ventes</AnimatedLink>
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
