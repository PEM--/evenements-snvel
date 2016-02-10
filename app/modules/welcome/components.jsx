const Welcome = () => (
  <section className='maximized'>
    <h1>Welcome page</h1>
    <a href='/cgv'>Conditions générales de ventes</a>
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
