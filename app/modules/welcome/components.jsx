const { Header, Footer } = MainApp.Views;

const MainComponent = React.createClass({
  getInitialState() {
    return {
      isMenuOpen: false
    };
  },
  onMenuToggle() {
    this.state.setState({isMenuOpen: !this.state.isMenuOpen});
  },
  render() {
    return (
      <MainBody onMenuToggle={this.onMenuToggle}>
        {this.props.children}
      </MainBody>
    );
  }
});

const MainMenu = ({isMenuOpen}) => (
  <nav>
    <p>Menu items</p>
  </nav>
);

const MainBody = ({children, onMenuToggle}) => (
  <div className='flex col' style={{height: '100vh'}} >
    <Header onMenuToggle={onMenuToggle} />
    <main className='flexItemDynamicSize'>
      {children}
    </main>
    <Footer className='flexItemStaticSize primary2Color' />
  </div>
);

MainApp.Views.MainApp = MainComponent;

const Welcome = () => (
  <section className='maximized'>
    <h1>Welcome page</h1>
  </section>
);

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(MainComponent, { children: <Welcome /> });
  }
});

console.log('Home route declared');
