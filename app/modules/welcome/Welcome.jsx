const { AnimatedLink } = MainApp.Views;

const animate = () => {
  console.log('Ready');
  Meteor.setTimeout(() => {
    $('.headlines').addClass('animated fadeInUp');
  }, 1000);
};

const Welcome = () => (
  <section className='maximized MainContent animated fadeInUp'>
    <div className='headlines lisibility'>
      <h1 className='headline'>
        <Textfit
          style={{width: '100%', maxWidth: '600px', lineHeight: '100%', display: 'inline-block'}}
          mode={'single'}
        >
          Universités SNVEL
        </Textfit>
      </h1>
      <h2 className='headline lisibility'>
        <Textfit
          style={{width: '100%', maxWidth: '600px', lineHeight: '100%', display: 'inline-block'}}
          mode={'single'} onReady={animate}
        >
          Biarritz - 24 & 25 mars 2016
        </Textfit>
      </h2>
    </div>
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
