const { Header, Footer, MainMenu } = MainApp.Views;

const MainComponent = React.createClass({
  getInitialState() {
    return {
      isMenuOpen: false
    };
  },
  onMenuToggle() {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  },
  render() {
    return (
      <MainBody onMenuToggle={this.onMenuToggle} isMenuOpen={this.state.isMenuOpen} >
        {this.props.children}
      </MainBody>
    );
  }
});

const MainBody = ({children, onMenuToggle, isMenuOpen}) => (
  <div>
    <MainMenu isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} />
    <div className='flex col' style={{height: '100vh'}} >
      <Header onMenuToggle={onMenuToggle} />
      <main className='flexItemDynamicSize'>
        {children}
      </main>
      <Footer className='flexItemStaticSize primary2Color' />
    </div>
  </div>
);

MainApp.Views.MainApp = MainComponent;

const Welcome = () => (
  <section className='maximized'>
    <h1>Welcome page</h1>
    <a href='/cgv'>Conditions générales de ventes</a>
  </section>
);

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(MainComponent, { children: <Welcome /> });
  }
});

console.log('Home route declared');
