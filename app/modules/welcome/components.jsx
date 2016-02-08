const MainComponent = ({children}) => (
  <div>
    <h1>MainComponent</h1>
    {children}
  </div>
);

MainApp.Views.MainApp = MainComponent;

const Welcome = () => (
  <h1>Welcome page</h1>
);

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(MainComponent, { content: <Welcome /> });
  }
});

console.log('Home route declared');
