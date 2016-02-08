const { Header, Footer } = MainApp.Views;

const MainComponent = ({children}) => (
  <div>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

MainApp.Views.MainApp = MainComponent;

const Welcome = () => (
  <h1>Welcome page</h1>
);

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(MainComponent, { children: <Welcome /> });
  }
});

console.log('Home route declared');
