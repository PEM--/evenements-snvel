const { Views, Col, Utils } = MainApp;
const { AnimatedLink, GoogleMap, Events } = Views;

class Program extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    console.log('Program: Getting data');
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return Col.Programs.findOne();
  }
  render() {
    console.log('Program: Rendering page');
    const [ markdownBeforeMap, markdownAfterMap ] = this.data.presentation.split('GOOGLEMAP');
    const htmlBeforeMap = Utils.prettyLink(marked(markdownBeforeMap));
    const htmlAfterMap = Utils.prettyLink(marked(markdownAfterMap));
    return (
      <section className='maximized MainContent animated fadeIn Program lisibility'>
        <h1>Programme</h1>
        <div dangerouslySetInnerHTML={{__html: htmlBeforeMap }} />
        <GoogleMap />
        <div dangerouslySetInnerHTML={{__html: htmlAfterMap }} />
        <h2>Sessions & conférences</h2>
        <Events events={this.data.events} />
        <hr />
        <AnimatedLink to='/'>Revenez à l'accueil</AnimatedLink>
      </section>
    );
  }
}

Views.Program = Program;
